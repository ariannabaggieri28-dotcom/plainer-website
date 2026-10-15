import 'server-only'
import { createHmac } from 'node:crypto'
import { supabaseServer } from './supabase'

/**
 * Rate limiting su tabella: si registrano eventi e si conta nella finestra.
 * Le chiavi (email, IP) non si salvano mai in chiaro: HMAC con pepper.
 */

function pepper(): string {
  const p = process.env.RATE_LIMIT_PEPPER
  if (!p) throw new Error('RATE_LIMIT_PEPPER mancante')
  return p
}

export function chiaveEmail(email: string): string {
  return 'email:' + createHmac('sha256', pepper()).update(email.toLowerCase().trim()).digest('hex')
}

export function chiaveIp(ip: string): string {
  return 'ip:' + createHmac('sha256', pepper()).update(ip).digest('hex')
}

export type Azione = 'otp' | 'upload' | 'analisi' | 'waitlist'

/** Conta gli eventi di una chiave nella finestra. */
export async function conta(chiave: string, azione: Azione, finestraMinuti: number): Promise<number> {
  const sb = supabaseServer()
  const da = new Date(Date.now() - finestraMinuti * 60_000).toISOString()
  const { count, error } = await sb
    .from('rate_events')
    .select('id', { count: 'exact', head: true })
    .eq('chiave', chiave)
    .eq('azione', azione)
    .gte('created_at', da)
  if (error) throw error
  return count ?? 0
}

export async function registra(chiave: string, azione: Azione): Promise<void> {
  const sb = supabaseServer()
  const { error } = await sb.from('rate_events').insert({ chiave, azione })
  if (error) throw error
}

/** Tetto giornaliero globale sulle analisi: oltre, si risponde "torna domani". */
export async function analisiOggi(): Promise<number> {
  const sb = supabaseServer()
  const mezzanotte = new Date()
  mezzanotte.setUTCHours(0, 0, 0, 0)
  const { count, error } = await sb
    .from('analyses')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', mezzanotte.toISOString())
    .in('stato', ['in_analisi', 'completata'])
  if (error) throw error
  return count ?? 0
}

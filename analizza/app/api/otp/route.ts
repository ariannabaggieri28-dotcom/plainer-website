import { NextRequest, NextResponse } from 'next/server'
import { createHash, randomInt, timingSafeEqual } from 'node:crypto'
import { z } from 'zod'
import { supabaseServer } from '@/lib/supabase'
import { inviaOtp } from '@/lib/email'
import { chiaveEmail, chiaveIp, conta, registra } from '@/lib/rate-limit'

export const runtime = 'nodejs'

/**
 * Autenticazione email con codice usa-e-getta. Serve a una cosa sola:
 * impedire i 200 tentativi anonimi. Nessuna mail di risultato.
 *
 * POST  { email }          -> invia il codice (10 min di validità)
 * PUT   { email, codice }  -> verifica; ritorna un esito senza sessione:
 *                             la route di analisi richiede una verifica recente.
 */

function hashOtp(codice: string, email: string): string {
  const pepper = process.env.OTP_PEPPER
  if (!pepper) throw new Error('OTP_PEPPER mancante')
  return createHash('sha256').update(`${codice}:${email}:${pepper}`).digest('hex')
}

const CorpoRichiesta = z.object({ email: z.string().trim().toLowerCase().email().max(254) })

export async function POST(req: NextRequest) {
  let dati
  try {
    dati = CorpoRichiesta.parse(await req.json())
  } catch {
    return NextResponse.json({ errore: 'Email non valida' }, { status: 400 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'sconosciuto'
  const kEmail = chiaveEmail(dati.email)
  const kIp = chiaveIp(ip)
  if ((await conta(kEmail, 'otp', 60)) >= 3 || (await conta(kIp, 'otp', 60)) >= 10) {
    return NextResponse.json({ errore: 'Troppi codici richiesti, riprova tra un’ora' }, { status: 429 })
  }
  await Promise.all([registra(kEmail, 'otp'), registra(kIp, 'otp')])

  const codice = String(randomInt(0, 1_000_000)).padStart(6, '0')
  const sb = supabaseServer()
  const { error } = await sb.from('email_verifications').insert({
    email: dati.email,
    otp_hash: hashOtp(codice, dati.email),
    expires_at: new Date(Date.now() + 10 * 60_000).toISOString(),
  })
  if (error) {
    console.error('otp: insert fallito', error.code)
    return NextResponse.json({ errore: 'Errore interno' }, { status: 500 })
  }

  try {
    await inviaOtp(dati.email, codice)
  } catch (e) {
    console.error('otp: invio fallito', e instanceof Error ? e.message : e)
    return NextResponse.json({ errore: 'Invio email fallito, riprova' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}

const CorpoVerifica = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  codice: z.string().regex(/^\d{6}$/),
})

export async function PUT(req: NextRequest) {
  let dati
  try {
    dati = CorpoVerifica.parse(await req.json())
  } catch {
    return NextResponse.json({ errore: 'Dati non validi' }, { status: 400 })
  }

  const sb = supabaseServer()
  const { data: righe, error } = await sb
    .from('email_verifications')
    .select('id, otp_hash, attempts, expires_at, verified_at')
    .eq('email', dati.email)
    .gt('expires_at', new Date().toISOString())
    .is('verified_at', null)
    .order('created_at', { ascending: false })
    .limit(1)
  if (error) {
    console.error('otp: lettura fallita', error.code)
    return NextResponse.json({ errore: 'Errore interno' }, { status: 500 })
  }
  const riga = righe?.[0]
  if (!riga) return NextResponse.json({ errore: 'Codice scaduto, richiedine uno nuovo' }, { status: 400 })
  if (riga.attempts >= 5) return NextResponse.json({ errore: 'Troppi tentativi' }, { status: 429 })

  await sb.from('email_verifications').update({ attempts: riga.attempts + 1 }).eq('id', riga.id)

  const atteso = Buffer.from(riga.otp_hash, 'hex')
  const ricevuto = Buffer.from(hashOtp(dati.codice, dati.email), 'hex')
  if (atteso.length !== ricevuto.length || !timingSafeEqual(atteso, ricevuto)) {
    return NextResponse.json({ errore: 'Codice errato' }, { status: 400 })
  }

  await sb.from('email_verifications').update({ verified_at: new Date().toISOString() }).eq('id', riga.id)
  return NextResponse.json({ ok: true })
}

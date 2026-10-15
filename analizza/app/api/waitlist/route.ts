import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseServer } from '@/lib/supabase'
import { chiaveIp, conta, registra } from '@/lib/rate-limit'

export const runtime = 'nodejs'

const Corpo = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  consenso_marketing: z.boolean().optional().default(false),
  fonte: z
    .string()
    .regex(/^[a-z0-9_-]{1,32}$/)
    .optional(),
  // honeypot: un umano non lo compila mai
  sito_web: z.string().max(0).optional(),
})

export async function POST(req: NextRequest) {
  let dati
  try {
    dati = Corpo.parse(await req.json())
  } catch {
    return NextResponse.json({ errore: 'Dati non validi' }, { status: 400 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'sconosciuto'
  const kIp = chiaveIp(ip)
  if ((await conta(kIp, 'waitlist', 60)) >= 10) {
    return NextResponse.json({ errore: 'Troppi tentativi, riprova più tardi' }, { status: 429 })
  }
  await registra(kIp, 'waitlist')

  const sb = supabaseServer()
  const { error } = await sb.from('waitlist').upsert(
    {
      email: dati.email,
      consenso_marketing: dati.consenso_marketing,
      informativa_versione: process.env.INFORMATIVA_VERSIONE || '2026-10',
      fonte: dati.fonte || 'analizza',
    },
    { onConflict: 'email' },
  )
  if (error) {
    console.error('waitlist: insert fallito', error.code)
    return NextResponse.json({ errore: 'Errore interno' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}

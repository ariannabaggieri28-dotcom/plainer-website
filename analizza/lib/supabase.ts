import 'server-only'
import { createClient } from '@supabase/supabase-js'

/**
 * Client con la service key, confinato al server. Tutte le tabelle stanno
 * nello schema `analizza`, che non e' esposto via PostgREST e ha RLS
 * deny-all: dal browser non ci si arriva in nessun modo, si passa solo
 * dalle nostre route API.
 */
export function supabaseServer() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY mancanti')
  return createClient(url, key, {
    auth: { persistSession: false },
    db: { schema: 'analizza' },
  })
}

export const BUCKET_PREVENTIVI = 'analizza-preventivi'

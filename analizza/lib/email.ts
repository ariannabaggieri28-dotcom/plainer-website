import 'server-only'

/**
 * Invio email via Resend, API diretta: una dipendenza in meno.
 * L'unica email che mandiamo e' il codice OTP — nessuna mail di risultato,
 * nessun marketing da qui. Tetto gratuito Resend: 100/giorno, che con
 * ~1,2 email per analisi e il tetto DAILY_ANALYSIS_CAP ci sta largo.
 */
export async function inviaOtp(a: string, codice: string): Promise<void> {
  const key = process.env.RESEND_API_KEY
  const da = process.env.EMAIL_FROM || 'Plainer <verifica@plainer.it>'
  if (!key) throw new Error('RESEND_API_KEY mancante')

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: da,
      to: [a],
      subject: `${codice} è il tuo codice Plainer`,
      text: `Il tuo codice di verifica è: ${codice}\n\nScade tra 10 minuti. Se non hai richiesto tu questo codice, ignora questa email.\n\nPlainer`,
    }),
  })
  if (!r.ok) {
    const corpo = await r.text().catch(() => '')
    throw new Error(`Resend ${r.status}: ${corpo.slice(0, 200)}`)
  }
}

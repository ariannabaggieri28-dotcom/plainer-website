'use client'

import { useState } from 'react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [consenso, setConsenso] = useState(false)
  const [stato, setStato] = useState<'fermo' | 'invio' | 'fatto' | 'errore'>('fermo')
  const [messaggio, setMessaggio] = useState('')

  async function invia(e: React.FormEvent) {
    e.preventDefault()
    setStato('invio')
    let fonte: string | undefined
    try {
      fonte = sessionStorage.getItem('plainer_ref') || undefined
    } catch {
      /* storage negato: si perde la fonte, non l'iscrizione */
    }
    try {
      const r = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consenso_marketing: consenso, fonte }),
      })
      const corpo = await r.json().catch(() => ({}))
      if (r.ok) {
        setStato('fatto')
      } else {
        setStato('errore')
        setMessaggio(corpo.errore || 'Qualcosa è andato storto, riprova.')
      }
    } catch {
      setStato('errore')
      setMessaggio('Connessione fallita, riprova.')
    }
  }

  if (stato === 'fatto') {
    return (
      <div className="scheda">
        <p className="esito-ok" style={{ marginTop: 0 }}>
          Ci sei. Ti avvisiamo noi quando apre.
        </p>
      </div>
    )
  }

  return (
    <form className="scheda" onSubmit={invia}>
      <strong style={{ color: 'var(--ink)' }}>Avvisami quando apre</strong>
      <div className="campo">
        <input
          type="email"
          required
          placeholder="La tua email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="La tua email"
        />
        <button className="bottone" disabled={stato === 'invio'}>
          {stato === 'invio' ? 'Un attimo…' : 'Avvisami'}
        </button>
      </div>
      <label className="consenso">
        <input type="checkbox" checked={consenso} onChange={(e) => setConsenso(e.target.checked)} />
        <span>
          Voglio ricevere anche aggiornamenti su Plainer (facoltativo). Senza spunta ti scriviamo
          solo quando il servizio apre.
        </span>
      </label>
      {stato === 'errore' && <p className="esito-errore">{messaggio}</p>}
    </form>
  )
}

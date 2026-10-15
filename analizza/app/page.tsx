import WaitlistForm from './waitlist-form'

/**
 * Pagina d'attesa: il flusso vero (carica -> email -> analisi -> risultato)
 * arriva con le sessioni di build in docs/. Intanto la pagina raccoglie la
 * waiting list, come da richiesta, con la stessa estetica del mockup.
 */
export default function Pagina() {
  return (
    <main className="contenitore">
      <span className="etichetta">In arrivo</span>
      <h1>Analizza il tuo preventivo</h1>
      <p className="sotto">
        Carichi il preventivo della ristrutturazione, Plainer lo legge voce per voce: ti dice cosa
        manca, cosa &egrave; scritto in modo vago e come si colloca rispetto ai prezzi reali della
        tua provincia. Una prova gratuita per ogni email.
      </p>
      <WaitlistForm />
      <p className="nota" style={{ marginTop: 28 }}>
        Come trattiamo i tuoi dati: <a href="/privacy">informativa privacy</a>.
      </p>
    </main>
  )
}

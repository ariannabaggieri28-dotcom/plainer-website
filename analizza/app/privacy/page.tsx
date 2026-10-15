import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Informativa privacy — Analizza il tuo preventivo',
  description: 'Come trattiamo i dati di chi usa Analizza il tuo preventivo.',
}

/**
 * Bozza completa, versione 2026-10. Scritta sulle decisioni di progetto
 * (fascicolo personale 7 giorni, estratto anonimo, OTP senza marketing).
 * Da far rivedere a un legale prima dell'apertura al pubblico.
 */
export default function Privacy() {
  return (
    <main className="contenitore">
      <h1>Informativa privacy</h1>
      <p className="nota">Versione 2026-10 &middot; Titolare: Plainer</p>

      <section className="scheda">
        <h2>Cosa raccogliamo e perch&eacute;</h2>
        <p>
          <strong>La tua email.</strong> Serve solo ad autenticarti con un codice usa-e-getta, a
          impedire abusi del servizio gratuito e, se ti iscrivi alla lista d&rsquo;attesa, ad
          avvisarti quando il servizio apre. Non la cediamo a nessuno e non la usiamo per
          marketing senza il tuo consenso esplicito.
        </p>
        <p>
          <strong>Il file del preventivo e la provincia che dichiari.</strong> Servono a produrre
          l&rsquo;analisi che ti mostriamo (art. 6.1.b GDPR &mdash; esecuzione del servizio che
          richiedi).
        </p>
      </section>

      <section className="scheda">
        <h2>Quanto li teniamo</h2>
        <p>
          Il file che carichi viene <strong>cancellato entro 7 giorni</strong>. Entro lo stesso
          termine puoi chiederne la cancellazione immediata dal risultato
          (&ldquo;Cancellalo ora&rdquo;): spariscono il file e tutti i dati estratti collegabili a
          te.
        </p>
        <p>
          Dalle voci del preventivo ricaviamo un <strong>estratto anonimo</strong> (categoria di
          lavorazione, importo, unit&agrave; di misura, provincia, mese): prima di salvarlo
          rimuoviamo nomi, indirizzi, contatti e ogni riferimento personale, e dopo 7 giorni
          recidiamo anche il collegamento tecnico con la tua analisi. Questo estratto serve a
          costruire i prezzi di riferimento che rendono utile il servizio per tutti (art. 6.1.f
          GDPR &mdash; legittimo interesse). Non &egrave; pi&ugrave; riconducibile a te.
        </p>
      </section>

      <section className="scheda">
        <h2>Come funziona l&rsquo;analisi</h2>
        <p>
          L&rsquo;analisi &egrave; prodotta da un sistema di intelligenza artificiale (modelli
          Claude di Anthropic): te lo diciamo qui e nel risultato, come richiede l&rsquo;art. 50
          del Regolamento europeo sull&rsquo;IA. Il risultato &egrave; un supporto informativo, non
          una perizia tecnica n&eacute; un parere legale. I dati inviati al fornitore del modello
          non vengono usati per addestrare i suoi sistemi.
        </p>
      </section>

      <section className="scheda">
        <h2>Dove stanno i dati</h2>
        <p>
          I dati sono conservati su Supabase (datacenter nell&rsquo;Unione Europea) e
          l&rsquo;applicazione gira su Vercel. L&rsquo;email con il codice di verifica &egrave;
          inviata tramite Resend. Il file del preventivo sta in uno spazio privato, accessibile
          solo ai nostri sistemi.
        </p>
      </section>

      <section className="scheda">
        <h2>I tuoi diritti</h2>
        <p>
          Puoi chiedere accesso, rettifica, cancellazione, limitazione e opposizione scrivendo a{' '}
          <a href="mailto:privacy@plainer.it">privacy@plainer.it</a>. Puoi sempre fare reclamo al
          Garante per la protezione dei dati personali.
        </p>
      </section>

      <p className="nota">
        <a href="/">&larr; Torna all&rsquo;analisi</a>
      </p>
    </main>
  )
}

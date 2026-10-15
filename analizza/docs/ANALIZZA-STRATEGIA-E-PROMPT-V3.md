# "Analizza il tuo preventivo" — strategia e prompt, versione decisa

> Sostituisce la v2. Decisioni recepite: il preventivo serve ad affinare
> l'AI e lo si dice; provincia dichiarata dall'utente; fonti prezzi 1+2,
> niente scraping; email solo per autenticare (nessun invio del risultato);
> Resend nel tetto gratuito; consensi al minimo che il GDPR consente;
> survey in coda al flusso; scrittura col modello più preciso, estrazione
> Sonnet se i test la promuovono.

---

## 1. Impianto dati (aggiornato)

**Un solo flusso, due destini.** Ogni analisi produce:

- **Record personale** — email verificata, provincia, consensi (versione +
  timestamp), esito, SHA-256 del file. Il file muore dopo 7 giorni (cron);
  email+esito+provincia restano: sono il limite "una per email" e la tua
  lista contatti.
- **Estratto per l'AI** — le voci (testo ripulito dalle PII, categoria,
  importo, unità, quantità), tipo lavoro, provincia, mese, hash pseudonimo
  dell'impresa. Nasce **pseudonimo** (legato all'analisi), e al settimo
  giorno il cron **taglia il legame**: da lì è anonimo e permanente.
  Se l'utente preme "Cancellalo ora" entro i 7 giorni, muore anche lui.

Questo "legame che si taglia a J+7" è ciò che rende vere entrambe le frasi
dell'informativa: *"il tuo preventivo serve ad affinare l'AI di Plainer, in
forma anonimizzata"* e *"il file si cancella dopo 7 giorni"*.

## 2. Consensi — il minimo che regge (da far validare, non sono un parere legale)

| Trattamento | Base giuridica | Casella? |
|---|---|---|
| Analizzare il file e mostrare il risultato | esecuzione del servizio richiesto (art. 6.1.b) | No — basta l'informativa |
| Conservare l'estratto anonimizzato per affinare l'AI | legittimo interesse (art. 6.1.f), dichiarato in informativa, con "Cancellalo ora" nei 7 giorni come opposizione | No, se l'anonimizzazione è reale |
| Email "Avvisami quando esce Plainer" | consenso (marketing) | **Sì, facoltativa** |
| AI Act art. 50 | trasparenza: "analisi fatta da un'AI" in prima schermata e sul risultato | No — è un avviso, non un consenso |

Quindi in schermata 02: **una casella obbligatoria** (presa visione
dell'informativa, che dice chiaro l'uso per affinare l'AI) e **una
facoltativa** (waitlist). Fine. Meno attrito, e difendibile — a patto che
l'anonimizzazione (PII via, nomi via, legame tagliato) sia fatta sul serio.
Il testo dell'informativa resta "da far validare prima di pubblicare"
(già previsto in Sessione 5).

## 3. Email: solo autenticazione

- OTP a 6 cifre via Resend per verificare l'email → regge il limite
  "1 analisi per email, per sempre". **Nessun'altra email**: niente invio
  del risultato, niente follow-up.
- Il risultato vive solo a `/risultato/[id]` con token non indovinabile,
  legato al cookie della sessione verificata. In pagina: "Salva questo
  link: è l'unico modo per rivedere l'analisi."
- Conto Resend: ~1,1–1,3 email per analisi (OTP + qualche rinvio). Col
  tetto gratuito di 100/giorno, `DAILY_ANALYSIS_CAP=50` ci sta con margine.

## 4. Modelli e costi (decisi)

- `MODEL_WRITE = claude-opus-5-5` — la scrittura è ciò che l'utente legge e
  inoltra all'impresa: il modello più preciso disponibile.
- `MODEL_EXTRACT = claude-sonnet-5-5` — promossa definitivamente se, sui
  5 preventivi veri della Sessione 3, l'estrazione è impeccabile
  (nessuna voce inventata, importi giusti). Altrimenti si sale a Opus
  anche lì e si riparla di costi.
- PDF con layer di testo: estrazione locale gratis (`unpdf`), a Claude va
  solo testo. Foto/scansioni: pagine come immagini (Claude è l'OCR).
- `cache_control` su prompt di sistema + dizionario; max_tokens e timeout.
- **Costo risultante: ~0,07 $/analisi** (Sonnet estrae ~0,04 + Opus scrive
  ~0,03). Col tetto a 50/giorno: ≤ 3,5 $/giorno, ~100 $/mese a pieno
  regime. I job notturni (Sessione 7) in Batch API: −50%.

## 5. Fonti prezzi: 1 + 2

1. **Preventivi raccolti qui** (estratto anonimo).
2. **Prezzari regionali pubblici** (Lombardia per prima: Excel gratuito
   annuale; poi Piemonte, Toscana…).

Niente scraping: Apify resta nel cassetto per quando servirà una raccolta
mirata dal web. Il confronto "+X% sulla zona" si accende per (categoria,
provincia) solo con **≥ 20 campioni** (`BENCHMARK_MIN_SAMPLES=20`); fino ad
allora l'analisi non giudica i prezzi.

## 6. Survey in coda

La pagina risultato chiude con l'invito alla survey. Il link è
`https://www.plainer.it/survey?ref=analizza` — `/survey` esiste già sul
sito (è la home con la modale aperta); il sito ora registra anche la
`fonte` di chi risponde, così vedi quanti arrivano da qui.

## 7. Sicurezza (invariata dalla v2, tutta dentro le patch)

Magic bytes, `sharp` su immagini (EXIF/GPS via), HEIC convertito, PDF
cifrati/JS rifiutati, signed URL 60s, SHA-256 anti-doppione, service key
solo server, RLS deny-all, kill switch `ANALYSIS_ENABLED`, CSP severa,
niente UI admin (viste SQL + export locale), log senza contenuti, testo del
preventivo trattato come dato e mai come istruzione.

---
---

# PATCH alle sessioni del mockup

## Contesto comune — aggiungere in fondo

```
Dati: ogni analisi produce un record personale (email verificata, provincia,
consensi con versione e timestamp, esito, sha256 del file — il file si
cancella dopo 7 giorni) e un estratto per l'AI (voci ripulite dalle PII,
categoria, importo, unita, quantita, tipo lavoro, provincia, mese, hash
dell'impresa). L'estratto nasce legato all'analisi e un cron al settimo
giorno taglia il legame (droppa analysis_id): da li e anonimo e permanente.
"Cancellalo ora" entro i 7 giorni elimina file, record e estratto.
La provincia la dichiara l'utente nel flusso; mai dedotta dall'IP.
Nessuna email oltre all'OTP: il risultato si vede solo in pagina.
```

## Sessione 1 — aggiungere

```
6. Nel flusso di caricamento: campo obbligatorio "In che provincia si fa il
   lavoro?" (select 107 province + "Estero"), sottotitolo "I prezzi
   cambiano molto da zona a zona: ci serve per leggere meglio il tuo
   preventivo." CAP facoltativo.
7. Nella schermata risultato (04), dopo la card Instagram, una card survey:
   titolo "Stai per ristrutturare davvero?", testo "Raccontacelo in 2
   minuti: le risposte decidono cosa costruiamo per primo.", bottone nero
   "Fai la survey" verso https://www.plainer.it/survey?ref=analizza
   (target _blank). Stile del design system, niente iframe.
```

## Sessione 2 — modifiche

```
Consensi (schermata 02): DUE caselle, non tre.
- Obbligatoria: "Ho letto l'informativa privacy" con link. L'informativa
  dice in chiaro che il preventivo viene analizzato da un'AI e usato, in
  forma anonimizzata, per affinare l'AI di Plainer, e che il file si
  cancella dopo 7 giorni.
- Facoltativa: "Avvisami quando esce Plainer" (consenso marketing separato,
  con data e versione).
Niente altre caselle: l'uso per affinare l'AI poggia sull'informativa (base:
legittimo interesse su dato anonimizzato), non su un consenso.

Email: Resend serve SOLO per il codice OTP. Nessuna email col risultato,
nessun altro invio. Dimensiona i limiti per restare nel piano gratuito di
Resend (100/giorno): DAILY_ANALYSIS_CAP=50 di default.

Upload, in piu rispetto al testo originale:
- tipo file dai magic bytes (file-type), mai dall'estensione;
- immagini ricodificate con sharp (EXIF e GPS rimossi), HEIC convertito
  server-side (heic-convert);
- PDF cifrati o con JavaScript/XFA rifiutati (pdf-lib);
- sha256 del file: stesso hash + stessa email = si riusa l'analisi gia
  fatta, nessuna nuova chiamata AI;
- signed URL di lettura TTL 60 secondi, solo lato server.

Tabella analyses, colonne in piu: provincia (TEXT), cap (TEXT null),
informativa_versione (TEXT), informativa_at (TIMESTAMPTZ),
file_sha256 (TEXT; indice unico con email normalizzata).
Il risultato e raggiungibile solo con token non indovinabile nel percorso
e cookie della sessione verificata; in pagina l'avviso "Salva questo link".

Env in piu: ANALYSIS_ENABLED (kill switch), MODEL_EXTRACT, MODEL_WRITE.
```

## Sessione 3 — modifiche

```
Pipeline, punto 1 sostituito:
1. Estrazione a due vie: se il PDF ha un layer di testo (unpdf; >200
   caratteri utili), a Claude va SOLO il testo; altrimenti le pagine come
   immagini. Modello: MODEL_EXTRACT (default claude-sonnet-5-5).
   cache_control sul prompt di sistema e sul dizionario (stabili),
   max_tokens limitato, timeout.
   Ogni voce estratta porta anche: categoria da tassonomia fissa
   (tassonomia-voci.json: demolizioni, impianto_idraulico, impianto_elettrico,
   massetti_sottofondi, rivestimenti_posa, sanitari_rubinetteria, serramenti,
   pittura, opere_murarie, smaltimento, pratiche, altro) e il nome
   dell'impresa come campo separato.
Punto 3: la scrittura usa MODEL_WRITE (default claude-opus-5-5).
Punto 4 cambiato: salva il risultato strutturato; NIENTE email col
risultato. La schermata 03 fa il polling finche il job non chiude.

Dopo i controlli, SEMPRE (non c'e consenso dedicato: regge l'informativa):
popola quote_items con le voci passate dal filtro PII — porta in TypeScript
i pattern di plainer-knowledge-ops/backend/app/services/pii_detector.py
(CF, IBAN, telefoni, email) e aggiungi mascheramento dei nomi propri.
impresa_hash = HMAC-SHA256(nome impresa normalizzato, chiave da env).
quote_items: id, analysis_id (nullable!), created_month (YYYY-MM),
provincia, cap_prefisso (2 cifre, null), tipo_lavoro, categoria,
testo_voce_pulito, importo, unita, quantita, impresa_hash, fonte.

I 5 preventivi di prova decidono MODEL_EXTRACT: se Sonnet non inventa voci
e prende bene gli importi anche dalle foto, resta; altrimenti sali a
claude-opus-5-5 e segnala il nuovo costo per analisi.
```

## Sessione 5 — modifiche

```
2. (sostituisce il testo sull'addestramento) L'informativa dice: il
   preventivo e analizzato da un'AI; in forma anonimizzata serve ad
   affinare l'AI di Plainer; il file si cancella dopo 7 giorni; email,
   esito e provincia restano finche non chiedi la cancellazione; l'elenco
   dei responsabili (Vercel, Supabase, Resend, Anthropic) e che i dati
   mandati all'API Anthropic non vengono usati da Anthropic per addestrare
   i propri modelli. Testo da far validare prima di pubblicare.
3. (aggiunta al cron) Il job dei 7 giorni, oltre a cancellare file e testo
   estratto, mette analysis_id = NULL su quote_items: e il taglio del
   legame che rende l'estratto anonimo. "Cancellalo ora" entro i 7 giorni
   elimina anche le righe quote_items dell'analisi.
6. Pagina /termini minima: uso personale, non e consulenza tecnica o
   legale, una analisi per persona, facolta di sospendere il servizio.
7. CSP severa (default-src 'self' + host Turnstile), HSTS, X-Frame-Options
   DENY; in CI un grep che nel bundle client non compaiano sk-,
   service_role, re_.
```

## Sessione 6 — Il tuo pannello dati (nuova, invariata dalla v2)

```
Niente interfaccia admin: viste SQL e un export, superficie minima.
1. Viste Postgres (in migrazione):
   - v_contatti: email, provincia, consensi con date, esito, created_at;
   - v_dataset: quote_items per (categoria, provincia, mese): n, min, p25,
     mediana, p75, max;
   - v_funnel: per giorno e sorgente (?ref=): upload, OTP inviati,
     verificati, analisi completate.
2. `npm run export`: scarica le viste in CSV con la service key da env
   (solo locale, mai deployato).
3. README: come collegarsi in sola lettura da Supabase Studio.
Verifica: le viste non espongono mai il testo integrale del preventivo ne
il nome dell'impresa in chiaro.
```

## Sessione 7 — Benchmark prezzi e aggancio alla KB (nuova)

```
Job, mai nel percorso utente.
1. Tabella benchmark_prezzi: categoria, unita, provincia (o 'IT'), p25,
   p50, p75, n_campioni, fonte ('analizza'|'prezzario_<regione>'), periodo
   (YYYY-MM), updated_at.
2. Cron notturno che ricalcola benchmark_prezzi da quote_items; le
   categorizzazioni incerte (categoria 'altro') si ricontrollano in blocco
   con la Batch API (claude-haiku-5-5, costa la meta).
3. Ingestione prezzari pubblici: script per gli Excel dei prezzari
   regionali (prima la Lombardia), mappati sulla tassonomia, fonte
   dedicata. NIENTE scraping di portali.
4. Il confronto di zona nell'analisi resta spento finche n_campioni < 20
   per (categoria, provincia). Env BENCHMARK_MIN_SAMPLES=20.
5. Dietro flag: travaso settimanale di benchmark_prezzi verso il backend
   plainer-knowledge-ops via endpoint autenticato. L'app pubblica non
   dipende mai dalla KB a runtime.
Verifica: percentili giusti su dati finti noti; sotto soglia il confronto
non si accende mai.
```

# Analizza il tuo preventivo

Carichi un preventivo di ristrutturazione, Plainer lo legge voce per voce:
segnala cosa manca, cosa è scritto in modo vago, e lo confronta con i prezzi
reali della provincia. Una prova gratuita per email. La raccolta dei preventivi
(anonimizzati) è la feature strategica: alimenta i benchmark e affina l'AI.

**Stato: fondamenta.** Database, bucket, anonimizzazione, waitlist e OTP sono
pronti e funzionanti; la pipeline di analisi (upload → estrazione → report) va
costruita seguendo `docs/ANALIZZA-STRATEGIA-E-PROMPT-V3.md` (sessioni 1–7).

## Architettura in breve

- **Next.js (App Router, TS)** su Vercel, root di questo progetto: `analizza/`.
- **Supabase** progetto `plainer` (`fxhspbatfipellryixjy`), schema dedicato
  `analizza` — RLS deny-all e nessun privilegio ad `anon`/`authenticated`:
  si passa solo dalle route server con la service key. Lo schema è esposto a
  PostgREST via `alter role authenticator set pgrst.db_schemas` (serve a
  supabase-js); se dal dashboard si salva Settings → API, riaggiungere
  `analizza` tra gli "Exposed schemas". Bucket privato `analizza-preventivi`.
- **Due livelli di dati**: il fascicolo personale (`analyses`, con email,
  file cancellato entro 7 giorni) e l'estratto per l'AI (`quote_items`,
  ripulito dai dati personali alla nascita, scollegato dalla persona al
  giorno 7 da un job `pg_cron` già attivo: `analizza-anonimizza-7gg`).
- **AI**: estrazione con `MODEL_EXTRACT` (Sonnet, da validare su preventivi
  veri), report con `MODEL_WRITE` (Opus). Prompt di sistema e dizionario in
  cache (`cache_control`). Il testo del preventivo è sempre un dato, mai
  un'istruzione.
- **Email**: solo il codice OTP via Resend (tetto gratuito). Nessuna mail di
  risultato, nessun marketing senza consenso.

## Cosa funziona già

| Pezzo | Dove |
| --- | --- |
| Schema DB completo (6 tabelle, 3 viste, indici, RLS) | `supabase/migrations/` — già applicate |
| Job notturno di anonimizzazione a 7 giorni | `pg_cron`, 03:15 UTC |
| Bucket privato 15 MB, MIME ristretti | `analizza-preventivi` |
| Waitlist con consenso e provenienza `?ref=` | `app/api/waitlist` + form in pagina |
| OTP: invio e verifica, hash + pepper, rate limit | `app/api/otp` |
| Kill switch analisi (`ANALYSIS_ENABLED`) | `app/api/analisi` |
| Filtro PII (da plainer-knowledge-ops) | `lib/pii.ts` |
| Tassonomia 12 categorie + dizionario voci vaghe | `lib/tassonomia.ts` |
| Informativa privacy (bozza v. 2026-10) | `app/privacy` |

## Chiavi da configurare (Vercel → Environment Variables)

Vedi `.env.example`. **Mancano e vanno create a mano:**

- `ANTHROPIC_API_KEY` — console.anthropic.com
- `RESEND_API_KEY` — resend.com (va verificato il dominio `plainer.it` per il mittente)
- `SUPABASE_SERVICE_ROLE_KEY` — dashboard Supabase → Settings → API
- `OTP_PEPPER` e `RATE_LIMIT_PEPPER` — due stringhe casuali (`openssl rand -hex 32`)

## Sviluppo

```bash
cd analizza
npm install
cp .env.example .env.local   # e riempi le chiavi
npm run dev
```

## Da fare (sessioni di build, in ordine)

1. Flusso UI dai mockup in `design/` (Main → Caricato → Email → Analisi → Risultato → Limite).
2. Upload sicuro: magic bytes (`file-type`), re-encode immagini (`sharp`, strip EXIF/GPS), rifiuto PDF cifrati/JS/XFA (`pdf-lib`), sha256 dedupe.
3. Pipeline: testo PDF con `unpdf`, foto via Claude vision, estrazione → `quote_items` (dopo `mascheraPii`), benchmark, report.
4. Cron Vercel: cancellazione fisica dei file a 7 giorni (il DB si anonimizza da solo).
5. Survey a fine analisi + "Cancellalo ora".
6. Pannello dati (viste `v_contatti`, `v_dataset`, `v_funnel`).
7. Benchmark da prezzari regionali pubblici + ponte settimanale con la KB.

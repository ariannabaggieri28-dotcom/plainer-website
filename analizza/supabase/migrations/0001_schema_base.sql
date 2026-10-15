-- GIA' APPLICATA al progetto Supabase `plainer` (fxhspbatfipellryixjy)
-- il 2026-10-15 come `analizza_schema_base`. Qui per documentazione e
-- per ricostruire l'ambiente da zero.

-- Analizza il tuo preventivo — schema dedicato, isolato da public.
-- Due livelli di dati: il fascicolo personale (analyses, con email) e
-- l'estratto per l'AI (quote_items, pseudonimo alla nascita, anonimo al giorno 7).

create schema if not exists analizza;

-- Lo schema non va mai esposto via PostgREST: niente grant ad anon/authenticated.
revoke all on schema analizza from anon, authenticated;

-- ── OTP: autenticazione email, nessuna mail di risultato ──────────────
create table analizza.email_verifications (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  otp_hash text not null,            -- sha256(otp + pepper), mai l'OTP in chiaro
  expires_at timestamptz not null,
  attempts int not null default 0,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);
create index idx_ev_email on analizza.email_verifications (email, created_at desc);

-- ── Fascicolo personale: un'analisi per utente (base giuridica: art. 6.1.b) ──
create table analizza.analyses (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  provincia text,                    -- sigla, dichiarata dall'utente
  cap_prefisso text,                 -- prime 3 cifre, opzionale
  tipo_lavoro text,
  stato text not null default 'creata'
    check (stato in ('creata','caricata','in_analisi','completata','fallita','cancellata')),
  file_path text,                    -- percorso nel bucket privato; null dopo la cancellazione
  file_sha256 text,                  -- dedupe: stesso file + stessa email = stessa analisi
  file_mime text,
  file_size_bytes int,
  informativa_versione text,         -- versione privacy accettata
  informativa_at timestamptz,
  esito jsonb,                       -- il report mostrato all'utente
  modello_estrazione text,
  modello_scrittura text,
  token_input int,
  token_output int,
  costo_stimato_usd numeric(8,4),
  errore text,
  fonte text not null default 'analizza',  -- provenienza (?ref=)
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  file_deleted_at timestamptz,       -- file cancellato dal bucket (giorno 7 o "Cancellalo ora")
  anonimizzato_at timestamptz        -- legame con quote_items reciso (giorno 7)
);
create index idx_an_email on analizza.analyses (email, created_at desc);
create index idx_an_stato on analizza.analyses (stato, created_at desc);
create unique index idx_an_dedupe on analizza.analyses (email, file_sha256)
  where file_sha256 is not null and stato <> 'cancellata';

-- ── Estratto per l'AI: voci ripulite dai dati personali (art. 6.1.f) ──
-- analysis_id nasce valorizzato e viene azzerato al giorno 7: da lì il dato è anonimo.
create table analizza.quote_items (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid references analizza.analyses(id) on delete set null,
  created_month date not null,       -- mese, mai il giorno
  provincia text,
  cap_prefisso text,
  tipo_lavoro text,
  categoria text not null,           -- tassonomia fissa a 12 categorie
  testo_voce_pulito text not null,   -- passato dal filtro PII prima dell'insert
  importo numeric(12,2),
  unita text,
  quantita numeric(12,2),
  impresa_hash text,                 -- HMAC dell'impresa emittente, mai il nome
  fonte text not null default 'utente'
    check (fonte in ('utente','prezzario','kb')),
  created_at timestamptz not null default now()
);
create index idx_qi_cat on analizza.quote_items (categoria, provincia, created_month);
create index idx_qi_analysis on analizza.quote_items (analysis_id) where analysis_id is not null;

-- ── Benchmark prezzi: aggregati che alimentano il confronto ──────────
create table analizza.benchmark_prezzi (
  id uuid primary key default gen_random_uuid(),
  categoria text not null,
  unita text not null,
  provincia text not null,
  p25 numeric(12,2),
  p50 numeric(12,2),
  p75 numeric(12,2),
  n_campioni int not null default 0,
  fonte text not null default 'raccolta'
    check (fonte in ('raccolta','prezzario','kb')),
  periodo text not null,             -- es. '2026-H2'
  updated_at timestamptz not null default now(),
  unique (categoria, unita, provincia, fonte, periodo)
);

-- ── Waiting list per l'uscita dell'app (consenso marketing esplicito) ──
create table analizza.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  consenso_marketing boolean not null default false,
  informativa_versione text,
  fonte text not null default 'analizza',
  created_at timestamptz not null default now()
);

-- ── Rate limiting: eventi grezzi, il conteggio lo fa l'API ───────────
create table analizza.rate_events (
  id bigint generated always as identity primary key,
  chiave text not null,              -- 'email:<hash>' oppure 'ip:<hash>'
  azione text not null,              -- 'otp','upload','analisi'
  created_at timestamptz not null default now()
);
create index idx_re_chiave on analizza.rate_events (chiave, azione, created_at desc);

-- ── RLS deny-all: si passa solo dalla service key, lato server ────────
alter table analizza.email_verifications enable row level security;
alter table analizza.analyses enable row level security;
alter table analizza.quote_items enable row level security;
alter table analizza.benchmark_prezzi enable row level security;
alter table analizza.waitlist enable row level security;
alter table analizza.rate_events enable row level security;

-- GIA' APPLICATA (2026-10-15).
-- Il service_role (usato solo dal server dell'app) deve poter lavorare nello
-- schema analizza. anon e authenticated restano senza alcun privilegio.
grant usage on schema analizza to service_role;
grant all on all tables in schema analizza to service_role;
grant all on all sequences in schema analizza to service_role;
alter default privileges in schema analizza grant all on tables to service_role;
alter default privileges in schema analizza grant all on sequences to service_role;

-- supabase-js passa da PostgREST, che serve solo gli schemi esposti.
-- Esporre analizza e' sicuro: anon non ha ne' usage ne' select, e RLS e' deny-all.
-- NB: se dal dashboard si salva Settings -> API, questo valore puo' essere
-- sovrascritto: in quel caso riaggiungere 'analizza' tra gli Exposed schemas.
alter role authenticator set pgrst.db_schemas = 'public, graphql_public, analizza';
notify pgrst, 'reload config';

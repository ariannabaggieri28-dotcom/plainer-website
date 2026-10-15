-- GIA' APPLICATA (2026-10-15). Estensione pg_cron + job notturno alle 03:15 UTC
-- (jobname 'analizza-anonimizza-7gg') che chiama questa funzione.
-- La cancellazione fisica del file dal bucket la fa il cron dell'app,
-- che ha accesso alla Storage API.

create extension if not exists pg_cron;

-- Una sola istruzione con CTE modificanti: recide il legame estratto->persona
-- al giorno 7, marca le analisi, e fa pulizia di OTP scaduti e rate events vecchi.
create or replace function analizza.anonimizza_scadute()
returns void
language sql
security definer
set search_path = analizza, pg_temp
as 'with scadute as (
      select id from analizza.analyses
      where created_at < now() - interval ''7 days'' and anonimizzato_at is null
    ),
    sever as (
      update analizza.quote_items set analysis_id = null
      where analysis_id in (select id from scadute) returning 1
    ),
    pulisci_otp as (
      delete from analizza.email_verifications
      where expires_at < now() - interval ''1 day'' returning 1
    ),
    pulisci_rate as (
      delete from analizza.rate_events
      where created_at < now() - interval ''30 days'' returning 1
    )
    update analizza.analyses set anonimizzato_at = now()
    where id in (select id from scadute)';

revoke all on function analizza.anonimizza_scadute() from public, anon, authenticated;

select cron.schedule('analizza-anonimizza-7gg', '15 3 * * *', 'select analizza.anonimizza_scadute()');

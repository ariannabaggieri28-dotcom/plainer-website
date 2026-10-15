-- GIA' APPLICATA (2026-10-15, `analizza_viste_e_pannello`).
-- Viste di lettura per il pannello dati (si leggono con la service key o da SQL editor).

-- Contatti raccolti: chi ha fatto un'analisi e chi si e' messo in lista.
create view analizza.v_contatti as
select email,
       'analisi'::text as origine,
       provincia,
       fonte,
       false as consenso_marketing,
       min(created_at) as primo_contatto,
       count(*) as n_analisi
from analizza.analyses
where stato <> 'cancellata'
group by email, provincia, fonte
union all
select email, 'waitlist', null, fonte, consenso_marketing, created_at, 0
from analizza.waitlist;

-- Stato del dataset: quante voci per categoria/provincia e se bastano per il benchmark.
create view analizza.v_dataset as
select categoria,
       provincia,
       unita,
       count(*) as n_voci,
       percentile_cont(0.5) within group (order by importo) as mediana,
       min(created_month) as dal,
       max(created_month) as al
from analizza.quote_items
where importo is not null
group by categoria, provincia, unita;

-- Funnel giornaliero: create -> caricate -> completate, piu' iscrizioni waitlist.
create view analizza.v_funnel as
select d.giorno,
       coalesce(a.create_tot, 0) as analisi_create,
       coalesce(a.completate, 0) as analisi_completate,
       coalesce(a.fallite, 0) as analisi_fallite,
       coalesce(w.iscritti, 0) as waitlist_iscritti
from (
  select distinct date_trunc('day', created_at)::date as giorno
  from analizza.analyses
  union
  select distinct date_trunc('day', created_at)::date
  from analizza.waitlist
) d
left join (
  select date_trunc('day', created_at)::date as giorno,
         count(*) as create_tot,
         count(*) filter (where stato = 'completata') as completate,
         count(*) filter (where stato = 'fallita') as fallite
  from analizza.analyses
  group by 1
) a using (giorno)
left join (
  select date_trunc('day', created_at)::date as giorno, count(*) as iscritti
  from analizza.waitlist
  group by 1
) w using (giorno)
order by d.giorno desc;

-- GIA' APPLICATA (2026-10-15, `analizza_bucket`).
-- Bucket privato per i preventivi caricati. Accesso solo con service key,
-- URL firmati con TTL breve generati lato server. 15 MB a file.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'analizza-preventivi',
  'analizza-preventivi',
  false,
  15728640,
  array['application/pdf','image/jpeg','image/png','image/webp','image/heic','image/heif']
)
on conflict (id) do nothing;

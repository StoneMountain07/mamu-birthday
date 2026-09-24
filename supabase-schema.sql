create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('image', 'video', 'audio')),
  url text not null,
  created_at timestamptz not null default now()
);

alter table public.media enable row level security;

create policy "Public can view media"
  on public.media for select
  to anon, authenticated
  using (true);

create policy "Public can add media"
  on public.media for insert
  to anon, authenticated
  with check (true);

create policy "Public can remove media"
  on public.media for delete
  to anon, authenticated
  using (true);

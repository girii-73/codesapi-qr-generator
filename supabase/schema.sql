-- CodeSapiens QR — Database Schema
-- Run this in your Supabase project's SQL Editor

create table if not exists links (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  destination_url text not null,
  clicks integer not null default 0,
  created_at timestamptz not null default now()
);

-- Fast lookup by short code
create index if not exists idx_links_code on links (code);

-- Row Level Security (optional — enable if you want to restrict access)
-- alter table links enable row level security;
-- create policy "Allow anonymous inserts" on links for insert with check (true);
-- create policy "Allow anonymous selects" on links for select using (true);

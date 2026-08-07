-- Hedgar Construction CMS schema
-- Run in the Supabase SQL Editor (or via supabase db push).

-- Projects
create table if not exists public.projects (
  id text primary key,
  title text not null,
  category text not null,
  location text not null default '',
  year text not null default '',
  description text not null default '',
  image text not null default '',
  area text not null default '',
  duration text not null default '',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- Services
create table if not exists public.services (
  id text primary key,
  title text not null,
  description text not null default '',
  icon text not null default '',
  image text not null default '',
  features jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- Awards
create table if not exists public.awards (
  id text primary key,
  title text not null,
  organization text not null default '',
  year text not null default '',
  description text not null default '',
  category text not null default '',
  created_at timestamptz not null default now()
);

-- Blog posts
create table if not exists public.blog_posts (
  id text primary key,
  title text not null,
  excerpt text not null default '',
  image text not null default '',
  author text not null default '',
  date text not null default '',
  category text not null default '',
  read_time text not null default '',
  created_at timestamptz not null default now()
);

-- Team members
create table if not exists public.team_members (
  id text primary key,
  name text not null,
  role text not null default '',
  image text not null default '',
  bio text not null default '',
  created_at timestamptz not null default now()
);

-- Row Level Security: allow anonymous reads; all writes go through the
-- server-side service_role client, which bypasses RLS.
alter table public.projects enable row level security;
alter table public.services enable row level security;
alter table public.awards enable row level security;
alter table public.blog_posts enable row level security;
alter table public.team_members enable row level security;

drop policy if exists "public read projects" on public.projects;
create policy "public read projects" on public.projects
  for select using (true);

drop policy if exists "public read services" on public.services;
create policy "public read services" on public.services
  for select using (true);

drop policy if exists "public read awards" on public.awards;
create policy "public read awards" on public.awards
  for select using (true);

drop policy if exists "public read blog_posts" on public.blog_posts;
create policy "public read blog_posts" on public.blog_posts
  for select using (true);

drop policy if exists "public read team_members" on public.team_members;
create policy "public read team_members" on public.team_members
  for select using (true);

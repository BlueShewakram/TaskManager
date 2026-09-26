-- Capstone Task Manager — Supabase schema
-- Run this in Supabase Dashboard > SQL Editor > New Query > Run
-- Project: https://lofvsfjosxrgyffmnjwu.supabase.co

-- 1) Profiles (team members, 1 row per auth user)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default 'Member',
  role text not null default 'member' check (role in ('admin','member')),
  avatar_color text not null default '#6366f1',
  created_at timestamptz default now()
);

-- 2) Tasks
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  status text not null default 'todo' check (status in ('todo','in_progress','review','done')),
  priority text not null default 'medium' check (priority in ('low','medium','high','urgent')),
  due_date date,
  assigned_to uuid references public.profiles(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  completed_at timestamptz
);

-- 3) Comments (optional, for collaboration)
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  content text not null,
  created_at timestamptz default now()
);

-- 4) Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_color)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    (array['#6366f1','#ec4899','#10b981','#f59e0b','#8b5cf6','#06b6d4'])[floor(random()*6)+1]
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 5) Enable RLS (simple policy for capstone: any logged-in user can do everything)
alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.comments enable row level security;

drop policy if exists "authenticated all" on public.profiles;
create policy "authenticated all" on public.profiles
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated all" on public.tasks;
create policy "authenticated all" on public.tasks
  for all to authenticated using (true) with check (true);

drop policy if exists "authenticated all" on public.comments;
create policy "authenticated all" on public.comments
  for all to authenticated using (true) with check (true);

-- 6) Allow reading profiles (so assignee dropdown works)
drop policy if exists "public read profiles" on public.profiles;
create policy "public read profiles" on public.profiles
  for select using (true);

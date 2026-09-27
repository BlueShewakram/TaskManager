-- Username-only login setup — RUN ONCE in Supabase SQL Editor
-- Switches the app from email/password auth to simple usernames: blue, josh, kevin, ivan
-- (login is remembered in the browser via localStorage)

-- 1) Detach profiles from auth.users so we can seed the fixed team (no signup needed)
alter table public.profiles drop constraint if exists profiles_id_fkey;

-- 2) Add username column
alter table public.profiles add column if not exists username text unique;

-- 3) Allow anon (logged-out) access — required since there is no Supabase Auth session anymore
drop policy if exists "anon all" on public.profiles;
create policy "anon all" on public.profiles
  for all to anon using (true) with check (true);

drop policy if exists "anon all" on public.tasks;
create policy "anon all" on public.tasks
  for all to anon using (true) with check (true);

drop policy if exists "anon all" on public.comments;
create policy "anon all" on public.comments
  for all to anon using (true) with check (true);

-- 4) Seed the 4 fixed members (fixed IDs so tasks stay assigned)
insert into public.profiles (id, email, full_name, username, avatar_color) values
  ('00000000-0000-4000-8000-000000000001', 'blue@capstone.dev',  'Blue Shewakram',     'blue',  '#6366f1'),
  ('00000000-0000-4000-8000-000000000002', 'josh@capstone.dev',  'Josh Caleb Ababa',   'josh',  '#ec4899'),
  ('00000000-0000-4000-8000-000000000003', 'kevin@capstone.dev', 'Kevin Klien Cubol',  'kevin', '#10b981'),
  ('00000000-0000-4000-8000-000000000004', 'ivan@capstone.dev',  'Ivan Matthew Beltran','ivan', '#8b5cf6')
on conflict (id) do update set
  email = excluded.email,
  full_name = excluded.full_name,
  username = excluded.username,
  avatar_color = excluded.avatar_color;

-- 5) Seed all 13 tasks, all due Oct 14, 2026
delete from public.tasks;

insert into public.tasks (title, description, status, priority, due_date, assigned_to, created_by) values
  ('Train behavioral dataset', 'Collect, label, and train chicken behavioral dataset (eating, drinking, movement, resting). Split train/val, run training, save metrics.', 'in_progress', 'high', date '2026-10-14', '00000000-0000-4000-8000-000000000004', '00000000-0000-4000-8000-000000000001'),
  ('Train health classifier dataset', 'Prepare and train health classifier dataset. Verify labels, evaluate accuracy/precision/recall, export best model.', 'todo', 'high', date '2026-10-14', '00000000-0000-4000-8000-000000000004', '00000000-0000-4000-8000-000000000001'),
  ('Automatic run application for CPU', 'Auto-run on CPU: startup script, CPU-only inference, auto-load models on boot. Test on clean machine.', 'todo', 'urgent', date '2026-10-14', '00000000-0000-4000-8000-000000000004', '00000000-0000-4000-8000-000000000001'),

  ('Editing docs manuscript', 'Edit manuscript docs with Josh: formatting, grammar, figures, tables, references.', 'in_progress', 'high', date '2026-10-14', '00000000-0000-4000-8000-000000000003', '00000000-0000-4000-8000-000000000001'),
  ('Backend cleanup and connections', 'Fix backend connections, make all functions work together, remove dead code, test end-to-end.', 'todo', 'high', date '2026-10-14', '00000000-0000-4000-8000-000000000003', '00000000-0000-4000-8000-000000000001'),
  ('Clear up hardcoded values', 'Remove hardcoded numbers/paths/keys. Move to config/env, single source of truth. Retest.', 'todo', 'medium', date '2026-10-14', '00000000-0000-4000-8000-000000000003', '00000000-0000-4000-8000-000000000001'),
  ('Tweak Gemini AI calculations (RRL-based)', 'Tune Gemini AI thresholds from RRL for Healthy / Warning / Suspicious (Critical). Document formula + source, validate with samples.', 'in_progress', 'urgent', date '2026-10-14', '00000000-0000-4000-8000-000000000003', '00000000-0000-4000-8000-000000000001'),

  ('Manuscript co-editing (with Kevin)', 'Work with Kevin: divide chapters, merge edits, keep one updated master copy.', 'todo', 'high', date '2026-10-14', '00000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000001'),
  ('Monitor deadlines + school signatures', 'Track manuscript deadlines + required school signatures/forms, remind team, secure sign-offs early.', 'in_progress', 'urgent', date '2026-10-14', '00000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000001'),
  ('Build the chicken cage', 'Build physical chicken cage: materials, dimensions, camera/sensor mounts, ventilation. Photo-document.', 'in_progress', 'high', date '2026-10-14', '00000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000001'),
  ('Full manuscript audit (problem → limitations)', 'IMPORTANT: update manuscript and check Problem, Objectives, Features, Implementations, Results, Limitations. Flag gaps.', 'review', 'urgent', date '2026-10-14', '00000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000001'),

  ('Integration + deploy (Vercel + Supabase)', 'Integrate outputs, deploy on Vercel, verify Supabase, test Done flow.', 'in_progress', 'high', date '2026-10-14', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001'),
  ('Final review + defense prep', 'Final check of code, manuscript, demo. Prepare slides + demo script + Q&A.', 'todo', 'medium', date '2026-10-14', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001');

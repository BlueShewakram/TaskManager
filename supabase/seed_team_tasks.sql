-- Seed real team tasks (run AFTER all 4 members signed up)
-- Works with Supabase mode (not demo mode).
-- Matches profiles by full_name, so members must sign up with these exact names:
--   Blue Shewakram, Josh Caleb Ababa, Kevin Klien Cubol, Ivan Matthew Beltran

do $$
declare
  blue_id uuid; josh_id uuid; kevin_id uuid; ivan_id uuid;
begin
  select id into blue_id  from public.profiles where full_name = 'Blue Shewakram' limit 1;
  select id into josh_id  from public.profiles where full_name = 'Josh Caleb Ababa' limit 1;
  select id into kevin_id from public.profiles where full_name = 'Kevin Klien Cubol' limit 1;
  select id into ivan_id  from public.profiles where full_name = 'Ivan Matthew Beltran' limit 1;

  if blue_id is null or josh_id is null or kevin_id is null or ivan_id is null then
    raise notice 'Missing profiles. Found: blue=%, josh=%, kevin=%, ivan=%', blue_id, josh_id, kevin_id, ivan_id;
  end if;

  -- Clear old sample tasks (optional)
  -- delete from public.tasks;

  insert into public.tasks (title, description, status, priority, due_date, assigned_to, created_by) values
  ('Train behavioral dataset', 'Collect, label, and train chicken behavioral dataset (eating, drinking, movement, resting). Split train/val, run training, save metrics.', 'in_progress', 'high', date '2026-10-14', ivan_id, blue_id),
  ('Train health classifier dataset', 'Prepare and train health classifier dataset. Verify labels, evaluate accuracy/precision/recall, export best model.', 'todo', 'high', date '2026-10-14', ivan_id, blue_id),
  ('Automatic run application for CPU', 'Auto-run on CPU: startup script, CPU-only inference, auto-load models on boot. Test on clean machine.', 'todo', 'urgent', date '2026-10-14', ivan_id, blue_id),

  ('Editing docs manuscript', 'Edit manuscript docs with Josh: formatting, grammar, figures, tables, references.', 'in_progress', 'high', date '2026-10-14', kevin_id, blue_id),
  ('Backend cleanup and connections', 'Fix backend connections, make all functions work together, remove dead code, test end-to-end.', 'todo', 'high', date '2026-10-14', kevin_id, blue_id),
  ('Clear up hardcoded values', 'Remove hardcoded numbers/paths/keys. Move to config/env, single source of truth. Retest.', 'todo', 'medium', date '2026-10-14', kevin_id, blue_id),
  ('Tweak Gemini AI calculations (RRL-based)', 'Tune Gemini AI thresholds from RRL for Healthy / Warning / Suspicious (Critical). Document formula + source, validate with samples.', 'in_progress', 'urgent', date '2026-10-14', kevin_id, blue_id),

  ('Manuscript co-editing (with Kevin)', 'Work with Kevin: divide chapters, merge edits, keep one updated master copy.', 'todo', 'high', date '2026-10-14', josh_id, blue_id),
  ('Monitor deadlines + school signatures', 'Track manuscript deadlines + required school signatures/forms, remind team, secure sign-offs early.', 'in_progress', 'urgent', date '2026-10-14', josh_id, blue_id),
  ('Build the chicken cage', 'Build physical chicken cage: materials, dimensions, camera/sensor mounts, ventilation. Photo-document.', 'in_progress', 'high', date '2026-10-14', josh_id, blue_id),
  ('Full manuscript audit (problem → limitations)', 'IMPORTANT: update manuscript and check Problem, Objectives, Features, Implementations, Results, Limitations. Flag gaps.', 'review', 'urgent', date '2026-10-14', josh_id, blue_id),

  ('Integration + deploy (Vercel + Supabase)', 'Integrate outputs, deploy on Vercel, verify Supabase, test Done flow.', 'in_progress', 'high', date '2026-10-14', blue_id, blue_id),
  ('Final review + defense prep', 'Final check of code, manuscript, demo. Prepare slides + demo script + Q&A.', 'todo', 'medium', date '2026-10-14', blue_id, blue_id);
end $$;

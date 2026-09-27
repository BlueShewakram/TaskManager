// Demo fallback data so the app works instantly without Supabase.
// Once Supabase is connected + schema.sql is run, real DB is used instead.

export const DEMO_MEMBERS = [
  { id: 'member-blue', email: 'blue@capstone.dev', full_name: 'Blue Shewakram', role: 'admin', avatar_color: '#6366f1' },
  { id: 'member-josh', email: 'josh@capstone.dev', full_name: 'Josh Caleb Ababa', role: 'member', avatar_color: '#ec4899' },
  { id: 'member-kevin', email: 'kevin@capstone.dev', full_name: 'Kevin Klien Cubol', role: 'member', avatar_color: '#10b981' },
  { id: 'member-ivan', email: 'ivan@capstone.dev', full_name: 'Ivan Matthew Beltran', role: 'member', avatar_color: '#8b5cf6' },
]

// Capstone deadline: Oct 14, 2026 — all tasks due then
const DEADLINE = '2026-10-14'

export const DEMO_TASKS = [
  // ── Ivan Matthew Beltran — datasets + CPU autorun ──
  {
    id: 't-ivan-1',
    title: 'Train behavioral dataset',
    description: 'Collect, label, and train the chicken behavioral dataset (eating, drinking, movement, resting). Clean data, split train/val, run training, save metrics.',
    status: 'in_progress',
    priority: 'high',
    due_date: DEADLINE,
    assigned_to: 'member-ivan',
    created_by: 'member-blue',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  {
    id: 't-ivan-2',
    title: 'Train health classifier dataset',
    description: 'Prepare and train the health classifier dataset. Verify labels, run training, evaluate accuracy/precision/recall, export best model.',
    status: 'todo',
    priority: 'high',
    due_date: DEADLINE,
    assigned_to: 'member-ivan',
    created_by: 'member-blue',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  {
    id: 't-ivan-3',
    title: 'Automatic run application for CPU',
    description: 'Make the app auto-run on CPU: startup script, CPU-only inference mode, auto-load models on boot, no manual steps. Test on a clean machine.',
    status: 'todo',
    priority: 'urgent',
    due_date: DEADLINE,
    assigned_to: 'member-ivan',
    created_by: 'member-blue',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  // ── Kevin Klien Cubol — manuscript + backend + Gemini ──
  {
    id: 't-kevin-1',
    title: 'Editing docs manuscript',
    description: 'Edit the manuscript docs with Josh: formatting, grammar, figures, tables, references. Keep chapters consistent.',
    status: 'in_progress',
    priority: 'high',
    due_date: DEADLINE,
    assigned_to: 'member-kevin',
    created_by: 'member-blue',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  {
    id: 't-kevin-2',
    title: 'Backend cleanup and connections',
    description: 'Clean up backend: fix connections between modules, make all functions work together, remove dead code, test end-to-end flow.',
    status: 'todo',
    priority: 'high',
    due_date: DEADLINE,
    assigned_to: 'member-kevin',
    created_by: 'member-blue',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  {
    id: 't-kevin-3',
    title: 'Clear up hardcoded values',
    description: 'Remove all hardcoded numbers/paths/keys. Move to config/env file so functions share one source of truth. Retest after cleanup.',
    status: 'todo',
    priority: 'medium',
    due_date: DEADLINE,
    assigned_to: 'member-kevin',
    created_by: 'member-blue',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  {
    id: 't-kevin-4',
    title: 'Tweak Gemini AI calculations (RRL-based)',
    description: 'Tweak Gemini AI calculations based on RRL for chicken health categories: Healthy, Warning, Suspicious/Critical. Tune thresholds, document formula + RRL source, validate with sample data.',
    status: 'in_progress',
    priority: 'urgent',
    due_date: DEADLINE,
    assigned_to: 'member-kevin',
    created_by: 'member-blue',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  // ── Josh Caleb Ababa — manuscript + deadlines + cage ──
  {
    id: 't-josh-1',
    title: 'Manuscript co-editing (with Kevin)',
    description: 'Work together with Kevin on the manuscript: divide chapters, merge edits, keep one updated master copy.',
    status: 'todo',
    priority: 'high',
    due_date: DEADLINE,
    assigned_to: 'member-josh',
    created_by: 'member-blue',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  {
    id: 't-josh-2',
    title: 'Monitor deadlines + school signatures',
    description: 'Track all manuscript deadlines, list required school signatures/forms, remind the team, secure sign-offs early.',
    status: 'in_progress',
    priority: 'urgent',
    due_date: DEADLINE,
    assigned_to: 'member-josh',
    created_by: 'member-blue',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  {
    id: 't-josh-3',
    title: 'Build the chicken cage',
    description: 'Build the physical chicken cage: materials, dimensions, camera/sensor mounts, ventilation. Photo-document the build.',
    status: 'in_progress',
    priority: 'high',
    due_date: DEADLINE,
    assigned_to: 'member-josh',
    created_by: 'member-blue',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  {
    id: 't-josh-4',
    title: 'Full manuscript audit (problem → limitations)',
    description: 'IMPORTANT: update the manuscript and check everything — Problem, Objectives, Features, Implementations, Results, Limitations. Flag gaps and fix inconsistencies.',
    status: 'review',
    priority: 'urgent',
    due_date: DEADLINE,
    assigned_to: 'member-josh',
    created_by: 'member-blue',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  // ── Blue Shewakram — lead / integration ──
  {
    id: 't-blue-1',
    title: 'Integration + deploy (Vercel + Supabase)',
    description: 'Integrate all team outputs, deploy TaskFlow + capstone app on Vercel, verify Supabase connection, run schema.sql, test Done flow.',
    status: 'in_progress',
    priority: 'high',
    due_date: DEADLINE,
    assigned_to: 'member-blue',
    created_by: 'member-blue',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  {
    id: 't-blue-2',
    title: 'Final review + defense prep',
    description: 'Final check of code, manuscript, and demo. Prepare slides, demo script, and Q&A for defense.',
    status: 'todo',
    priority: 'medium',
    due_date: DEADLINE,
    assigned_to: 'member-blue',
    created_by: 'member-blue',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
]

const TASKS_KEY = 'capstone_tasks_v3'
const MEMBERS_KEY = 'capstone_members_v3'

export function loadDemoTasks() {
  try {
    const raw = localStorage.getItem(TASKS_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  localStorage.setItem(TASKS_KEY, JSON.stringify(DEMO_TASKS))
  return DEMO_TASKS
}

export function saveDemoTasks(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

export function loadDemoMembers() {
  try {
    const raw = localStorage.getItem(MEMBERS_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  localStorage.setItem(MEMBERS_KEY, JSON.stringify(DEMO_MEMBERS))
  return DEMO_MEMBERS
}

export function initials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

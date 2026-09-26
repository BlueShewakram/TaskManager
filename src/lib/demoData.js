// Demo fallback data so the app works instantly without Supabase.
// Once Supabase is connected + schema.sql is run, real DB is used instead.

export const DEMO_MEMBERS = [
  { id: 'demo-1', email: 'alex@capstone.dev', full_name: 'Alex Rivera', role: 'admin', avatar_color: '#6366f1' },
  { id: 'demo-2', email: 'mia@capstone.dev', full_name: 'Mia Chen', role: 'member', avatar_color: '#ec4899' },
  { id: 'demo-3', email: 'jordan@capstone.dev', full_name: 'Jordan Lee', role: 'member', avatar_color: '#10b981' },
  { id: 'demo-4', email: 'sam@capstone.dev', full_name: 'Sam Patel', role: 'member', avatar_color: '#f59e0b' },
]

export const DEMO_TASKS = [
  {
    id: 't-1',
    title: 'Design landing page mockup',
    description: 'Create Figma mockup for capstone homepage, hero + features + footer. Share link in Discord.',
    status: 'todo',
    priority: 'high',
    due_date: new Date(Date.now() + 2 * 864e5).toISOString().slice(0, 10),
    assigned_to: 'demo-2',
    created_by: 'demo-1',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  {
    id: 't-2',
    title: 'Set up Supabase tables',
    description: 'Run supabase/schema.sql in SQL Editor, enable Auth email provider, test insert.',
    status: 'in_progress',
    priority: 'urgent',
    due_date: new Date(Date.now() + 1 * 864e5).toISOString().slice(0, 10),
    assigned_to: 'demo-1',
    created_by: 'demo-1',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  {
    id: 't-3',
    title: 'Write project proposal draft',
    description: '2-page proposal: problem, solution, tech stack (React + Supabase + Vercel), milestones.',
    status: 'review',
    priority: 'medium',
    due_date: new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10),
    assigned_to: 'demo-3',
    created_by: 'demo-1',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  {
    id: 't-4',
    title: 'Deploy starter to Vercel',
    description: 'Connect GitHub repo, add VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY env vars, deploy.',
    status: 'done',
    priority: 'medium',
    due_date: new Date(Date.now() - 1 * 864e5).toISOString().slice(0, 10),
    assigned_to: 'demo-4',
    created_by: 'demo-1',
    created_at: new Date().toISOString(),
    completed_at: new Date().toISOString(),
  },
  {
    id: 't-5',
    title: 'User testing with 3 classmates',
    description: 'Ask 3 classmates to create + complete a task, note confusing parts.',
    status: 'todo',
    priority: 'low',
    due_date: new Date(Date.now() + 5 * 864e5).toISOString().slice(0, 10),
    assigned_to: 'demo-3',
    created_by: 'demo-1',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
  {
    id: 't-6',
    title: 'Fix mobile layout on Board',
    description: 'Kanban columns overflow on small screens, make horizontal scroll smooth.',
    status: 'in_progress',
    priority: 'high',
    due_date: new Date(Date.now() + 1 * 864e5).toISOString().slice(0, 10),
    assigned_to: 'demo-2',
    created_by: 'demo-1',
    created_at: new Date().toISOString(),
    completed_at: null,
  },
]

const TASKS_KEY = 'capstone_tasks_v1'
const MEMBERS_KEY = 'capstone_members_v1'

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

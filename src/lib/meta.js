export const STATUSES = [
  { id: 'todo', label: 'To Do', color: 'bg-slate-100 text-slate-700', dot: 'bg-slate-400' },
  { id: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  { id: 'review', label: 'Review', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  { id: 'done', label: 'Done', color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
]

export const PRIORITIES = [
  { id: 'low', label: 'Low', style: 'bg-slate-100 text-slate-600' },
  { id: 'medium', label: 'Medium', style: 'bg-sky-100 text-sky-700' },
  { id: 'high', label: 'High', style: 'bg-orange-100 text-orange-700' },
  { id: 'urgent', label: 'Urgent', style: 'bg-red-100 text-red-700' },
]

export const statusLabel = (s) => STATUSES.find((x) => x.id === s)?.label ?? s
export const priorityStyle = (p) => PRIORITIES.find((x) => x.id === p)?.style ?? 'bg-slate-100 text-slate-600'

export function isOverdue(task) {
  if (!task.due_date || task.status === 'done') return false
  return new Date(task.due_date) < new Date(new Date().toDateString())
}

export function formatDate(d) {
  if (!d) return 'No date'
  return new Date(d + (d.length === 10 ? 'T00:00:00' : '')).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })
}

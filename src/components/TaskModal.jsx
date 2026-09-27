import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { PROJECT_DEADLINE } from '../lib/meta'

const EMPTY = { title: '', description: '', status: 'todo', priority: 'medium', due_date: PROJECT_DEADLINE, assigned_to: '' }

export default function TaskModal({ open, initial, members, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) setForm(initial ? { ...EMPTY, ...initial, assigned_to: initial.assigned_to || '' } : EMPTY)
  }, [open, initial])

  if (!open) return null

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    setSaving(true)
    try {
      await onSave({
        title: form.title.trim(),
        description: form.description.trim(),
        status: form.status,
        priority: form.priority,
        due_date: form.due_date || null,
        assigned_to: form.assigned_to || null,
      })
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <form
        onSubmit={submit}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-auto"
      >
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-xl font-extrabold tracking-tight">{initial ? 'Edit task' : 'New task'}</h2>
          <button type="button" onClick={onClose} className="ml-auto p-2 rounded-xl hover:bg-slate-100 text-slate-500">
            <X size={18} />
          </button>
        </div>

        <label className="block text-sm font-semibold mb-1.5">Title *</label>
        <input
          autoFocus
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="e.g. Finish chapter 3 prototype"
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm mb-4"
        />

        <label className="block text-sm font-semibold mb-1.5">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          rows={3}
          placeholder="What needs to be done? Add links, notes…"
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm mb-4 resize-y"
        />

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Assign to</label>
            <select
              value={form.assigned_to}
              onChange={(e) => set('assigned_to', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
            >
              <option value="">Unassigned</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>{m.full_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Due date</label>
            <input
              type="date"
              value={form.due_date || ''}
              onChange={(e) => set('due_date', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Priority</label>
            <select value={form.priority} onChange={(e) => set('priority', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1.5">Status</label>
            <select value={form.status} onChange={(e) => set('status', e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white">
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2.5 mt-2">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button type="submit" disabled={saving || !form.title.trim()} className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold disabled:opacity-50 shadow-lg shadow-indigo-200">
            {saving ? 'Saving…' : initial ? 'Save changes' : 'Create task'}
          </button>
        </div>
      </form>
    </div>
  )
}

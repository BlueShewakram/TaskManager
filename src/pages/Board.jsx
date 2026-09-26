import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../lib/useTasks'
import { STATUSES } from '../lib/meta'
import Layout from '../components/Layout'
import TaskCard from '../components/TaskCard'
import TaskModal from '../components/TaskModal'

const NEXT = { todo: 'in_progress', in_progress: 'review', review: 'done', done: 'todo' }

export default function Board() {
  const { user, members } = useAuth()
  const { tasks, loading, createTask, updateTask, toggleDone, deleteTask } = useTasks(user)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [query, setQuery] = useState('')
  const [assignee, setAssignee] = useState('all')

  const memberById = useMemo(() => Object.fromEntries(members.map((m) => [m.id, m])), [members])

  const visible = tasks.filter((t) => {
    const q = !query || t.title.toLowerCase().includes(query.toLowerCase())
    const a = assignee === 'all' || t.assigned_to === assignee
    return q && a
  })

  const move = (task) => updateTask(task.id, { status: NEXT[task.status] })
  const save = async (input) => {
    if (editing) await updateTask(editing.id, input)
    else await createTask(input)
  }

  return (
    <Layout>
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Task Board</h1>
          <p className="text-sm text-slate-500 mt-1">Drag-free kanban — click <b>Move →</b> or <b>✓ Mark as Done</b>.</p>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true) }}
          className="ml-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-200">
          <Plus size={16} /> New Task
        </button>
      </div>

      <div className="flex flex-wrap gap-2.5 mb-5">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…"
            className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm w-52 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white" />
        </div>
        <select value={assignee} onChange={(e) => setAssignee(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white font-medium">
          <option value="all">All members</option>
          {members.map((m) => <option key={m.id} value={m.id}>{m.full_name}</option>)}
        </select>
      </div>

      {loading ? <p className="text-sm text-slate-500">Loading board…</p> : (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 items-start kanban-scroll">
          {STATUSES.map((s) => {
            const col = visible.filter((t) => t.status === s.id)
            return (
              <div key={s.id} className="bg-slate-100/80 rounded-2xl p-3 min-h-[200px]">
                <div className="flex items-center gap-2 px-1 mb-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                  <h3 className="font-extrabold text-sm">{s.label}</h3>
                  <span className="ml-auto text-xs font-bold bg-white border border-slate-200 px-2 py-0.5 rounded-full">{col.length}</span>
                </div>
                <div className="space-y-3">
                  {col.map((t) => (
                    <TaskCard key={t.id} task={t} member={memberById[t.assigned_to]}
                      onToggleDone={toggleDone} onMove={move}
                      onEdit={(x) => { setEditing(x); setModalOpen(true) }} onDelete={deleteTask} />
                  ))}
                  {col.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-6">No tasks here</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <TaskModal open={modalOpen} initial={editing} members={members} onClose={() => setModalOpen(false)} onSave={save} />
    </Layout>
  )
}

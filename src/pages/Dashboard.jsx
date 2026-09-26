import { useMemo, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../lib/useTasks'
import { isOverdue } from '../lib/meta'
import Layout from '../components/Layout'
import TaskCard from '../components/TaskCard'
import TaskModal from '../components/TaskModal'

export default function Dashboard() {
  const { user, members } = useAuth()
  const { tasks, loading, createTask, updateTask, toggleDone, deleteTask } = useTasks(user)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [query, setQuery] = useState('')

  const memberById = useMemo(() => Object.fromEntries(members.map((m) => [m.id, m])), [members])

  const stats = useMemo(() => {
    const total = tasks.length
    const done = tasks.filter((t) => t.status === 'done').length
    const inProg = tasks.filter((t) => t.status === 'in_progress').length
    const overdue = tasks.filter(isOverdue).length
    const pct = total ? Math.round((done / total) * 100) : 0
    return { total, done, inProg, overdue, pct }
  }, [tasks])

  const filtered = tasks.filter(
    (t) =>
      !query ||
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      (t.description || '').toLowerCase().includes(query.toLowerCase())
  )
  const recent = filtered.slice(0, 6)
  const myTasks = tasks.filter((t) => t.assigned_to === user?.id && t.status !== 'done').slice(0, 4)

  const openCreate = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (t) => { setEditing(t); setModalOpen(true) }
  const save = async (input) => {
    if (editing) await updateTask(editing.id, input)
    else await createTask(input)
  }

  return (
    <Layout>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Good day 👋</h1>
          <p className="text-sm text-slate-500 mt-1">Here's what's happening with your capstone team today.</p>
        </div>
        <button onClick={openCreate} className="ml-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-200">
          <Plus size={16} /> New Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        {[
          { label: 'Total tasks', value: stats.total, sub: `${stats.done} completed`, bg: 'from-indigo-500 to-violet-500' },
          { label: 'In progress', value: stats.inProg, sub: 'actively being worked', bg: 'from-sky-500 to-blue-500' },
          { label: 'Overdue', value: stats.overdue, sub: 'needs attention', bg: 'from-rose-500 to-orange-500' },
          { label: 'Completion', value: `${stats.pct}%`, sub: 'of all tasks done', bg: 'from-emerald-500 to-teal-500' },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-4 text-white bg-gradient-to-br ${s.bg} shadow-md`}>
            <p className="text-xs font-medium opacity-90">{s.label}</p>
            <p className="text-3xl font-extrabold mt-1">{loading ? '…' : s.value}</p>
            <p className="text-xs opacity-80 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
        <div className="flex items-center gap-3 text-sm mb-2">
          <span className="font-bold">Team progress</span>
          <span className="ml-auto font-extrabold text-indigo-600">{stats.pct}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all" style={{ width: `${stats.pct}%` }} />
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-extrabold text-lg">Recent tasks</h2>
            <div className="ml-auto relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tasks…"
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-sm w-44 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          {loading ? <p className="text-sm text-slate-500">Loading…</p> :
            recent.length === 0 ? (
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center">
                <p className="font-bold">No tasks yet</p>
                <p className="text-sm text-slate-500 mt-1 mb-4">Create your first task to get started.</p>
                <button onClick={openCreate} className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold">Create task</button>
              </div>
            ) : (
              <div className="space-y-3">
                {recent.map((t) => (
                  <TaskCard key={t.id} task={t} member={memberById[t.assigned_to]}
                    onToggleDone={toggleDone} onEdit={openEdit} onDelete={deleteTask} />
                ))}
              </div>
            )}
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-extrabold text-lg mb-3">My urgent tasks</h2>
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            {myTasks.length === 0 ? (
              <p className="text-sm text-slate-500">🎉 Nothing assigned to you. Nice!</p>
            ) : (
              <div className="space-y-3">
                {myTasks.map((t) => (
                  <TaskCard key={t.id} task={t} member={memberById[t.assigned_to]} onToggleDone={toggleDone} onEdit={openEdit} />
                ))}
              </div>
            )}
          </div>

          <h2 className="font-extrabold text-lg mt-6 mb-3">Team</h2>
          <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-2.5">
            {members.map((m) => {
              const count = tasks.filter((t) => t.assigned_to === m.id && t.status !== 'done').length
              return (
                <div key={m.id} className="flex items-center gap-2.5 text-sm">
                  <span className="w-8 h-8 rounded-full grid place-items-center text-white text-xs font-bold" style={{ background: m.avatar_color }}>
                    {m.full_name.split(' ').map((x) => x[0]).slice(0, 2).join('')}
                  </span>
                  <span className="font-semibold truncate">{m.full_name}</span>
                  <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{count} open</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <TaskModal open={modalOpen} initial={editing} members={members} onClose={() => setModalOpen(false)} onSave={save} />
    </Layout>
  )
}

import { useMemo } from 'react'
import { PartyPopper } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../lib/useTasks'
import Layout from '../components/Layout'
import TaskCard from '../components/TaskCard'

export default function MyTasks() {
  const { user, members } = useAuth()
  const { tasks, loading, toggleDone, updateTask } = useTasks(user)
  const memberById = useMemo(() => Object.fromEntries(members.map((m) => [m.id, m])), [members])

  const mine = tasks.filter((t) => t.assigned_to === user?.id)
  const open = mine.filter((t) => t.status !== 'done')
  const done = mine.filter((t) => t.status === 'done')

  return (
    <Layout>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">My Tasks</h1>
      <p className="text-sm text-slate-500 mt-1 mb-6">Only tasks assigned to you. Tap <b>✓ Mark as Done</b> when finished.</p>

      {loading ? <p className="text-sm text-slate-500">Loading…</p> : (
        <>
          <h2 className="font-extrabold mb-3">To do ({open.length})</h2>
          {open.length === 0 ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center mb-6">
              <PartyPopper className="mx-auto text-emerald-500 mb-2" size={28} />
              <p className="font-bold">All clear! 🎉</p>
              <p className="text-sm text-slate-600">You have no open tasks assigned.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3.5 mb-8">
              {open.map((t) => (
                <TaskCard key={t.id} task={t} member={memberById[t.assigned_to]}
                  onToggleDone={toggleDone} onEdit={(x) => updateTask(x.id, { status: 'in_progress' })} />
              ))}
            </div>
          )}

          <h2 className="font-extrabold mb-3">Completed ({done.length})</h2>
          <div className="grid sm:grid-cols-2 gap-3.5">
            {done.map((t) => (
              <TaskCard key={t.id} task={t} member={memberById[t.assigned_to]} onToggleDone={toggleDone} />
            ))}
          </div>
          {done.length === 0 && <p className="text-sm text-slate-400">Nothing completed yet — you've got this!</p>}
        </>
      )}
    </Layout>
  )
}

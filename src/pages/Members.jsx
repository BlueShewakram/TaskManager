import { useMemo } from 'react'
import { Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../lib/useTasks'
import Layout from '../components/Layout'
import { initials } from '../lib/demoData'

export default function Members() {
  const { user, members } = useAuth()
  const { tasks } = useTasks(user)

  const rows = useMemo(() => members.map((m) => {
    const mine = tasks.filter((t) => t.assigned_to === m.id)
    return {
      ...m,
      open: mine.filter((t) => t.status !== 'done').length,
      done: mine.filter((t) => t.status === 'done').length,
      total: mine.length,
    }
  }), [members, tasks])

  return (
    <Layout>
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Team Members</h1>
      <p className="text-sm text-slate-500 mt-1 mb-6">
        Everyone who signed up. Assign tasks via New Task → Assign to.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rows.map((m) => {
          const pct = m.total ? Math.round((m.done / m.total) * 100) : 0
          return (
            <div key={m.id} className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl grid place-items-center text-white font-extrabold" style={{ background: m.avatar_color }}>
                  {initials(m.full_name)}
                </div>
                <div className="min-w-0">
                  <p className="font-extrabold truncate">{m.full_name}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 truncate"><Mail size={11} />{m.email}</p>
                </div>
                <span className="ml-auto text-[11px] font-bold px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 uppercase">{m.role}</span>
              </div>
              <div className="flex gap-2 text-center mb-3">
                <div className="flex-1 bg-slate-50 rounded-xl py-2"><p className="font-extrabold">{m.open}</p><p className="text-[11px] text-slate-500 font-medium">Open</p></div>
                <div className="flex-1 bg-emerald-50 rounded-xl py-2"><p className="font-extrabold text-emerald-700">{m.done}</p><p className="text-[11px] text-slate-500 font-medium">Done</p></div>
                <div className="flex-1 bg-indigo-50 rounded-xl py-2"><p className="font-extrabold text-indigo-700">{m.total}</p><p className="text-[11px] text-slate-500 font-medium">Total</p></div>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-slate-500 mt-1.5 font-medium">{pct}% completed</p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-sm text-indigo-900">
        <b>How to add members:</b> share your Vercel URL — they click Sign Up with email + password.
        Their profile appears here automatically (via the <code>handle_new_user</code> trigger in schema.sql).
      </div>
    </Layout>
  )
}

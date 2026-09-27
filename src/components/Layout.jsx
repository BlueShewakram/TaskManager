import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, KanbanSquare, UserCheck, Users, LogOut, CheckSquare } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { initials } from '../lib/demoData'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/board', label: 'Task Board', icon: KanbanSquare },
  { to: '/my-tasks', label: 'My Tasks', icon: UserCheck },
  { to: '/members', label: 'Members', icon: Users },
]

export default function Layout({ children }) {
  const { profile, signOut, dbError } = useAuth()
  const nav = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    nav('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-white border-r border-slate-200 px-5 py-6">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 grid place-items-center text-white shadow-lg shadow-indigo-200">
            <CheckSquare size={20} />
          </div>
          <div>
            <p className="font-extrabold text-lg leading-none tracking-tight">TaskFlow</p>
            <p className="text-xs text-slate-500 mt-0.5">Capstone Manager</p>
          </div>
        </div>

        <nav className="space-y-1.5 flex-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div
            className="w-9 h-9 rounded-full grid place-items-center text-white text-xs font-bold shrink-0"
            style={{ background: profile?.avatar_color || '#6366f1' }}
          >
            {initials(profile?.full_name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate">{profile?.full_name || 'Member'}</p>
            <p className="text-xs text-slate-500 truncate">{profile?.email || 'Team member'}</p>
          </div>
          <button onClick={handleSignOut} title="Sign out" className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile topbar */}
        <header className="md:hidden sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200 px-4 py-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 grid place-items-center text-white">
            <CheckSquare size={16} />
          </div>
          <span className="font-extrabold tracking-tight">TaskFlow</span>
          <nav className="ml-auto flex gap-1 text-xs font-medium">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-lg ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'}`
                }
              >
                {label.split(' ')[0]}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {dbError && (
            <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-sm text-red-800">
              <b>Database issue:</b> {dbError}
              <span className="block mt-1 text-red-700">Run <code>supabase/username_login_setup.sql</code> once in Supabase SQL Editor, then refresh.</span>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}

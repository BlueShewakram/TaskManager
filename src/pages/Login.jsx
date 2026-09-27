import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckSquare } from 'lucide-react'
import { useAuth, TEAM } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [username, setUsername] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const doLogin = async (name) => {
    setErr('')
    setBusy(true)
    try {
      await login(name)
      nav('/')
    } catch (e) {
      setErr(e.message)
    } finally {
      setBusy(false)
    }
  }

  const submit = (e) => {
    e.preventDefault()
    doLogin(username)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 grid place-items-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 grid place-items-center text-white">
            <CheckSquare size={22} />
          </div>
          <div>
            <p className="font-extrabold text-xl leading-none">TaskFlow</p>
            <p className="text-xs text-slate-500 mt-1">Capstone team task manager</p>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold tracking-tight mb-1">Who are you? 👋</h1>
        <p className="text-sm text-slate-500 mb-6">Just type your username — no password. We'll remember you on this device.</p>

        {err && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">{err}</div>}

        <form onSubmit={submit} className="flex gap-2 mb-5">
          <input
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username (blue, josh, kevin, ivan)"
            className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 lowercase"
          />
          <button disabled={busy} className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm disabled:opacity-50">
            {busy ? '…' : 'Go →'}
          </button>
        </form>

        <div className="grid grid-cols-2 gap-2.5">
          {TEAM.map((m) => (
            <button
              key={m.username}
              disabled={busy}
              onClick={() => doLogin(m.username)}
              className="flex items-center gap-2.5 p-3 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition text-left disabled:opacity-50"
            >
              <span
                className="w-9 h-9 rounded-xl grid place-items-center text-white text-xs font-extrabold shrink-0"
                style={{ background: m.color }}
              >
                {m.full_name.split(' ').map((x) => x[0]).slice(0, 2).join('')}
              </span>
              <span>
                <span className="block text-sm font-bold leading-tight">{m.full_name.split(' ')[0]}</span>
                <span className="block text-xs text-slate-500">@{m.username}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

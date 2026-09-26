import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CheckSquare } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signIn, signUp, isDemo } = useAuth()
  const nav = useNavigate()
  const [mode, setMode] = useState('signin')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  if (isDemo) {
    nav('/')
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setBusy(true)
    try {
      if (mode === 'signin') await signIn({ email, password })
      else await signUp({ email, password, fullName })
      nav('/')
    } catch (e2) {
      setErr(e2.message)
    } finally {
      setBusy(false)
    }
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

        <h1 className="text-2xl font-extrabold tracking-tight mb-1">
          {mode === 'signin' ? 'Welcome back 👋' : 'Create your account'}
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          {mode === 'signin' ? 'Sign in to track and assign tasks.' : 'Sign up, then invite your members.'}
        </p>

        {err && <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">{err}</div>}

        <form onSubmit={submit} className="space-y-3.5">
          {mode === 'signup' && (
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name (e.g. Alex Rivera)" required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          )}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 6 chars)" required minLength={6}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <button disabled={busy} className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-200 disabled:opacity-50">
            {busy ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <button onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="mt-4 text-sm font-semibold text-indigo-600 hover:underline w-full text-center">
          {mode === 'signin' ? "No account? Sign up" : 'Have an account? Sign in'}
        </button>

        <div className="mt-6 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <b>Supabase setup:</b> run <code>supabase/schema.sql</code> in your Supabase SQL Editor, enable Email auth,
          then add <code>VITE_SUPABASE_URL</code> + <code>VITE_SUPABASE_ANON_KEY</code> in Vercel env vars.
          <Link to="/" className="text-indigo-600 font-bold"> Back to app →</Link>
        </div>
      </div>
    </div>
  )
}

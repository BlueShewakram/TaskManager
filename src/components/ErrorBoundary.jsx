import { Component } from 'react'

// Catches startup crashes (e.g. missing Supabase keys) so users see
// a readable message instead of a blank white screen.
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen grid place-items-center bg-slate-50 p-4">
          <div className="w-full max-w-md bg-white rounded-3xl border border-red-200 shadow-lg p-6 text-center">
            <p className="font-extrabold text-lg mb-2">Couldn't start TaskFlow 😢</p>
            <p className="text-sm text-slate-600 mb-4 break-words">
              {String(this.state.error?.message || this.state.error)}
            </p>
            <div className="text-left text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-2xl p-3.5 leading-relaxed">
              <b>Fix:</b> set <code>VITE_SUPABASE_URL</code> + <code>VITE_SUPABASE_ANON_KEY</code> in
              Vercel → Settings → Environment Variables, then Deployments → <b>Redeploy</b>.
              Locally, put them in <code>.env.local</code> and restart <code>npm run dev</code>.
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold"
            >
              Retry
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

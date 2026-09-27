import { createClient } from '@supabase/supabase-js'

// Pure Supabase mode — no demo fallback.
// Requires VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY (local .env.local + Vercel env vars).
//
// NOTE: never throw at import time — an import-time throw kills the whole
// module graph before React (and any ErrorBoundary) can mount, leaving a
// blank white screen. Instead export `configError` and let the UI render it.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const configError =
  !supabaseUrl || !supabaseAnonKey
    ? 'Missing Supabase keys (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). Add them in Vercel → Settings → Environment Variables and Redeploy (clear build cache). Locally, put them in .env.local and restart npm run dev.'
    : null

export const supabase = configError ? null : createClient(supabaseUrl, supabaseAnonKey)

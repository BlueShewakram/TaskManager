import { createClient } from '@supabase/supabase-js'

// Pure Supabase mode — no demo fallback.
// Requires VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY (local .env.local + Vercel env vars).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase keys. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local (local) and Vercel → Settings → Environment Variables (deployed).'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

import { createClient } from '@supabase/supabase-js'

// Vite only exposes VITE_ prefixed vars.
// Your keys from Supabase dashboard mapped to Vite format:
// NEXT_PUBLIC_SUPABASE_URL -> VITE_SUPABASE_URL
// NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY -> VITE_SUPABASE_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  supabaseUrl.startsWith('https://')

if (!isSupabaseConfigured) {
  console.warn(
    '[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Running in DEMO (localStorage) mode.'
  )
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

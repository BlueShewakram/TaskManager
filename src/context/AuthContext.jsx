import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { loadDemoMembers } from '../lib/demoData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  // Demo mode: fake logged-in admin
  useEffect(() => {
    if (!isSupabaseConfigured) {
      const demoMembers = loadDemoMembers()
      setMembers(demoMembers)
      const me = demoMembers[0]
      setUser({ id: me.id, email: me.email })
      setProfile(me)
      setLoading(false)
      return
    }

    const init = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user ?? null)
      setLoading(false)
    }
    init()

    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  // Load profile + members when user exists (Supabase mode)
  useEffect(() => {
    if (!isSupabaseConfigured || !user) return
    const load = async () => {
      const { data: myProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      if (myProfile) setProfile(myProfile)

      const { data: all } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: true })
      if (all) setMembers(all)
    }
    load()
  }, [user])

  const signUp = async ({ email, password, fullName }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    if (error) throw error
    return data
  }

  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  const signOut = async () => {
    if (!isSupabaseConfigured) return
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, profile, members, loading, signUp, signIn, signOut, isDemo: !isSupabaseConfigured }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

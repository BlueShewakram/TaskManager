import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, configError } from '../lib/supabaseClient'

const AuthContext = createContext(null)

const STORAGE_KEY = 'taskflow_username'

// The only 4 logins — just type the username, no password.
// Remembered in the browser via localStorage.
export const TEAM = [
  { username: 'blue', full_name: 'Blue Shewakram', color: '#6366f1' },
  { username: 'josh', full_name: 'Josh Caleb Ababa', color: '#ec4899' },
  { username: 'kevin', full_name: 'Kevin Klien Cubol', color: '#10b981' },
  { username: 'ivan', full_name: 'Ivan Matthew Beltran', color: '#8b5cf6' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [dbError, setDbError] = useState(null)

  const fetchMembers = async () => {
    if (!supabase) return
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: true })
    if (error) setDbError(error.message)
    else if (data) setMembers(data)
  }

  // Auto-login from remembered username
  useEffect(() => {
    const init = async () => {
      if (configError) {
        setDbError(configError)
        setLoading(false)
        return
      }
      try {
        const saved = (localStorage.getItem(STORAGE_KEY) || '').toLowerCase().trim()
        if (saved) {
          const { data, error } = await supabase.from('profiles').select('*').eq('username', saved).single()
          if (error) setDbError(error.message)
          if (data) {
            setUser({ id: data.id, username: data.username, email: data.email })
            setProfile(data)
          } else {
            localStorage.removeItem(STORAGE_KEY)
          }
        }
        await fetchMembers()
      } catch (e) {
        setDbError(e.message)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])

  const login = async (name) => {
    if (configError || !supabase) throw new Error(configError || 'Supabase is not configured.')
    const username = (name || '').toLowerCase().trim()
    if (!username) throw new Error('Type your username (blue, josh, kevin, or ivan).')
    const { data, error } = await supabase.from('profiles').select('*').eq('username', username).single()
    if (error || !data) throw new Error(`No member named "${username}". Pick: blue, josh, kevin, ivan.`)
    localStorage.setItem(STORAGE_KEY, username)
    setUser({ id: data.id, username: data.username, email: data.email })
    setProfile(data)
    await fetchMembers()
    return data
  }

  const signOut = async () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, profile, members, loading, dbError, login, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

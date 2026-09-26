import { useCallback, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from './supabaseClient'
import { loadDemoTasks, saveDemoTasks } from './demoData'

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function useTasks(user) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
    if (!isSupabaseConfigured) {
      setTasks(loadDemoTasks())
      setLoading(false)
      return
    }
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setTasks(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // Realtime (Supabase only)
  useEffect(() => {
    if (!isSupabaseConfigured) return
    const ch = supabase
      .channel('tasks-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        fetchTasks()
      })
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [fetchTasks])

  const createTask = async (input) => {
    if (!isSupabaseConfigured) {
      const t = {
        id: uid(),
        ...input,
        created_by: user?.id,
        created_at: new Date().toISOString(),
        completed_at: input.status === 'done' ? new Date().toISOString() : null,
      }
      const next = [t, ...tasks]
      setTasks(next)
      saveDemoTasks(next)
      return t
    }
    const { data, error } = await supabase
      .from('tasks')
      .insert({ ...input, created_by: user?.id })
      .select()
      .single()
    if (error) throw error
    await fetchTasks()
    return data
  }

  const updateTask = async (id, patch) => {
    if (!isSupabaseConfigured) {
      const next = tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              ...patch,
              completed_at:
                patch.status === 'done'
                  ? new Date().toISOString()
                  : patch.status
                    ? null
                    : t.completed_at,
            }
          : t
      )
      setTasks(next)
      saveDemoTasks(next)
      return
    }
    const payload = { ...patch, updated_at: new Date().toISOString() }
    if (patch.status === 'done') payload.completed_at = new Date().toISOString()
    if (patch.status && patch.status !== 'done') payload.completed_at = null
    const { error } = await supabase.from('tasks').update(payload).eq('id', id)
    if (error) throw error
    await fetchTasks()
  }

  const toggleDone = async (task) => {
    const nextStatus = task.status === 'done' ? 'todo' : 'done'
    await updateTask(task.id, { status: nextStatus })
  }

  const deleteTask = async (id) => {
    if (!isSupabaseConfigured) {
      const next = tasks.filter((t) => t.id !== id)
      setTasks(next)
      saveDemoTasks(next)
      return
    }
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) throw error
    await fetchTasks()
  }

  return { tasks, loading, refresh: fetchTasks, createTask, updateTask, toggleDone, deleteTask }
}

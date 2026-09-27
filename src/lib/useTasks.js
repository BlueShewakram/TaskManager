import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export function useTasks(user) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = useCallback(async () => {
    setLoading(true)
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

  // Realtime sync
  useEffect(() => {
    const ch = supabase
      .channel('tasks-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, () => {
        fetchTasks()
      })
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [fetchTasks])

  const createTask = async (input) => {
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
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) throw error
    await fetchTasks()
  }

  return { tasks, loading, refresh: fetchTasks, createTask, updateTask, toggleDone, deleteTask }
}

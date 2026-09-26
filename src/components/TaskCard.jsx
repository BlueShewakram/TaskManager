import { Calendar, CheckCircle2, Circle, Trash2, Pencil } from 'lucide-react'
import { formatDate, isOverdue, priorityStyle, statusLabel } from '../lib/meta'
import { initials } from '../lib/demoData'

export default function TaskCard({ task, member, onToggleDone, onEdit, onDelete, onMove }) {
  const done = task.status === 'done'
  const overdue = isOverdue(task)

  return (
    <div
      className={`bg-white rounded-2xl border p-4 shadow-sm hover:shadow-md transition group ${
        done ? 'border-emerald-200 bg-emerald-50/40' : overdue ? 'border-red-200' : 'border-slate-200'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <button
          onClick={() => onToggleDone?.(task)}
          title={done ? 'Mark as not done' : 'Click to mark Done'}
          className={`mt-0.5 shrink-0 transition ${done ? 'text-emerald-600' : 'text-slate-300 hover:text-emerald-500'}`}
        >
          {done ? <CheckCircle2 size={22} /> : <Circle size={22} />}
        </button>

        <div className="min-w-0 flex-1">
          <h4 className={`font-semibold text-[15px] leading-snug ${done ? 'line-through text-slate-400' : 'text-slate-900'}`}>
            {task.title}
          </h4>
          {task.description && (
            <p className="text-[13px] text-slate-500 mt-1 clamp-2">{task.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${priorityStyle(task.priority)}`}>
              {task.priority}
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {statusLabel(task.status)}
            </span>
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                overdue ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
              }`}
            >
              <Calendar size={11} />
              {formatDate(task.due_date)}
              {overdue && ' • overdue'}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            {member ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                <span
                  className="w-6 h-6 rounded-full grid place-items-center text-white text-[10px] font-bold"
                  style={{ background: member.avatar_color }}
                >
                  {initials(member.full_name)}
                </span>
                {member.full_name}
              </span>
            ) : (
              <span className="text-xs text-slate-400">Unassigned</span>
            )}

            <span className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
              {onMove && task.status !== 'done' && (
                <button
                  onClick={() => onMove(task)}
                  className="text-[11px] font-bold px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                >
                  Move →
                </button>
              )}
              {onEdit && (
                <button onClick={() => onEdit(task)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700" title="Edit">
                  <Pencil size={14} />
                </button>
              )}
              {onDelete && (
                <button onClick={() => onDelete(task.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600" title="Delete">
                  <Trash2 size={14} />
                </button>
              )}
            </span>
          </div>

          {/* Big Done button — easy for members */}
          {!done && onToggleDone && (
            <button
              onClick={() => onToggleDone(task)}
              className="mt-3 w-full py-2 rounded-xl text-[13px] font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition active:scale-[0.98]"
            >
              ✓ Mark as Done
            </button>
          )}
          {done && onToggleDone && (
            <button
              onClick={() => onToggleDone(task)}
              className="mt-3 w-full py-2 rounded-xl text-[13px] font-bold bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
            >
              Reopen task
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

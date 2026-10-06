import { useState, type FormEvent } from 'react'
import type { BookStatus } from '../api.ts'
import { statusLabels } from '../labels.ts'

export function AddBookForm({
  onAdd,
}: {
  onAdd: (input: { title: string; author: string; status: BookStatus }) => Promise<void>
}) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState<BookStatus>('want_to_read')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await onAdd({ title, author, status })
      setTitle('')
      setAuthor('')
      setStatus('want_to_read')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-2 rounded-lg border border-stone-200 bg-white p-4 sm:grid-cols-[1fr_1fr_9rem_auto]">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="rounded-md border border-stone-300 px-3 py-2 text-sm"
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        required
        className="rounded-md border border-stone-300 px-3 py-2 text-sm"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as BookStatus)}
        className="rounded-md border border-stone-300 bg-white px-2 py-2 text-sm"
      >
        {Object.entries(statusLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button
        disabled={saving}
        className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
      >
        Add book
      </button>
    </form>
  )
}

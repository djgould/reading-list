import { useEffect, useState } from 'react'
import { api, type Book, type BookStatus, type User } from './api.ts'
import { AddBookForm } from './components/AddBookForm.tsx'
import { BookItem } from './components/BookItem.tsx'
import { statusLabels } from './labels.ts'

type Filter = 'all' | BookStatus

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([api.me(), api.listBooks()])
      .then(([me, list]) => {
        setUser(me)
        setBooks(list)
      })
      .catch((err: Error) => setError(err.message))
  }, [])

  async function addBook(input: { title: string; author: string; status: BookStatus }) {
    const book = await api.addBook(input)
    setBooks((current) => [book, ...current])
  }

  async function updateBook(id: string, changes: Partial<Pick<Book, 'status' | 'rating' | 'notes'>>) {
    const updated = await api.updateBook(id, changes)
    setBooks((current) => current.map((book) => (book.id === id ? updated : book)))
  }

  async function deleteBook(id: string) {
    await api.deleteBook(id)
    setBooks((current) => current.filter((book) => book.id !== id))
  }

  const visible = filter === 'all' ? books : books.filter((book) => book.status === filter)
  const counts = books.reduce<Record<string, number>>((acc, book) => {
    acc[book.status] = (acc[book.status] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <h1 className="text-lg font-semibold tracking-tight text-stone-900">Shelf</h1>
          {user && <span className="text-sm text-stone-600">{user.name}</span>}
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">
            {user ? `${user.name.split(' ')[0]}'s reading list` : 'Reading list'}
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            {counts.reading ?? 0} reading · {counts.want_to_read ?? 0} up next · {counts.finished ?? 0} finished
          </p>
        </div>

        <AddBookForm onAdd={addBook} />

        <div className="flex gap-2 text-sm">
          {(['all', 'reading', 'want_to_read', 'finished'] as Filter[]).map((value) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`rounded-full px-3 py-1 ${filter === value ? 'bg-stone-900 text-white' : 'bg-white text-stone-700 ring-1 ring-stone-200 hover:bg-stone-100'}`}
            >
              {value === 'all' ? 'All' : statusLabels[value]}
            </button>
          ))}
        </div>

        {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        <ul className="space-y-3">
          {visible.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              onUpdate={(changes) => updateBook(book.id, changes)}
              onDelete={() => deleteBook(book.id)}
            />
          ))}
        </ul>
        {visible.length === 0 && !error && <p className="text-sm text-stone-500">Nothing here yet.</p>}
      </main>
    </div>
  )
}

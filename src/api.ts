export type BookStatus = 'want_to_read' | 'reading' | 'finished'

export type Book = {
  id: string
  title: string
  author: string
  status: BookStatus
  rating: number | null
  notes: string | null
  finishedAt: string | null
  createdAt: string
}

export type User = {
  id: string
  name: string
  email: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `Request failed (${res.status})`)
  }
  return res.status === 204 ? (undefined as T) : res.json()
}

export const api = {
  me: () => request<User>('/me'),
  listBooks: () => request<Book[]>('/books'),
  addBook: (input: { title: string; author: string; status: BookStatus }) =>
    request<Book>('/books', { method: 'POST', body: JSON.stringify(input) }),
  updateBook: (id: string, changes: Partial<Pick<Book, 'status' | 'rating' | 'notes'>>) =>
    request<Book>(`/books/${id}`, { method: 'PATCH', body: JSON.stringify(changes) }),
  deleteBook: (id: string) => request<void>(`/books/${id}`, { method: 'DELETE' }),
}

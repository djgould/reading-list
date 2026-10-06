import { and, desc, eq } from 'drizzle-orm'
import { Router } from 'express'
import { db } from '../db/index.ts'
import { books, type BookStatus } from '../db/schema.ts'

const statuses: BookStatus[] = ['want_to_read', 'reading', 'finished']

export const booksRouter = Router()

booksRouter.get('/', async (req, res) => {
  const rows = await db
    .select()
    .from(books)
    .where(eq(books.ownerId, req.user.id))
    .orderBy(desc(books.createdAt))
  res.json(rows)
})

booksRouter.post('/', async (req, res) => {
  const title = String(req.body.title ?? '').trim()
  const author = String(req.body.author ?? '').trim()
  const status = statuses.includes(req.body.status) ? (req.body.status as BookStatus) : 'want_to_read'
  if (!title || !author) {
    res.status(400).json({ error: 'Title and author are required' })
    return
  }
  const [book] = await db
    .insert(books)
    .values({
      ownerId: req.user.id,
      title,
      author,
      status,
      finishedAt: status === 'finished' ? new Date() : null,
    })
    .returning()
  res.status(201).json(book)
})

booksRouter.patch('/:id', async (req, res) => {
  const changes: Partial<typeof books.$inferInsert> = {}
  if (statuses.includes(req.body.status)) {
    changes.status = req.body.status
    changes.finishedAt = req.body.status === 'finished' ? new Date() : null
  }
  if (req.body.rating === null || (Number.isInteger(req.body.rating) && req.body.rating >= 1 && req.body.rating <= 5)) {
    changes.rating = req.body.rating
  }
  if (typeof req.body.notes === 'string') {
    changes.notes = req.body.notes.trim() || null
  }
  const [book] = await db
    .update(books)
    .set(changes)
    .where(and(eq(books.id, req.params.id), eq(books.ownerId, req.user.id)))
    .returning()
  if (!book) {
    res.status(404).json({ error: 'Book not found' })
    return
  }
  res.json(book)
})

booksRouter.delete('/:id', async (req, res) => {
  await db.delete(books).where(and(eq(books.id, req.params.id), eq(books.ownerId, req.user.id)))
  res.status(204).end()
})

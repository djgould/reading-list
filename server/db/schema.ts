import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const books = sqliteTable('books', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  ownerId: text('owner_id').notNull(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  status: text('status', { enum: ['want_to_read', 'reading', 'finished'] })
    .notNull()
    .default('want_to_read'),
  rating: integer('rating'),
  notes: text('notes'),
  finishedAt: integer('finished_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

export type Book = typeof books.$inferSelect
export type BookStatus = Book['status']

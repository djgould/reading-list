import { migrate } from 'drizzle-orm/libsql/migrator'
import { DEMO_USER } from './current-user.ts'
import { db } from './db/index.ts'
import { books } from './db/schema.ts'

await migrate(db, { migrationsFolder: 'drizzle' })

const existing = await db.select({ id: books.id }).from(books).limit(1)
if (existing.length > 0) {
  console.log('Database ready.')
} else {
  const daysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  await db.insert(books).values([
    { ownerId: DEMO_USER.id, title: 'The Left Hand of Darkness', author: 'Ursula K. Le Guin', status: 'finished', rating: 5, notes: 'The ice crossing chapters are incredible.', finishedAt: daysAgo(40), createdAt: daysAgo(70) },
    { ownerId: DEMO_USER.id, title: 'Piranesi', author: 'Susanna Clarke', status: 'finished', rating: 4, finishedAt: daysAgo(18), createdAt: daysAgo(30) },
    { ownerId: DEMO_USER.id, title: 'The Dispossessed', author: 'Ursula K. Le Guin', status: 'reading', notes: 'Book club pick for November.', createdAt: daysAgo(9) },
    { ownerId: DEMO_USER.id, title: 'Tomorrow, and Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', status: 'want_to_read', createdAt: daysAgo(6) },
    { ownerId: DEMO_USER.id, title: 'Braiding Sweetgrass', author: 'Robin Wall Kimmerer', status: 'want_to_read', createdAt: daysAgo(3) },
    { ownerId: DEMO_USER.id, title: 'A Psalm for the Wild-Built', author: 'Becky Chambers', status: 'want_to_read', createdAt: daysAgo(1) },
  ])
  console.log(`Database ready. Seeded a shelf for ${DEMO_USER.name}.`)
}

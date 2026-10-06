import express from 'express'
import path from 'node:path'
import { currentUser } from './current-user.ts'
import { booksRouter } from './routes/books.ts'

const app = express()
const port = Number(process.env.PORT ?? 3001)

app.use(express.json())
app.use('/api', currentUser)

app.get('/api/me', (req, res) => {
  res.json(req.user)
})

app.use('/api/books', booksRouter)

if (process.env.NODE_ENV === 'production') {
  const dist = path.resolve(import.meta.dirname, '../dist')
  app.use(express.static(dist))
  app.get('/{*splat}', (_req, res) => {
    res.sendFile(path.join(dist, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})

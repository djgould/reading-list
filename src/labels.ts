import type { BookStatus } from './api.ts'

export const statusLabels: Record<BookStatus, string> = {
  want_to_read: 'Want to read',
  reading: 'Reading',
  finished: 'Finished',
}

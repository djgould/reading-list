import type { Book, BookStatus } from '../api.ts'
import { statusLabels } from '../labels.ts'
import { StarRating } from './StarRating.tsx'

export function BookItem({
  book,
  onUpdate,
  onDelete,
}: {
  book: Book
  onUpdate: (changes: Partial<Pick<Book, 'status' | 'rating' | 'notes'>>) => void
  onDelete: () => void
}) {
  return (
    <li className="flex items-start justify-between gap-4 rounded-lg border border-stone-200 bg-white p-4">
      <div className="min-w-0">
        <p className="font-medium text-stone-900">{book.title}</p>
        <p className="text-sm text-stone-600">{book.author}</p>
        {book.notes && <p className="mt-2 text-sm text-stone-500 italic">{book.notes}</p>}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <select
          value={book.status}
          onChange={(e) => onUpdate({ status: e.target.value as BookStatus })}
          className="rounded-md border border-stone-300 bg-white px-2 py-1 text-sm"
        >
          {Object.entries(statusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {book.status === 'finished' && (
          <StarRating value={book.rating} onChange={(rating) => onUpdate({ rating })} />
        )}
        <button onClick={onDelete} className="text-xs text-stone-400 hover:text-red-600">
          Remove
        </button>
      </div>
    </li>
  )
}

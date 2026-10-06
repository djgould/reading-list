export function StarRating({
  value,
  onChange,
}: {
  value: number | null
  onChange: (value: number | null) => void
}) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(value === star ? null : star)}
          className={`px-0.5 text-lg leading-none ${value && star <= value ? 'text-amber-500' : 'text-stone-300 hover:text-stone-400'}`}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

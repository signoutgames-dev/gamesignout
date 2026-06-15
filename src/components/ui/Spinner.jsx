import { cn } from '../../lib/utils'

export function Spinner({ className, size = 'md' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-border border-t-primary',
        sizes[size],
        className,
      )}
    />
  )
}

export function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <Spinner />
      <p className="text-sm text-text-muted">{message}</p>
    </div>
  )
}

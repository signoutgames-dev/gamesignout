import { cn } from '../../lib/utils'

export function LevelBadge({ level, size = 'md', className }) {
  const sizes = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-12 w-12 text-lg',
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-primary/20 font-bold text-primary ring-2 ring-primary/40',
        sizes[size],
        className,
      )}
    >
      {level}
    </div>
  )
}

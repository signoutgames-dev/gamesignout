import { cn } from '../../lib/utils'

export function Card({ children, className, glow = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl border border-border bg-surface-light p-5',
        glow && 'glow-active',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }) {
  return (
    <div className={cn('mb-4 flex items-center justify-between', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }) {
  return (
    <h3 className={cn('text-lg font-semibold text-text', className)}>
      {children}
    </h3>
  )
}

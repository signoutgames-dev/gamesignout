import { cn } from '../../lib/utils'

const variants = {
  default: 'bg-surface-lighter text-text',
  primary: 'bg-primary/20 text-primary',
  accent: 'bg-accent/20 text-accent',
  xp: 'bg-xp/20 text-xp',
  active: 'bg-primary/30 text-primary glow-active',
  completed: 'bg-accent/20 text-accent',
  cancelled: 'bg-red-500/20 text-red-400',
}

export function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

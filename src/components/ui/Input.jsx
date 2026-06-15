import { cn } from '../../lib/utils'

export function Input({ className, label, id, ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text-muted">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'rounded-lg border border-border bg-surface px-3 py-2 text-text',
          'placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
          className,
        )}
        {...props}
      />
    </div>
  )
}

export function Select({ className, label, id, children, ...props }) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-text-muted">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'rounded-lg border border-border bg-surface px-3 py-2 text-text',
          'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

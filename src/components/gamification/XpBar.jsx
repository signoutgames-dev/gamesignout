import { xpProgressInLevel } from '../../lib/xp'
import { cn } from '../../lib/utils'

export function XpBar({ totalXp, showLabel = true, className }) {
  const { current, needed, percent } = xpProgressInLevel(totalXp)

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="mb-1 flex justify-between text-xs text-text-muted">
          <span>{current} XP</span>
          <span>{needed} XP to next level</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-surface">
        <div
          className="h-full rounded-full bg-gradient-to-r from-xp to-xp-dark transition-all duration-500 glow-xp"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

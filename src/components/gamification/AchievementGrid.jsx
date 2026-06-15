import { cn } from '../../lib/utils'

export function AchievementGrid({ badges, earnedBadgeIds = [] }) {
  if (!badges?.length) {
    return (
      <p className="py-4 text-center text-text-muted">No badges configured yet.</p>
    )
  }

  const earnedSet = new Set(earnedBadgeIds)

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {badges.map((badge) => {
        const earned = earnedSet.has(badge.id)
        return (
          <div
            key={badge.id}
            className={cn(
              'flex flex-col items-center rounded-xl border p-4 text-center transition-all',
              earned
                ? 'border-xp/40 bg-xp/10 glow-xp'
                : 'border-border bg-surface opacity-50 grayscale',
            )}
          >
            <span className="mb-2 text-3xl">{badge.icon}</span>
            <p className="text-sm font-medium text-text">{badge.name}</p>
            <p className="mt-1 text-xs text-text-muted">{badge.description}</p>
          </div>
        )
      })}
    </div>
  )
}

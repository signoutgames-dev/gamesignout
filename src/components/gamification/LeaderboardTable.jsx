import { Medal } from 'lucide-react'
import { LevelBadge } from './LevelBadge'
import { cn } from '../../lib/utils'

const rankColors = ['text-xp', 'text-text-muted', 'text-orange-400']

export function LeaderboardTable({ entries }) {
  if (!entries?.length) {
    return (
      <p className="py-8 text-center text-text-muted">No players yet. Add some players to get started!</p>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border text-text-muted">
            <th className="pb-3 pr-4 font-medium">Rank</th>
            <th className="pb-3 pr-4 font-medium">Player</th>
            <th className="pb-3 pr-4 font-medium">Level</th>
            <th className="pb-3 pr-4 font-medium">XP</th>
            <th className="pb-3 pr-4 font-medium">Sessions</th>
            <th className="pb-3 pr-4 font-medium">Streak</th>
            <th className="pb-3 font-medium">Top Game</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry.id} className="border-b border-border/50">
              <td className="py-3 pr-4">
                {index < 3 ? (
                  <Medal size={18} className={cn(rankColors[index])} />
                ) : (
                  <span className="text-text-muted">#{index + 1}</span>
                )}
              </td>
              <td className="py-3 pr-4 font-medium text-text">{entry.name}</td>
              <td className="py-3 pr-4">
                <LevelBadge level={entry.level} size="sm" />
              </td>
              <td className="py-3 pr-4 text-xp font-semibold">{entry.total_xp}</td>
              <td className="py-3 pr-4 text-text-muted">{entry.sessions_count}</td>
              <td className="py-3 pr-4">
                {entry.current_streak > 0 ? (
                  <span className="text-accent">🔥 {entry.current_streak}d</span>
                ) : (
                  <span className="text-text-muted">—</span>
                )}
              </td>
              <td className="py-3 text-text-muted">{entry.top_game || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

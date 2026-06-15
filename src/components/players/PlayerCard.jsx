import { Flame } from 'lucide-react'
import { Card } from '../ui/Card'
import { LevelBadge } from '../gamification/LevelBadge'
import { XpBar } from '../gamification/XpBar'

export function PlayerCard({ player, onClick, selected }) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:border-primary/50 ${selected ? 'border-primary glow-active' : ''}`}
      onClick={() => onClick?.(player)}
    >
      <div className="flex items-start gap-4">
        <LevelBadge level={player.level} />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-text">{player.name}</h3>
            {player.current_streak > 0 && (
              <span className="flex items-center gap-1 text-xs text-accent">
                <Flame size={14} />
                {player.current_streak}d
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-xp">{player.total_xp} XP</p>
          <XpBar totalXp={player.total_xp} showLabel={false} className="mt-2" />
        </div>
      </div>
    </Card>
  )
}

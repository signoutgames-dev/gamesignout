import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'

export function GameCard({ game, sessionCount = 0, onClick, selected }) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:border-primary/50 ${selected ? 'border-primary glow-active' : ''}`}
      onClick={() => onClick?.(game)}
    >
      <div className="flex items-start gap-4">
        <span className="text-4xl">{game.icon}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-text">{game.name}</h3>
          {game.description && (
            <p className="mt-1 text-sm text-text-muted">{game.description}</p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="primary">{game.category}</Badge>
            <Badge variant="xp">{game.xp_multiplier}x XP</Badge>
            {sessionCount > 0 && (
              <Badge variant="default">{sessionCount} sessions</Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

import { LogIn } from 'lucide-react'
import { Button } from '../ui/Button'
import { Select } from '../ui/Input'
import { Card, CardHeader, CardTitle } from '../ui/Card'

export function SignInPanel({
  players,
  games,
  selectedPlayerId,
  selectedGameId,
  onPlayerChange,
  onGameChange,
  onSignIn,
  isLoading,
}) {
  const canSignIn = selectedPlayerId && selectedGameId

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Sign-In</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        <Select
          label="Player"
          value={selectedPlayerId}
          onChange={(e) => onPlayerChange(e.target.value)}
        >
          <option value="">Select a player</option>
          {players?.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (Lv. {p.level})
            </option>
          ))}
        </Select>
        <Select
          label="Game"
          value={selectedGameId}
          onChange={(e) => onGameChange(e.target.value)}
        >
          <option value="">Select a game</option>
          {games?.map((g) => (
            <option key={g.id} value={g.id}>
              {g.icon} {g.name}
            </option>
          ))}
        </Select>
        <Button
          onClick={onSignIn}
          disabled={!canSignIn || isLoading}
          className="w-full"
        >
          <LogIn size={18} />
          Sign In to Game
        </Button>
      </div>
    </Card>
  )
}

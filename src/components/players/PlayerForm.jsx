import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export function PlayerForm({ onSubmit, isLoading }) {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit(name.trim())
    setName('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        label="Player Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter player name"
        className="flex-1"
      />
      <div className="flex items-end">
        <Button type="submit" disabled={!name.trim() || isLoading}>
          <UserPlus size={18} />
          Add Player
        </Button>
      </div>
    </form>
  )
}

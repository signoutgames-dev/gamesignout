import { useState, useEffect } from 'react'
import { LogOut, Clock } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { formatDuration, getElapsedMs } from '../../lib/utils'

export function ActiveSessionCard({ session, onSignOut, isLoading }) {
  const [elapsed, setElapsed] = useState(getElapsedMs(session.signed_in_at))
  const [showModal, setShowModal] = useState(false)
  const [score, setScore] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(getElapsedMs(session.signed_in_at))
    }, 1000)
    return () => clearInterval(interval)
  }, [session.signed_in_at])

  const handleSignOut = () => {
    onSignOut({ sessionId: session.id, score: parseInt(score, 10) || 0 })
    setShowModal(false)
    setScore('')
  }

  return (
    <>
      <Card glow className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-3xl">{session.game?.icon}</span>
          <div>
            <p className="font-semibold text-text">{session.player?.name}</p>
            <p className="text-sm text-text-muted">{session.game?.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-primary">
            <Clock size={16} />
            {formatDuration(elapsed)}
          </div>
          <Button variant="accent" size="sm" onClick={() => setShowModal(true)}>
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </Card>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={`Sign Out — ${session.player?.name}`}
      >
        <p className="mb-4 text-sm text-text-muted">
          Playing {session.game?.name} for {formatDuration(elapsed)}
        </p>
        <Input
          label="Score"
          type="number"
          min="0"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Enter final score"
        />
        <div className="mt-6 flex gap-3">
          <Button variant="ghost" onClick={() => setShowModal(false)} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="accent"
            onClick={handleSignOut}
            disabled={isLoading}
            className="flex-1"
          >
            Complete Session
          </Button>
        </div>
      </Modal>
    </>
  )
}

import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Clock, Users, Layers, Lightbulb, BookOpen, Bookmark } from 'lucide-react'
import { useStore } from '../context/StoreContext'

const CAT_BG = {
  couple: 'linear-gradient(160deg, #3B5BDB 0%, #2243c4 100%)',
  party: 'linear-gradient(160deg, #E67700 0%, #b05800 100%)',
  deep: 'linear-gradient(160deg, #6741D9 0%, #4d2faa 100%)',
  friends: 'linear-gradient(160deg, #C92A2A 0%, #991f1f 100%)',
}

export function HowToPlay() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const { games } = useStore()
  const game = games.find(g => g.id === gameId)

  if (!game) {
    return (
      <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.4)' }}>Game not found</p>
          <button
            onClick={() => navigate('/play')}
            style={{ color: '#e8453c', background: 'none', border: '1px solid #e8453c', borderRadius: '999px', padding: '10px 20px', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}
          >
            Back to Browse
          </button>
        </div>
      </div>
    )
  }

  const bg = CAT_BG[game.category] || CAT_BG.deep
  const cardCount = game.cards?.length || 100
  const proTips = game.proTips || []
  const perfectFor = game.perfectFor || []

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column' }}>

      {/* Dark top nav */}
      <div style={{ background: '#000', padding: '48px 20px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <button
            onClick={() => navigate('/play')}
            style={{ background: '#1a1a1a', border: '1px solid #252525', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#252525' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a' }}
          >
            <ChevronLeft color="#fff" size={20} />
          </button>
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#fff', letterSpacing: '-0.2px' }}>How to Play</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[BookOpen, Bookmark].map((Icon, i) => (
              <button
                key={i}
                style={{ background: '#1a1a1a', border: '1px solid #252525', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Icon color="rgba(255,255,255,0.5)" size={16} />
              </button>
            ))}
          </div>
        </div>
        {/* Red accent line */}
        <div style={{ height: '3px', background: 'linear-gradient(90deg, #e8453c 0%, #ff6148 60%, transparent 100%)', borderRadius: '2px' }} />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '100px' }}>

        {/* Blue game info card */}
        <div style={{ background: bg, padding: '28px 24px 32px', position: 'relative', overflow: 'hidden' }}>
          {/* BG glow */}
          <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* Category label */}
          <p style={{ color: '#f5c542', fontWeight: 800, fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', margin: '0 0 10px', textShadow: '0 0 12px rgba(245,197,66,0.4)' }}>
            {game.category?.toUpperCase()} GAME
          </p>

          {/* Title */}
          <h1 style={{ fontSize: '38px', fontWeight: 900, lineHeight: 1.05, margin: '0 0 14px', letterSpacing: '-0.8px', color: '#fff' }}>
            {game.title}
          </h1>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {game.tags.map(tag => (
              <span key={tag} style={{
                background: 'rgba(0,0,0,0.28)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '999px',
                padding: '5px 13px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#fff',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          {game.description && (
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', margin: '0 0 20px', lineHeight: 1.65 }}>
              {game.description}
            </p>
          )}

          {/* Stats pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.28)', borderRadius: '999px', padding: '7px 14px', backdropFilter: 'blur(8px)' }}>
              <Clock size={13} color="rgba(255,255,255,0.7)" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{game.duration}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.28)', borderRadius: '999px', padding: '7px 14px', backdropFilter: 'blur(8px)' }}>
              <Users size={13} color="rgba(255,255,255,0.7)" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                {game.minPlayers}{game.minPlayers !== game.maxPlayers ? `–${game.maxPlayers}` : ''} players
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.28)', borderRadius: '999px', padding: '7px 14px', backdropFilter: 'blur(8px)' }}>
              <Layers size={13} color="rgba(255,255,255,0.7)" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{cardCount} cards</span>
            </div>
          </div>
        </div>

        {/* How to play steps */}
        <div style={{ padding: '28px 24px 0' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 20px', letterSpacing: '-0.3px', color: '#fff' }}>
            How to play
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {(game.rules || []).map(rule => (
              <div key={rule.step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  background: '#1742C5',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  minWidth: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '14px',
                  color: '#fff',
                  flexShrink: 0,
                }}>
                  {rule.step}
                </div>
                <div style={{ paddingTop: '6px' }}>
                  <p style={{ fontSize: '15px', lineHeight: 1.6, margin: 0, color: 'rgba(255,255,255,0.88)' }}>
                    {rule.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pro tips */}
        {proTips.length > 0 && (
          <div style={{ padding: '28px 24px 0' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 14px', letterSpacing: '-0.3px', color: '#fff' }}>
              Pro tips
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {proTips.map((tip, i) => (
                <div key={i} style={{
                  background: '#111',
                  border: '1px solid #1e1e1e',
                  borderRadius: '14px',
                  padding: '14px 16px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                }}>
                  <Lightbulb
                    color="#f5c542"
                    size={16}
                    style={{ minWidth: '16px', marginTop: '2px', filter: 'drop-shadow(0 0 6px rgba(245,197,66,0.45))' }}
                  />
                  <p style={{ fontSize: '14px', lineHeight: 1.55, margin: 0, color: 'rgba(255,255,255,0.8)' }}>
                    <strong style={{ color: '#fff' }}>{tip.split('.')[0]}.</strong>
                    {tip.includes('.') ? tip.slice(tip.indexOf('.') + 1) : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Perfect for */}
        {perfectFor.length > 0 && (
          <div style={{ padding: '28px 24px 0' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 14px', letterSpacing: '-0.3px', color: '#fff' }}>
              Perfect for
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {perfectFor.map(occasion => (
                <span key={occasion} style={{
                  background: '#111',
                  border: '1px solid #1e1e1e',
                  borderRadius: '999px',
                  padding: '9px 18px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.75)',
                }}>
                  {occasion}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Start Playing button */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 20px 28px',
        background: 'linear-gradient(to top, #0a0a0a 60%, transparent)',
        zIndex: 20,
      }}>
        <button
          onClick={() => navigate(`/play/${game.id}/cards`)}
          style={{
            background: 'linear-gradient(135deg, #e8453c, #ff6148)',
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            padding: '18px',
            fontSize: '15px',
            fontWeight: 900,
            letterSpacing: '0.5px',
            cursor: 'pointer',
            width: '100%',
            boxShadow: '0 4px 20px rgba(232,69,60,0.5)',
            transition: 'transform 0.1s, box-shadow 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(232,69,60,0.7)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(232,69,60,0.5)' }}
          onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
          onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          Start playing →
        </button>
      </div>

    </div>
  )
}

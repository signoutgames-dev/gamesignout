import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, AlertCircle, Bookmark, Lightbulb, Clock, Users } from 'lucide-react'
import { useStore } from '../context/StoreContext'

const TOTAL_DISPLAY = 100

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
          <button onClick={() => navigate('/play')} style={{ color: '#e8453c', background: 'none', border: '1px solid #e8453c', borderRadius: '999px', padding: '10px 20px', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}>Back to Browse</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Dark top nav */}
      <div style={{ background: '#000', padding: '48px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => navigate('/play')} style={{ background: '#1a1a1a', border: '1px solid #252525', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
            onMouseEnter={(e)=>{e.currentTarget.style.background='#252525'}} onMouseLeave={(e)=>{e.currentTarget.style.background='#1a1a1a'}}>
            <ChevronLeft color="#fff" size={20} />
          </button>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.5px' }}>
            01/{String(TOTAL_DISPLAY).padStart(3, '0')}
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[AlertCircle, Bookmark].map((Icon, i) => (
              <button key={i} style={{ background: '#1a1a1a', border: '1px solid #252525', borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon color="rgba(255,255,255,0.5)" size={16} />
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginTop: '12px', background: '#1a1a1a', borderRadius: '4px', height: '2px' }}>
          <div style={{ width: '1%', background: 'linear-gradient(90deg, #e8453c, #ff6b5b)', height: '100%', borderRadius: '4px' }} />
        </div>
      </div>

      {/* Blue content */}
      <div style={{ flex: 1, background: 'linear-gradient(160deg, #1a47d8 0%, #0f2ea8 100%)', color: '#fff', padding: '28px 24px 36px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        {/* BG circle accent */}
        <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '260px', height: '260px', background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Category label */}
        <p style={{ color: '#f5c542', fontWeight: 800, fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', margin: '0 0 6px', textShadow: '0 0 12px rgba(245,197,66,0.4)' }}>
          {game.category?.toUpperCase()} GAME
        </p>

        {/* Title */}
        <h1 style={{ fontSize: '36px', fontWeight: 900, lineHeight: 1.05, margin: '0 0 16px', letterSpacing: '-0.5px' }}>
          How to Play
        </h1>

        {/* Game meta pills */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.25)', borderRadius: '999px', padding: '7px 14px', backdropFilter: 'blur(8px)' }}>
            <Clock size={13} color="rgba(255,255,255,0.7)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{game.duration}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.25)', borderRadius: '999px', padding: '7px 14px', backdropFilter: 'blur(8px)' }}>
            <Users size={13} color="rgba(255,255,255,0.7)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
              {game.minPlayers}{game.minPlayers !== game.maxPlayers ? `–${game.maxPlayers}` : ''} players
            </span>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '999px', padding: '7px 14px', backdropFilter: 'blur(8px)' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>
              {game.cards?.length || 100} cards
            </span>
          </div>
        </div>

        {/* Rules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', flex: 1 }}>
          {(game.rules || []).map(rule => (
            <div key={rule.step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                background: 'rgba(0,0,0,0.35)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50%',
                width: '34px', height: '34px', minWidth: '34px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: '14px',
                backdropFilter: 'blur(8px)',
              }}>
                {rule.step}
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.6, margin: 0, paddingTop: '5px', color: 'rgba(255,255,255,0.92)' }}>
                {rule.text}
              </p>
            </div>
          ))}
        </div>

        {/* Tip */}
        {game.tip && (
          <div style={{ background: 'rgba(0,0,0,0.28)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px 18px', display: 'flex', gap: '12px', alignItems: 'flex-start', marginTop: '28px', marginBottom: '20px', backdropFilter: 'blur(8px)' }}>
            <Lightbulb color="#f5c542" size={17} style={{ minWidth: '17px', marginTop: '2px', filter: 'drop-shadow(0 0 6px rgba(245,197,66,0.5))' }} />
            <p style={{ fontSize: '13px', lineHeight: 1.6, margin: 0, color: 'rgba(255,255,255,0.8)' }}>{game.tip}</p>
          </div>
        )}

        {/* GOT IT button */}
        <button
          onClick={() => navigate(`/play/${game.id}/cards`)}
          style={{
            background: 'linear-gradient(135deg, #e8453c, #ff6148)',
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            padding: '17px',
            fontSize: '15px',
            fontWeight: 900,
            letterSpacing: '1.5px',
            cursor: 'pointer',
            width: '100%',
            boxShadow: '0 4px 20px rgba(232,69,60,0.5)',
            transition: 'transform 0.1s, box-shadow 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(232,69,60,0.7)' }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(232,69,60,0.5)' }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          GOT IT!
        </button>
      </div>
    </div>
  )
}

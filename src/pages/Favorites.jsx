import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ArrowRight, Trash2 } from 'lucide-react'
import { useGame } from '../context/GameContext'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

function EmptyState({ onBrowse }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '0 40px',
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          background: 'rgba(232,69,60,0.1)',
          border: '1px solid rgba(232,69,60,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <Heart size={32} color="#e8453c" />
      </div>
      <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 8px', color: '#fff' }}>
        No favorites yet
      </h2>
      <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', margin: '0 0 28px', lineHeight: 1.6, maxWidth: '280px' }}>
        Play a game and tap the ❤ on any card you want to save for later.
      </p>
      <button
        onClick={onBrowse}
        style={{
          background: '#e8453c',
          color: '#fff',
          border: 'none',
          borderRadius: '999px',
          padding: '12px 24px',
          fontSize: '14px',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'transform 0.1s',
        }}
        onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
        onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        Browse Games <ArrowRight size={15} />
      </button>
    </div>
  )
}

export function Favorites() {
  const navigate = useNavigate()
  const { favoritesList, toggleFavorite } = useGame()
  const isMobile = useIsMobile()

  // Group by game
  const byGame = favoritesList.reduce((acc, entry) => {
    const key = entry.gameId
    if (!acc[key]) acc[key] = { gameTitle: entry.gameTitle, gameId: entry.gameId, cards: [] }
    acc[key].cards.push(entry)
    return acc
  }, {})

  const groups = Object.values(byGame)

  return (
    <div
      style={{
        background: '#0a0a0a',
        minHeight: '100vh',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ padding: isMobile ? '24px 16px 16px' : '44px 36px 24px', borderBottom: '1px solid #1c1c1c' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <Heart size={22} color="#e8453c" fill="#e8453c" />
          <h1 style={{ fontSize: '28px', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>
            Favorites
          </h1>
          {favoritesList.length > 0 && (
            <span
              style={{
                background: '#e8453c',
                color: '#fff',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700,
                padding: '3px 10px',
              }}
            >
              {favoritesList.length}
            </span>
          )}
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
          Cards you've saved while playing
        </p>
      </div>

      {favoritesList.length === 0 ? (
        <EmptyState onBrowse={() => navigate('/play')} />
      ) : (
        <div style={{ padding: isMobile ? '20px 16px 48px' : '28px 36px 48px' }}>
          {groups.map((group) => (
            <div key={group.gameId} style={{ marginBottom: '36px' }}>
              {/* Game group header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '14px',
                }}
              >
                <div>
                  <p style={{ fontSize: '11px', letterSpacing: '1.8px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', margin: '0 0 3px' }}>
                    Game
                  </p>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#fff' }}>
                    {group.gameTitle}
                  </h2>
                </div>
                <button
                  onClick={() => navigate(`/play/${group.gameId}/cards`)}
                  style={{
                    background: 'rgba(23,66,197,0.15)',
                    border: '1px solid rgba(23,66,197,0.3)',
                    borderRadius: '999px',
                    padding: '7px 14px',
                    color: '#6b9fff',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(23,66,197,0.25)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(23,66,197,0.15)' }}
                >
                  Play again <ArrowRight size={12} />
                </button>
              </div>

              {/* Cards grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '10px',
                }}
              >
                {group.cards.map(({ card }) => (
                  <div
                    key={card.id}
                    style={{
                      background: '#1742C5',
                      borderRadius: '16px',
                      padding: '20px 22px',
                      position: 'relative',
                      animation: 'cardEnter 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
                    }}
                  >
                    <p
                      style={{
                        color: '#f5c542',
                        fontWeight: 700,
                        fontSize: '10px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        margin: '0 0 10px',
                      }}
                    >
                      {card.label}
                    </p>
                    <p
                      style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        lineHeight: 1.45,
                        color: '#fff',
                        margin: '0 0 14px',
                        paddingRight: '28px',
                      }}
                    >
                      {card.text}
                    </p>
                    {/* Remove button */}
                    <button
                      onClick={() => toggleFavorite(card, group.gameId, group.gameTitle)}
                      title="Remove from favorites"
                      style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        background: 'rgba(0,0,0,0.35)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(232,69,60,0.5)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.35)' }}
                    >
                      <Trash2 size={12} color="#fff" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

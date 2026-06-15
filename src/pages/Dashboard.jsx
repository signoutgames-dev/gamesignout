import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowRight, Flame, Heart, Gamepad2, Sparkles } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { useStore } from '../context/StoreContext'
import { CATEGORIES } from '../data/games'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

const CATEGORY_COLORS = {
  couple: '#e8453c',
  party: '#f5a623',
  deep: '#1742C5',
  friends: '#22c55e',
}

function StatCard({ icon: Icon, value, label, color }) {
  return (
    <div
      style={{
        background: '#111',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid #1c1c1c',
        flex: 1,
      }}
    >
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: `${color}18`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '14px',
        }}
      >
        <Icon size={18} color={color} />
      </div>
      <p style={{ fontSize: '32px', fontWeight: 900, margin: '0 0 4px', color: '#fff', lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', margin: 0, letterSpacing: '0.3px' }}>{label}</p>
    </div>
  )
}

function FeaturedGameCard({ game, onClick }) {
  const catColor = CATEGORY_COLORS[game.category] || '#1742C5'
  return (
    <div
      onClick={onClick}
      style={{
        background: '#1742C5',
        borderRadius: '18px',
        padding: '18px 20px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        borderLeft: `4px solid ${catColor === '#1742C5' ? 'rgba(255,255,255,0.25)' : catColor}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.015)'
        e.currentTarget.style.boxShadow = '0 6px 24px rgba(23,66,197,0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 800, fontSize: '16px', margin: '0 0 5px', color: '#fff' }}>{game.title}</p>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
          {game.duration} · {game.minPlayers}
          {game.minPlayers !== game.maxPlayers ? `–${game.maxPlayers}` : ''} players · {game.playCount} played
        </p>
        <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
          {game.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                background: 'rgba(0,0,0,0.35)',
                borderRadius: '999px',
                padding: '3px 10px',
                fontSize: '11px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginLeft: '12px',
        }}
      >
        <ArrowRight size={16} color="#fff" />
      </div>
    </div>
  )
}

export function Dashboard() {
  const navigate = useNavigate()
  const { stats, favoritesCount } = useGame()
  const { games } = useStore()
  const isMobile = useIsMobile()

  const featured = games.slice(0, 4)
  const categoryStats = CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
    ...c,
    count: games.filter((g) => g.category === c.id).length,
    color: CATEGORY_COLORS[c.id] || '#1742C5',
  }))

  return (
    <div
      style={{
        background: '#0a0a0a',
        minHeight: '100vh',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Hero banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0d0d0d 0%, #111827 50%, #0d1a3a 100%)',
          padding: isMobile ? '36px 20px 28px' : '48px 36px 40px',
          borderBottom: '1px solid #1c1c1c',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background accent glow */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '280px',
            height: '280px',
            background: 'radial-gradient(circle, rgba(23,66,197,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '30%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(232,69,60,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <p
          style={{
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            margin: '0 0 10px',
          }}
        >
          Welcome back
        </p>
        <h1
          style={{
            fontSize: isMobile ? '34px' : '42px',
            fontWeight: 900,
            margin: '0 0 10px',
            lineHeight: 1.05,
            letterSpacing: '-1px',
          }}
        >
          Ready for a<br />
          <span style={{ color: '#e8453c' }}>wild night?</span>
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', margin: '0 0 28px', lineHeight: 1.5 }}>
          Pick a game, deal the cards, let the chaos begin.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/play')}
            style={{
              background: '#e8453c',
              color: '#fff',
              border: 'none',
              borderRadius: '999px',
              padding: '13px 26px',
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '0.3px',
              transition: 'transform 0.1s, background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#cc3830' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#e8453c' }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            <Sparkles size={15} />
            Play Now
          </button>
          <button
            onClick={() => navigate('/play')}
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '999px',
              padding: '13px 26px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
            }}
          >
            Browse Games →
          </button>
        </div>
      </div>

      <div style={{ padding: isMobile ? '20px 16px 32px' : '36px 36px 48px' }}>
        {/* Stats row */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', margin: '0 0 16px' }}>
            Your Stats
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <StatCard icon={Gamepad2} value={stats.cardsPlayed} label="Cards Played" color="#1742C5" />
            <StatCard icon={Flame} value={stats.gamesPlayed} label="Games Started" color="#f5a623" />
            <StatCard icon={Heart} value={favoritesCount} label="Favorites" color="#e8453c" />
          </div>
        </div>

        {/* Categories quick-pick */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', margin: '0 0 16px' }}>
            Browse by Category
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {categoryStats.map(({ id, label, color, count }) => (
              <div
                key={id}
                onClick={() => navigate('/play')}
                style={{
                  background: `${color}12`,
                  border: `1px solid ${color}30`,
                  borderRadius: '14px',
                  padding: '16px 18px',
                  cursor: 'pointer',
                  transition: 'transform 0.15s, background 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${color}1e`
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${color}12`
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <div>
                  <p style={{ fontWeight: 700, fontSize: '14px', color: '#fff', margin: '0 0 3px' }}>{label}</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
                    {count} game{count !== 1 ? 's' : ''}
                  </p>
                </div>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: color,
                    flexShrink: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Featured games */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', margin: 0 }}>
              Featured Games
            </p>
            <button
              onClick={() => navigate('/play')}
              style={{
                background: 'none',
                border: 'none',
                color: '#e8453c',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                padding: 0,
                letterSpacing: '0.3px',
              }}
            >
              See all →
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {featured.map((game) => (
              <FeaturedGameCard
                key={game.id}
                game={game}
                onClick={() => navigate(`/play/${game.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

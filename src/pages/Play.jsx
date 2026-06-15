import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import { useStore } from '../context/StoreContext'

const CAT_COLORS = {
  couple: '#e8453c', party: '#f5a623', deep: '#1742C5',
  friends: '#22c55e', all: '#888',
}

export function Play() {
  const { games, categories } = useStore()
  const [active, setActive] = useState('couple')
  const navigate = useNavigate()

  const filtered = active === 'all' ? games : games.filter(g => g.category === active)

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Sticky header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <button onClick={() => navigate('/')} style={{ background: '#1a1a1a', border: '1px solid #252525', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ChevronLeft color="#fff" size={18} />
          </button>
          <h1 style={{ fontWeight: 900, fontSize: '22px', letterSpacing: '-0.5px', margin: 0, flex: 1 }}>Browse Games</h1>
        </div>
        {/* Category pills */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '14px' }}>
          {categories.map(cat => {
            const color = CAT_COLORS[cat.id] || '#888'
            const isActive = active === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                style={{
                  background: isActive ? color : '#141414',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                  border: isActive ? 'none' : '1px solid #252525',
                  borderRadius: '999px',
                  padding: '7px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? `0 0 16px ${color}55` : 'none',
                  letterSpacing: '0.3px',
                }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Game cards */}
      <div style={{ padding: '16px 20px 48px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0', color: 'rgba(255,255,255,0.25)' }}>
            <p style={{ fontSize: '32px', margin: '0 0 8px' }}>🃏</p>
            <p style={{ fontSize: '14px' }}>No games in this category yet.</p>
          </div>
        )}

        {filtered.map((game, index) => {
          const accentColor = CAT_COLORS[game.category] || '#1742C5'
          return (
            <div
              key={game.id}
              onClick={() => navigate(`/play/${game.id}`)}
              style={{
                background: 'linear-gradient(135deg, #1a47d8 0%, #1033aa 100%)',
                borderRadius: '22px',
                padding: '22px',
                cursor: 'pointer',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                boxShadow: '0 4px 24px rgba(23,66,197,0.25)',
                position: 'relative',
                overflow: 'hidden',
                animation: `slideInUp 0.38s ease ${index * 0.07}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(23,66,197,0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(23,66,197,0.25)'
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)' }}
            >
              {/* Background shimmer */}
              <div style={{ position: 'absolute', top: '-50%', right: '-20%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Category accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${accentColor}, transparent)`, borderRadius: '22px 22px 0 0' }} />

              {/* Title row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', gap: '12px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 900, lineHeight: 1.05, margin: 0, flex: 1, letterSpacing: '-0.5px' }}>{game.title}</h2>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: 0, fontWeight: 600 }}>{game.playCount} played</p>
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {game.tags.map(tag => (
                  <span key={tag} style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '999px', padding: '4px 12px', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta + arrow */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                  {game.duration} · {game.minPlayers}{game.minPlayers !== game.maxPlayers ? `–${game.maxPlayers}` : ''} players
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/play/${game.id}`) }}
                  style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    background: 'rgba(0,0,0,0.45)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)',
                    transition: 'background 0.15s, transform 0.1s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.7)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.45)' }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.9)' }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                >
                  <ArrowRight color="#fff" size={18} />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronLeft } from 'lucide-react'
import { useStore } from '../context/StoreContext'

const CAT_COLORS = {
  couple: '#3B5BDB', party: '#E67700', deep: '#6741D9',
  friends: '#C92A2A', all: '#555',
}

const CARD_BG = {
  couple: 'linear-gradient(145deg, #3B5BDB 0%, #2b4ab8 100%)',
  party: 'linear-gradient(145deg, #E67700 0%, #b85e00 100%)',
  deep: 'linear-gradient(145deg, #6741D9 0%, #4d2faa 100%)',
  friends: 'linear-gradient(145deg, #C92A2A 0%, #991f1f 100%)',
}

export function Play() {
  const { games, categories } = useStore()
  const [active, setActive] = useState('all')
  const navigate = useNavigate()

  const filtered = active === 'all' ? games : games.filter(g => g.category === active)

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Sticky header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 20px 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <button
            onClick={() => navigate('/')}
            style={{ background: '#1a1a1a', border: '1px solid #252525', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            <ChevronLeft color="#fff" size={18} />
          </button>
          <h1 style={{ fontWeight: 900, fontSize: '22px', letterSpacing: '-0.5px', margin: 0, flex: 1 }}>
            Browse Games
          </h1>
        </div>

        {/* Category pills with counts */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '14px' }}>
          {[{ id: 'all', label: 'All', count: games.length }, ...categories.filter(c => c.id !== 'all').map(c => ({
            ...c, count: games.filter(g => g.category === c.id).length,
          }))].map(cat => {
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
                  padding: '7px 16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'all 0.18s ease',
                  boxShadow: isActive ? `0 0 16px ${color}55` : 'none',
                }}
              >
                {cat.label}{cat.count != null ? ` ${cat.count}` : ''}
              </button>
            )
          })}
        </div>
      </div>

      {/* Game cards */}
      <div style={{ padding: '16px 20px 100px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '64px 0', color: 'rgba(255,255,255,0.25)' }}>
            <p style={{ fontSize: '32px', margin: '0 0 8px' }}>🃏</p>
            <p style={{ fontSize: '14px' }}>No games in this category yet.</p>
          </div>
        )}

        {filtered.map((game, index) => {
          const bg = CARD_BG[game.category] || CARD_BG.deep
          const accentColor = CAT_COLORS[game.category] || '#6741D9'
          return (
            <div
              key={game.id}
              onClick={() => navigate(`/play/${game.id}`)}
              style={{
                background: bg,
                borderRadius: '22px',
                padding: '22px',
                cursor: 'pointer',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                position: 'relative',
                overflow: 'hidden',
                animation: `slideInUp 0.38s ease ${index * 0.06}s both`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = `0 12px 40px ${accentColor}55`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
              onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-3px)' }}
            >
              {/* Shimmer */}
              <div style={{ position: 'absolute', top: '-50%', right: '-20%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

              {/* Title row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '12px' }}>
                <h2 style={{ fontSize: '26px', fontWeight: 900, lineHeight: 1.05, margin: 0, flex: 1, letterSpacing: '-0.5px' }}>
                  {game.title}
                </h2>
                <span style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '999px',
                  padding: '4px 11px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.75)',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}>
                  {game.playCount} played
                </span>
              </div>

              {/* Description */}
              {game.description && (
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.72)', margin: '0 0 14px', lineHeight: 1.55 }}>
                  {game.description}
                </p>
              )}

              {/* Vibe badge */}
              {game.vibe && (
                <div style={{ marginBottom: '16px' }}>
                  <span style={{
                    background: 'rgba(0,0,0,0.32)',
                    borderRadius: '999px',
                    padding: '5px 13px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.9)',
                  }}>
                    🔥 {game.vibe}
                  </span>
                </div>
              )}

              {/* Meta + arrow */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                  {game.duration} · {game.minPlayers}{game.minPlayers !== game.maxPlayers ? `–${game.maxPlayers}` : ''} players
                </span>
                <button
                  onClick={e => { e.stopPropagation(); navigate(`/play/${game.id}`) }}
                  style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.18)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.28)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
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

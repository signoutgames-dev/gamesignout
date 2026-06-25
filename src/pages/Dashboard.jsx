import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search, ArrowRight, Play } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { FIND_CATEGORIES } from '../data/games'

function timeAgo(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  if (seconds < 60) return 'Just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  return `${days} days ago`
}

export function Dashboard() {
  const navigate = useNavigate()
  const { games, moments } = useStore()
  const [sessions, setSessions] = useState([])

  const sortedMoments = [...moments].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('signout_sessions') || '[]')
    setSessions(saved.slice(0, 2))
  }, [])

  const featured = games.find(g => g.id === 'never-have-i-ever') || games[0]

  return (
    <div style={{
      background: '#0a0a0a',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>

      {/* Header */}
      <div style={{
        padding: '52px 20px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{ fontWeight: 900, fontSize: '24px', margin: 0, letterSpacing: '-0.5px', color: '#fff' }}>
          signout
        </h1>
        <button
          onClick={() => navigate('/play')}
          style={{
            background: '#1a1a1a',
            border: '1px solid #252525',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Search size={17} color="rgba(255,255,255,0.7)" />
        </button>
      </div>

      {/* Hero */}
      <div style={{ padding: '0 20px' }}>
        <p style={{
          fontSize: '11px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)',
          margin: '0 0 14px',
        }}>
          200+ decks &middot; New drops weekly
        </p>
        <h2 style={{
          fontSize: '40px',
          fontWeight: 900,
          lineHeight: 1.08,
          margin: '0 0 14px',
          letterSpacing: '-1.5px',
        }}>
          A deck for every<br />
          <span style={{ color: '#e8453c' }}>room, trip, mood</span><br />
          &amp; moment.
        </h2>
        <p style={{
          fontSize: '14px',
          color: 'rgba(255,255,255,0.45)',
          margin: '0 0 24px',
          lineHeight: 1.65,
        }}>
          Hundreds of card games in one app. Open one and you're playing in seconds — wherever you are, whoever's around.
        </p>
        <button
          onClick={() => navigate('/play')}
          style={{
            width: '100%',
            background: '#e8453c',
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            padding: '17px',
            fontSize: '16px',
            fontWeight: 800,
            cursor: 'pointer',
            letterSpacing: '0.2px',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#cc3830' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#e8453c' }}
          onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.98)' }}
          onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          Pick a deck
        </button>
      </div>

      {/* Tonight's Pick */}
      {featured && (
        <div style={{ padding: '32px 20px 0' }}>
          <div
            onClick={() => navigate(`/play/${featured.id}`)}
            style={{
              background: '#111',
              border: '1px solid #1e1e1e',
              borderRadius: '22px',
              padding: '20px',
              cursor: 'pointer',
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#161616' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#111' }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#f5a623',
                margin: '0 0 10px',
              }}>
                🔥 Tonight's Pick
              </p>
              <h3 style={{ fontSize: '26px', fontWeight: 900, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
                {featured.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: '0 0 12px', lineHeight: 1.55 }}>
                {featured.description}
              </p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {featured.tags.map(tag => (
                  <span key={tag} style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '999px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.7)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
                {featured.duration} · {featured.minPlayers}–{featured.maxPlayers} players · {featured.playCount} played
              </p>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px',
            }}>
              <ArrowRight size={18} color="#000" />
            </div>
          </div>
        </div>
      )}

      {/* Cards for every moment */}
      <div style={{ padding: '36px 0 0' }}>
        <div style={{ padding: '0 20px', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.5px' }}>
            Cards for every moment
          </h3>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.38)', margin: 0 }}>
            However you gather — there's a deck for it.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '0 20px' }}>
          {sortedMoments.map(moment => {
            const gameCount = (moment.gameIds ?? []).length
            const firstGame = moment.gameIds?.[0]
            return (
            <div
              key={moment.id}
              onClick={() => firstGame && navigate(`/play/${firstGame}`)}
              style={{
                background: moment.color,
                borderRadius: '18px',
                padding: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                cursor: firstGame ? 'pointer' : 'default',
                transition: 'opacity 0.15s',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseDown={e => { e.currentTarget.style.opacity = '0.88' }}
              onMouseUp={e => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              <div style={{
                width: '58px',
                height: '58px',
                borderRadius: '12px',
                background: 'rgba(0,0,0,0.25)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(255,255,255,0.18)' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontWeight: 900, fontSize: '17px', margin: '0 0 3px', letterSpacing: '-0.3px' }}>
                  {moment.title}
                </h4>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: '0 0 9px', lineHeight: 1.4 }}>
                  {moment.subtitle}
                </p>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {moment.tags.map(tag => (
                    <span key={tag} style={{
                      background: 'rgba(0,0,0,0.22)',
                      borderRadius: '999px',
                      padding: '3px 9px',
                      fontSize: '10px',
                      fontWeight: 700,
                      color: 'rgba(255,255,255,0.85)',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <ArrowRight size={15} color="#fff" />
              </div>
              {gameCount > 1 && (
                <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.28)', borderRadius: '999px', padding: '3px 9px', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>
                  {gameCount} decks
                </span>
              )}
            </div>
            )
          })}
        </div>
      </div>

      {/* Jump back in */}
      {sessions.length > 0 && (
        <div style={{ padding: '36px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>Jump back in</h3>
            <button
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
            >
              History
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {sessions.map(session => {
              const pct = Math.min(100, Math.round((session.cardIndex / session.totalCards) * 100))
              return (
                <div
                  key={session.gameId}
                  onClick={() => navigate(`/play/${session.gameId}/cards`)}
                  style={{
                    background: session.color || '#1742C5',
                    borderRadius: '16px',
                    padding: '16px',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseDown={e => { e.currentTarget.style.opacity = '0.88' }}
                  onMouseUp={e => { e.currentTarget.style.opacity = '1' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: '#e8453c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Play size={12} color="#fff" fill="#fff" />
                  </div>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: 'rgba(0,0,0,0.25)',
                    marginBottom: '10px',
                  }} />
                  <h4 style={{ fontWeight: 800, fontSize: '13px', margin: '0 0 3px', paddingRight: '38px', lineHeight: 1.3 }}>
                    {session.gameTitle}
                  </h4>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', margin: '0 0 12px' }}>
                    {timeAgo(session.timestamp)}
                  </p>
                  <div style={{ height: '3px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: 'rgba(255,255,255,0.85)', borderRadius: '2px' }} />
                  </div>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', margin: '4px 0 0', textAlign: 'right' }}>
                    {pct}%
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Find your game */}
      <div style={{ padding: '36px 20px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>Find your game</h3>
          <button
            onClick={() => navigate('/play')}
            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
          >
            See all
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {FIND_CATEGORIES.map(cat => (
            <div
              key={cat.id}
              onClick={() => navigate('/play')}
              style={{
                background: cat.color,
                borderRadius: '18px',
                padding: '20px 16px',
                cursor: 'pointer',
                minHeight: '90px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'opacity 0.15s',
              }}
              onMouseDown={e => { e.currentTarget.style.opacity = '0.88' }}
              onMouseUp={e => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
              }} />
              <h4 style={{ fontWeight: 900, fontSize: '14px', margin: '0 0 4px', lineHeight: 1.3 }}>{cat.label}</h4>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)', margin: '0 0 5px', fontWeight: 600 }}>{cat.count}</p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{cat.meta}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

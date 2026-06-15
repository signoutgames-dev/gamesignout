import { useState, useEffect } from 'react'
import { Flame, Trophy, Star, Medal, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useGame } from '../context/GameContext'
import { db } from '../lib/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

const RANK_COLORS = { 1: '#f5c542', 2: '#b8b8cc', 3: '#cd7f32' }
const RANK_ICONS  = { 1: Trophy, 2: Star, 3: Medal }
const RANK_EMOJI  = { 1: '🥇', 2: '🥈', 3: '🥉' }

const MILESTONES = [
  { label: 'First Deal',      icon: '🎯', threshold: 1,   type: 'cards', desc: 'Play your first card' },
  { label: 'On a Roll',       icon: '🔥', threshold: 25,  type: 'cards', desc: '25 cards played' },
  { label: 'Card Shark',      icon: '🃏', threshold: 100, type: 'cards', desc: '100 cards played' },
  { label: 'Game Night Pro',  icon: '🏆', threshold: 5,   type: 'games', desc: 'Start 5 different games' },
  { label: 'Storyteller',     icon: '📖', threshold: 200, type: 'cards', desc: '200 cards played' },
  { label: 'Legend',          icon: '👑', threshold: 500, type: 'cards', desc: '500 cards played' },
]

const NAME_COLORS = ['#e8453c', '#1742C5', '#f5a623', '#22c55e', '#a855f7', '#06b6d4']

function PlayerAvatar({ player, size = 40 }) {
  if (player?.photoURL) {
    return (
      <img
        src={player.photoURL}
        alt=""
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
      />
    )
  }
  const name = player?.displayName || '?'
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
  const color = NAME_COLORS[(name.charCodeAt(0) || 0) % NAME_COLORS.length]
  const color2 = NAME_COLORS[(name.charCodeAt(0) + 2 || 2) % NAME_COLORS.length]
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${color}, ${color2})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 800, fontSize: size * 0.35, color: '#fff', flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

export function Leaderboard() {
  const { user, login, loading: authLoading } = useAuth()
  const { stats } = useGame()
  const [players, setPlayers]       = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!user) { setLoadingData(false); return }
    const unsub = onSnapshot(collection(db, 'users'), snap => {
      const list = snap.docs
        .map(d => ({ uid: d.id, ...d.data() }))
        .filter(p => (p.cardsPlayed ?? 0) > 0)
        .sort((a, b) => (b.cardsPlayed ?? 0) - (a.cardsPlayed ?? 0))
        .slice(0, 10)
        .map((p, i) => ({ ...p, rank: i + 1 }))
      setPlayers(list)
      setLoadingData(false)
    })
    return () => unsub()
  }, [user])

  /* ── auth gate ── */
  if (authLoading) return null
  if (!user) {
    return (
      <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '360px', animation: 'fadeSlideUp 0.4s ease both' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(232,69,60,0.1)', border: '2px solid rgba(232,69,60,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Lock color="#e8453c" size={28} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', margin: '0 0 10px', letterSpacing: '-0.3px' }}>
            Sign in to view the Leaderboard
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', margin: '0 0 28px', lineHeight: 1.6 }}>
            See where you rank among other players. Sign in to track your progress and compete.
          </p>
          <button
            onClick={login}
            style={{ background: '#fff', color: '#111', border: 'none', borderRadius: '999px', padding: '13px 28px', fontSize: '14px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', transition: 'transform 0.1s' }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            <svg width="16" height="16" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    )
  }

  /* ── podium (2nd · 1st · 3rd) ── */
  const podiumOrder = [players[1], players[0], players[2]]

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Header */}
      <div style={{ padding: isMobile ? '24px 16px 20px' : '44px 36px 28px', borderBottom: '1px solid #1c1c1c', background: 'linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <Trophy size={22} color="#f5c542" />
          <h1 style={{ fontSize: '28px', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>Leaderboard</h1>
          {players.length > 0 && (
            <span style={{ background: 'rgba(245,197,66,0.12)', color: '#f5c542', borderRadius: '999px', fontSize: '11px', fontWeight: 700, padding: '3px 9px', border: '1px solid rgba(245,197,66,0.2)', animation: 'popIn 0.4s ease both' }}>
              {players.length} player{players.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
          Top players · Ranked by cards played
        </p>
      </div>

      <div style={{ padding: isMobile ? '20px 16px 48px' : '32px 36px 48px' }}>

        {/* Loading skeleton */}
        {loadingData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[...Array(5)].map((_, i) => (
              <div key={i} style={{ height: '62px', background: '#111', borderRadius: '12px', opacity: 1 - i * 0.15 }} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loadingData && players.length === 0 && (
          <div style={{ textAlign: 'center', padding: '72px 20px', animation: 'fadeSlideUp 0.4s ease both' }}>
            <div style={{ fontSize: '52px', marginBottom: '16px' }}>🏆</div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 8px', color: '#fff' }}>No one's on the board yet</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.6 }}>
              Start playing cards to claim the #1 spot!
            </p>
          </div>
        )}

        {!loadingData && players.length > 0 && (
          <>
            {/* Podium — only shown with 2+ players */}
            {players.length >= 2 && (
              <div style={{ marginBottom: '36px' }}>
                <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', margin: '0 0 18px' }}>
                  Top Players
                </p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                  {podiumOrder.map((player, i) => {
                    if (!player) return <div key={i} style={{ flex: 1 }} />
                    const rank = player.rank
                    const color = RANK_COLORS[rank] || 'rgba(255,255,255,0.3)'
                    const RankIcon = RANK_ICONS[rank] || Trophy
                    const height = rank === 1 ? '140px' : rank === 2 ? '110px' : '90px'
                    const isMe = player.uid === user.uid
                    return (
                      <div key={player.uid} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px', animation: `popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.1}s both` }}>
                        {isMe && (
                          <span style={{ fontSize: '9px', letterSpacing: '1.5px', fontWeight: 900, color: '#e8453c', textTransform: 'uppercase' }}>YOU</span>
                        )}
                        <div style={{ width: rank === 1 ? '52px' : '42px', height: rank === 1 ? '52px' : '42px', borderRadius: '50%', border: `2px solid ${color}`, overflow: 'hidden', flexShrink: 0 }}>
                          <PlayerAvatar player={player} size={rank === 1 ? 52 : 42} />
                        </div>
                        <p style={{ fontSize: '12px', fontWeight: 700, color: '#fff', margin: 0, textAlign: 'center', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {player.displayName?.split(' ')[0] || 'Player'}
                        </p>
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                          {player.cardsPlayed} cards
                        </p>
                        <div style={{ width: '100%', height, background: `${color}14`, border: `1px solid ${color}28`, borderRadius: '10px 10px 4px 4px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '10px' }}>
                          <RankIcon size={20} color={color} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Rankings list */}
            <div style={{ marginBottom: '44px' }}>
              <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', margin: '0 0 14px' }}>
                Rankings
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {players.map((player, index) => {
                  const isTop3 = player.rank <= 3
                  const rankColor = RANK_COLORS[player.rank]
                  const isMe = player.uid === user.uid
                  return (
                    <div
                      key={player.uid}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px 14px',
                        background: isMe ? 'rgba(232,69,60,0.08)' : (isTop3 ? `${rankColor}08` : '#111'),
                        borderRadius: '12px',
                        border: isMe ? '1px solid rgba(232,69,60,0.22)' : (isTop3 ? `1px solid ${rankColor}22` : '1px solid #1c1c1c'),
                        animation: `rankRowIn 0.35s ease ${index * 0.05}s both`,
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => { if (!isMe) e.currentTarget.style.background = isTop3 ? `${rankColor}12` : '#161616' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = isMe ? 'rgba(232,69,60,0.08)' : (isTop3 ? `${rankColor}08` : '#111') }}
                    >
                      {/* Rank badge */}
                      <div style={{ width: '28px', textAlign: 'center', fontSize: isTop3 ? '18px' : '13px', fontWeight: 800, color: rankColor || 'rgba(255,255,255,0.3)', flexShrink: 0, lineHeight: 1 }}>
                        {isTop3 ? RANK_EMOJI[player.rank] : `#${player.rank}`}
                      </div>

                      {/* Avatar */}
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: `1px solid ${isTop3 ? `${rankColor}40` : '#2a2a2a'}`, flexShrink: 0 }}>
                        <PlayerAvatar player={player} size={36} />
                      </div>

                      {/* Name */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '14px', fontWeight: 700, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '130px' }}>
                            {player.displayName || 'Player'}
                          </span>
                          {isMe && (
                            <span style={{ fontSize: '9px', fontWeight: 900, color: '#e8453c', background: 'rgba(232,69,60,0.15)', padding: '2px 6px', borderRadius: '999px', letterSpacing: '0.5px', flexShrink: 0 }}>
                              YOU
                            </span>
                          )}
                        </p>
                        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: '2px 0 0' }}>
                          {player.gamesPlayed ?? 0} games started
                        </p>
                      </div>

                      {/* Score */}
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{ fontSize: '16px', fontWeight: 900, color: isTop3 ? rankColor : '#fff', margin: 0 }}>
                          {player.cardsPlayed}
                        </p>
                        <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: '2px 0 0' }}>cards</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* Milestones — always shown for the current user */}
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', margin: '0 0 14px' }}>
            Your Milestones
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: '10px' }}>
            {MILESTONES.map((m, i) => {
              const value    = m.type === 'cards' ? stats.cardsPlayed : stats.gamesPlayed
              const unlocked = value >= m.threshold
              return (
                <div
                  key={m.label}
                  style={{
                    background: unlocked ? 'rgba(245,197,66,0.07)' : '#111',
                    border: `1px solid ${unlocked ? 'rgba(245,197,66,0.22)' : '#1c1c1c'}`,
                    borderRadius: '14px', padding: '16px',
                    display: 'flex', gap: '10px', alignItems: 'flex-start',
                    opacity: unlocked ? 1 : 0.45,
                    animation: `slideInUp 0.4s ease ${i * 0.05 + 0.1}s both`,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <span style={{ fontSize: '22px', flexShrink: 0, filter: unlocked ? 'none' : 'grayscale(1)' }}>
                    {m.icon}
                  </span>
                  <div>
                    <p style={{ fontSize: '12px', fontWeight: 700, color: unlocked ? '#f5c542' : '#fff', margin: '0 0 2px' }}>
                      {m.label}
                    </p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.4 }}>
                      {m.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

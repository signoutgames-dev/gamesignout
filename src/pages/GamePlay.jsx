import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, AlertCircle, Bookmark, Heart, ArrowLeft, ArrowRight } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { useGame } from '../context/GameContext'
import { useAuth } from '../context/AuthContext'

const SIGNIN_TRIGGER = 20

function TopBar({ onBack, cardIndex, total, bg = '#000' }) {
  const progress = total > 0 ? ((cardIndex + 1) / total) * 100 : 0
  const dark = bg === '#000'
  const btnBg = dark ? '#1a1a1a' : 'rgba(0,0,0,0.22)'
  const btnBorder = dark ? '1px solid #252525' : '1px solid rgba(255,255,255,0.1)'

  return (
    <div style={{ background: bg, padding: '48px 20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={onBack}
          style={{ background: btnBg, border: btnBorder, borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.9)' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          <ChevronLeft color="#fff" size={20} />
        </button>
        <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.5px', background: dark ? '#1a1a1a' : 'rgba(0,0,0,0.25)', padding: '5px 12px', borderRadius: '999px', border: dark ? '1px solid #252525' : '1px solid rgba(255,255,255,0.1)' }}>
          {String(cardIndex + 1).padStart(2, '0')}/{String(total).padStart(3, '0')}
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[AlertCircle, Bookmark].map((Icon, i) => (
            <button key={i} style={{ background: btnBg, border: btnBorder, borderRadius: '50%', width: '38px', height: '38px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon color="rgba(255,255,255,0.5)" size={16} />
            </button>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', height: '3px' }}>
        <div style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #e8453c, #ff6148)', height: '100%', borderRadius: '4px', transition: 'width 0.4s ease', boxShadow: '0 0 8px rgba(232,69,60,0.5)' }} />
      </div>
    </div>
  )
}

function SignInGate({ onMaybeLater, onBack, cardIndex, total, onSignedIn }) {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const remaining = total - SIGNIN_TRIGGER

  const handleGoogle = async () => {
    setLoading(true)
    try { await login(); onSignedIn() }
    finally { setLoading(false) }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(160deg, #1a47d8 0%, #0f2ea8 100%)', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', zIndex: 100, animation: 'fadeSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards' }}>
      <TopBar onBack={onBack} cardIndex={cardIndex} total={total} bg="transparent" />
      <div style={{ flex: 1, padding: '40px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '480px', margin: '0 auto', width: '100%' }}>
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '999px', padding: '6px 16px', display: 'inline-flex', alignItems: 'center', marginBottom: '16px', width: 'fit-content' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1px' }}>🔥 YOU'RE ON A ROLL</span>
        </div>
        <h1 style={{ fontSize: '38px', fontWeight: 900, lineHeight: 1.05, margin: '0 0 12px', letterSpacing: '-0.5px' }}>Keep the night going.</h1>
        <p style={{ fontSize: '15px', lineHeight: 1.6, margin: '0 0 28px', color: 'rgba(255,255,255,0.7)' }}>Sign in to unlock {remaining} more cards and save the ones you love.</p>
        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '18px 20px', marginBottom: '28px', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '4px', height: '4px', marginBottom: '14px', overflow: 'hidden' }}>
            <div style={{ width: `${(SIGNIN_TRIGGER / total) * 100}%`, background: 'linear-gradient(90deg, #e8453c, #ff6148)', height: '100%', borderRadius: '4px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>{SIGNIN_TRIGGER} cards played</p>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#ff6b6b' }}>+{remaining} more unlocked</p>
          </div>
        </div>
        <button
          onClick={handleGoogle} disabled={loading}
          style={{ background: '#fff', color: '#1a1a1a', border: 'none', borderRadius: '999px', padding: '15px 24px', fontSize: '14px', fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px', width: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', transition: 'transform 0.1s', opacity: loading ? 0.7 : 1 }}
          onMouseDown={(e) => { if (!loading) e.currentTarget.style.transform = 'scale(0.98)' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          {loading ? 'Signing in…' : 'Continue with Google'}
        </button>
        <p style={{ textAlign: 'center', fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '0 0 16px' }}>
          Continue progress · Save favorites · More Cards
        </p>
        <button
          onClick={onMaybeLater}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', padding: '8px', textAlign: 'center', width: '100%', transition: 'color 0.15s' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
        >
          Maybe Later
        </button>
      </div>
    </div>
  )
}

export function GamePlay() {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const { games } = useStore()
  const { isFavorited, toggleFavorite, recordCardPlayed, recordGameStarted } = useGame()
  const { user } = useAuth()
  const game = games.find(g => g.id === gameId)

  const [cardIndex, setCardIndex]     = useState(0)
  const [showSignIn, setShowSignIn]   = useState(false)
  const [isExiting, setIsExiting]     = useState(false)
  const [exitDir, setExitDir]         = useState(0)
  const [cardKey, setCardKey]         = useState(0)
  const [dragX, setDragX]             = useState(0)
  const [heartBeat, setHeartBeat]     = useState(false)
  const [showHint, setShowHint]       = useState(true)
  const dragStartX   = useRef(null)
  const advanceTimer = useRef(null)
  const heartTimer   = useRef(null)

  useEffect(() => { if (game) recordGameStarted(game.id) }, [game?.id]) // eslint-disable-line

  // Persist session progress so Dashboard can show "Jump back in"
  useEffect(() => {
    if (!game || cardIndex === 0) return
    const sessions = JSON.parse(localStorage.getItem('signout_sessions') || '[]')
    const filtered = sessions.filter(s => s.gameId !== game.id)
    const session = {
      gameId: game.id,
      gameTitle: game.title,
      cardIndex,
      totalCards: game.cards?.length || 100,
      timestamp: Date.now(),
      color: game.color || '#1742C5',
    }
    localStorage.setItem('signout_sessions', JSON.stringify([session, ...filtered].slice(0, 5)))
  }, [cardIndex, game?.id]) // eslint-disable-line

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 2800)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    return () => {
      clearTimeout(advanceTimer.current)
      clearTimeout(heartTimer.current)
    }
  }, [])

  if (!game) {
    return (
      <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.4)' }}>Game not found</p>
          <button onClick={() => navigate('/play')} style={{ color: '#e8453c', background: 'none', border: '1px solid #e8453c', borderRadius: '999px', padding: '10px 20px', cursor: 'pointer', fontSize: '14px', fontWeight: 700 }}>Browse Games</button>
        </div>
      </div>
    )
  }

  const total = game.cards?.length || 0
  const currentCard = game.cards[cardIndex]

  const advanceCard = (dir) => {
    if (isExiting) return
    const next = cardIndex + dir
    if (dir === 1 && next >= SIGNIN_TRIGGER && !user) { setShowSignIn(true); return }
    if (next < 0 || next >= total) return
    if (dir === 1) recordCardPlayed()
    setExitDir(dir)
    setIsExiting(true)
    clearTimeout(advanceTimer.current)
    advanceTimer.current = setTimeout(() => { setCardIndex(next); setCardKey(k => k + 1); setIsExiting(false) }, 220)
  }
  const goNext = () => advanceCard(1)
  const goPrev = () => advanceCard(-1)

  /* touch swipe */
  const onTouchStart = (e) => { dragStartX.current = e.touches[0].clientX }
  const onTouchMove  = (e) => {
    if (dragStartX.current === null) return
    const dx = e.touches[0].clientX - dragStartX.current
    setDragX(Math.max(-120, Math.min(120, dx)))
  }
  const onTouchEnd   = () => {
    if      (dragX < -60) goNext()
    else if (dragX >  60) goPrev()
    dragStartX.current = null
    setDragX(0)
  }

  /* heart pop */
  const handleFavorite = () => {
    if (!currentCard) return
    toggleFavorite(currentCard, game.id, game.title)
    setHeartBeat(true)
    clearTimeout(heartTimer.current)
    heartTimer.current = setTimeout(() => setHeartBeat(false), 450)
  }

  /* card visual state */
  let cardStyle = {}
  if (dragX !== 0) {
    cardStyle = {
      transform: `translateX(${dragX * 0.45}px) rotate(${dragX * 0.022}deg)`,
      transition: 'none',
      animation: 'none',
    }
  } else if (isExiting) {
    cardStyle = {
      transform: `translateX(${exitDir * -90}px) rotate(${exitDir * -4}deg) scale(0.92)`,
      opacity: 0,
      transition: 'transform 0.22s ease, opacity 0.22s ease',
      animation: 'none',
    }
  } else {
    cardStyle = {
      transform: 'translateX(0) rotate(0) scale(1)',
      opacity: 1,
      transition: 'none',
      animation: 'cardEnter 0.36s cubic-bezier(0.34,1.56,0.64,1) forwards',
    }
  }

  const isFav = isFavorited(currentCard?.id)
  const swipeMag = Math.abs(dragX)

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex', flexDirection: 'column', maxWidth: '480px', margin: '0 auto' }}>
      <TopBar onBack={() => navigate('/play')} cardIndex={cardIndex} total={total} bg="#000" />

      {/* Card area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 20px' }}>
        <div
          key={cardKey}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            background: 'linear-gradient(145deg, #1e4fe0 0%, #1033aa 100%)',
            borderRadius: '28px',
            padding: '44px 32px',
            width: '100%',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 8px 40px rgba(23,66,197,0.5), 0 32px 64px rgba(0,0,0,0.4)',
            position: 'relative',
            overflow: 'hidden',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'pan-y',
            ...cardStyle,
          }}
        >
          {/* Highlight shimmer */}
          <div style={{ position: 'absolute', top: '-60%', left: '-20%', width: '140%', height: '80%', background: 'radial-gradient(ellipse, rgba(255,255,255,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />

          {/* Swipe direction glow edges */}
          {dragX > 20 && (
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'linear-gradient(to bottom, transparent 0%, #22c55e 50%, transparent 100%)', borderRadius: '28px 0 0 28px', opacity: Math.min(1, (dragX - 20) / 50) }} />
          )}
          {dragX < -20 && (
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '4px', background: 'linear-gradient(to bottom, transparent 0%, #e8453c 50%, transparent 100%)', borderRadius: '0 28px 28px 0', opacity: Math.min(1, (-dragX - 20) / 50) }} />
          )}

          {/* Drag direction label */}
          {swipeMag > 25 && (
            <div style={{ position: 'absolute', top: '18px', left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: Math.min(1, (swipeMag - 25) / 35), pointerEvents: 'none' }}>
              <span style={{ fontSize: '10px', fontWeight: 900, letterSpacing: '2px', color: dragX > 0 ? '#22c55e' : '#ff6148', background: `rgba(${dragX > 0 ? '34,197,94' : '232,69,60'},0.15)`, padding: '4px 12px', borderRadius: '999px', border: `1px solid ${dragX > 0 ? 'rgba(34,197,94,0.3)' : 'rgba(232,69,60,0.3)'}` }}>
                {dragX > 0 ? '← PREV' : 'NEXT →'}
              </span>
            </div>
          )}

          <p style={{ color: '#f5c542', fontWeight: 800, fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', margin: '0 0 18px', textShadow: '0 0 12px rgba(245,197,66,0.4)' }}>
            {currentCard?.label}
          </p>
          <p style={{ fontSize: '26px', fontWeight: 900, lineHeight: 1.3, color: '#fff', margin: 0, letterSpacing: '-0.3px' }}>
            {currentCard?.text}
          </p>

          {/* First-card swipe hint */}
          {showHint && cardIndex === 0 && (
            <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', animation: 'swipeHintAnim 2.4s ease 0.6s both', pointerEvents: 'none' }}>
              <ArrowLeft size={13} color="rgba(255,255,255,0.4)" />
              <span style={{ fontSize: '10px', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>SWIPE TO NAVIGATE</span>
              <ArrowRight size={13} color="rgba(255,255,255,0.4)" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ padding: '0 20px 52px', display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
        <button
          onClick={goPrev}
          disabled={cardIndex === 0}
          style={{ width: '60px', height: '60px', borderRadius: '50%', background: cardIndex === 0 ? '#141414' : 'linear-gradient(135deg, #e8453c, #ff5a4a)', border: cardIndex === 0 ? '1px solid #252525' : 'none', cursor: cardIndex === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: cardIndex === 0 ? 0.3 : 1, transition: 'all 0.2s', boxShadow: cardIndex === 0 ? 'none' : '0 4px 20px rgba(232,69,60,0.4)' }}
          onMouseDown={(e) => { if (cardIndex > 0) e.currentTarget.style.transform = 'scale(0.9)' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          onTouchStart={(e) => { if (cardIndex > 0) e.currentTarget.style.transform = 'scale(0.9)'; e.stopPropagation() }}
          onTouchEnd={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.stopPropagation() }}
        >
          <ArrowLeft color="#fff" size={24} />
        </button>

        <button
          onClick={handleFavorite}
          style={{ width: '52px', height: '52px', borderRadius: '50%', background: isFav ? 'rgba(232,69,60,0.2)' : '#161616', border: `2px solid ${isFav ? '#e8453c' : '#252525'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s, border-color 0.2s', animation: heartBeat ? 'heartPop 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'none' }}
          onTouchStart={(e) => { e.stopPropagation() }}
        >
          <Heart color={isFav ? '#e8453c' : 'rgba(255,255,255,0.5)'} fill={isFav ? '#e8453c' : 'none'} size={20} />
        </button>

        <button
          onClick={goNext}
          style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #e8453c, #ff5a4a)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(232,69,60,0.4)', transition: 'transform 0.1s, box-shadow 0.15s', animation: 'glowPulse 2.5s ease-in-out infinite' }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(232,69,60,0.65)' }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(232,69,60,0.4)' }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.9)'; e.currentTarget.style.animation = 'none' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.animation = 'glowPulse 2.5s ease-in-out infinite' }}
          onTouchStart={(e) => { e.currentTarget.style.transform = 'scale(0.9)'; e.stopPropagation() }}
          onTouchEnd={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.stopPropagation() }}
        >
          <ArrowRight color="#fff" size={24} />
        </button>
      </div>

      {showSignIn && (
        <SignInGate
          onMaybeLater={() => setShowSignIn(false)}
          onBack={() => navigate('/play')}
          cardIndex={cardIndex}
          total={total}
          onSignedIn={() => setShowSignIn(false)}
        />
      )}
    </div>
  )
}

import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { LayoutDashboard, Gamepad2, Heart, Trophy, LogIn, LogOut, User } from 'lucide-react'
import { useGame } from '../../context/GameContext'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/', icon: LayoutDashboard, label: 'Home', end: true },
  { to: '/play', icon: Gamepad2, label: 'Play' },
  { to: '/favorites', icon: Heart, label: 'Favorites' },
  { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

function sidebarNavStyle({ isActive }) {
  return {
    display: 'flex', alignItems: 'center', gap: '11px',
    padding: '10px 12px', borderRadius: '10px',
    fontSize: '14px', fontWeight: 600, textDecoration: 'none',
    color: isActive ? '#e8453c' : 'rgba(255,255,255,0.5)',
    background: isActive ? 'rgba(232,69,60,0.08)' : 'transparent',
    marginBottom: '3px', transition: 'all 0.15s ease',
    borderLeft: `3px solid ${isActive ? '#e8453c' : 'transparent'}`,
  }
}

export function AppLayout() {
  const { favoritesCount, stats } = useGame()
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const handleLogout = async () => { await logout(); navigate('/') }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '240px', background: '#080808', borderRight: '1px solid #1c1c1c', display: 'flex', flexDirection: 'column', zIndex: 40 }}>
          {/* Logo */}
          <div style={{ padding: '28px 24px 22px', borderBottom: '1px solid #1c1c1c' }}>
            <h1 style={{ fontWeight: 900, fontSize: '22px', color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>signout</h1>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.28)', margin: '4px 0 0', letterSpacing: '0.5px' }}>CARD GAME NIGHT</p>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, padding: '14px 12px', overflowY: 'auto' }}>
            <p style={{ fontSize: '10px', letterSpacing: '1.8px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', padding: '0 12px', marginBottom: '10px', marginTop: '4px' }}>Menu</p>
            {NAV.map(({ to, icon: Icon, label, end }) => (
              <NavLink key={to} to={to} end={end} style={sidebarNavStyle}>
                <Icon size={17} />
                <span style={{ flex: 1 }}>{label}</span>
                {label === 'Favorites' && favoritesCount > 0 && (
                  <span style={{ background: '#e8453c', color: '#fff', borderRadius: '999px', fontSize: '10px', fontWeight: 700, padding: '2px 7px' }}>{favoritesCount}</span>
                )}
              </NavLink>
            ))}

            {/* Progress mini-card */}
            <div style={{ margin: '20px 0 0', padding: '14px', background: '#111', borderRadius: '12px', border: '1px solid #1c1c1c' }}>
              <p style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', margin: '0 0 12px' }}>Your progress</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
                <div>
                  <p style={{ fontSize: '22px', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>{stats.cardsPlayed}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: '4px 0 0' }}>Cards</p>
                </div>
                <div style={{ width: '1px', background: '#1c1c1c' }} />
                <div>
                  <p style={{ fontSize: '22px', fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1 }}>{stats.gamesPlayed}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: '4px 0 0' }}>Games</p>
                </div>
                <div style={{ width: '1px', background: '#1c1c1c' }} />
                <div>
                  <p style={{ fontSize: '22px', fontWeight: 900, color: '#e8453c', margin: 0, lineHeight: 1 }}>{favoritesCount}</p>
                  <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: '4px 0 0' }}>Saved</p>
                </div>
              </div>
            </div>
          </nav>

          {/* User section */}
          <div style={{ padding: '16px 12px', borderTop: '1px solid #1c1c1c' }}>
            {user ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 6px', marginBottom: '8px' }}>
                  {user.photoURL
                    ? <img src={user.photoURL} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #1c1c1c' }} />
                    : <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #e8453c, #ff6148)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, color: '#fff' }}>{user.displayName?.[0] ?? '?'}</div>
                  }
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.displayName}</p>
                    <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</p>
                  </div>
                </div>
                <button onClick={handleLogout}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid #1c1c1c', borderRadius: '10px', padding: '9px 14px', color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#e8453c'; e.currentTarget.style.borderColor = 'rgba(232,69,60,0.3)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = '#1c1c1c' }}>
                  <LogOut size={13} /> Sign out
                </button>
              </div>
            ) : (
              <button onClick={login}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', background: 'rgba(232,69,60,0.1)', border: '1px solid rgba(232,69,60,0.25)', borderRadius: '10px', padding: '11px 14px', color: '#e8453c', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(232,69,60,0.18)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(232,69,60,0.1)' }}>
                <LogIn size={15} /> Sign in to save progress
              </button>
            )}
          </div>
        </aside>
      )}

      {/* Main content */}
      <main style={{ marginLeft: isMobile ? 0 : '240px', flex: 1, minHeight: '100vh', paddingBottom: isMobile ? '72px' : 0 }}>
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      {isMobile && (
        <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '64px', background: '#080808', borderTop: '1px solid #1c1c1c', display: 'flex', alignItems: 'center', zIndex: 50, paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {NAV.map(({ to, icon: Icon, label, end }) => (
            <NavLink key={to} to={to} end={end} style={({ isActive }) => ({
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '4px', textDecoration: 'none', padding: '8px 0',
              color: isActive ? '#e8453c' : 'rgba(255,255,255,0.35)',
              transition: 'color 0.15s',
              position: 'relative',
            })}>
              {({ isActive }) => (
                <>
                  <div style={{ position: 'relative' }}>
                    <Icon size={22} />
                    {label === 'Favorites' && favoritesCount > 0 && (
                      <span style={{ position: 'absolute', top: '-4px', right: '-6px', background: '#e8453c', color: '#fff', borderRadius: '999px', fontSize: '9px', fontWeight: 700, padding: '1px 4px', minWidth: '14px', textAlign: 'center' }}>{favoritesCount}</span>
                    )}
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: isActive ? 700 : 500, letterSpacing: '0.3px' }}>{label}</span>
                  {isActive && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '24px', height: '2px', background: '#e8453c', borderRadius: '0 0 2px 2px' }} />}
                </>
              )}
            </NavLink>
          ))}

          {/* Profile tab */}
          <button onClick={user ? handleLogout : login}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', color: 'rgba(255,255,255,0.35)' }}>
            {user?.photoURL
              ? <img src={user.photoURL} alt="" style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
              : <User size={22} />
            }
            <span style={{ fontSize: '10px', fontWeight: 500, color: user ? '#e8453c' : 'rgba(255,255,255,0.35)' }}>{user ? 'Me' : 'Sign in'}</span>
          </button>
        </nav>
      )}
    </div>
  )
}

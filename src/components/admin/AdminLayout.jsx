import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Gamepad2, MessageSquare, Tag, List, LogOut, ExternalLink, Layers } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

const NAV = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/games', icon: Gamepad2, label: 'Games' },
  { to: '/admin/questions', icon: MessageSquare, label: 'Questions' },
  { to: '/admin/moments', icon: Layers, label: 'Moments' },
  { to: '/admin/categories', icon: List, label: 'Categories' },
  { to: '/admin/tags', icon: Tag, label: 'Tags' },
]

const C = {
  bg: '#0a0a0a',
  sidebar: '#080808',
  border: '#1c1c1c',
  card: '#111',
  red: '#e8453c',
  text: '#fff',
  muted: 'rgba(255,255,255,0.4)',
}

function navStyle({ isActive }) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 600,
    textDecoration: 'none',
    color: isActive ? C.red : C.muted,
    background: isActive ? 'rgba(232,69,60,0.08)' : 'transparent',
    marginBottom: '2px',
    transition: 'all 0.15s',
    borderLeft: `2px solid ${isActive ? C.red : 'transparent'}`,
  }
}

export function AdminLayout() {
  const { logout } = useAdmin()
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bg, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '220px', background: C.sidebar, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column' }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px 20px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Gamepad2 size={14} color="#fff" />
            </div>
            <span style={{ fontWeight: 900, fontSize: '16px', color: C.text }}>signout</span>
          </div>
          <span style={{ fontSize: '10px', color: C.muted, letterSpacing: '1.5px', textTransform: 'uppercase', paddingLeft: '36px' }}>Admin Panel</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px' }}>
          <p style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', padding: '0 10px', margin: '4px 0 8px' }}>Manage</p>
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} style={navStyle}>
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 10px', borderTop: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: 'transparent', border: 'none', color: C.muted, fontSize: '12px', fontWeight: 600, cursor: 'pointer', borderRadius: '6px', transition: 'color 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.muted }}
          >
            <ExternalLink size={13} /> View User App
          </button>
          <button
            onClick={logout}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: 'rgba(232,69,60,0.08)', border: '1px solid rgba(232,69,60,0.2)', borderRadius: '6px', color: C.red, fontSize: '12px', fontWeight: 700, cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(232,69,60,0.16)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(232,69,60,0.08)' }}
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: '220px', flex: 1, minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  )
}

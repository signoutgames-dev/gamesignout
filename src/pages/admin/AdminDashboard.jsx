import { useNavigate } from 'react-router-dom'
import { Gamepad2, MessageSquare, List, Tag, ArrowRight } from 'lucide-react'
import { useStore } from '../../context/StoreContext'

function StatCard({ icon: Icon, value, label, color, to, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '14px', padding: '22px', cursor: 'pointer', transition: 'border-color 0.15s, transform 0.15s', flex: 1 }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: `${color}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
        <Icon size={17} color={color} />
      </div>
      <p style={{ fontSize: '30px', fontWeight: 900, color: '#fff', margin: '0 0 4px', lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', margin: 0 }}>{label}</p>
    </div>
  )
}

export function AdminDashboard() {
  const { games, categories, tags } = useStore()
  const navigate = useNavigate()

  const totalCards = games.reduce((s, g) => s + (g.cards?.length || 0), 0)

  const QUICK = [
    { label: 'Add a New Game', desc: 'Create a game with rules and metadata', to: '/admin/games', color: '#1742C5' },
    { label: 'Add Questions', desc: 'Add prompt cards to existing games', to: '/admin/questions', color: '#e8453c' },
    { label: 'Manage Categories', desc: 'Add or rename game categories', to: '/admin/categories', color: '#f5a623' },
    { label: 'Manage Tags', desc: 'Add or remove tags used on games', to: '/admin/tags', color: '#22c55e' },
  ]

  return (
    <div style={{ padding: '36px 32px 48px', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.5px' }}>Dashboard</h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>signout admin · Content management</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '36px', flexWrap: 'wrap' }}>
        <StatCard icon={Gamepad2} value={games.length} label="Total Games" color="#1742C5" onClick={() => navigate('/admin/games')} />
        <StatCard icon={MessageSquare} value={totalCards} label="Total Questions" color="#e8453c" onClick={() => navigate('/admin/questions')} />
        <StatCard icon={List} value={categories.length} label="Categories" color="#f5a623" onClick={() => navigate('/admin/categories')} />
        <StatCard icon={Tag} value={tags.length} label="Tags" color="#22c55e" onClick={() => navigate('/admin/tags')} />
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: '36px' }}>
        <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', margin: '0 0 14px' }}>Quick Actions</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {QUICK.map(({ label, desc, to, color }) => (
            <div
              key={to}
              onClick={() => navigate(to)}
              style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '16px 18px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'border-color 0.15s, background 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = '#141414' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.background = '#111' }}
            >
              <div>
                <p style={{ fontWeight: 700, fontSize: '14px', color: '#fff', margin: '0 0 3px' }}>{label}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>{desc}</p>
              </div>
              <ArrowRight size={15} color={color} />
            </div>
          ))}
        </div>
      </div>

      {/* Games overview */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', margin: 0 }}>Games Overview</p>
          <button onClick={() => navigate('/admin/games')} style={{ background: 'none', border: 'none', color: '#e8453c', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>Manage all →</button>
        </div>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', overflow: 'hidden' }}>
          {games.slice(0, 6).map((g, i) => (
            <div
              key={g.id}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < Math.min(games.length, 6) - 1 ? '1px solid #1a1a1a' : 'none' }}
            >
              <div>
                <p style={{ fontWeight: 700, fontSize: '13px', color: '#fff', margin: '0 0 2px' }}>{g.title}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>{g.category} · {g.duration} · {g.minPlayers}–{g.maxPlayers} players</p>
              </div>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', background: '#1a1a1a', padding: '3px 10px', borderRadius: '999px' }}>
                {g.cards?.length || 0} cards
              </span>
            </div>
          ))}
          {games.length === 0 && (
            <p style={{ textAlign: 'center', padding: '24px', color: 'rgba(255,255,255,0.3)', fontSize: '13px', margin: 0 }}>No games yet. Add one →</p>
          )}
        </div>
      </div>
    </div>
  )
}

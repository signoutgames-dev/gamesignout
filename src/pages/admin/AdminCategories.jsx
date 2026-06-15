import { useState } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { useStore } from '../../context/StoreContext'

const inp = {
  background: '#161616', border: '1px solid #252525', borderRadius: '8px',
  color: '#fff', fontSize: '13px', padding: '9px 12px', outline: 'none', fontFamily: 'inherit',
}

export function AdminCategories() {
  const { categories, games, addCategory, editCategory, deleteCategory } = useStore()
  const [newId, setNewId] = useState('')
  const [newLabel, setNewLabel] = useState('')
  const [editing, setEditing] = useState(null) // { id, label }

  const gameCount = (catId) => games.filter(g => g.category === catId).length

  const handleAdd = () => {
    const id = newId.trim().toLowerCase().replace(/\s+/g, '-')
    const label = newLabel.trim()
    if (!id || !label) return
    if (categories.find(c => c.id === id)) return
    addCategory({ id, label })
    setNewId('')
    setNewLabel('')
  }

  const handleEdit = (id) => {
    if (!editing?.label.trim()) return
    editCategory(id, { label: editing.label.trim() })
    setEditing(null)
  }

  const handleDelete = (id, label) => {
    if (gameCount(id) > 0) { alert(`"${label}" is used by ${gameCount(id)} game(s). Reassign them first.`); return }
    if (window.confirm(`Delete category "${label}"?`)) deleteCategory(id)
  }

  const cats = categories.filter(c => c.id !== 'all')

  return (
    <div style={{ padding: '36px 32px 48px', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.3px' }}>Categories</h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>Organize games by category</p>
      </div>

      {/* Add form */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', margin: '0 0 12px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Add Category</p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            style={{ ...inp, flex: '0 0 140px' }}
            placeholder="ID (e.g. friends)"
            value={newId}
            onChange={(e) => setNewId(e.target.value)}
            onFocus={(e) => { e.target.style.borderColor = '#e8453c' }}
            onBlur={(e) => { e.target.style.borderColor = '#252525' }}
          />
          <input
            style={{ ...inp, flex: 1 }}
            placeholder="Display label (e.g. Friends)"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onFocus={(e) => { e.target.style.borderColor = '#e8453c' }}
            onBlur={(e) => { e.target.style.borderColor = '#252525' }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd() }}
          />
          <button
            onClick={handleAdd}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#e8453c', border: 'none', borderRadius: '8px', padding: '9px 16px', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px 100px', padding: '10px 16px', borderBottom: '1px solid #1e1e1e', background: '#0d0d0d' }}>
          {['ID', 'Label', 'Games', 'Actions'].map(h => (
            <span key={h} style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</span>
          ))}
        </div>

        {[{ id: 'all', label: 'All', locked: true }, ...cats].map((c, i) => (
          <div
            key={c.id}
            style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px 100px', padding: '12px 16px', borderBottom: i < cats.length ? '1px solid #1a1a1a' : 'none', alignItems: 'center', transition: 'background 0.12s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#141414' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            <code style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', background: '#1a1a1a', padding: '2px 8px', borderRadius: '4px' }}>{c.id}</code>

            {editing?.id === c.id ? (
              <input
                style={{ ...inp }}
                value={editing.label}
                onChange={(e) => setEditing(ed => ({ ...ed, label: e.target.value }))}
                onFocus={(e) => { e.target.style.borderColor = '#e8453c' }}
                onBlur={(e) => { e.target.style.borderColor = '#252525' }}
                autoFocus
              />
            ) : (
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{c.label}</span>
            )}

            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{c.id === 'all' ? '—' : gameCount(c.id)}</span>

            <div style={{ display: 'flex', gap: '6px' }}>
              {c.locked ? (
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', background: '#1a1a1a', padding: '3px 8px', borderRadius: '4px' }}>locked</span>
              ) : editing?.id === c.id ? (
                <>
                  <button onClick={() => handleEdit(c.id)} style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: '#22c55e' }}><Check size={12} /></button>
                  <button onClick={() => setEditing(null)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid #252525', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}><X size={12} /></button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditing({ id: c.id, label: c.label })} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid #252525', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}><Pencil size={12} /></button>
                  <button onClick={() => handleDelete(c.id, c.label)} style={{ background: 'rgba(232,69,60,0.1)', border: '1px solid rgba(232,69,60,0.2)', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: '#e8453c' }}><Trash2 size={12} /></button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

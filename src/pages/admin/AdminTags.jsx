import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useStore } from '../../context/StoreContext'

export function AdminTags() {
  const { tags, games, addTag, deleteTag } = useStore()
  const [input, setInput] = useState('')

  const tagUsage = (tag) => games.filter(g => g.tags?.includes(tag)).length

  const handleAdd = () => {
    const t = input.trim()
    if (!t) return
    addTag(t)
    setInput('')
  }

  const handleDelete = (tag) => {
    const count = tagUsage(tag)
    if (count > 0 && !window.confirm(`"${tag}" is used by ${count} game(s). Remove tag anyway?`)) return
    deleteTag(tag)
  }

  return (
    <div style={{ padding: '36px 32px 48px', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.3px' }}>Tags</h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>Labels used to describe game themes</p>
      </div>

      {/* Add */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', margin: '0 0 12px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Add Tag</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            style={{ background: '#161616', border: '1px solid #252525', borderRadius: '8px', color: '#fff', fontSize: '13px', padding: '9px 12px', flex: 1, outline: 'none', fontFamily: 'inherit' }}
            placeholder="e.g. Spicy, Romantic, Wild…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={(e) => { e.target.style.borderColor = '#e8453c' }}
            onBlur={(e) => { e.target.style.borderColor = '#252525' }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleAdd() }}
          />
          <button
            onClick={handleAdd}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#e8453c', border: 'none', borderRadius: '8px', padding: '9px 16px', color: '#fff', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      {/* Tag cloud */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '20px', minHeight: '120px' }}>
        <p style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', margin: '0 0 16px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
          All Tags · {tags.length} total
        </p>
        {tags.length === 0 && (
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px', margin: 0 }}>No tags yet — add some above.</p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {tags.map(tag => (
            <div
              key={tag}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', border: '1px solid #252525', borderRadius: '999px', padding: '6px 14px', transition: 'border-color 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#e8453c' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#252525' }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{tag}</span>
              {tagUsage(tag) > 0 && (
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', background: '#111', borderRadius: '999px', padding: '1px 6px' }}>×{tagUsage(tag)}</span>
              )}
              <button
                onClick={() => handleDelete(tag)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.3)', padding: '0', display: 'flex', alignItems: 'center', transition: 'color 0.12s' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#e8453c' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)' }}
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Usage table */}
      {tags.length > 0 && (
        <div style={{ marginTop: '20px', background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '10px 16px', borderBottom: '1px solid #1e1e1e', background: '#0d0d0d', display: 'flex', gap: '0' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', textTransform: 'uppercase', flex: 1 }}>Games using each tag</span>
          </div>
          {tags.filter(t => tagUsage(t) > 0).map((tag, i, arr) => (
            <div key={tag} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 16px', borderBottom: i < arr.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{tag}</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', background: '#1a1a1a', padding: '3px 10px', borderRadius: '999px' }}>
                {tagUsage(tag)} game{tagUsage(tag) !== 1 ? 's' : ''}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

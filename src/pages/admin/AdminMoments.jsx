import { useState, useMemo } from 'react'
import { Plus, Edit2, Trash2, X, Search } from 'lucide-react'
import { useStore } from '../../context/StoreContext'

const COLOR_PRESETS = ['#3B5BDB', '#C92A2A', '#2F9E44', '#E67700', '#6741D9', '#0CA678', '#862E9C', '#1971C2', '#E03131', '#F76707']

const BLANK = { id: '', title: '', subtitle: '', color: '#3B5BDB', tags: '', gameIds: [], order: 0 }

function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const labelStyle = {
  display: 'block', fontSize: '11px', fontWeight: 700,
  color: 'rgba(255,255,255,0.4)', letterSpacing: '0.8px',
  textTransform: 'uppercase', marginBottom: '7px',
}
const inputStyle = {
  background: '#0d0d0d', border: '1px solid #252525', borderRadius: '8px',
  padding: '9px 12px', color: '#fff', fontSize: '13px', width: '100%',
  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
}

export function AdminMoments() {
  const { moments, games, addMoment, editMoment, deleteMoment } = useStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState(BLANK)
  const [gameSearch, setGameSearch] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)

  const sortedMoments = useMemo(
    () => [...moments].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [moments]
  )

  const filteredGames = useMemo(() => {
    const q = gameSearch.toLowerCase()
    return !q ? games : games.filter(g =>
      g.title.toLowerCase().includes(q) || (g.category ?? '').toLowerCase().includes(q)
    )
  }, [games, gameSearch])

  function set(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function openAdd() {
    setForm({ ...BLANK, order: moments.length })
    setIsEditing(false)
    setGameSearch('')
    setModalOpen(true)
  }

  function openEdit(m) {
    setForm({ ...m, tags: (m.tags ?? []).join(', '), gameIds: m.gameIds ?? [] })
    setIsEditing(true)
    setGameSearch('')
    setModalOpen(true)
  }

  function toggleGame(id) {
    setForm(f => {
      const ids = f.gameIds ?? []
      return { ...f, gameIds: ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id] }
    })
  }

  function removeGame(id) {
    setForm(f => ({ ...f, gameIds: (f.gameIds ?? []).filter(x => x !== id) }))
  }

  async function save() {
    if (!form.title.trim()) return
    setSaving(true)
    const id = isEditing ? form.id : (form.id.trim() || toSlug(form.title))
    const data = {
      id,
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      color: form.color,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      gameIds: form.gameIds ?? [],
      order: Number(form.order) || 0,
    }
    if (isEditing) await editMoment(id, data)
    else await addMoment(data)
    setSaving(false)
    setModalOpen(false)
  }

  async function doDelete(id) {
    await deleteMoment(id)
    setConfirmDelete(null)
  }

  const selectedGames = (form.gameIds ?? [])
    .map(id => games.find(g => g.id === id))
    .filter(Boolean)

  const previewTags = form.tags.split(',').map(t => t.trim()).filter(Boolean)

  return (
    <div style={{ padding: '32px', minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontWeight: 900, fontSize: '22px', margin: '0 0 5px' }}>Moments</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            Home page moment cards — tag games to each moment, set order and colour.
          </p>
        </div>
        <button
          onClick={openAdd}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', background: '#e8453c', border: 'none', borderRadius: '9px', padding: '10px 18px', color: '#fff', fontSize: '13px', fontWeight: 800, cursor: 'pointer', flexShrink: 0 }}
        >
          <Plus size={15} /> Add Moment
        </button>
      </div>

      {/* List */}
      {sortedMoments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}>
          No moments yet — create your first one.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sortedMoments.map(m => {
            const mGames = (m.gameIds ?? []).map(id => games.find(g => g.id === id)).filter(Boolean)
            return (
              <div
                key={m.id}
                style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '14px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: `4px solid ${m.color}` }}
              >
                {/* Color pill preview */}
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: m.color, flexShrink: 0 }} />

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <span style={{ fontWeight: 800, fontSize: '15px' }}>{m.title}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', background: '#1a1a1a', border: '1px solid #252525', borderRadius: '4px', padding: '1px 6px' }}>order {m.order ?? 0}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '0 0 8px' }}>{m.subtitle || '—'}</p>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {(m.tags ?? []).map(tag => (
                      <span key={tag} style={{ fontSize: '10px', fontWeight: 600, color: m.color, background: `${m.color}18`, border: `1px solid ${m.color}35`, borderRadius: '999px', padding: '2px 8px' }}>{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Game count + preview */}
                <div style={{ textAlign: 'right', flexShrink: 0, minWidth: '130px' }}>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: '0 0 6px' }}>
                    <strong style={{ color: '#fff', fontSize: '14px' }}>{mGames.length}</strong> game{mGames.length !== 1 ? 's' : ''} tagged
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-end' }}>
                    {mGames.slice(0, 2).map((g, i) => (
                      <span key={g.id} style={{ fontSize: '10px', color: i === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)', background: '#1a1a1a', border: '1px solid #252525', borderRadius: '4px', padding: '1px 7px', whiteSpace: 'nowrap', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {i === 0 && <span style={{ color: '#e8453c', marginRight: '4px', fontSize: '9px' }}>★</span>}
                        {g.title}
                      </span>
                    ))}
                    {mGames.length > 2 && <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>+{mGames.length - 2} more</span>}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <button onClick={() => openEdit(m)} style={{ background: '#1a1a1a', border: '1px solid #252525', borderRadius: '7px', padding: '7px 9px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}><Edit2 size={13} /></button>
                  <button onClick={() => setConfirmDelete(m)} style={{ background: 'rgba(232,69,60,0.08)', border: '1px solid rgba(232,69,60,0.2)', borderRadius: '7px', padding: '7px 9px', color: '#e8453c', cursor: 'pointer' }}><Trash2 size={13} /></button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: '20px' }}
          onClick={e => { if (e.target === e.currentTarget && !saving) setModalOpen(false) }}
        >
          <div style={{ background: '#111', border: '1px solid #222', borderRadius: '18px', width: '100%', maxWidth: '620px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,0.85)' }}>

            {/* Modal header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #1e1e1e' }}>
              <h2 style={{ fontWeight: 800, fontSize: '16px', margin: 0 }}>{isEditing ? 'Edit Moment' : 'New Moment'}</h2>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Preview strip */}
              <div style={{ background: form.color, borderRadius: '14px', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'rgba(0,0,0,0.25)', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 900, fontSize: '16px', margin: '0 0 3px', color: '#fff' }}>{form.title || 'Moment Title'}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: '0 0 8px' }}>{form.subtitle || 'Subtitle goes here'}</p>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {previewTags.slice(0, 3).map(t => (
                      <span key={t} style={{ background: 'rgba(0,0,0,0.22)', borderRadius: '999px', padding: '2px 8px', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Title + ID */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Title *</label>
                  <input
                    value={form.title}
                    onChange={e => { set('title', e.target.value); if (!isEditing) set('id', toSlug(e.target.value)) }}
                    placeholder="e.g. Corporate Break"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>ID (slug)</label>
                  <input
                    value={form.id}
                    onChange={e => set('id', toSlug(e.target.value))}
                    placeholder="auto-generated"
                    disabled={isEditing}
                    style={{ ...inputStyle, opacity: isEditing ? 0.45 : 1, cursor: isEditing ? 'not-allowed' : 'text' }}
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label style={labelStyle}>Subtitle</label>
                <input
                  value={form.subtitle}
                  onChange={e => set('subtitle', e.target.value)}
                  placeholder="e.g. Break the ice, not the meeting."
                  style={inputStyle}
                />
              </div>

              {/* Color */}
              <div>
                <label style={labelStyle}>Card Color</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {COLOR_PRESETS.map(c => (
                    <button
                      key={c}
                      onClick={() => set('color', c)}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', background: c, border: form.color === c ? '3px solid #fff' : '3px solid transparent', cursor: 'pointer', flexShrink: 0, transition: 'border-color 0.1s' }}
                    />
                  ))}
                  <input
                    type="text"
                    value={form.color}
                    onChange={e => set('color', e.target.value)}
                    placeholder="#hex"
                    style={{ ...inputStyle, width: '90px', fontFamily: 'monospace', fontSize: '12px', padding: '6px 10px' }}
                  />
                </div>
              </div>

              {/* Tags + Order row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Tags <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(comma-separated)</span></label>
                  <input
                    value={form.tags}
                    onChange={e => set('tags', e.target.value)}
                    placeholder="Quick, Team, Indoor"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={e => set('order', e.target.value)}
                    style={inputStyle}
                    min="0"
                  />
                </div>
              </div>

              {/* Game selector */}
              <div>
                <label style={labelStyle}>
                  Tagged Games
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}> — ★ first game is featured on home page</span>
                </label>

                {/* Selected chips */}
                {selectedGames.length > 0 && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                    {selectedGames.map((g, i) => (
                      <span key={g.id} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: i === 0 ? 'rgba(232,69,60,0.12)' : '#1a1a1a', border: `1px solid ${i === 0 ? 'rgba(232,69,60,0.35)' : '#2a2a2a'}`, borderRadius: '999px', padding: '4px 10px 4px 8px', fontSize: '12px', color: i === 0 ? '#e8453c' : 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                        {i === 0 && <span style={{ fontSize: '9px', background: '#e8453c', color: '#fff', borderRadius: '3px', padding: '1px 4px', fontWeight: 800 }}>FEATURED</span>}
                        {g.title}
                        <button onClick={() => removeGame(g.id)} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, lineHeight: 1, opacity: 0.6 }}><X size={11} /></button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Search */}
                <div style={{ position: 'relative', marginBottom: '8px' }}>
                  <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
                  <input
                    value={gameSearch}
                    onChange={e => setGameSearch(e.target.value)}
                    placeholder="Search games…"
                    style={{ ...inputStyle, paddingLeft: '32px' }}
                  />
                </div>

                {/* Game checkbox list */}
                <div style={{ background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: '10px', maxHeight: '220px', overflowY: 'auto' }}>
                  {filteredGames.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '20px', color: 'rgba(255,255,255,0.2)', fontSize: '13px', margin: 0 }}>No games found</p>
                  ) : filteredGames.map(g => {
                    const checked = (form.gameIds ?? []).includes(g.id)
                    return (
                      <label
                        key={g.id}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderBottom: '1px solid #141414', cursor: 'pointer', background: checked ? 'rgba(232,69,60,0.05)' : 'transparent', transition: 'background 0.1s' }}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleGame(g.id)}
                          style={{ accentColor: '#e8453c', width: '14px', height: '14px', flexShrink: 0, cursor: 'pointer' }}
                        />
                        <span style={{ flex: 1, fontSize: '13px', color: checked ? '#fff' : 'rgba(255,255,255,0.55)', fontWeight: checked ? 700 : 400 }}>{g.title}</span>
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', background: '#1a1a1a', border: '1px solid #222', borderRadius: '4px', padding: '1px 6px', textTransform: 'capitalize' }}>{g.category}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Save / Cancel */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '4px' }}>
                <button
                  onClick={() => setModalOpen(false)}
                  disabled={saving}
                  style={{ background: 'transparent', border: '1px solid #252525', borderRadius: '8px', padding: '10px 18px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={save}
                  disabled={saving || !form.title.trim()}
                  style={{ background: saving || !form.title.trim() ? '#2a2a2a' : '#e8453c', border: 'none', borderRadius: '8px', padding: '10px 24px', color: saving || !form.title.trim() ? 'rgba(255,255,255,0.3)' : '#fff', fontSize: '13px', fontWeight: 800, cursor: saving || !form.title.trim() ? 'not-allowed' : 'pointer' }}
                >
                  {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Moment'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 400 }}>
          <div style={{ background: '#111', border: '1px solid #222', borderRadius: '16px', padding: '28px 32px', maxWidth: '360px', width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '14px' }}>🗑</div>
            <h3 style={{ fontWeight: 800, fontSize: '17px', margin: '0 0 8px' }}>Delete "{confirmDelete.title}"?</h3>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: '0 0 24px', lineHeight: 1.5 }}>
              This removes the moment from the home page. Tagged games are not affected.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => setConfirmDelete(null)} style={{ background: 'transparent', border: '1px solid #252525', borderRadius: '8px', padding: '9px 22px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => doDelete(confirmDelete.id)} style={{ background: '#e8453c', border: 'none', borderRadius: '8px', padding: '9px 22px', color: '#fff', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

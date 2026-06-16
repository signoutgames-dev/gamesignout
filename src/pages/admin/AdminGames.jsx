import { useState } from 'react'
import { Plus, Pencil, Trash2, MessageSquare, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'

const BLANK = { title: '', category: 'couple', tags: '', duration: '15 min', minPlayers: 2, maxPlayers: 8, rule1: '', rule2: '', rule3: '', tip: '', labels: [], levels: [] }

const inp = (extra = {}) => ({
  background: '#161616', border: '1px solid #252525', borderRadius: '8px',
  color: '#fff', fontSize: '13px', padding: '10px 12px', width: '100%',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', ...extra,
})

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '16px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #1e1e1e' }}>
          <h2 style={{ fontWeight: 800, fontSize: '16px', color: '#fff', margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: '6px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>{label}</label>
      {children}
    </div>
  )
}

function ChipInput({ value, onChange, chips, onAdd, onRemove, placeholder, accentColor, accentBg }) {
  return (
    <>
      <div style={{ display: 'flex', gap: '8px', marginBottom: chips.length > 0 ? '10px' : '0' }}>
        <input
          style={inp({ flex: 1, width: 'auto' })}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onAdd() } }}
          onFocus={(e) => { e.target.style.borderColor = accentColor }}
          onBlur={(e) => { e.target.style.borderColor = '#252525' }}
        />
        <button
          onClick={onAdd}
          style={{ background: accentColor, border: 'none', borderRadius: '8px', padding: '10px 14px', color: '#111', fontSize: '12px', fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}
        >
          + Add
        </button>
      </div>
      {chips.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {chips.map((chip, i) => (
            <span
              key={i}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: accentBg, border: `1px solid ${accentColor}55`, borderRadius: '999px', padding: '4px 10px 4px 12px', fontSize: '12px', color: accentColor, fontWeight: 600 }}
            >
              {chip}
              <button onClick={() => onRemove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: accentColor, padding: '0', display: 'flex', alignItems: 'center', opacity: 0.7 }}>
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: '4px 0 0', fontStyle: 'italic' }}>
          Type a name and press Add or Enter
        </p>
      )}
    </>
  )
}

export function AdminGames() {
  const { games, categories, addGame, editGame, deleteGame } = useStore()
  const navigate = useNavigate()
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(BLANK)
  const [labelInput, setLabelInput] = useState('')
  const [levelInput, setLevelInput] = useState('')

  const openAdd = () => { setForm(BLANK); setModal({ mode: 'add' }); setLabelInput(''); setLevelInput('') }
  const openEdit = (g) => {
    setForm({
      title: g.title, category: g.category,
      tags: g.tags.join(', '),
      duration: g.duration,
      minPlayers: g.minPlayers, maxPlayers: g.maxPlayers,
      rule1: g.rules?.[0]?.text || '', rule2: g.rules?.[1]?.text || '', rule3: g.rules?.[2]?.text || '',
      tip: g.tip || '',
      labels: g.labels || [],
      levels: g.levels || [],
    })
    setModal({ mode: 'edit', id: g.id })
    setLabelInput('')
    setLevelInput('')
  }
  const close = () => setModal(null)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const addLabel = () => {
    const l = labelInput.trim().toUpperCase()
    if (!l || form.labels.includes(l)) return
    setForm(f => ({ ...f, labels: [...f.labels, l] }))
    setLabelInput('')
  }
  const removeLabel = (i) => setForm(f => ({ ...f, labels: f.labels.filter((_, idx) => idx !== i) }))

  const addLevel = () => {
    const l = levelInput.trim()
    if (!l || form.levels.includes(l)) return
    setForm(f => ({ ...f, levels: [...f.levels, l] }))
    setLevelInput('')
  }
  const removeLevel = (i) => setForm(f => ({ ...f, levels: f.levels.filter((_, idx) => idx !== i) }))

  const slugify = (t) => t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now()

  const save = () => {
    if (!form.title.trim()) return
    const rules = [form.rule1, form.rule2, form.rule3].filter(Boolean).map((text, i) => ({ step: i + 1, text }))
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    if (modal.mode === 'add') {
      addGame({
        id: slugify(form.title),
        title: form.title.trim(),
        category: form.category,
        tags,
        playCount: '0',
        duration: form.duration,
        minPlayers: Number(form.minPlayers),
        maxPlayers: Number(form.maxPlayers),
        rules,
        tip: form.tip,
        cards: [],
        labels: form.labels,
        levels: form.levels,
      })
    } else {
      editGame(modal.id, {
        title: form.title.trim(),
        category: form.category,
        tags,
        duration: form.duration,
        minPlayers: Number(form.minPlayers),
        maxPlayers: Number(form.maxPlayers),
        rules,
        tip: form.tip,
        labels: form.labels,
        levels: form.levels,
      })
    }
    close()
  }

  const remove = (id, title) => {
    if (window.confirm(`Delete "${title}"? This also removes all its questions.`)) deleteGame(id)
  }

  const cats = categories.filter(c => c.id !== 'all')

  return (
    <div style={{ padding: '36px 32px 48px', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.3px' }}>Games</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>{games.length} game{games.length !== 1 ? 's' : ''} total</p>
        </div>
        <button
          onClick={openAdd}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', background: '#e8453c', color: '#fff', border: 'none', borderRadius: '9px', padding: '10px 18px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', transition: 'transform 0.1s' }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.97)' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          <Plus size={15} /> Add Game
        </button>
      </div>

      {/* Table */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 60px 70px 70px 90px 120px', gap: '0', padding: '10px 16px', borderBottom: '1px solid #1e1e1e', background: '#0d0d0d' }}>
          {['Game', 'Category', 'Cards', 'Labels', 'Levels', 'Duration', 'Actions'].map(h => (
            <span key={h} style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</span>
          ))}
        </div>

        {games.length === 0 && (
          <p style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,0.3)', fontSize: '13px', margin: 0 }}>No games yet — add one above.</p>
        )}

        {games.map((g, i) => (
          <div
            key={g.id}
            style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 60px 70px 70px 90px 120px', gap: '0', padding: '13px 16px', borderBottom: i < games.length - 1 ? '1px solid #1a1a1a' : 'none', alignItems: 'center', transition: 'background 0.12s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#141414' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            <div>
              <p style={{ fontWeight: 700, fontSize: '13px', color: '#fff', margin: '0 0 2px' }}>{g.title}</p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>{g.minPlayers}–{g.maxPlayers} players</p>
            </div>
            <span>
              <span style={{ background: '#1a1a1a', padding: '3px 10px', borderRadius: '999px', color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>{g.category}</span>
            </span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{g.cards?.length || 0}</span>
            <span style={{ fontSize: '13px', fontWeight: 700 }}>
              {g.labels?.length > 0 ? <span style={{ color: '#f5c542' }}>{g.labels.length}</span> : <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}
            </span>
            <span style={{ fontSize: '13px', fontWeight: 700 }}>
              {g.levels?.length > 0 ? <span style={{ color: '#a78bfa' }}>{g.levels.length}</span> : <span style={{ color: 'rgba(255,255,255,0.2)' }}>—</span>}
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{g.duration}</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                title="View Questions"
                onClick={() => navigate(`/admin/questions?game=${g.id}`)}
                style={{ background: 'rgba(23,66,197,0.15)', border: '1px solid rgba(23,66,197,0.25)', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: '#6b9fff', transition: 'background 0.12s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(23,66,197,0.3)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(23,66,197,0.15)' }}
              >
                <MessageSquare size={13} />
              </button>
              <button
                title="Edit"
                onClick={() => openEdit(g)}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid #252525', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', transition: 'background 0.12s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              >
                <Pencil size={13} />
              </button>
              <button
                title="Delete"
                onClick={() => remove(g.id, g.title)}
                style={{ background: 'rgba(232,69,60,0.1)', border: '1px solid rgba(232,69,60,0.2)', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: '#e8453c', transition: 'background 0.12s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(232,69,60,0.2)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(232,69,60,0.1)' }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add New Game' : 'Edit Game'} onClose={close}>
          <Field label="Title">
            <input style={inp()} value={form.title} onChange={set('title')} placeholder="Never Have I Ever" onFocus={(e)=>{e.target.style.borderColor='#e8453c'}} onBlur={(e)=>{e.target.style.borderColor='#252525'}} />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Category">
              <select style={inp()} value={form.category} onChange={set('category')}>
                {cats.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </Field>
            <Field label="Duration">
              <input style={inp()} value={form.duration} onChange={set('duration')} placeholder="12 min" onFocus={(e)=>{e.target.style.borderColor='#e8453c'}} onBlur={(e)=>{e.target.style.borderColor='#252525'}} />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Min Players">
              <input style={inp()} type="number" min={1} max={20} value={form.minPlayers} onChange={set('minPlayers')} onFocus={(e)=>{e.target.style.borderColor='#e8453c'}} onBlur={(e)=>{e.target.style.borderColor='#252525'}} />
            </Field>
            <Field label="Max Players">
              <input style={inp()} type="number" min={1} max={20} value={form.maxPlayers} onChange={set('maxPlayers')} onFocus={(e)=>{e.target.style.borderColor='#e8453c'}} onBlur={(e)=>{e.target.style.borderColor='#252525'}} />
            </Field>
          </div>
          <Field label="Tags (comma separated)">
            <input style={inp()} value={form.tags} onChange={set('tags')} placeholder="Spicy, Fun, Adults" onFocus={(e)=>{e.target.style.borderColor='#e8453c'}} onBlur={(e)=>{e.target.style.borderColor='#252525'}} />
          </Field>

          {/* Labels — appear as dropdown options in question prompt type */}
          <Field label="Labels (prompt types for questions)">
            <ChipInput
              value={labelInput}
              onChange={setLabelInput}
              chips={form.labels}
              onAdd={addLabel}
              onRemove={removeLabel}
              placeholder="e.g. NEVER HAVE I EVER, DARE"
              accentColor="#f5c542"
              accentBg="rgba(245,197,66,0.1)"
            />
          </Field>

          {/* Levels */}
          <Field label="Levels (difficulty / rounds for questions)">
            <ChipInput
              value={levelInput}
              onChange={setLevelInput}
              chips={form.levels}
              onAdd={addLevel}
              onRemove={removeLevel}
              placeholder="e.g. Easy, Medium, Hard"
              accentColor="#a78bfa"
              accentBg="rgba(167,139,250,0.1)"
            />
          </Field>

          <Field label="Rule 1">
            <input style={inp()} value={form.rule1} onChange={set('rule1')} placeholder="How the first turn works" onFocus={(e)=>{e.target.style.borderColor='#e8453c'}} onBlur={(e)=>{e.target.style.borderColor='#252525'}} />
          </Field>
          <Field label="Rule 2">
            <input style={inp()} value={form.rule2} onChange={set('rule2')} placeholder="What players do" onFocus={(e)=>{e.target.style.borderColor='#e8453c'}} onBlur={(e)=>{e.target.style.borderColor='#252525'}} />
          </Field>
          <Field label="Rule 3">
            <input style={inp()} value={form.rule3} onChange={set('rule3')} placeholder="How to win or end" onFocus={(e)=>{e.target.style.borderColor='#e8453c'}} onBlur={(e)=>{e.target.style.borderColor='#252525'}} />
          </Field>
          <Field label="Tip">
            <textarea style={inp({ resize: 'vertical', minHeight: '72px', padding: '10px 12px' })} value={form.tip} onChange={set('tip')} placeholder="A pro tip for the players…" onFocus={(e)=>{e.target.style.borderColor='#e8453c'}} onBlur={(e)=>{e.target.style.borderColor='#252525'}} />
          </Field>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '4px' }}>
            <button onClick={close} style={{ background: 'transparent', border: '1px solid #252525', borderRadius: '8px', padding: '10px 18px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            <button onClick={save} style={{ background: '#e8453c', border: 'none', borderRadius: '8px', padding: '10px 22px', color: '#fff', fontSize: '13px', fontWeight: 800, cursor: 'pointer', transition: 'transform 0.1s' }} onMouseDown={(e)=>{e.currentTarget.style.transform='scale(0.97)'}} onMouseUp={(e)=>{e.currentTarget.style.transform='scale(1)'}}>
              {modal.mode === 'add' ? 'Create Game' : 'Save Changes'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

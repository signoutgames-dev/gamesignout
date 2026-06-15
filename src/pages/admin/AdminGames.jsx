import { useState } from 'react'
import { Plus, Pencil, Trash2, MessageSquare, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'

const BLANK = { title: '', category: 'couple', tags: '', duration: '15 min', minPlayers: 2, maxPlayers: 8, rule1: '', rule2: '', rule3: '', tip: '' }

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

export function AdminGames() {
  const { games, categories, addGame, editGame, deleteGame } = useStore()
  const navigate = useNavigate()
  const [modal, setModal] = useState(null) // null | { mode: 'add' | 'edit', data }
  const [form, setForm] = useState(BLANK)

  const openAdd = () => { setForm(BLANK); setModal({ mode: 'add' }) }
  const openEdit = (g) => {
    setForm({
      title: g.title, category: g.category,
      tags: g.tags.join(', '),
      duration: g.duration,
      minPlayers: g.minPlayers, maxPlayers: g.maxPlayers,
      rule1: g.rules?.[0]?.text || '', rule2: g.rules?.[1]?.text || '', rule3: g.rules?.[2]?.text || '',
      tip: g.tip || '',
    })
    setModal({ mode: 'edit', id: g.id })
  }
  const close = () => setModal(null)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

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
        {/* Head */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 70px 100px 120px', gap: '0', padding: '10px 16px', borderBottom: '1px solid #1e1e1e', background: '#0d0d0d' }}>
          {['Game', 'Category', 'Cards', 'Duration', 'Actions'].map(h => (
            <span key={h} style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</span>
          ))}
        </div>

        {games.length === 0 && (
          <p style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,0.3)', fontSize: '13px', margin: 0 }}>No games yet — add one above.</p>
        )}

        {games.map((g, i) => (
          <div
            key={g.id}
            style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 70px 100px 120px', gap: '0', padding: '13px 16px', borderBottom: i < games.length - 1 ? '1px solid #1a1a1a' : 'none', alignItems: 'center', transition: 'background 0.12s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#141414' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            <div>
              <p style={{ fontWeight: 700, fontSize: '13px', color: '#fff', margin: '0 0 2px' }}>{g.title}</p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>{g.minPlayers}–{g.maxPlayers} players</p>
            </div>
            <span style={{ fontSize: '12px' }}>
              <span style={{ background: '#1a1a1a', padding: '3px 10px', borderRadius: '999px', color: 'rgba(255,255,255,0.6)' }}>{g.category}</span>
            </span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{g.cards?.length || 0}</span>
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

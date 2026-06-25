import { useState } from 'react'
import { Plus, Pencil, Trash2, MessageSquare, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../context/StoreContext'

const VIBE_OPTIONS = ['Spicy', 'Wild', 'Deep', 'Meaningful', 'Playful', 'Romantic', 'Funny', 'Chill']
const COLOR_OPTIONS = [
  { hex: '#3B5BDB', label: 'Blue' },
  { hex: '#E67700', label: 'Orange' },
  { hex: '#2F9E44', label: 'Green' },
  { hex: '#C92A2A', label: 'Red' },
  { hex: '#6741D9', label: 'Purple' },
  { hex: '#0CA678', label: 'Teal' },
]

const BLANK = {
  title: '', category: 'couple', tags: '', duration: '20 min',
  minPlayers: 2, maxPlayers: 8,
  description: '', vibe: 'Playful', color: '#3B5BDB',
  rule1: '', rule2: '', rule3: '', tip: '',
  proTip1: '', proTip2: '', proTip3: '', proTip4: '',
  labels: [], levels: [], perfectFor: [],
}

const inp = (extra = {}) => ({
  background: '#161616', border: '1px solid #252525', borderRadius: '8px',
  color: '#fff', fontSize: '13px', padding: '10px 12px', width: '100%',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', ...extra,
})

const focusRed = {
  onFocus: e => { e.target.style.borderColor = '#e8453c' },
  onBlur: e => { e.target.style.borderColor = '#252525' },
}

function Modal({ title, onClose, children }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '16px' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '18px', width: '100%', maxWidth: '580px', maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 32px 64px rgba(0,0,0,0.7)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #1e1e1e', position: 'sticky', top: 0, background: '#111', zIndex: 1, borderRadius: '18px 18px 0 0' }}>
          <h2 style={{ fontWeight: 800, fontSize: '16px', color: '#fff', margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ padding: '24px' }}>{children}</div>
      </div>
    </div>
  )
}

function Field({ label, children, hint }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: '6px', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)', margin: '4px 0 0', fontStyle: 'italic' }}>{hint}</p>}
    </div>
  )
}

function SectionDivider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0 16px' }}>
      <div style={{ flex: 1, height: '1px', background: '#1e1e1e' }} />
      <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{label}</span>
      <div style={{ flex: 1, height: '1px', background: '#1e1e1e' }} />
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
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd() } }}
          onFocus={e => { e.target.style.borderColor = accentColor }}
          onBlur={e => { e.target.style.borderColor = '#252525' }}
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
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: accentBg, border: `1px solid ${accentColor}55`, borderRadius: '999px', padding: '4px 10px 4px 12px', fontSize: '12px', color: accentColor, fontWeight: 600 }}>
              {chip}
              <button onClick={() => onRemove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: accentColor, padding: '0', display: 'flex', alignItems: 'center', opacity: 0.7 }}>
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: '4px 0 0', fontStyle: 'italic' }}>Type and press Add or Enter</p>
      )}
    </>
  )
}

function ColorPicker({ value, onChange }) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {COLOR_OPTIONS.map(({ hex, label }) => (
        <button
          key={hex}
          title={label}
          onClick={() => onChange(hex)}
          style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: hex, border: value === hex ? '3px solid #fff' : '3px solid transparent',
            cursor: 'pointer', outline: value === hex ? `2px solid ${hex}` : 'none',
            outlineOffset: '2px', transition: 'border 0.12s, outline 0.12s',
          }}
        />
      ))}
      {/* Custom hex input */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '4px' }}>
        <div style={{ width: '18px', height: '18px', borderRadius: '4px', background: value, border: '1px solid #333', flexShrink: 0 }} />
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="#3B5BDB"
          style={{ ...inp({ width: '100px', padding: '6px 10px', fontSize: '12px', fontFamily: 'monospace' }) }}
          {...focusRed}
        />
      </div>
    </div>
  )
}

export function AdminGames() {
  const { games, categories, addGame, editGame, deleteGame } = useStore()
  const navigate = useNavigate()
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(BLANK)
  const [labelInput, setLabelInput] = useState('')
  const [levelInput, setLevelInput] = useState('')
  const [perfectForInput, setPerfectForInput] = useState('')

  const openAdd = () => { setForm(BLANK); setModal({ mode: 'add' }); setLabelInput(''); setLevelInput(''); setPerfectForInput('') }

  const openEdit = g => {
    setForm({
      title: g.title, category: g.category,
      tags: g.tags?.join(', ') || '',
      duration: g.duration,
      minPlayers: g.minPlayers, maxPlayers: g.maxPlayers,
      description: g.description || '',
      vibe: g.vibe || 'Playful',
      color: g.color || '#3B5BDB',
      rule1: g.rules?.[0]?.text || '',
      rule2: g.rules?.[1]?.text || '',
      rule3: g.rules?.[2]?.text || '',
      tip: g.tip || '',
      proTip1: g.proTips?.[0] || '',
      proTip2: g.proTips?.[1] || '',
      proTip3: g.proTips?.[2] || '',
      proTip4: g.proTips?.[3] || '',
      labels: g.labels || [],
      levels: g.levels || [],
      perfectFor: g.perfectFor || [],
    })
    setModal({ mode: 'edit', id: g.id })
    setLabelInput(''); setLevelInput(''); setPerfectForInput('')
  }

  const close = () => setModal(null)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))
  const setVal = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const addLabel = () => { const l = labelInput.trim().toUpperCase(); if (!l || form.labels.includes(l)) return; setForm(f => ({ ...f, labels: [...f.labels, l] })); setLabelInput('') }
  const removeLabel = i => setForm(f => ({ ...f, labels: f.labels.filter((_, idx) => idx !== i) }))
  const addLevel = () => { const l = levelInput.trim(); if (!l || form.levels.includes(l)) return; setForm(f => ({ ...f, levels: [...f.levels, l] })); setLevelInput('') }
  const removeLevel = i => setForm(f => ({ ...f, levels: f.levels.filter((_, idx) => idx !== i) }))
  const addPerfectFor = () => { const l = perfectForInput.trim(); if (!l || form.perfectFor.includes(l)) return; setForm(f => ({ ...f, perfectFor: [...f.perfectFor, l] })); setPerfectForInput('') }
  const removePerfectFor = i => setForm(f => ({ ...f, perfectFor: f.perfectFor.filter((_, idx) => idx !== i) }))

  const slugify = t => t.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now()

  const save = () => {
    if (!form.title.trim()) return
    const rules = [form.rule1, form.rule2, form.rule3].filter(Boolean).map((text, i) => ({ step: i + 1, text }))
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    const proTips = [form.proTip1, form.proTip2, form.proTip3, form.proTip4].filter(Boolean)

    const payload = {
      title: form.title.trim(),
      category: form.category,
      tags, rules,
      duration: form.duration,
      minPlayers: Number(form.minPlayers),
      maxPlayers: Number(form.maxPlayers),
      description: form.description.trim(),
      vibe: form.vibe,
      color: form.color,
      tip: form.tip,
      proTips,
      perfectFor: form.perfectFor,
      labels: form.labels,
      levels: form.levels,
    }

    if (modal.mode === 'add') {
      addGame({ id: slugify(form.title), playCount: '0', cards: [], ...payload })
    } else {
      editGame(modal.id, payload)
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
          onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
          onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          <Plus size={15} /> Add Game
        </button>
      </div>

      {/* Table */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 100px 70px 90px 70px 130px', gap: '0', padding: '10px 16px', borderBottom: '1px solid #1e1e1e', background: '#0d0d0d' }}>
          {['Game', 'Category', 'Cards', 'Duration', 'Vibe', 'Actions'].map(h => (
            <span key={h} style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</span>
          ))}
        </div>

        {games.length === 0 && (
          <p style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,0.3)', fontSize: '13px', margin: 0 }}>No games yet — add one above.</p>
        )}

        {games.map((g, i) => (
          <div
            key={g.id}
            style={{ display: 'grid', gridTemplateColumns: '2fr 100px 70px 90px 70px 130px', gap: '0', padding: '13px 16px', borderBottom: i < games.length - 1 ? '1px solid #1a1a1a' : 'none', alignItems: 'center', transition: 'background 0.12s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#141414' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {g.color && <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: g.color, flexShrink: 0 }} />}
              <div>
                <p style={{ fontWeight: 700, fontSize: '13px', color: '#fff', margin: '0 0 2px' }}>{g.title}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '220px' }}>{g.description || `${g.minPlayers}–${g.maxPlayers} players`}</p>
              </div>
            </div>
            <span>
              <span style={{ background: '#1a1a1a', padding: '3px 10px', borderRadius: '999px', color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>{g.category}</span>
            </span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{g.cards?.length || 0}</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{g.duration}</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>{g.vibe || '—'}</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                title="Questions"
                onClick={() => navigate(`/admin/questions?game=${g.id}`)}
                style={{ background: 'rgba(23,66,197,0.15)', border: '1px solid rgba(23,66,197,0.25)', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: '#6b9fff' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(23,66,197,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(23,66,197,0.15)' }}
              >
                <MessageSquare size={13} />
              </button>
              <button
                title="Edit"
                onClick={() => openEdit(g)}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid #252525', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
              >
                <Pencil size={13} />
              </button>
              <button
                title="Delete"
                onClick={() => remove(g.id, g.title)}
                style={{ background: 'rgba(232,69,60,0.1)', border: '1px solid rgba(232,69,60,0.2)', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: '#e8453c' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,69,60,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,69,60,0.1)' }}
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

          {/* Basic info */}
          <Field label="Title">
            <input style={inp()} value={form.title} onChange={set('title')} placeholder="e.g. Hot Takes" {...focusRed} />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Category">
              <select style={inp()} value={form.category} onChange={set('category')}>
                {cats.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </Field>
            <Field label="Duration">
              <input style={inp()} value={form.duration} onChange={set('duration')} placeholder="20 min" {...focusRed} />
            </Field>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Min Players">
              <input style={inp()} type="number" min={1} max={30} value={form.minPlayers} onChange={set('minPlayers')} {...focusRed} />
            </Field>
            <Field label="Max Players">
              <input style={inp()} type="number" min={1} max={30} value={form.maxPlayers} onChange={set('maxPlayers')} {...focusRed} />
            </Field>
          </div>

          <Field label="Tags (comma separated)" hint="e.g. Spicy, Fun, Adults">
            <input style={inp()} value={form.tags} onChange={set('tags')} placeholder="Spicy, Fun, Adults" {...focusRed} />
          </Field>

          {/* Presentation */}
          <SectionDivider label="Presentation" />

          <Field label="Short Description" hint="1–2 sentences shown on browse and detail pages">
            <textarea style={inp({ resize: 'vertical', minHeight: '68px' })} value={form.description} onChange={set('description')} placeholder="Drop your most controversial truths and see who's been up to what." {...focusRed} />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Field label="Vibe">
              <select style={inp()} value={form.vibe} onChange={set('vibe')}>
                {VIBE_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </Field>
            <Field label="Card Colour">
              <div style={{ ...inp({ padding: '7px 10px' }), display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '5px', background: form.color, flexShrink: 0 }} />
                <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#fff' }}>{form.color}</span>
              </div>
            </Field>
          </div>

          <Field label="Colour Swatch">
            <ColorPicker value={form.color} onChange={v => setVal('color', v)} />
          </Field>

          {/* Rules */}
          <SectionDivider label="Rules" />

          <Field label="Rule 1">
            <input style={inp()} value={form.rule1} onChange={set('rule1')} placeholder="How the first turn works" {...focusRed} />
          </Field>
          <Field label="Rule 2">
            <input style={inp()} value={form.rule2} onChange={set('rule2')} placeholder="What players do each turn" {...focusRed} />
          </Field>
          <Field label="Rule 3">
            <input style={inp()} value={form.rule3} onChange={set('rule3')} placeholder="How to win or end the game" {...focusRed} />
          </Field>
          <Field label="Quick Tip" hint="Short overall tip shown at end of How to Play">
            <textarea style={inp({ resize: 'vertical', minHeight: '60px' })} value={form.tip} onChange={set('tip')} placeholder="A quick pro tip for players…" {...focusRed} />
          </Field>

          {/* Pro Tips */}
          <SectionDivider label="Pro Tips (shown in How to Play)" />

          {[1, 2, 3, 4].map(n => (
            <Field key={n} label={`Tip ${n}`}>
              <input style={inp()} value={form[`proTip${n}`]} onChange={set(`proTip${n}`)} placeholder={n === 1 ? "Be honest — that's where the fun starts." : ''} {...focusRed} />
            </Field>
          ))}

          {/* Perfect For */}
          <SectionDivider label="Perfect For" />

          <Field label="Occasions" hint="e.g. Date nights, Road trips, House parties">
            <ChipInput
              value={perfectForInput}
              onChange={setPerfectForInput}
              chips={form.perfectFor}
              onAdd={addPerfectFor}
              onRemove={removePerfectFor}
              placeholder="e.g. Date nights"
              accentColor="#e8453c"
              accentBg="rgba(232,69,60,0.1)"
            />
          </Field>

          {/* Labels / Levels */}
          <SectionDivider label="Card Labels & Levels" />

          <Field label="Labels (prompt types shown on cards)" hint="Each label becomes a selectable prompt type in the question editor">
            <ChipInput
              value={labelInput}
              onChange={setLabelInput}
              chips={form.labels}
              onAdd={addLabel}
              onRemove={removeLabel}
              placeholder="e.g. NEVER HAVE I EVER"
              accentColor="#f5c542"
              accentBg="rgba(245,197,66,0.1)"
            />
          </Field>

          <Field label="Levels (difficulty tiers)" hint="e.g. Easy, Medium, Hard — used to tag questions">
            <ChipInput
              value={levelInput}
              onChange={setLevelInput}
              chips={form.levels}
              onAdd={addLevel}
              onRemove={removeLevel}
              placeholder="e.g. Medium"
              accentColor="#a78bfa"
              accentBg="rgba(167,139,250,0.1)"
            />
          </Field>

          {/* Preview */}
          {form.title && (
            <div style={{ background: form.color || '#3B5BDB', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
              <p style={{ fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 6px' }}>{form.category?.toUpperCase()} GAME</p>
              <p style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 6px', color: '#fff', letterSpacing: '-0.3px' }}>{form.title}</p>
              {form.vibe && <span style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '999px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, color: '#fff' }}>🔥 {form.vibe}</span>}
              {form.description && <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', margin: '8px 0 0', lineHeight: 1.5 }}>{form.description}</p>}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '4px' }}>
            <button onClick={close} style={{ background: 'transparent', border: '1px solid #252525', borderRadius: '8px', padding: '10px 18px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            <button
              onClick={save}
              style={{ background: '#e8453c', border: 'none', borderRadius: '8px', padding: '10px 24px', color: '#fff', fontSize: '13px', fontWeight: 800, cursor: 'pointer', transition: 'transform 0.1s' }}
              onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)' }}
              onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {modal.mode === 'add' ? 'Create Game' : 'Save Changes'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

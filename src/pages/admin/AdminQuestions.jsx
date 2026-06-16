import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import { useStore } from '../../context/StoreContext'

// Fallback labels used only when a game has no custom labels defined
const DEFAULT_LABELS = ['NEVER HAVE I EVER', 'TAKE A SIP IF', 'WOULD YOU RATHER', 'TRUTH', 'TELL ME', 'SHARE', 'DARE', 'HOT TAKE']

const inp = (extra = {}) => ({
  background: '#161616', border: '1px solid #252525', borderRadius: '8px',
  color: '#fff', fontSize: '13px', padding: '10px 12px', width: '100%',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', ...extra,
})

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '16px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #1e1e1e' }}>
          <h2 style={{ fontWeight: 800, fontSize: '16px', color: '#fff', margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}><X size={18} /></button>
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

function LevelBadge({ level }) {
  if (!level) return <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>—</span>
  return (
    <span style={{ display: 'inline-block', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.28)', borderRadius: '999px', padding: '2px 9px', fontSize: '10px', fontWeight: 700, color: '#a78bfa', letterSpacing: '0.4px' }}>
      {level}
    </span>
  )
}

export function AdminQuestions() {
  const { games, addCard, editCard, deleteCard } = useStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedGameId, setSelectedGameId] = useState(searchParams.get('game') || (games[0]?.id || ''))
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ label: '', text: '', level: '' })

  useEffect(() => {
    const gid = searchParams.get('game')
    if (gid) setSelectedGameId(gid)
  }, [searchParams])

  const selectedGame = games.find(g => g.id === selectedGameId)
  const cards = selectedGame?.cards || []
  const gameLabels = selectedGame?.labels?.length > 0 ? selectedGame.labels : DEFAULT_LABELS
  const gameLevels = selectedGame?.levels || []

  const blankForm = () => ({ label: gameLabels[0] || '', text: '', level: '' })

  const openAdd = () => { setForm(blankForm()); setModal({ mode: 'add' }) }
  const openEdit = (c) => { setForm({ label: c.label || gameLabels[0] || '', text: c.text, level: c.level || '' }); setModal({ mode: 'edit', id: c.id }) }
  const close = () => setModal(null)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleGameChange = (gameId) => {
    setSelectedGameId(gameId)
    setSearchParams({ game: gameId })
    // Reset label to first option of the newly selected game
    const game = games.find(g => g.id === gameId)
    const labels = game?.labels?.length > 0 ? game.labels : DEFAULT_LABELS
    setForm(f => ({ ...f, label: labels[0] || '', level: '' }))
  }

  const nextId = () => cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1

  const save = () => {
    if (!form.text.trim() || !selectedGameId) return
    if (modal.mode === 'add') {
      addCard(selectedGameId, { id: nextId(), label: form.label, text: form.text.trim(), level: form.level })
    } else {
      editCard(selectedGameId, modal.id, { label: form.label, text: form.text.trim(), level: form.level })
    }
    close()
  }

  const remove = (cardId, text) => {
    if (window.confirm(`Delete question "${text.slice(0, 50)}…"?`)) deleteCard(selectedGameId, cardId)
  }

  return (
    <div style={{ padding: '36px 32px 48px', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.3px' }}>Questions</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>Manage prompt cards per game</p>
        </div>
        <button
          onClick={openAdd}
          disabled={!selectedGameId}
          style={{ display: 'flex', alignItems: 'center', gap: '7px', background: selectedGameId ? '#e8453c' : '#222', color: selectedGameId ? '#fff' : 'rgba(255,255,255,0.3)', border: 'none', borderRadius: '9px', padding: '10px 18px', fontSize: '13px', fontWeight: 700, cursor: selectedGameId ? 'pointer' : 'not-allowed' }}
        >
          <Plus size={15} /> Add Question
        </button>
      </div>

      {/* Game selector + chips preview */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', letterSpacing: '0.5px' }}>FILTER BY GAME</label>
          <select
            value={selectedGameId}
            onChange={(e) => handleGameChange(e.target.value)}
            style={{ ...inp(), maxWidth: '280px', flex: 1 }}
          >
            {games.map(g => <option key={g.id} value={g.id}>{g.title} ({g.cards?.length || 0} cards)</option>)}
          </select>
        </div>
        {/* Show game's labels and levels as reference chips */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {selectedGame?.labels?.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.5px' }}>LABELS:</span>
              {selectedGame.labels.map(l => (
                <span key={l} style={{ background: 'rgba(245,197,66,0.1)', border: '1px solid rgba(245,197,66,0.28)', borderRadius: '999px', padding: '2px 9px', fontSize: '10px', fontWeight: 700, color: '#f5c542' }}>{l}</span>
              ))}
            </div>
          )}
          {gameLevels.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.5px' }}>LEVELS:</span>
              {gameLevels.map(l => (
                <span key={l} style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.28)', borderRadius: '999px', padding: '2px 9px', fontSize: '10px', fontWeight: 700, color: '#a78bfa' }}>{l}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '150px 120px 1fr 80px', padding: '10px 16px', borderBottom: '1px solid #1e1e1e', background: '#0d0d0d' }}>
          {['Label', 'Level', 'Question Text', 'Actions'].map(h => (
            <span key={h} style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</span>
          ))}
        </div>

        {cards.length === 0 && (
          <p style={{ textAlign: 'center', padding: '32px', color: 'rgba(255,255,255,0.3)', fontSize: '13px', margin: 0 }}>
            {selectedGameId ? 'No questions for this game — add one above.' : 'Select a game to manage questions.'}
          </p>
        )}

        {cards.map((c, i) => (
          <div
            key={c.id}
            style={{ display: 'grid', gridTemplateColumns: '150px 120px 1fr 80px', padding: '12px 16px', borderBottom: i < cards.length - 1 ? '1px solid #1a1a1a' : 'none', alignItems: 'center', transition: 'background 0.12s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#141414' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#f5c542', letterSpacing: '1px' }}>{c.label}</span>
            <LevelBadge level={c.level} />
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '16px' }}>{c.text}</p>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => openEdit(c)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid #252525', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
                <Pencil size={12} />
              </button>
              <button onClick={() => remove(c.id, c.text)} style={{ background: 'rgba(232,69,60,0.1)', border: '1px solid rgba(232,69,60,0.2)', borderRadius: '6px', padding: '5px 8px', cursor: 'pointer', color: '#e8453c' }}>
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {cards.length > 0 && (
        <p style={{ textAlign: 'right', fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '10px' }}>{cards.length} question{cards.length !== 1 ? 's' : ''}</p>
      )}

      {/* Modal */}
      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add Question' : 'Edit Question'} onClose={close}>
          <Field label="Game">
            <select style={inp()} value={selectedGameId} onChange={(e) => {
              const gameId = e.target.value
              const game = games.find(g => g.id === gameId)
              const labels = game?.labels?.length > 0 ? game.labels : DEFAULT_LABELS
              setSelectedGameId(gameId)
              setForm(f => ({ ...f, label: labels[0] || '', level: '' }))
            }}>
              {games.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
            </select>
          </Field>

          <Field label="Label / Prompt Type">
            <select
              style={inp()}
              value={form.label}
              onChange={set('label')}
              onFocus={(e) => { e.target.style.borderColor = '#f5c542' }}
              onBlur={(e) => { e.target.style.borderColor = '#252525' }}
            >
              {gameLabels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </Field>

          {gameLevels.length > 0 && (
            <Field label="Level">
              <select
                style={inp()}
                value={form.level}
                onChange={set('level')}
                onFocus={(e) => { e.target.style.borderColor = '#a78bfa' }}
                onBlur={(e) => { e.target.style.borderColor = '#252525' }}
              >
                <option value="">— No level —</option>
                {gameLevels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </Field>
          )}

          <Field label="Question Text">
            <textarea
              style={inp({ resize: 'vertical', minHeight: '100px', padding: '10px 12px' })}
              value={form.text}
              onChange={set('text')}
              placeholder="you've ever…"
              onFocus={(e) => { e.target.style.borderColor = '#e8453c' }}
              onBlur={(e) => { e.target.style.borderColor = '#252525' }}
            />
          </Field>

          {/* Preview */}
          {form.text && (
            <div style={{ background: '#1742C5', borderRadius: '12px', padding: '16px 18px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                {form.level && (
                  <span style={{ background: 'rgba(167,139,250,0.25)', border: '1px solid rgba(167,139,250,0.4)', borderRadius: '999px', padding: '2px 10px', fontSize: '10px', fontWeight: 700, color: '#c4b5fd' }}>{form.level}</span>
                )}
              </div>
              <p style={{ color: '#f5c542', fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 8px' }}>{form.label}</p>
              <p style={{ color: '#fff', fontSize: '14px', fontWeight: 700, margin: 0, lineHeight: 1.4 }}>{form.text}</p>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button onClick={close} style={{ background: 'transparent', border: '1px solid #252525', borderRadius: '8px', padding: '10px 18px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            <button onClick={save} style={{ background: '#e8453c', border: 'none', borderRadius: '8px', padding: '10px 22px', color: '#fff', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>
              {modal.mode === 'add' ? 'Add Question' : 'Save Changes'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

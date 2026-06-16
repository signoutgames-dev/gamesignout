import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react'
import { useStore } from '../../context/StoreContext'

const DEFAULT_LABELS = ['NEVER HAVE I EVER', 'TAKE A SIP IF', 'WOULD YOU RATHER', 'TRUTH', 'TELL ME', 'SHARE', 'DARE', 'HOT TAKE']

const inp = (extra = {}) => ({
  background: '#161616', border: '1px solid #252525', borderRadius: '8px',
  color: '#fff', fontSize: '13px', padding: '10px 12px', width: '100%',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', ...extra,
})

function Modal({ title, subtitle, onClose, children, maxWidth = '480px' }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '20px' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '16px', width: '100%', maxWidth, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 64px rgba(0,0,0,0.7)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 24px', borderBottom: '1px solid #1e1e1e' }}>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: '16px', color: '#fff', margin: subtitle ? '0 0 2px' : 0 }}>{title}</h2>
            {subtitle && <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>{subtitle}</p>}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: '2px', flexShrink: 0 }}><X size={18} /></button>
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

// ── Bulk Upload Modal ──────────────────────────────────────────────────────────
function BulkUploadModal({ onClose, selectedGame, gameLabels, gameLevels, onUpload }) {
  const [rows, setRows]       = useState(null)   // null = no file yet
  const [parseError, setParseError] = useState('')
  const [parsing, setParsing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef(null)

  const downloadTemplate = async () => {
    try {
      const { utils, writeFile } = await import('xlsx')
      const headers = ['label', 'text', 'level']
      const exampleRows = [
        [gameLabels[0] || 'NEVER HAVE I EVER', 'You have eaten a whole pizza alone', gameLevels[0] || ''],
        [gameLabels[1] || gameLabels[0] || 'DARE',  'Tell everyone your most embarrassing moment', gameLevels[1] || gameLevels[0] || ''],
      ]
      const ws = utils.aoa_to_sheet([headers, ...exampleRows])
      ws['!cols'] = [{ wch: 28 }, { wch: 60 }, { wch: 15 }]
      const wb = utils.book_new()
      utils.book_append_sheet(wb, ws, 'Questions')
      writeFile(wb, `${selectedGame?.title || 'game'}_template.xlsx`)
    } catch { /* ignore */ }
  }

  const parseFile = async (file) => {
    if (!file) return
    setParsing(true)
    setParseError('')
    setRows(null)
    try {
      const { read, utils } = await import('xlsx')
      const buffer = await file.arrayBuffer()
      const wb = read(buffer)
      const ws = wb.Sheets[wb.SheetNames[0]]
      const raw = utils.sheet_to_json(ws, { defval: '' })

      if (raw.length === 0) {
        setParseError('The file has no data rows. Add a header row (label, text, level) and at least one data row.')
        setParsing(false)
        return
      }

      const parsed = raw.map((row) => {
        // Normalize column names — accept many variants, case-insensitive
        const n = {}
        Object.keys(row).forEach(k => { n[k.toLowerCase().trim()] = String(row[k]).trim() })

        const label = (
          n['label'] || n['prompt'] || n['type'] || n['prompt type'] || n['prompttype'] || ''
        ).toUpperCase() || gameLabels[0] || ''

        const text = n['text'] || n['question'] || n['question text'] || n['questiontext'] || n['content'] || ''
        const level = n['level'] || n['difficulty'] || n['round'] || ''

        return { label, text, level, valid: text.trim().length > 0 }
      }).filter(r => r.label || r.text) // drop fully blank rows

      const validCount = parsed.filter(r => r.valid).length
      if (validCount === 0) {
        setParseError('No valid questions found. Make sure your file has a column named "text" or "question" with content.')
        setParsing(false)
        return
      }

      setRows(parsed)
    } catch {
      setParseError('Could not read the file. Make sure it is a valid .xlsx or .csv file.')
    }
    setParsing(false)
  }

  const handleUpload = async () => {
    const valid = rows.filter(r => r.valid).map(({ label, text, level }) => ({ label, text, level }))
    setUploading(true)
    await onUpload(valid)
    setUploading(false)
    onClose()
  }

  const validCount = rows ? rows.filter(r => r.valid).length : 0
  const skipCount  = rows ? rows.filter(r => !r.valid).length : 0

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: '20px' }}
      onClick={(e) => { if (e.target === e.currentTarget && !uploading) onClose() }}>
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: '16px', width: '100%', maxWidth: '640px', maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 32px 64px rgba(0,0,0,0.8)' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '20px 24px', borderBottom: '1px solid #1e1e1e' }}>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: '16px', color: '#fff', margin: '0 0 3px' }}>Bulk Upload Questions</h2>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>{selectedGame?.title}</p>
          </div>
          {!uploading && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', flexShrink: 0 }}><X size={18} /></button>
          )}
        </div>

        <div style={{ padding: '24px' }}>
          {/* ── Step 1: no file yet ── */}
          {!rows && (
            <>
              {/* Column guide */}
              <div style={{ background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '14px 16px', marginBottom: '14px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', margin: '0 0 10px', letterSpacing: '0.8px' }}>REQUIRED COLUMNS IN YOUR FILE</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {[
                    { col: 'label',  note: `Prompt type — e.g. ${gameLabels.slice(0, 2).join(', ')}`,                   req: false },
                    { col: 'text',   note: 'The question content',                                                        req: true  },
                    { col: 'level',  note: gameLevels.length ? `Difficulty — e.g. ${gameLevels.join(', ')}` : 'Difficulty (optional)', req: false },
                  ].map(({ col, note, req }) => (
                    <div key={col} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <code style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', color: '#f5c542', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{col}</code>
                      <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', flex: 1 }}>{note}</span>
                      {req && <span style={{ fontSize: '10px', color: '#e8453c', fontWeight: 700, background: 'rgba(232,69,60,0.1)', padding: '2px 7px', borderRadius: '999px', border: '1px solid rgba(232,69,60,0.2)' }}>required</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Download template */}
              <button
                onClick={downloadTemplate}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', background: 'transparent', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '9px 14px', color: 'rgba(255,255,255,0.55)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', marginBottom: '14px', width: '100%', transition: 'border-color 0.15s, color 0.15s' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
              >
                ↓ Download Template (.xlsx)
              </button>

              {/* File picker */}
              <div
                onClick={() => !parsing && fileRef.current?.click()}
                style={{ border: '2px dashed #2a2a2a', borderRadius: '12px', padding: '40px 24px', textAlign: 'center', cursor: parsing ? 'default' : 'pointer', transition: 'border-color 0.15s, background 0.15s' }}
                onMouseEnter={(e) => { if (!parsing) { e.currentTarget.style.borderColor = '#e8453c'; e.currentTarget.style.background = 'rgba(232,69,60,0.04)' } }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.background = 'transparent' }}
              >
                {parsing
                  ? <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', margin: 0 }}>Parsing file…</p>
                  : (
                    <>
                      <Upload size={28} color="rgba(255,255,255,0.2)" style={{ marginBottom: '10px' }} />
                      <p style={{ color: '#fff', fontSize: '13px', fontWeight: 700, margin: '0 0 4px' }}>Click to choose a file</p>
                      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', margin: 0 }}>Supports .xlsx and .csv</p>
                    </>
                  )
                }
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".xlsx,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                style={{ display: 'none' }}
                onChange={(e) => parseFile(e.target.files[0])}
              />

              {parseError && (
                <div style={{ background: 'rgba(232,69,60,0.1)', border: '1px solid rgba(232,69,60,0.25)', borderRadius: '8px', padding: '10px 14px', marginTop: '12px', fontSize: '13px', color: '#e8453c' }}>
                  {parseError}
                </div>
              )}
            </>
          )}

          {/* ── Step 2: preview ── */}
          {rows && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <p style={{ fontSize: '13px', margin: 0 }}>
                  <span style={{ color: '#fff', fontWeight: 700 }}>{validCount}</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)' }}> question{validCount !== 1 ? 's' : ''} ready</span>
                  {skipCount > 0 && <span style={{ color: 'rgba(255,255,255,0.3)' }}> · {skipCount} row{skipCount !== 1 ? 's' : ''} skipped (empty)</span>}
                </p>
                <button
                  onClick={() => { setRows(null); setParseError(''); if (fileRef.current) fileRef.current.value = '' }}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                >
                  Change file
                </button>
              </div>

              {/* Preview table */}
              <div style={{ background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: '10px', overflow: 'hidden', maxHeight: '300px', overflowY: 'auto', marginBottom: '16px' }}>
                {/* Sticky header */}
                <div style={{ display: 'grid', gridTemplateColumns: '130px 100px 1fr', padding: '9px 14px', borderBottom: '1px solid #1e1e1e', position: 'sticky', top: 0, background: '#0d0d0d', zIndex: 1 }}>
                  {['Label', 'Level', 'Question Text'].map(h => (
                    <span key={h} style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', textTransform: 'uppercase' }}>{h}</span>
                  ))}
                </div>
                {rows.map((r, i) => (
                  <div
                    key={i}
                    style={{ display: 'grid', gridTemplateColumns: '130px 100px 1fr', padding: '9px 14px', borderBottom: i < rows.length - 1 ? '1px solid #161616' : 'none', alignItems: 'center', opacity: r.valid ? 1 : 0.4 }}
                  >
                    <span style={{ fontSize: '9px', fontWeight: 800, color: '#f5c542', letterSpacing: '0.8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '8px' }}>
                      {r.label || '—'}
                    </span>
                    {r.level
                      ? <span style={{ display: 'inline-block', background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.28)', borderRadius: '999px', padding: '1px 8px', fontSize: '10px', fontWeight: 700, color: '#a78bfa', width: 'fit-content' }}>{r.level}</span>
                      : <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>—</span>
                    }
                    <p style={{ fontSize: '12px', color: r.valid ? 'rgba(255,255,255,0.8)' : '#e8453c', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.valid ? r.text : '(empty — will be skipped)'}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button onClick={onClose} disabled={uploading} style={{ background: 'transparent', border: '1px solid #252525', borderRadius: '8px', padding: '10px 18px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={uploading || validCount === 0}
                  style={{ background: uploading || validCount === 0 ? '#2a2a2a' : '#e8453c', border: 'none', borderRadius: '8px', padding: '10px 22px', color: uploading || validCount === 0 ? 'rgba(255,255,255,0.3)' : '#fff', fontSize: '13px', fontWeight: 800, cursor: uploading || validCount === 0 ? 'not-allowed' : 'pointer', transition: 'background 0.15s' }}
                >
                  {uploading ? 'Uploading…' : `Upload ${validCount} Question${validCount !== 1 ? 's' : ''}`}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export function AdminQuestions() {
  const { games, addCard, editCard, deleteCard, bulkAddCards } = useStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedGameId, setSelectedGameId] = useState(searchParams.get('game') || (games[0]?.id || ''))
  const [modal, setModal]     = useState(null)
  const [showBulk, setShowBulk] = useState(false)
  const [form, setForm]       = useState({ label: '', text: '', level: '' })

  useEffect(() => {
    const gid = searchParams.get('game')
    if (gid) setSelectedGameId(gid)
  }, [searchParams])

  const selectedGame = games.find(g => g.id === selectedGameId)
  const cards        = selectedGame?.cards || []
  const gameLabels   = selectedGame?.labels?.length > 0 ? selectedGame.labels : DEFAULT_LABELS
  const gameLevels   = selectedGame?.levels || []

  const blankForm = (gameId) => {
    const game = games.find(g => g.id === gameId)
    const labels = game?.labels?.length > 0 ? game.labels : DEFAULT_LABELS
    return { label: labels[0] || '', text: '', level: '' }
  }

  const openAdd  = () => { setForm(blankForm(selectedGameId)); setModal({ mode: 'add' }) }
  const openEdit = (c) => { setForm({ label: c.label || gameLabels[0] || '', text: c.text, level: c.level || '' }); setModal({ mode: 'edit', id: c.id }) }
  const close    = () => setModal(null)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleGameChange = (gameId) => {
    setSelectedGameId(gameId)
    setSearchParams({ game: gameId })
    const labels = games.find(g => g.id === gameId)?.labels
    setForm(f => ({ ...f, label: (labels?.length > 0 ? labels[0] : DEFAULT_LABELS[0]) || '', level: '' }))
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

  const handleBulkUpload = async (cards) => {
    await bulkAddCards(selectedGameId, cards)
  }

  return (
    <div style={{ padding: '36px 32px 48px', color: '#fff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 900, margin: '0 0 4px', letterSpacing: '-0.3px' }}>Questions</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>Manage prompt cards per game</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowBulk(true)}
            disabled={!selectedGameId}
            style={{ display: 'flex', alignItems: 'center', gap: '7px', background: selectedGameId ? 'rgba(255,255,255,0.06)' : 'transparent', color: selectedGameId ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)', border: '1px solid #252525', borderRadius: '9px', padding: '10px 16px', fontSize: '13px', fontWeight: 700, cursor: selectedGameId ? 'pointer' : 'not-allowed', transition: 'background 0.15s' }}
            onMouseEnter={(e) => { if (selectedGameId) e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = selectedGameId ? 'rgba(255,255,255,0.06)' : 'transparent' }}
          >
            <Upload size={14} /> Bulk Upload
          </button>
          <button
            onClick={openAdd}
            disabled={!selectedGameId}
            style={{ display: 'flex', alignItems: 'center', gap: '7px', background: selectedGameId ? '#e8453c' : '#222', color: selectedGameId ? '#fff' : 'rgba(255,255,255,0.3)', border: 'none', borderRadius: '9px', padding: '10px 18px', fontSize: '13px', fontWeight: 700, cursor: selectedGameId ? 'pointer' : 'not-allowed' }}
          >
            <Plus size={15} /> Add Question
          </button>
        </div>
      </div>

      {/* Game selector + chips */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap', letterSpacing: '0.5px' }}>FILTER BY GAME</label>
          <select value={selectedGameId} onChange={(e) => handleGameChange(e.target.value)} style={{ ...inp(), maxWidth: '280px', flex: 1 }}>
            {games.map(g => <option key={g.id} value={g.id}>{g.title} ({g.cards?.length || 0} cards)</option>)}
          </select>
        </div>
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
            {selectedGameId ? 'No questions yet — add one or bulk upload.' : 'Select a game to manage questions.'}
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
        <p style={{ textAlign: 'right', fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '10px' }}>
          {cards.length} question{cards.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Single question modal */}
      {modal && (
        <Modal title={modal.mode === 'add' ? 'Add Question' : 'Edit Question'} onClose={close}>
          <Field label="Game">
            <select style={inp()} value={selectedGameId} onChange={(e) => {
              const gid = e.target.value
              const g = games.find(x => x.id === gid)
              const labels = g?.labels?.length > 0 ? g.labels : DEFAULT_LABELS
              setSelectedGameId(gid)
              setForm(f => ({ ...f, label: labels[0] || '', level: '' }))
            }}>
              {games.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
            </select>
          </Field>
          <Field label="Label / Prompt Type">
            <select style={inp()} value={form.label} onChange={set('label')} onFocus={(e) => { e.target.style.borderColor = '#f5c542' }} onBlur={(e) => { e.target.style.borderColor = '#252525' }}>
              {gameLabels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </Field>
          {gameLevels.length > 0 && (
            <Field label="Level">
              <select style={inp()} value={form.level} onChange={set('level')} onFocus={(e) => { e.target.style.borderColor = '#a78bfa' }} onBlur={(e) => { e.target.style.borderColor = '#252525' }}>
                <option value="">— No level —</option>
                {gameLevels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </Field>
          )}
          <Field label="Question Text">
            <textarea
              style={inp({ resize: 'vertical', minHeight: '100px', padding: '10px 12px' })}
              value={form.text} onChange={set('text')} placeholder="you've ever…"
              onFocus={(e) => { e.target.style.borderColor = '#e8453c' }}
              onBlur={(e) => { e.target.style.borderColor = '#252525' }}
            />
          </Field>
          {form.text && (
            <div style={{ background: '#1742C5', borderRadius: '12px', padding: '16px 18px', marginBottom: '16px' }}>
              {form.level && (
                <span style={{ display: 'inline-block', background: 'rgba(167,139,250,0.25)', border: '1px solid rgba(167,139,250,0.4)', borderRadius: '999px', padding: '2px 10px', fontSize: '10px', fontWeight: 700, color: '#c4b5fd', marginBottom: '8px' }}>{form.level}</span>
              )}
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

      {/* Bulk upload modal */}
      {showBulk && (
        <BulkUploadModal
          onClose={() => setShowBulk(false)}
          selectedGame={selectedGame}
          gameLabels={gameLabels}
          gameLevels={gameLevels}
          onUpload={handleBulkUpload}
        />
      )}
    </div>
  )
}

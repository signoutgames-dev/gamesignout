import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User, Gamepad2 } from 'lucide-react'
import { useAdmin } from '../../context/AdminContext'

export function AdminLogin() {
  const { isAdmin, login } = useAdmin()
  const navigate = useNavigate()

  const [form, setForm] = useState({ username: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const submitTimer = useRef(null)

  useEffect(() => {
    if (isAdmin) navigate('/admin/dashboard', { replace: true })
  }, [isAdmin, navigate])

  useEffect(() => {
    return () => clearTimeout(submitTimer.current)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    clearTimeout(submitTimer.current)
    submitTimer.current = setTimeout(() => {
      const ok = login(form.username.trim(), form.password)
      if (ok) navigate('/admin/dashboard', { replace: true })
      else { setError('Wrong username or password.'); setLoading(false) }
    }, 500)
  }

  const inp = {
    background: '#161616',
    border: '1px solid #252525',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
    padding: '12px 14px 12px 42px',
    width: '100%',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '24px' }}>
      {/* Background glow */}
      <div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(232,69,60,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '380px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#e8453c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
            <Gamepad2 size={24} color="#fff" />
          </div>
          <h1 style={{ fontWeight: 900, fontSize: '22px', color: '#fff', margin: '0 0 4px' }}>Admin Login</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>signout · Game Management</p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '16px', padding: '28px', boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}
        >
          {/* Username */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '6px', letterSpacing: '0.5px' }}>USERNAME</label>
            <div style={{ position: 'relative' }}>
              <User size={15} color="rgba(255,255,255,0.25)" style={{ position: 'absolute', top: '50%', left: '14px', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="aayush"
                value={form.username}
                onChange={(e) => setForm(f => ({ ...f, username: e.target.value }))}
                style={inp}
                onFocus={(e) => { e.target.style.borderColor = '#e8453c' }}
                onBlur={(e) => { e.target.style.borderColor = '#252525' }}
                autoComplete="username"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '6px', letterSpacing: '0.5px' }}>PASSWORD</label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} color="rgba(255,255,255,0.25)" style={{ position: 'absolute', top: '50%', left: '14px', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••••"
                value={form.password}
                onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                style={{ ...inp, paddingRight: '42px' }}
                onFocus={(e) => { e.target.style.borderColor = '#e8453c' }}
                onBlur={(e) => { e.target.style.borderColor = '#252525' }}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', padding: '4px' }}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: 'rgba(232,69,60,0.1)', border: '1px solid rgba(232,69,60,0.25)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '13px', color: '#e8453c' }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#333' : '#e8453c',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              padding: '13px',
              fontSize: '14px',
              fontWeight: 800,
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.5px',
              transition: 'background 0.15s, transform 0.1s',
            }}
            onMouseDown={(e) => { if (!loading) e.currentTarget.style.transform = 'scale(0.98)' }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  )
}

import { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StoreProvider } from './context/StoreContext'
import { AdminProvider } from './context/AdminContext'
import { AuthProvider } from './context/AuthContext'
import { GameProvider } from './context/GameContext'
import { AppLayout } from './components/layout/AppLayout'
import { AdminGuard } from './components/admin/AdminGuard'
import { AdminLayout } from './components/admin/AdminLayout'
import { Dashboard } from './pages/Dashboard'
import { Favorites } from './pages/Favorites'
import { Play } from './pages/Play'
import { HowToPlay } from './pages/HowToPlay'
import { GamePlay } from './pages/GamePlay'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminGames } from './pages/admin/AdminGames'
import { AdminQuestions } from './pages/admin/AdminQuestions'
import { AdminCategories } from './pages/admin/AdminCategories'
import { AdminTags } from './pages/admin/AdminTags'
import { AdminMoments } from './pages/admin/AdminMoments'

class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) { console.error('App error:', error, info) }
  render() {
    if (!this.state.error) return this.props.children
    return (
      <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠</div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px' }}>Something went wrong</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: '0 0 24px' }}>The app encountered an unexpected error.</p>
          <button onClick={() => window.location.reload()} style={{ background: '#e8453c', color: '#fff', border: 'none', borderRadius: '999px', padding: '12px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>Reload App</button>
        </div>
      </div>
    )
  }
}

const queryClient = new QueryClient()

export function App() {
  return (
    <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <AdminProvider>
          <AuthProvider>
          <GameProvider>
            <BrowserRouter>
              <Routes>
                {/* Card game experience — full screen, no sidebar */}
                <Route path="/play" element={<Play />} />
                <Route path="/play/:gameId" element={<HowToPlay />} />
                <Route path="/play/:gameId/cards" element={<GamePlay />} />

                {/* Admin login */}
                <Route path="/admin" element={<AdminLogin />} />

                {/* Admin panel — behind guard + layout */}
                <Route element={<AdminGuard />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/games" element={<AdminGames />} />
                    <Route path="/admin/questions" element={<AdminQuestions />} />
                    <Route path="/admin/moments" element={<AdminMoments />} />
                    <Route path="/admin/categories" element={<AdminCategories />} />
                    <Route path="/admin/tags" element={<AdminTags />} />
                  </Route>
                </Route>

                {/* Main user app with sidebar */}
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/favorites" element={<Favorites />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </GameProvider>
          </AuthProvider>
        </AdminProvider>
      </StoreProvider>
    </QueryClientProvider>
    </ErrorBoundary>
  )
}

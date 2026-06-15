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
import { Leaderboard } from './pages/Leaderboard'
import { Play } from './pages/Play'
import { HowToPlay } from './pages/HowToPlay'
import { GamePlay } from './pages/GamePlay'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminGames } from './pages/admin/AdminGames'
import { AdminQuestions } from './pages/admin/AdminQuestions'
import { AdminCategories } from './pages/admin/AdminCategories'
import { AdminTags } from './pages/admin/AdminTags'

const queryClient = new QueryClient()

export function App() {
  return (
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
                    <Route path="/admin/categories" element={<AdminCategories />} />
                    <Route path="/admin/tags" element={<AdminTags />} />
                  </Route>
                </Route>

                {/* Main user app with sidebar */}
                <Route element={<AppLayout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </GameProvider>
          </AuthProvider>
        </AdminProvider>
      </StoreProvider>
    </QueryClientProvider>
  )
}

# GameSignOut

A gamified game sign-out kiosk app built with **React**, **Tailwind CSS**, **Supabase**, and **PostgreSQL**.

Track player game sessions, scores, XP, levels, badges, and leaderboards — no authentication required (kiosk/demo mode).

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + JavaScript (Vite) |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Data fetching | TanStack React Query v5 |
| Backend | Supabase (PostgREST + Realtime) |
| Database | PostgreSQL |

## Features

- **Sign In / Sign Out** — Start and end game sessions with score tracking
- **XP & Levels** — Earn XP based on play duration and score
- **Badges** — Auto-awarded achievements (first session, streaks, high scores)
- **Leaderboard** — Player rankings by total XP
- **Realtime** — Active sessions update live via Supabase Realtime

## Getting Started

### 1. Clone and install

```bash
cd gamesignout
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Open the **SQL Editor** in your Supabase dashboard
3. Run the migration: copy contents of `supabase/migrations/001_initial_schema.sql` and execute
4. Run the seed data: copy contents of `supabase/seed.sql` and execute
5. Go to **Settings → API** and copy your Project URL and anon key

### 3. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Project Structure

```
gamesignout/
├── src/
│   ├── components/
│   │   ├── ui/              # Button, Card, Input, Badge, Modal, Spinner
│   │   ├── layout/          # AppLayout with sidebar nav
│   │   ├── players/         # PlayerCard, PlayerForm
│   │   ├── games/           # GameCard
│   │   ├── sessions/        # SignInPanel, ActiveSessionCard
│   │   └── gamification/    # XpBar, LevelBadge, LeaderboardTable, AchievementGrid
│   ├── hooks/               # React Query hooks for all entities
│   ├── lib/                 # Supabase client, XP helpers, utilities
│   ├── pages/               # Dashboard, Players, Games, Sessions, Leaderboard
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   ├── migrations/          # Database schema
│   └── seed.sql             # Sample data
└── public/
```

## Gamification Rules

| Mechanic | Formula |
|---|---|
| XP per session | `(duration_min × 2 + score × 0.5) × game_multiplier` |
| Level | `floor(sqrt(total_xp / 100)) + 1` |
| Streak | +1 day if player had a session yesterday |
| Badges | First Session, 10 Sessions, Score 1000+, 7-Day Streak, Play 5 Games |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## License

MIT

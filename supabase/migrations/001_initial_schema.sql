-- GameSignOut initial schema

-- Players
CREATE TABLE players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar_url text,
  total_xp int NOT NULL DEFAULT 0,
  level int NOT NULL DEFAULT 1,
  current_streak int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Games
CREATE TABLE games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'arcade',
  icon text NOT NULL DEFAULT '🎮',
  xp_multiplier float NOT NULL DEFAULT 1.0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Sessions
CREATE TABLE sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  game_id uuid NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  signed_in_at timestamptz NOT NULL DEFAULT now(),
  signed_out_at timestamptz,
  score int NOT NULL DEFAULT 0,
  xp_earned int NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled'))
);

CREATE INDEX idx_sessions_player ON sessions(player_id);
CREATE INDEX idx_sessions_game ON sessions(game_id);
CREATE INDEX idx_sessions_status ON sessions(status);

-- Badges
CREATE TABLE badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text NOT NULL DEFAULT '🏆',
  criteria_type text NOT NULL CHECK (criteria_type IN ('sessions_count', 'total_score', 'streak_days', 'games_played')),
  criteria_value int NOT NULL DEFAULT 1
);

-- Player badges (junction)
CREATE TABLE player_badges (
  player_id uuid NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  badge_id uuid NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (player_id, badge_id)
);

-- Leaderboard view
CREATE VIEW leaderboard AS
SELECT
  p.id,
  p.name,
  p.avatar_url,
  p.total_xp,
  p.level,
  p.current_streak,
  COUNT(s.id) FILTER (WHERE s.status = 'completed') AS sessions_count,
  (
    SELECT g.name
    FROM sessions s2
    JOIN games g ON g.id = s2.game_id
    WHERE s2.player_id = p.id AND s2.status = 'completed'
    GROUP BY g.id, g.name
    ORDER BY COUNT(*) DESC
    LIMIT 1
  ) AS top_game
FROM players p
LEFT JOIN sessions s ON s.player_id = p.id
GROUP BY p.id, p.name, p.avatar_url, p.total_xp, p.level, p.current_streak
ORDER BY p.total_xp DESC;

-- XP calculation helper
CREATE OR REPLACE FUNCTION calculate_xp(
  duration_minutes float,
  session_score int,
  xp_multiplier float
) RETURNS int AS $$
BEGIN
  RETURN GREATEST(1, FLOOR((duration_minutes * 2 + session_score * 0.5) * xp_multiplier));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Level from XP
CREATE OR REPLACE FUNCTION xp_to_level(xp int) RETURNS int AS $$
BEGIN
  RETURN GREATEST(1, FLOOR(SQRT(xp / 100.0)) + 1);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Update player streak
CREATE OR REPLACE FUNCTION update_player_streak(p_player_id uuid) RETURNS void AS $$
DECLARE
  last_session_date date;
  today date := CURRENT_DATE;
BEGIN
  SELECT MAX(signed_in_at::date) INTO last_session_date
  FROM sessions
  WHERE player_id = p_player_id AND status = 'completed';

  IF last_session_date = today - 1 THEN
    UPDATE players SET current_streak = current_streak + 1 WHERE id = p_player_id;
  ELSIF last_session_date IS NULL OR last_session_date < today - 1 THEN
    UPDATE players SET current_streak = 1 WHERE id = p_player_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Check and award badges
CREATE OR REPLACE FUNCTION check_badge_awards(p_player_id uuid) RETURNS void AS $$
DECLARE
  badge_rec RECORD;
  player_sessions int;
  player_total_score bigint;
  player_streak int;
  player_games_played int;
BEGIN
  SELECT current_streak INTO player_streak FROM players WHERE id = p_player_id;

  SELECT COUNT(*) INTO player_sessions
  FROM sessions WHERE player_id = p_player_id AND status = 'completed';

  SELECT COALESCE(SUM(score), 0) INTO player_total_score
  FROM sessions WHERE player_id = p_player_id AND status = 'completed';

  SELECT COUNT(DISTINCT game_id) INTO player_games_played
  FROM sessions WHERE player_id = p_player_id AND status = 'completed';

  FOR badge_rec IN SELECT * FROM badges LOOP
    IF EXISTS (SELECT 1 FROM player_badges WHERE player_id = p_player_id AND badge_id = badge_rec.id) THEN
      CONTINUE;
    END IF;

    IF badge_rec.criteria_type = 'sessions_count' AND player_sessions >= badge_rec.criteria_value THEN
      INSERT INTO player_badges (player_id, badge_id) VALUES (p_player_id, badge_rec.id);
    ELSIF badge_rec.criteria_type = 'total_score' AND player_total_score >= badge_rec.criteria_value THEN
      INSERT INTO player_badges (player_id, badge_id) VALUES (p_player_id, badge_rec.id);
    ELSIF badge_rec.criteria_type = 'streak_days' AND player_streak >= badge_rec.criteria_value THEN
      INSERT INTO player_badges (player_id, badge_id) VALUES (p_player_id, badge_rec.id);
    ELSIF badge_rec.criteria_type = 'games_played' AND player_games_played >= badge_rec.criteria_value THEN
      INSERT INTO player_badges (player_id, badge_id) VALUES (p_player_id, badge_rec.id);
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Handle session sign-out: calculate XP, update player, award badges
CREATE OR REPLACE FUNCTION handle_session_signout() RETURNS TRIGGER AS $$
DECLARE
  duration_min float;
  game_multiplier float;
  earned_xp int;
  new_total_xp int;
BEGIN
  IF NEW.status = 'completed' AND OLD.status = 'active' AND NEW.signed_out_at IS NOT NULL THEN
    SELECT xp_multiplier INTO game_multiplier FROM games WHERE id = NEW.game_id;

    duration_min := EXTRACT(EPOCH FROM (NEW.signed_out_at - NEW.signed_in_at)) / 60.0;
    earned_xp := calculate_xp(duration_min, NEW.score, game_multiplier);
    NEW.xp_earned := earned_xp;

    UPDATE players
    SET total_xp = total_xp + earned_xp,
        level = xp_to_level(total_xp + earned_xp)
    WHERE id = NEW.player_id
    RETURNING total_xp INTO new_total_xp;

    PERFORM update_player_streak(NEW.player_id);
    PERFORM check_badge_awards(NEW.player_id);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_session_signout
  BEFORE UPDATE ON sessions
  FOR EACH ROW
  EXECUTE FUNCTION handle_session_signout();

-- Row Level Security (open access for kiosk/demo mode)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all on players" ON players FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on games" ON games FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on sessions" ON sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on badges" ON badges FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on player_badges" ON player_badges FOR ALL USING (true) WITH CHECK (true);

-- Enable realtime for sessions
ALTER PUBLICATION supabase_realtime ADD TABLE sessions;

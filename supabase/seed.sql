-- Seed data for GameSignOut

INSERT INTO games (name, description, category, icon, xp_multiplier) VALUES
  ('Pac-Man', 'Classic arcade maze chase', 'arcade', '👾', 1.0),
  ('Street Fighter', 'Competitive fighting game', 'arcade', '🥊', 1.2),
  ('Mario Kart', 'Kart racing mayhem', 'console', '🏎️', 1.1),
  ('Chess', 'Strategic board game', 'board', '♟️', 0.8),
  ('Pinball', 'Retro pinball machine', 'arcade', '📍', 1.0),
  ('Dance Dance Revolution', 'Rhythm dance game', 'arcade', '💃', 1.3);

INSERT INTO badges (name, description, icon, criteria_type, criteria_value) VALUES
  ('First Session', 'Complete your first game session', '🎯', 'sessions_count', 1),
  ('Veteran', 'Complete 10 game sessions', '⭐', 'sessions_count', 10),
  ('High Scorer', 'Reach a total score of 1000+', '🔥', 'total_score', 1000),
  ('On Fire', 'Maintain a 7-day streak', '🔥', 'streak_days', 7),
  ('Explorer', 'Play 5 different games', '🗺️', 'games_played', 5);

INSERT INTO players (name, total_xp, level, current_streak) VALUES
  ('Alex', 450, 3, 2),
  ('Jordan', 280, 2, 1),
  ('Sam', 120, 2, 0);

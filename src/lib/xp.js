export function xpToLevel(xp) {
  return Math.max(1, Math.floor(Math.sqrt(xp / 100)) + 1)
}

export function xpForLevel(level) {
  return Math.pow(level - 1, 2) * 100
}

export function xpProgressInLevel(totalXp) {
  const level = xpToLevel(totalXp)
  const currentLevelXp = xpForLevel(level)
  const nextLevelXp = xpForLevel(level + 1)
  const current = totalXp - currentLevelXp
  const needed = nextLevelXp - currentLevelXp
  const percent = Math.min(100, Math.round((current / needed) * 100))

  return { current, needed, percent }
}

export function estimateXp(durationMinutes, score, multiplier) {
  return Math.max(1, Math.floor((durationMinutes * 2 + score * 0.5) * multiplier))
}

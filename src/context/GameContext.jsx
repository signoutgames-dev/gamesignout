import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { db } from '../lib/firebase'
import {
  collection, doc, onSnapshot, setDoc, deleteDoc, getDoc, increment,
} from 'firebase/firestore'

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState({})
  const [cardsPlayed, setCardsPlayed] = useState(0)
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const startedIds = useRef(new Set())

  useEffect(() => {
    if (!user) {
      setFavorites({})
      setCardsPlayed(0)
      setGamesPlayed(0)
      startedIds.current = new Set()
      return
    }

    // Real-time favorites listener
    const unsubFav = onSnapshot(collection(db, 'users', user.uid, 'favorites'), snap => {
      const map = {}
      snap.docs.forEach(d => { map[d.id] = d.data() })
      setFavorites(map)
    })

    // Save/refresh public profile so leaderboard can read it
    setDoc(doc(db, 'users', user.uid), {
      displayName: user.displayName || 'Player',
      photoURL: user.photoURL || null,
      uid: user.uid,
    }, { merge: true })

    // Load stats once
    getDoc(doc(db, 'users', user.uid)).then(snap => {
      if (snap.exists()) {
        const data = snap.data()
        setCardsPlayed(data.cardsPlayed ?? 0)
        setGamesPlayed(data.gamesPlayed ?? 0)
        if (Array.isArray(data.startedGameIds)) {
          startedIds.current = new Set(data.startedGameIds)
        }
      }
    })

    return () => unsubFav()
  }, [user?.uid])

  const toggleFavorite = useCallback(async (card, gameId, gameTitle) => {
    const isFav = Boolean(favorites[card.id])
    if (user) {
      const ref = doc(db, 'users', user.uid, 'favorites', String(card.id))
      if (isFav) await deleteDoc(ref)
      else await setDoc(ref, { card, gameId, gameTitle })
    } else {
      setFavorites(prev => {
        const next = { ...prev }
        if (next[card.id]) delete next[card.id]
        else next[card.id] = { card, gameId, gameTitle }
        return next
      })
    }
  }, [favorites, user])

  const recordCardPlayed = useCallback(async () => {
    setCardsPlayed(n => n + 1)
    if (user) {
      await setDoc(doc(db, 'users', user.uid), { cardsPlayed: increment(1) }, { merge: true })
    }
  }, [user])

  const recordGameStarted = useCallback(async (gameId) => {
    if (startedIds.current.has(gameId)) return
    startedIds.current.add(gameId)
    setGamesPlayed(n => n + 1)
    if (user) {
      await setDoc(doc(db, 'users', user.uid), {
        gamesPlayed: increment(1),
        startedGameIds: [...startedIds.current],
      }, { merge: true })
    }
  }, [user])

  const favoritesList = Object.values(favorites)
  const favoritesCount = favoritesList.length
  const isFavorited = (cardId) => Boolean(favorites[cardId])

  return (
    <GameContext.Provider value={{
      favoritesList,
      favoritesCount,
      isFavorited,
      toggleFavorite,
      stats: { cardsPlayed, gamesPlayed },
      recordCardPlayed,
      recordGameStarted,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside GameProvider')
  return ctx
}

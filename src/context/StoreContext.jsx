import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { GAMES as DEFAULT_GAMES, CATEGORIES as DEFAULT_CATEGORIES, MOMENTS as DEFAULT_MOMENTS } from '../data/games'
import { db } from '../lib/firebase'
import {
  collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc,
  getDocs, writeBatch, getDoc,
} from 'firebase/firestore'

const StoreContext = createContext(null)

const DEFAULT_TAGS = [...new Set(DEFAULT_GAMES.flatMap(g => g.tags))]
const DATA_VERSION = 4

async function seedIfEmpty() {
  const configSnap = await getDoc(doc(db, 'meta', 'config'))
  const currentVersion = configSnap.exists() ? (configSnap.data().version ?? 0) : 0
  if (currentVersion >= DATA_VERSION) return

  const batch = writeBatch(db)
  DEFAULT_GAMES.forEach(game => batch.set(doc(db, 'games', game.id), game))
  DEFAULT_CATEGORIES.forEach(cat => batch.set(doc(db, 'categories', cat.id), cat))
  batch.set(doc(db, 'meta', 'tags'), { list: DEFAULT_TAGS })
  batch.set(doc(db, 'meta', 'config'), { version: DATA_VERSION })
  await batch.commit()
}

async function seedMomentsIfEmpty() {
  const snap = await getDocs(collection(db, 'moments'))
  if (!snap.empty) return
  const batch = writeBatch(db)
  DEFAULT_MOMENTS.forEach(m => batch.set(doc(db, 'moments', m.id), m))
  await batch.commit()
}

export function StoreProvider({ children }) {
  const [games, setGames] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [moments, setMoments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    seedIfEmpty()
    seedMomentsIfEmpty()

    const unsubGames = onSnapshot(collection(db, 'games'), snap => {
      setGames(snap.docs.map(d => d.data()))
      setLoading(false)
    })
    const unsubCats = onSnapshot(collection(db, 'categories'), snap => {
      setCategories(snap.docs.map(d => d.data()))
    })
    const unsubTags = onSnapshot(doc(db, 'meta', 'tags'), snap => {
      setTags(snap.exists() ? (snap.data().list ?? []) : [])
    })
    const unsubMoments = onSnapshot(collection(db, 'moments'), snap => {
      setMoments(snap.docs.map(d => d.data()))
    })

    return () => { unsubGames(); unsubCats(); unsubTags(); unsubMoments() }
  }, [])

  // Games
  const addGame = useCallback(async (g) => {
    await setDoc(doc(db, 'games', g.id), g)
  }, [])

  const editGame = useCallback(async (id, data) => {
    await updateDoc(doc(db, 'games', id), data)
  }, [])

  const deleteGame = useCallback(async (id) => {
    await deleteDoc(doc(db, 'games', id))
  }, [])

  // Cards — fetch current game first to avoid stale closure issues
  const addCard = useCallback(async (gameId, card) => {
    const snap = await getDoc(doc(db, 'games', gameId))
    if (!snap.exists()) return
    const cards = snap.data().cards ?? []
    await updateDoc(doc(db, 'games', gameId), { cards: [...cards, card] })
  }, [])

  const editCard = useCallback(async (gameId, cardId, data) => {
    const snap = await getDoc(doc(db, 'games', gameId))
    if (!snap.exists()) return
    const cards = snap.data().cards ?? []
    await updateDoc(doc(db, 'games', gameId), {
      cards: cards.map(c => c.id === cardId ? { ...c, ...data } : c),
    })
  }, [])

  const deleteCard = useCallback(async (gameId, cardId) => {
    const snap = await getDoc(doc(db, 'games', gameId))
    if (!snap.exists()) return
    const cards = snap.data().cards ?? []
    await updateDoc(doc(db, 'games', gameId), {
      cards: cards.filter(c => c.id !== cardId),
    })
  }, [])

  const bulkAddCards = useCallback(async (gameId, newCards) => {
    const snap = await getDoc(doc(db, 'games', gameId))
    if (!snap.exists()) return 0
    const existing = snap.data().cards ?? []
    const startId = existing.length > 0 ? Math.max(...existing.map(c => c.id)) + 1 : 1
    const withIds = newCards.map((c, i) => ({ ...c, id: startId + i }))
    await updateDoc(doc(db, 'games', gameId), { cards: [...existing, ...withIds] })
    return withIds.length
  }, [])

  // Moments
  const addMoment = useCallback(async (m) => {
    await setDoc(doc(db, 'moments', m.id), m)
  }, [])

  const editMoment = useCallback(async (id, data) => {
    await updateDoc(doc(db, 'moments', id), data)
  }, [])

  const deleteMoment = useCallback(async (id) => {
    await deleteDoc(doc(db, 'moments', id))
  }, [])

  // Categories
  const addCategory = useCallback(async (cat) => {
    await setDoc(doc(db, 'categories', cat.id), cat)
  }, [])

  const editCategory = useCallback(async (id, data) => {
    await updateDoc(doc(db, 'categories', id), data)
  }, [])

  const deleteCategory = useCallback(async (id) => {
    await deleteDoc(doc(db, 'categories', id))
  }, [])

  // Tags — stored as array in single doc
  const addTag = useCallback(async (tag) => {
    const snap = await getDoc(doc(db, 'meta', 'tags'))
    const list = snap.exists() ? (snap.data().list ?? []) : []
    if (list.includes(tag)) return
    await setDoc(doc(db, 'meta', 'tags'), { list: [...list, tag] })
  }, [])

  const deleteTag = useCallback(async (tag) => {
    const snap = await getDoc(doc(db, 'meta', 'tags'))
    const list = snap.exists() ? (snap.data().list ?? []) : []
    await setDoc(doc(db, 'meta', 'tags'), { list: list.filter(t => t !== tag) })
  }, [])

  return (
    <StoreContext.Provider value={{
      games, categories, tags, moments, loading,
      addGame, editGame, deleteGame,
      addCard, editCard, deleteCard, bulkAddCards,
      addMoment, editMoment, deleteMoment,
      addCategory, editCategory, deleteCategory,
      addTag, deleteTag,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be inside StoreProvider')
  return ctx
}

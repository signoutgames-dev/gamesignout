import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAFjiaxKviKbhi6I1_ZAeiyD_B0TRo7VIs",
  authDomain: "gamesignout.firebaseapp.com",
  projectId: "gamesignout",
  storageBucket: "gamesignout.firebasestorage.app",
  messagingSenderId: "159874956173",
  appId: "1:159874956173:web:bd59aaa15e0dd331fc9bc4",
  measurementId: "G-ME3SS16QT0"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })

// Mobile browsers (especially iOS Safari) block popups — use redirect instead
const isMobile = () => /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

export const signInWithGoogle = () =>
  isMobile()
    ? signInWithRedirect(auth, googleProvider)
    : signInWithPopup(auth, googleProvider)

export const signOutUser = () => signOut(auth)
export { onAuthStateChanged, getRedirectResult }

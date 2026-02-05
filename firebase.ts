
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy, Timestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { UserRole, BetaSignup } from './types';

// NOTE: These would normally be environment variables. 
// For this demo, we use a placeholder config structure.
const firebaseConfig = {
  apiKey: "AIzaSyAs-demo-key-replace-me",
  authDomain: "plainer-beta.firebaseapp.com",
  projectId: "plainer-beta",
  storageBucket: "plainer-beta.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const registerBetaSignup = async (email: string, role: UserRole) => {
  try {
    const signupCollection = collection(db, 'beta_signups');
    
    // Check for duplicates first (simple check)
    const q = query(signupCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw new Error("Email già registrata.");
    }

    await addDoc(signupCollection, {
      email,
      role,
      createdAt: Timestamp.now()
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getBetaSignups = async (): Promise<BetaSignup[]> => {
  const signupCollection = collection(db, 'beta_signups');
  const q = query(signupCollection, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as BetaSignup[];
};

export { auth, db };

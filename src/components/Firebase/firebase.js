import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_AUTH_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

// when signing up, ensure an account does not already exist
async function signUpWithGoogle() {
  const googleAuthProvider = new GoogleAuthProvider();
  googleAuthProvider.setCustomParameters({
    prompt: "select_account",
  });
  const response = await signInWithPopup(auth, googleAuthProvider);
  const { user } = response;
  return user;
}

async function signUpWithFacebook() {
  const facebookAuthProvider = new FacebookAuthProvider();
  facebookAuthProvider.setCustomParameters({
    prompt: "select_account",
  });
  const response = await signInWithPopup(auth, facebookAuthProvider);
  const { user } = response;
  return user;
}

// when signin in, ensure an account already exists
async function signInWithGoogle() {
  const googleAuthProvider = new GoogleAuthProvider();
  googleAuthProvider.setCustomParameters({
    prompt: "select_account",
  });
  const response = await signInWithPopup(auth, googleAuthProvider);
  const { user } = response;
  return user;
}

async function signInWithFacebook() {
  const facebookAuthProvider = new FacebookAuthProvider();
  const response = await signInWithPopup(auth, facebookAuthProvider);
  const { user } = response;
  return user;
}

export {
  signUpWithGoogle,
  signUpWithFacebook,
  signInWithGoogle,
  signInWithFacebook,
};

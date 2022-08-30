import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// const analytics = getAnalytics(app);
const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_AUTH_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});
const auth = getAuth(app);

function getGoogleAuthProvider() {
  const googleAuthProvider = new GoogleAuthProvider();
  googleAuthProvider.setCustomParameters({
    prompt: "select_account",
  });
  return googleAuthProvider;
}

function getFacebookAuthProvider() {
  const facebookAuthProvider = new FacebookAuthProvider();
  return facebookAuthProvider;
}

function getSocialProvider(provider) {
  switch (provider) {
    case "GOOGLE":
      return getGoogleAuthProvider();
    case "FACEBOOK":
      return getFacebookAuthProvider();
    default:
      return null;
  }
}

async function signInSignUpWithSocial(provider) {
  const socialAuthProvider = getSocialProvider(provider);
  const response = await signInWithPopup(auth, socialAuthProvider);
  const { user } = response;
  return user;
}

async function signInSignUpWithEmailPassword(method, email, password) {
  try {
    console.log({ email, password });
    let response;
    switch (method) {
      case "SIGN_UP":
        response = await createUserWithEmailAndPassword(auth, email, password);
        break;
      case "SIGN_IN":
        response = await signInWithEmailAndPassword(auth, email, password);
        break;
    }

    if (!response) {
      throw Error("Email authentication failed.");
    }

    const { user } = response;
    return user;
  } catch (e) {
    console.log({ e });
  }
}

async function handleSendPasswordResetEmail(email) {
  await sendPasswordResetEmail(auth, email, {
    url: `${window.location.origin}/signin`,
  });
}

export {
  signInSignUpWithSocial,
  signInSignUpWithEmailPassword,
  handleSendPasswordResetEmail,
};

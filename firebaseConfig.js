// Importing specific functions from the Firebase app module
const { initializeApp } = require("firebase/app");

// Importing specific functions from the Firestore module
const { getFirestore, collection, doc } = require("firebase/firestore");

// Importing specific functions from the Auth module
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut: firebaseSignOut,
} = require("firebase/auth");
const { environmentConfig } = require("./envConfig");

const firebaseConfig = {
  apiKey: environmentConfig.FIREBASE_API_KEY,
  authDomain: environmentConfig.FIREBASE_AUTH_DOMAIN,
  projectId: environmentConfig.FIREBASE_PROJECT_ID,
  storageBucket: environmentConfig.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: environmentConfig.FIREBASE_MESSAGE_SENDER_ID,
  appId: environmentConfig.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const signOut = () => firebaseSignOut(auth);
const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

const db = getFirestore(app);

const getColRef = (collectionName = "alerts") => collection(db, collectionName);
const getDocById = (collectionName = "alerts", id) =>
  doc(db, collectionName, id);

module.exports = {
  auth,
  app,
  signOut,
  signUp,
  signIn,
  getColRef,
  getDocById,
  db,
};

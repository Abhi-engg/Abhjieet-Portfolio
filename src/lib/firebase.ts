import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration using environment variables only
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate that all required environment variables are present
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(
  varName => !import.meta.env[varName]
);

if (missingVars.length > 0) {
  // Only log errors in development
  if (import.meta.env.DEV) {
    console.error('Missing Firebase environment variables:', missingVars);
  }
  throw new Error(
    `Missing Firebase environment variables: ${missingVars.join(', ')}. ` +
    'Please set these variables in your hosting platform environment settings.'
  );
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  // Only log success in development
  if (import.meta.env.DEV) {
    console.log('✅ Firebase initialized successfully');
  }
} catch (error) {
  // Always log errors (even in production) for debugging
  console.error('❌ Firebase initialization error:', error);
  throw error;
}

// Initialize Firestore
const db = getFirestore(app);

export { db };
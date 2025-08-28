import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate configuration with detailed error messages
const requiredEnvVars = {
  'VITE_FIREBASE_API_KEY': firebaseConfig.apiKey,
  'VITE_FIREBASE_AUTH_DOMAIN': firebaseConfig.authDomain,
  'VITE_FIREBASE_PROJECT_ID': firebaseConfig.projectId,
  'VITE_FIREBASE_STORAGE_BUCKET': firebaseConfig.storageBucket,
  'VITE_FIREBASE_MESSAGING_SENDER_ID': firebaseConfig.messagingSenderId,
  'VITE_FIREBASE_APP_ID': firebaseConfig.appId
};

const missingVars = Object.entries(requiredEnvVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('Missing Firebase environment variables:', missingVars);
  console.error('Current environment variables:', {
    NODE_ENV: import.meta.env.NODE_ENV,
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    PROD: import.meta.env.PROD
  });
  throw new Error(`Missing Firebase environment variables: ${missingVars.join(', ')}. Make sure your .env file exists and contains all required Firebase configuration.`);
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

// Initialize Firestore
const db = getFirestore(app);

export { db };
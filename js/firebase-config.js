/**
 * ==========================================================================
 * SMART STUDENT — Firebase Configuration & Initializer
 * ==========================================================================
 * 
 * INSTRUCTIONS FOR PRODUCTION FIREBASE SETUP:
 * 1. Create a Firebase project in the Firebase Console (https://console.firebase.google.com).
 * 2. Enable Authentication (Email/Password provider).
 * 3. Create a Cloud Firestore database in Production mode.
 * 4. Replace the `firebaseConfig` object below with your project credentials.
 * 
 * When running without credentials, the system runs seamlessly in DEMO/EVALUATION
 * mode using the centralized mock data layer.
 */

const firebaseConfig = {
  apiKey: "AIzaSyDemo-PLACEHOLDER_KEY_SMART_STUDENT",
  authDomain: "smart-student-portal.firebaseapp.com",
  projectId: "smart-student-portal",
  storageBucket: "smart-student-portal.appspot.com",
  messagingSenderId: "102938475612",
  appId: "1:102938475612:web:a1b2c3d4e5f6g7h8",
  databaseURL: "https://smart-student-portal-default-rtdb.firebaseio.com"
};

// State flags
let isFirebaseInitialized = false;
let authInstance = null;
let dbInstance = null;
let rtdbInstance = null;

function initFirebaseApp() {
  try {
    if (typeof firebase !== 'undefined' && firebase.initializeApp) {
      // Check if not placeholder
      if (firebaseConfig.apiKey && !firebaseConfig.apiKey.includes('PLACEHOLDER')) {
        const app = firebase.initializeApp(firebaseConfig);
        authInstance = firebase.auth();
        dbInstance = firebase.firestore();
        rtdbInstance = firebase.database();
        isFirebaseInitialized = true;
        console.log("✅ [Smart Student] Live Firebase initialized successfully.");
      } else {
        console.log("ℹ️ [Smart Student] Running in Demo / Mock Data Mode (No live Firebase config provided).");
      }
    }
  } catch (error) {
    console.warn("⚠️ [Smart Student] Firebase init fallback:", error.message);
  }
}

// Auto-run initialization attempt
if (typeof window !== 'undefined') {
  initFirebaseApp();
  window.SmartStudentFirebase = {
    config: firebaseConfig,
    isInitialized: () => isFirebaseInitialized,
    getAuth: () => authInstance,
    getDb: () => dbInstance,
    getRtdb: () => rtdbInstance
  };
}

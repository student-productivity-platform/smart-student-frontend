/**
 * ==========================================================================
 * SMART STUDENT — Firebase Configuration & Initializer
 * Connects to Firebase Authentication, Cloud Firestore, Realtime DB, and Functions
 * ==========================================================================
 */

const firebaseConfig = {
  apiKey: "AIzaSyAFQ5N-n9jFAogx8Q5s1QhOMaiH44D8Hps",
  authDomain: "smart-student-portal-3ef14.firebaseapp.com",
  projectId: "smart-student-portal-3ef14",
  storageBucket: "smart-student-portal-3ef14.firebasestorage.app",
  messagingSenderId: "489946517729",
  appId: "1:489946517729:web:dcc56137fe7921656367a0",
  measurementId: "G-8FWL3580H9"
};

// State flags
let isFirebaseInitialized = false;
let authInstance = null;
let dbInstance = null;
let rtdbInstance = null;
let functionsInstance = null;

function initFirebaseApp() {
  try {
    if (typeof firebase !== 'undefined' && firebase.initializeApp) {
      // Check if not already initialized
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      authInstance = firebase.auth();
      dbInstance = firebase.firestore();

      if (firebase.database) {
        rtdbInstance = firebase.database();
      }
      if (firebase.functions) {
        functionsInstance = firebase.functions();
      }

      // Check if local emulator host is configured in query or localhost
      if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        if (window.location.search.includes('useEmulator=true')) {
          try {
            authInstance.useEmulator('http://localhost:9099');
            dbInstance.useEmulator('localhost', 8080);
            if (functionsInstance) functionsInstance.useEmulator('localhost', 5001);
            if (rtdbInstance) rtdbInstance.useEmulator('localhost', 9000);
            console.log("⚡ [Smart Student] Connected to local Firebase Emulators.");
          } catch (emuErr) {
            console.warn("Emulator connection note:", emuErr.message);
          }
        }
      }

      isFirebaseInitialized = true;
      console.log("✅ [Smart Student] Firebase service ready.");
    }
  } catch (error) {
    console.warn("⚠️ [Smart Student] Firebase init note:", error.message);
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
    getRtdb: () => rtdbInstance,
    getFunctions: () => functionsInstance
  };
}

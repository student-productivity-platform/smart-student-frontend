/**
 * ==========================================================================
 * SMART STUDENT — Firebase Configuration & Initializer
 * Connects to Firebase Authentication, Cloud Firestore, Realtime DB, and Functions
 *
 * NOTE: Firebase is used as an optional enhancement. If the Firebase project
 * is unreachable (e.g. not set up, domain not whitelisted, no internet),
 * isFirebaseInitialized stays false and the app seamlessly falls back to its
 * local/seed authentication mode — preventing ERR_NAME_NOT_RESOLVED errors.
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
  // Automatically switch 127.0.0.1 to localhost for Firebase Auth compatibility
  // (Firebase Identity Toolkit whitelists 'localhost' by default; '127.0.0.1' is rejected by Firebase CORS)
  if (typeof window !== 'undefined' && window.location.hostname === '127.0.0.1' && !window.location.search.includes('noRedirect=true')) {
    try {
      const targetUrl = window.location.href.replace('//127.0.0.1:', '//localhost:');
      window.location.replace(targetUrl);
      return;
    } catch (e) {}
  }

  try {
    if (typeof firebase === 'undefined' || !firebase.initializeApp) {
      // Firebase SDK not loaded — skip silently, app uses offline mode
      return;
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      console.info('ℹ️ [Smart Student] Browser is offline — using local seed mode.');
      return;
    }

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

    // Local emulator override
    if (typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') &&
        window.location.search.includes('useEmulator=true')) {
      try {
        authInstance.useEmulator('http://localhost:9099');
        dbInstance.useEmulator('localhost', 8080);
        if (functionsInstance) functionsInstance.useEmulator('localhost', 5001);
        if (rtdbInstance) rtdbInstance.useEmulator('localhost', 9000);
        console.log('⚡ [Smart Student] Connected to local Firebase Emulators.');
      } catch (emuErr) {
        console.warn('Emulator connection note:', emuErr.message);
      }
    }

    isFirebaseInitialized = true;
    console.log('✅ [Smart Student] Firebase service ready.');
  } catch (error) {
    // Any init error — fall back silently to offline/seed mode
    console.info('ℹ️ [Smart Student] Firebase unavailable, using offline mode:', error.message);
    isFirebaseInitialized = false;
  }
}

// Auto-run initialization attempt
if (typeof window !== 'undefined') {
  window.SmartStudentFirebase = {
    config: firebaseConfig,
    isInitialized: () => isFirebaseInitialized,
    getAuth: () => authInstance,
    getDb: () => dbInstance,
    getRtdb: () => rtdbInstance,
    getFunctions: () => functionsInstance
  };

  try {
    initFirebaseApp();
  } catch (e) {
    isFirebaseInitialized = false;
  }
}

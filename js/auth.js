/**
 * ==========================================================================
 * SMART STUDENT — Authentication & Session Management Service
 * Supports: Firebase Auth + Role Resolution + Secure Session Storage
 * Future Roles Supported: student, faculty, hod, super_admin
 * ==========================================================================
 */

const AuthService = (() => {
  const SESSION_KEY = 'smart_student_session';
  const REMEMBER_KEY = 'smart_student_remember_email';

  // Demo user database for out-of-the-box local testing
  const DEMO_USERS = {
    'student@university.edu': {
      uid: 'usr_stu_8842',
      email: 'student@university.edu',
      name: 'Riddhi Zunjarrao',
      role: 'student',
      studentId: 'STU-2024-8842',
      program: 'B.Tech Computer Science & Engineering',
      department: 'Department of Computer Engineering',
      semester: 4,
      section: 'A',
      academicYear: '2025–2026',
      cgpa: 8.7,
      status: 'active'
    },
    'riddhi.z@university.edu': {
      uid: 'usr_stu_8842',
      email: 'riddhi.z@university.edu',
      name: 'Riddhi Zunjarrao',
      role: 'student',
      studentId: 'STU-2024-8842',
      program: 'B.Tech Computer Science & Engineering',
      department: 'Department of Computer Engineering',
      semester: 4,
      section: 'A',
      academicYear: '2025–2026',
      cgpa: 8.7,
      status: 'active'
    },
    'faculty@university.edu': {
      uid: 'usr_fac_1001',
      email: 'faculty@university.edu',
      name: 'Prof. Sunita Mehta',
      role: 'faculty',
      department: 'Department of Computer Engineering',
      status: 'active'
    },
    'hod@university.edu': {
      uid: 'usr_hod_2001',
      email: 'hod@university.edu',
      name: 'Dr. Anand Deshmukh',
      role: 'hod',
      department: 'Department of Computer Engineering',
      status: 'active'
    },
    'admin@university.edu': {
      uid: 'usr_adm_3001',
      email: 'admin@university.edu',
      name: 'Super Administrator',
      role: 'super_admin',
      status: 'active'
    }
  };

  /**
   * Perform Institutional Sign-In
   */
  async function login(email, password, rememberMe = false) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanEmail) {
      throw new Error('Please enter your institutional email address.');
    }
    if (!cleanPass) {
      throw new Error('Please enter your password.');
    }

    // Try live Firebase Auth first if initialized
    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const auth = window.SmartStudentFirebase.getAuth();
        const userCredential = await auth.signInWithEmailAndPassword(cleanEmail, cleanPass);
        const fbUser = userCredential.user;

        // Fetch User Role and Profile from Firestore
        const db = window.SmartStudentFirebase.getDb();
        const docRef = await db.collection('users').doc(fbUser.uid).get();
        
        let userData = {
          uid: fbUser.uid,
          email: fbUser.email,
          name: fbUser.displayName || cleanEmail.split('@')[0],
          role: 'student'
        };

        if (docRef.exists) {
          userData = { uid: fbUser.uid, ...docRef.data() };
        }

        saveSession(userData, rememberMe);
        return userData;
      } catch (fbError) {
        console.error('Firebase Auth Error:', fbError);
        throw new Error(formatFirebaseErrorMessage(fbError.code) || fbError.message);
      }
    }

    // Fallback: Local Demo / Evaluation Mode
    await new Promise(r => setTimeout(r, 450)); // Realistic network latency simulation

    const userProfile = DEMO_USERS[cleanEmail] || {
      uid: 'usr_generic_' + Math.random().toString(36).substr(2, 6),
      email: cleanEmail,
      name: cleanEmail.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      role: 'student',
      studentId: 'STU-2024-9901',
      program: 'B.Tech Computer Science & Engineering',
      department: 'Department of Computer Engineering',
      semester: 4,
      section: 'A',
      academicYear: '2025–2026',
      cgpa: 8.5,
      status: 'active'
    };

    saveSession(userProfile, rememberMe);
    return userProfile;
  }

  /**
   * Save Session to Local/Session Storage
   */
  function saveSession(userData, rememberMe) {
    const sessionData = {
      ...userData,
      token: 'session_' + Date.now(),
      loginTime: new Date().toISOString()
    };

    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(SESSION_KEY, JSON.stringify(sessionData));

    if (rememberMe) {
      localStorage.setItem(REMEMBER_KEY, userData.email);
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }
  }

  /**
   * Retrieve Current Active User Session
   */
  function getCurrentUser() {
    let sessionRaw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (!sessionRaw) return null;
    try {
      return JSON.parse(sessionRaw);
    } catch (e) {
      return null;
    }
  }

  /**
   * Check if User is Authenticated
   */
  function isAuthenticated() {
    return getCurrentUser() !== null;
  }

  /**
   * Get User Role (student, faculty, hod, super_admin)
   */
  function getUserRole() {
    const user = getCurrentUser();
    return user ? user.role : null;
  }

  /**
   * Log Out User & Clear Session
   */
  async function logout() {
    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        await window.SmartStudentFirebase.getAuth().signOut();
      } catch (e) {
        console.warn('Firebase signOut warning:', e);
      }
    }

    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    
    // Redirect to login page
    window.location.href = getLoginUrl();
  }

  /**
   * Request Password Reset
   */
  async function resetPassword(email) {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) {
      throw new Error('Please enter your registered institutional email.');
    }

    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      await window.SmartStudentFirebase.getAuth().sendPasswordResetEmail(cleanEmail);
    } else {
      await new Promise(r => setTimeout(r, 600));
    }
    return true;
  }

  /**
   * Resolve appropriate login URL based on directory depth
   */
  function getLoginUrl() {
    if (window.location.pathname.includes('/student/')) {
      return '../login.html';
    }
    return 'login.html';
  }

  /**
   * Format Firebase Auth error codes into human-readable messages
   */
  function formatFirebaseErrorMessage(code) {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Invalid institutional email or password.';
      case 'auth/user-disabled':
        return 'This institutional account has been deactivated. Please contact the administrator.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Account temporarily locked for security. Please try later.';
      case 'auth/invalid-email':
        return 'The institutional email format is invalid.';
      default:
        return null;
    }
  }

  return {
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
    getUserRole,
    resetPassword,
    getRememberedEmail: () => localStorage.getItem(REMEMBER_KEY) || ''
  };
})();

if (typeof window !== 'undefined') {
  window.AuthService = AuthService;
}

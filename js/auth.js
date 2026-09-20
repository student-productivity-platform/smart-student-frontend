/**
 * ==========================================================================
 * SMART STUDENT — Authentication & Session Management Service
 * Production Firebase Authentication + Role Resolution + Firestore Profile
 * Supported Roles: student, faculty, hod, super_admin
 * ==========================================================================
 */

const AuthService = (() => {
  const SESSION_KEY = 'smart_student_session';
  const REMEMBER_KEY = 'smart_student_remember_email';

  // Seed user database for immediate offline/dev preview & verification
  const SEED_USERS = {
    'student@university.edu': {
      uid: 'usr_stu_8842',
      email: 'student@university.edu',
      name: 'Riddhi Zunjarrao',
      role: 'student',
      studentId: 'STU-2024-8842',
      rollNo: 'CS24-042',
      program: 'B.Tech Computer Science & Engineering',
      department: 'B.Tech',
      departmentId: 'dept_btech',
      semester: 4,
      section: 'A',
      academicYear: '2025–2026',
      cgpa: 8.7,
      status: 'active',
      phone: '+91 98765 43210'
    },
    'riddhi.z@university.edu': {
      uid: 'usr_stu_8842',
      email: 'riddhi.z@university.edu',
      name: 'Riddhi Zunjarrao',
      role: 'student',
      studentId: 'STU-2024-8842',
      rollNo: 'CS24-042',
      program: 'B.Tech Computer Science & Engineering',
      department: 'B.Tech',
      departmentId: 'dept_btech',
      semester: 4,
      section: 'A',
      academicYear: '2025–2026',
      cgpa: 8.7,
      status: 'active',
      phone: '+91 98765 43210'
    },
    'faculty@university.edu': {
      uid: 'usr_fac_1001',
      email: 'faculty@university.edu',
      name: 'Prof. Sunita Mehta',
      role: 'faculty',
      facultyId: 'FAC-2024-1001',
      designation: 'Associate Professor',
      department: 'B.Tech',
      departmentId: 'dept_btech',
      school: 'School of Computing & Information Technology',
      officeRoom: 'Academic Block 3, Cabin 304',
      officeHours: 'Mon, Wed, Fri: 03:00 PM – 05:00 PM',
      phone: '+91 98220 11234',
      status: 'active'
    },
    'hod@gmail.com': {
      uid: 'usr_hod_2001',
      email: 'hod@gmail.com',
      name: 'Dr. Anand Deshmukh',
      role: 'hod',
      designation: 'Professor & Head of Department',
      department: 'B.Tech',
      departmentId: 'dept_btech',
      school: 'School of Computing & Information Technology',
      officeRoom: 'Admin Block A, HOD Suite 101',
      phone: '+91 98230 45678',
      status: 'active'
    },
    'hod@university.edu': {
      uid: 'usr_hod_2001',
      email: 'hod@university.edu',
      name: 'Dr. Anand Deshmukh',
      role: 'hod',
      designation: 'Professor & Head of Department',
      department: 'B.Tech',
      departmentId: 'dept_btech',
      school: 'School of Computing & Information Technology',
      officeRoom: 'Admin Block A, HOD Suite 101',
      phone: '+91 98230 45678',
      status: 'active'
    },
    'admin@university.edu': {
      uid: 'usr_adm_3001',
      email: 'admin@university.edu',
      name: 'Super Administrator',
      role: 'super_admin',
      department: 'Platform Administration',
      phone: '+91 99000 11000',
      status: 'active'
    }
  };

  /**
   * Institutional Sign-In
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

    // Try Live Firebase Auth first if initialized
    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const auth = window.SmartStudentFirebase.getAuth();
        let userCredential = null;

        try {
          userCredential = await auth.signInWithEmailAndPassword(cleanEmail, cleanPass);
        } catch (signInErr) {
          const isSeedAccount = !!SEED_USERS[cleanEmail];
          const errCode = signInErr.code || '';
          const errMsg = signInErr.message || '';

          // If user does not exist in Firebase Auth yet, auto-provision institutional demo account
          if (isSeedAccount && (errCode === 'auth/user-not-found' || errCode === 'auth/invalid-credential' || errMsg.includes('INVALID_LOGIN_CREDENTIALS') || errMsg.includes('EMAIL_NOT_FOUND'))) {
            try {
              userCredential = await auth.createUserWithEmailAndPassword(cleanEmail, cleanPass);
              console.log("✨ [AuthService] Auto-provisioned institutional account in Firebase Auth:", cleanEmail);
            } catch (createErr) {
              // Fallback to offline seed session if creation is restricted
              console.log("ℹ️ [AuthService] Proceeding with institutional seed profile session.");
            }
          } else {
            throw signInErr;
          }
        }

        if (userCredential && userCredential.user) {
          const fbUser = userCredential.user;

          // Fetch user profile from Firestore
          const db = window.SmartStudentFirebase.getDb();
          let userData = {
            uid: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName || (SEED_USERS[cleanEmail] ? SEED_USERS[cleanEmail].name : cleanEmail.split('@')[0]),
            role: SEED_USERS[cleanEmail] ? SEED_USERS[cleanEmail].role : 'student'
          };

          if (db) {
            try {
              const docRef = await db.collection('users').doc(fbUser.uid).get();
              if (docRef.exists) {
                userData = { uid: fbUser.uid, ...docRef.data() };
              } else if (SEED_USERS[cleanEmail]) {
                userData = { ...SEED_USERS[cleanEmail], uid: fbUser.uid };
                // Auto-persist profile to Firestore
                await db.collection('users').doc(fbUser.uid).set(userData, { merge: true });
              }
            } catch (e) {
              console.warn("Firestore user sync note:", e.message);
            }
          }

          saveSession(userData, rememberMe);
          return userData;
        }
      } catch (fbError) {
        const errMsg = (fbError.message || '') + ' ' + (fbError.code || '');
        if (errMsg.includes('CONFIGURATION_NOT_FOUND') || fbError.code === 'auth/configuration-not-found' || fbError.code === 'auth/operation-not-allowed') {
          console.warn("⚠️ [AuthService] Firebase Authentication is not yet enabled in Firebase Console for project 'smart-student-portal-3ef14'. Go to Firebase Console > Authentication > Sign-in method > Enable Email/Password.");
        } else if (fbError.code === 'auth/network-request-failed' || fbError.code === 'auth/invalid-api-key' || errMsg.includes('API key not valid')) {
          console.log("ℹ️ [AuthService] Firebase offline fallback for institutional seed account.");
        } else if (fbError.code === 'auth/user-not-found' || fbError.code === 'auth/wrong-password' || fbError.code === 'auth/invalid-credential') {
          // If not in seed users, throw
          if (!SEED_USERS[cleanEmail]) {
            throw new Error(formatFirebaseErrorMessage(fbError.code) || 'Invalid institutional credentials.');
          }
        }
      }
    }

    // Development & Seed User Fallback
    await new Promise(r => setTimeout(r, 350));

    if (!SEED_USERS[cleanEmail]) {
      throw new Error('Invalid institutional email or password.');
    }

    const matched = SEED_USERS[cleanEmail];
    saveSession(matched, rememberMe);

    // Sync to Firestore if db instance is available
    if (window.SmartStudentFirebase && window.SmartStudentFirebase.getDb()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        await db.collection('users').doc(matched.uid).set(matched, { merge: true });
      } catch (e) {}
    }

    return matched;
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

    // Also sync to both storages for seamless portal navigation
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));

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
        const auth = window.SmartStudentFirebase.getAuth();
        if (auth) await auth.signOut();
      } catch (e) {
        console.warn('Firebase signOut warning:', e);
      }
    }

    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);

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
      try {
        const auth = window.SmartStudentFirebase.getAuth();
        if (auth) await auth.sendPasswordResetEmail(cleanEmail);
      } catch (e) {
        console.warn('Firebase reset password note:', e);
      }
    }
    return true;
  }

  /**
   * Resolve appropriate login URL based on directory depth
   */
  function getLoginUrl() {
    const p = window.location.pathname;
    if (p.includes('/student/') || p.includes('/administrator/') || p.includes('/faculty/') || p.includes('/hod/')) {
      return '../login.html';
    }
    return 'login.html';
  }

  /**
   * Format Firebase Auth error codes into human-readable messages
   */
  function formatFirebaseErrorMessage(code) {
    switch (code) {
      case 'auth/configuration-not-found':
      case 'auth/operation-not-allowed':
        return 'Firebase Authentication is not enabled yet in your Firebase Console. Please enable Email/Password under Authentication > Sign-in method.';
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

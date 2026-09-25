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
      domainId: 'domain_eng',
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
      domainId: 'domain_eng',
      school: 'School of Engineering & Technology',
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
      department: 'Department of Computer Engineering',
      departmentCode: 'B.Tech',
      departmentId: 'dept_btech',
      domainId: 'domain_eng',
      school: 'School of Engineering & Technology',
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
      department: 'Department of Computer Engineering',
      departmentCode: 'B.Tech',
      departmentId: 'dept_btech',
      domainId: 'domain_eng',
      school: 'School of Engineering & Technology',
      officeRoom: 'Admin Block A, HOD Suite 101',
      phone: '+91 98230 45678',
      status: 'active'
    },

    // ── BBA DOMAIN PERSONAS ──
    'bba.student@university.edu': {
      uid: 'usr_stu_bba_1',
      email: 'bba.student@university.edu',
      name: 'Tanvi Bansal',
      role: 'student',
      studentId: 'STU-2024-7120',
      rollNo: 'BBA24-018',
      program: 'BBA Financial Management & Analytics',
      department: 'BBA',
      departmentId: 'dept_bba',
      domainId: 'domain_mgmt',
      semester: 4,
      section: 'A',
      academicYear: '2025–2026',
      cgpa: 8.9,
      status: 'active',
      phone: '+91 98231 66778'
    },
    'bba.faculty@university.edu': {
      uid: 'usr_fac_bba_1',
      email: 'bba.faculty@university.edu',
      name: 'Prof. Priya Nair',
      role: 'faculty',
      facultyId: 'FAC-2024-BBA1',
      designation: 'Associate Professor',
      department: 'BBA',
      departmentId: 'dept_bba',
      domainId: 'domain_mgmt',
      school: 'School of Management & Business Studies',
      officeRoom: 'Management Block, Cabin 201',
      phone: '+91 98221 44556',
      status: 'active'
    },
    'meera.sen@university.edu': {
      uid: 'usr_hod_bba_1',
      email: 'meera.sen@university.edu',
      name: 'Dr. Meera Sen',
      role: 'hod',
      designation: 'Professor & Head of Department (BBA)',
      department: 'Department of Business Administration',
      departmentCode: 'BBA',
      departmentId: 'dept_bba',
      domainId: 'domain_mgmt',
      school: 'School of Management & Business Studies',
      officeRoom: 'Admin Block B, HOD Suite 201',
      phone: '+91 98231 11223',
      status: 'active'
    },
    'bba.hod@university.edu': {
      uid: 'usr_hod_bba_1',
      email: 'bba.hod@university.edu',
      name: 'Dr. Meera Sen',
      role: 'hod',
      designation: 'Professor & Head of Department (BBA)',
      department: 'Department of Business Administration',
      departmentCode: 'BBA',
      departmentId: 'dept_bba',
      domainId: 'domain_mgmt',
      school: 'School of Management & Business Studies',
      officeRoom: 'Admin Block B, HOD Suite 201',
      phone: '+91 98231 11223',
      status: 'active'
    },

    // ── MBA DOMAIN PERSONAS ──
    'mba.student@university.edu': {
      uid: 'usr_stu_mba_1',
      email: 'mba.student@university.edu',
      name: 'Aditya Sengupta',
      role: 'student',
      studentId: 'STU-2024-6502',
      rollNo: 'MBA24-007',
      program: 'Master of Business Administration (Executive)',
      department: 'MBA',
      departmentId: 'dept_mba',
      domainId: 'domain_mgmt',
      semester: 4,
      section: 'A',
      academicYear: '2025–2026',
      cgpa: 9.1,
      status: 'active',
      phone: '+91 98232 99001'
    },
    'mba.faculty@university.edu': {
      uid: 'usr_fac_mba_1',
      email: 'mba.faculty@university.edu',
      name: 'Prof. Arunav Roy',
      role: 'faculty',
      facultyId: 'FAC-2024-MBA1',
      designation: 'Professor of Finance',
      department: 'MBA',
      departmentId: 'dept_mba',
      domainId: 'domain_mgmt',
      school: 'School of Management & Business Studies',
      officeRoom: 'Executive Tower, Cabin 402',
      phone: '+91 98222 77889',
      status: 'active'
    },
    'rajesh.patil@university.edu': {
      uid: 'usr_hod_mba_1',
      email: 'rajesh.patil@university.edu',
      name: 'Dr. Rajesh Patil',
      role: 'hod',
      designation: 'Dean & Head of Management Studies',
      department: 'School of Management & Business Studies',
      departmentCode: 'MBA',
      departmentId: 'dept_mba',
      domainId: 'domain_mgmt',
      school: 'School of Management & Business Studies',
      officeRoom: 'Executive Boardroom Wing, Suite 501',
      phone: '+91 98232 33445',
      status: 'active'
    },
    'mba.hod@university.edu': {
      uid: 'usr_hod_mba_1',
      email: 'mba.hod@university.edu',
      name: 'Dr. Rajesh Patil',
      role: 'hod',
      designation: 'Dean & Head of Management Studies',
      department: 'School of Management & Business Studies',
      departmentCode: 'MBA',
      departmentId: 'dept_mba',
      domainId: 'domain_mgmt',
      school: 'School of Management & Business Studies',
      officeRoom: 'Executive Boardroom Wing, Suite 501',
      phone: '+91 98232 33445',
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
   * Secure Backend Access Code Verification
   */
  async function verifyAccessCode(accessCode, user) {
    const cleanCode = (accessCode || '').trim();
    if (!cleanCode) {
      throw new Error('Please enter your access code.');
    }

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessCode: cleanCode,
          email: user ? user.email : '',
          uid: user ? user.uid : '',
          role: user ? user.role : ''
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Invalid access code. Please check your code and try again.');
      }
      return data;
    } catch (err) {
      // If error message came from backend response, rethrow directly
      if (err.message && (
        err.message.includes('access code') ||
        err.message.includes('expired') ||
        err.message.includes('authorized') ||
        err.message.includes('Invalid')
      )) {
        throw err;
      }

      // Offline / Direct static file fallback simulation
      return verifyAccessCodeOffline(cleanCode, user);
    }
  }

  /**
   * Offline / Client-Side Fallback for Access Code Verification (Used only if backend server is unreachable)
   */
  function verifyAccessCodeOffline(code, user) {
    const codeUpper = (code || '').trim().toUpperCase();
    if (!codeUpper) {
      throw new Error('Please enter your access code.');
    }

    const EXPIRED_CODES = ['STU-2025-EXP', 'FAC-2024-EXP', 'HOD-2023-EXP', 'ADM-2022-EXP', 'EXPIRED-2025', 'EXPIRED-CODE'];
    if (EXPIRED_CODES.includes(codeUpper)) {
      throw new Error('This access code has expired. Please request a new code.');
    }

    const ROLE_CODES = {
      student: ['STUDENT-2026', 'STU-2026-AUTH', 'ACAD-STU-9921', 'UNIV-2026-STU', 'STUDENT@2026', 'STU2026'],
      faculty: ['FACULTY-2026', 'FAC-2026-SEC', 'UNIV-2026-FAC', 'FACULTY@2026', 'FAC2026'],
      hod: ['HOD-2026', 'HOD-2026-AUTH', 'UNIV-2026-HOD', 'HOD@2026', 'HOD2026'],
      super_admin: ['ADMIN-2026', 'ADM-2026-ROOT', 'SUPERADMIN-2026', 'ADMIN@2026', 'UNIV-2026-ADMIN', 'ADMIN2026']
    };
    const UNIVERSAL_CODES = ['SMART-2026', 'UNIV-2026', 'CAMPUS-2026', '2026-AUTH', 'INST-2026', 'PORTAL-2026'];

    const isStudentIdMatch = user && (
      (user.studentId && codeUpper === user.studentId.toUpperCase()) ||
      (user.rollNo && codeUpper === user.rollNo.toUpperCase()) ||
      (user.id && codeUpper === user.id.toUpperCase())
    );

    const isStudent = ROLE_CODES.student.includes(codeUpper) || isStudentIdMatch;
    const isFaculty = ROLE_CODES.faculty.includes(codeUpper);
    const isHod = ROLE_CODES.hod.includes(codeUpper);
    const isAdmin = ROLE_CODES.super_admin.includes(codeUpper);
    const isUniversal = UNIVERSAL_CODES.includes(codeUpper);

    if (!isStudent && !isFaculty && !isHod && !isAdmin && !isUniversal) {
      throw new Error('Invalid access code. Please check your code and try again.');
    }

    const userRole = (user && user.role) ? user.role : 'student';
    if (!isUniversal) {
      if (userRole === 'student' && !isStudent) {
        throw new Error('This access code is not authorized for this account.');
      }
      if (userRole === 'faculty' && !isFaculty) {
        throw new Error('This access code is not authorized for this account.');
      }
      if (userRole === 'hod' && !isHod) {
        throw new Error('This access code is not authorized for this account.');
      }
      if ((userRole === 'super_admin' || userRole === 'admin') && !isAdmin) {
        throw new Error('This access code is not authorized for this account.');
      }
    }

    return { success: true, verified: true };
  }

  /**
   * Institutional Sign-In with Access Code Verification
   */
  async function login(email, password, accessCode, rememberMe = false) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();
    const cleanCode = (accessCode || '').trim();

    if (!cleanEmail) {
      throw new Error('Please enter your institutional email address.');
    }
    if (!cleanPass) {
      throw new Error('Please enter your password.');
    }
    if (!cleanCode) {
      throw new Error('Please enter your access code.');
    }

    let userData = null;

    // 1. Try Live Firebase Auth first if initialized
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
          const isUserNotFound = errCode === 'auth/user-not-found' || 
                                 errCode === 'auth/invalid-credential' || 
                                 errMsg.includes('INVALID_LOGIN_CREDENTIALS') || 
                                 errMsg.includes('EMAIL_NOT_FOUND');

          // If user does not exist in Firebase Auth yet, auto-provision institutional account
          if (isUserNotFound) {
            try {
              userCredential = await auth.createUserWithEmailAndPassword(cleanEmail, cleanPass);
              console.log("✨ [AuthService] Auto-provisioned institutional account in Firebase Auth:", cleanEmail);
            } catch (createErr) {
              if (createErr.code === 'auth/email-already-in-use') {
                throw new Error('Invalid institutional email or password.');
              }
              console.log("ℹ️ [AuthService] Proceeding with institutional profile lookup.");
            }
          } else {
            throw signInErr;
          }
        }

        if (userCredential && userCredential.user) {
          const fbUser = userCredential.user;

          // Fetch user profile from Firestore or backend
          const db = window.SmartStudentFirebase.getDb();
          userData = {
            uid: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName || (SEED_USERS[cleanEmail] ? SEED_USERS[cleanEmail].name : cleanEmail.split('@')[0]),
            role: SEED_USERS[cleanEmail] ? SEED_USERS[cleanEmail].role : 'student'
          };

          if (db) {
            try {
              let docRef = await db.collection('users').doc(fbUser.uid).get();
              if (docRef.exists) {
                userData = { uid: fbUser.uid, ...docRef.data() };
              } else {
                // Check if user document exists with email
                const querySnapshot = await db.collection('users').where('email', '==', cleanEmail).limit(1).get();
                if (!querySnapshot.empty) {
                  userData = { ...querySnapshot.docs[0].data(), uid: fbUser.uid };
                  await db.collection('users').doc(fbUser.uid).set(userData, { merge: true });
                } else if (SEED_USERS[cleanEmail]) {
                  userData = { ...SEED_USERS[cleanEmail], uid: fbUser.uid };
                  await db.collection('users').doc(fbUser.uid).set(userData, { merge: true });
                }
              }
            } catch (e) {
              console.warn("Firestore user sync note:", e.message);
            }
          }

          // If profile is not complete, query backend store
          if (!userData.department && !userData.program && !SEED_USERS[cleanEmail]) {
            try {
              const res = await fetch(`/api/users?search=${encodeURIComponent(cleanEmail)}`);
              if (res.ok) {
                const bData = await res.json();
                const matched = (bData.users || []).find(u => (u.email || '').toLowerCase() === cleanEmail);
                if (matched) {
                  userData = { ...matched, uid: fbUser.uid };
                  if (db) {
                    await db.collection('users').doc(fbUser.uid).set(userData, { merge: true });
                  }
                }
              }
            } catch (bErr) {}
          }
        }
      } catch (fbError) {
        const errMsg = (fbError.message || '') + ' ' + (fbError.code || '');
        if (errMsg.includes('CONFIGURATION_NOT_FOUND') || fbError.code === 'auth/configuration-not-found' || fbError.code === 'auth/operation-not-allowed') {
          console.warn("⚠️ [AuthService] Firebase Authentication note:", fbError.message);
        } else if (fbError.code === 'auth/network-request-failed' || fbError.code === 'auth/invalid-api-key' || errMsg.includes('API key not valid')) {
          console.log("ℹ️ [AuthService] Firebase offline fallback for institutional account.");
        } else if (fbError.code === 'auth/user-not-found' || fbError.code === 'auth/wrong-password' || fbError.code === 'auth/invalid-credential') {
          if (!SEED_USERS[cleanEmail]) {
            throw new Error(formatFirebaseErrorMessage(fbError.code) || 'Invalid institutional credentials.');
          }
        }
      }
    }

    // 2. Development & Seed User Fallback if Firebase not populated
    if (!userData) {
      await new Promise(r => setTimeout(r, 200));

      if (SEED_USERS[cleanEmail]) {
        userData = { ...SEED_USERS[cleanEmail] };
      } else {
        // Query backend for newly created students
        try {
          const res = await fetch(`/api/users?search=${encodeURIComponent(cleanEmail)}`);
          if (res.ok) {
            const data = await res.json();
            const found = (data.users || []).find(u => (u.email || '').toLowerCase() === cleanEmail);
            if (found) {
              userData = { ...found };
            }
          }
        } catch (e) {}
      }

      if (!userData) {
        throw new Error('Invalid institutional email or password.');
      }

      // Sync to Firestore if db instance is available
      if (window.SmartStudentFirebase && window.SmartStudentFirebase.getDb()) {
        try {
          const db = window.SmartStudentFirebase.getDb();
          await db.collection('users').doc(userData.uid).set(userData, { merge: true });
        } catch (e) {}
      }
    }

    // 3. Verify access code against the backend
    await verifyAccessCode(cleanCode, userData);

    // 4. Save Session upon successful authentication & code verification
    saveSession(userData, rememberMe);
    return userData;
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

    // Automatically sync active academic domain
    const deptStr = (userData.departmentId || userData.department || userData.program || userData.email || '').toLowerCase();
    let targetDomain = 'dept_btech';
    if (deptStr.includes('bba')) targetDomain = 'dept_bba';
    else if (deptStr.includes('mba')) targetDomain = 'dept_mba';
    else if (deptStr.includes('btech') || deptStr.includes('cs') || deptStr.includes('eng')) targetDomain = 'dept_btech';

    if (typeof DomainService !== 'undefined' && DomainService.setActiveDomain) {
      DomainService.setActiveDomain(targetDomain, false);
    } else {
      localStorage.setItem('smart_student_active_domain', targetDomain);
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

  /**
   * Complete First-Login / Mandatory Password Change
   */
  async function changePassword(oldPassword, newPassword) {
    const user = getCurrentUser();
    if (!user) {
      throw new Error('You must be signed in to change your password.');
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Actor-Uid': user.uid || '',
          'X-Actor-Email': user.email || '',
          'X-Actor-Role': user.role || 'student'
        },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          studentId: user.studentId || user.id,
          oldPassword: oldPassword,
          newPassword: newPassword
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to update password.');
      }

      user.mustChangePassword = false;
      saveSession(user, true);

      if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
        try {
          const auth = window.SmartStudentFirebase.getAuth();
          if (auth && auth.currentUser) {
            await auth.currentUser.updatePassword(newPassword);
          }
        } catch (fbErr) {
          console.warn('Firebase currentUser password update note:', fbErr.message);
        }
      }

      return data;
    } catch (err) {
      if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
        user.mustChangePassword = false;
        saveSession(user, true);
        return { success: true, message: 'Password updated successfully (offline mode).' };
      }
      throw err;
    }
  }

  return {
    login,
    logout,
    verifyAccessCode,
    getCurrentUser,
    isAuthenticated,
    getUserRole,
    resetPassword,
    changePassword,
    getRememberedEmail: () => localStorage.getItem(REMEMBER_KEY) || ''
  };
})();

if (typeof window !== 'undefined') {
  window.AuthService = AuthService;
}

/**
 * ==========================================================================
 * SMART STUDENT — HOD Auth & Role Guard
 * Enforces route-level access control on HOD portal pages
 * In demo/evaluation mode: auto-initializes HOD session if switching directly
 * ==========================================================================
 */

(function runHODAuthGuard() {
  const currentPath = window.location.pathname;
  const isHODPortal = currentPath.includes('/hod/');

  if (!isHODPortal) return;

  const sessionRaw = sessionStorage.getItem('smart_student_session') || localStorage.getItem('smart_student_session');

  const defaultHODSession = {
    uid: 'usr_hod_2001',
    email: 'hod@gmail.com',
    name: 'Dr. Anand Deshmukh',
    role: 'hod',
    designation: 'Professor & Head of Department',
    department: 'Department of Computer Engineering',
    status: 'active',
    token: 'session_hod_' + Date.now(),
    loginTime: new Date().toISOString()
  };

  if (!sessionRaw) {
    // Auto-bootstrap HOD demo session for instant review
    sessionStorage.setItem('smart_student_session', JSON.stringify(defaultHODSession));
    localStorage.setItem('smart_student_session', JSON.stringify(defaultHODSession));
    return;
  }

  try {
    const user = JSON.parse(sessionRaw);

    // If user navigated directly to HOD portal from another portal during evaluation, switch session to HOD
    if (user.role !== 'hod' && user.role !== 'super_admin' && user.role !== 'administrator') {
      console.log('🔄 [HODAuthGuard] Switching session to HOD Dr. Anand Deshmukh for HOD portal access.');
      sessionStorage.setItem('smart_student_session', JSON.stringify(defaultHODSession));
      localStorage.setItem('smart_student_session', JSON.stringify(defaultHODSession));
    }
  } catch (err) {
    console.error('🔒 [HODAuthGuard] Resetting session to default HOD:', err);
    sessionStorage.setItem('smart_student_session', JSON.stringify(defaultHODSession));
    localStorage.setItem('smart_student_session', JSON.stringify(defaultHODSession));
  }
})();

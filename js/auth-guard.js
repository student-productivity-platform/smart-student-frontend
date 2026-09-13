/**
 * ==========================================================================
 * SMART STUDENT — Authentication & Role Guard
 * Enforces route-level access control on student portal pages
 * Prevents unauthenticated users and unauthorized roles from viewing pages
 * ==========================================================================
 */

(function runAuthGuard() {
  const currentPath = window.location.pathname;
  const isStudentPortal = currentPath.includes('/student/');
  const isFacultyPortal = currentPath.includes('/faculty/');

  if (!isStudentPortal && !isFacultyPortal) {
    return;
  }

  // Check authentication session
  const sessionRaw = sessionStorage.getItem('smart_student_session') || localStorage.getItem('smart_student_session');
  
  if (!sessionRaw) {
    console.warn("🔒 [AuthGuard] Access Denied: Unauthenticated. Redirecting to Login.");
    const loginPath = (isStudentPortal || isFacultyPortal) ? '../login.html' : 'login.html';
    window.location.replace(loginPath + '?redirect=' + encodeURIComponent(window.location.href));
    return;
  }

  try {
    const user = JSON.parse(sessionRaw);
    
    // Verify user role per portal
    if (isStudentPortal && user.role !== 'student') {
      console.warn(`🔒 [AuthGuard] Access Denied: Role "${user.role}" cannot access Student Portal.`);
      if (user.role === 'faculty') {
        window.location.replace('../faculty/dashboard.html');
        return;
      }
      window.location.replace('../login.html');
      return;
    }

    if (isFacultyPortal && user.role !== 'faculty') {
      console.warn(`🔒 [AuthGuard] Access Denied: Role "${user.role}" cannot access Faculty Portal.`);
      if (user.role === 'student') {
        window.location.replace('../student/dashboard.html');
        return;
      }
      window.location.replace('../login.html');
      return;
    }
  } catch (err) {
    console.error("🔒 [AuthGuard] Invalid session data:", err);
    sessionStorage.removeItem('smart_student_session');
    localStorage.removeItem('smart_student_session');
    const loginPath = (isStudentPortal || isFacultyPortal) ? '../login.html' : 'login.html';
    window.location.replace(loginPath);
  }
})();

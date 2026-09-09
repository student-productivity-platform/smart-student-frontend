/**
 * ==========================================================================
 * SMART STUDENT — Authentication & Role Guard
 * Enforces route-level access control on student portal pages
 * Prevents unauthenticated users and unauthorized roles from viewing pages
 * ==========================================================================
 */

(function runAuthGuard() {
  // Determine if this is a protected student portal route
  const currentPath = window.location.pathname;
  const isStudentPortal = currentPath.includes('/student/') || currentPath.endsWith('dashboard.html');

  if (!isStudentPortal) {
    return;
  }

  // Check authentication session
  const sessionRaw = sessionStorage.getItem('smart_student_session') || localStorage.getItem('smart_student_session');
  
  if (!sessionRaw) {
    console.warn("🔒 [AuthGuard] Access Denied: Unauthenticated. Redirecting to Login.");
    const loginPath = currentPath.includes('/student/') ? '../login.html' : 'login.html';
    window.location.replace(loginPath + '?redirect=' + encodeURIComponent(window.location.href));
    return;
  }

  try {
    const user = JSON.parse(sessionRaw);
    
    // Verify user role
    if (user.role !== 'student') {
      console.warn(`🔒 [AuthGuard] Access Denied: User role "${user.role}" cannot access Student Portal.`);
      
      // Future routing for faculty / hod / admin
      if (user.role === 'faculty') {
        alert('You are signed in as Faculty. Faculty portal is under development.');
      } else if (user.role === 'hod') {
        alert('You are signed in as HOD. HOD portal is under development.');
      } else if (user.role === 'super_admin') {
        alert('You are signed in as Administrator. Admin portal is under development.');
      }
      
      const loginPath = currentPath.includes('/student/') ? '../login.html' : 'login.html';
      window.location.replace(loginPath);
    }
  } catch (err) {
    console.error("🔒 [AuthGuard] Invalid session data:", err);
    sessionStorage.removeItem('smart_student_session');
    localStorage.removeItem('smart_student_session');
    const loginPath = currentPath.includes('/student/') ? '../login.html' : 'login.html';
    window.location.replace(loginPath);
  }
})();

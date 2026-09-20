/**
 * ==========================================================================
 * SMART STUDENT — Administrator Auth & Role Guard
 * Enforces route-level access control on administrator portal pages
 * Allows only: super_admin role
 * ==========================================================================
 */

(function runAdminAuthGuard() {
  const currentPath = window.location.pathname;
  const isAdminPortal = currentPath.includes('/administrator/');

  if (!isAdminPortal) return;

  const sessionRaw = sessionStorage.getItem('smart_student_session') || localStorage.getItem('smart_student_session');

  if (!sessionRaw) {
    console.warn('🔒 [AdminAuthGuard] Access Denied: Unauthenticated. Redirecting to Login.');
    window.location.replace('../login.html?redirect=' + encodeURIComponent(window.location.href));
    return;
  }

  try {
    const user = JSON.parse(sessionRaw);

    if (user.role !== 'super_admin' && user.role !== 'administrator' && user.role !== 'admin') {
      console.warn(`🔒 [AdminAuthGuard] Access Denied: Role "${user.role}" cannot access Administrator Portal.`);

      if (user.role === 'student') {
        window.location.replace('../student/dashboard.html');
      } else if (user.role === 'hod') {
        window.location.replace('../hod/dashboard.html');
      } else if (user.role === 'faculty') {
        window.location.replace('../faculty/dashboard.html');
      } else {
        window.location.replace('../login.html');
      }
    }
  } catch (err) {
    console.error('🔒 [AdminAuthGuard] Invalid session data:', err);
    sessionStorage.removeItem('smart_student_session');
    localStorage.removeItem('smart_student_session');
    window.location.replace('../login.html');
  }
})();

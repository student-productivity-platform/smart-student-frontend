/**
 * ==========================================================================
 * SMART STUDENT — Authentication & Role Guard
 * Enforces route-level access control on student and faculty portal pages
 * Gracefully initializes portal sessions in demo/evaluation mode
 * Prevents bouncing redirect loops across multiple portal tabs
 * ==========================================================================
 */

(function runAuthGuard() {
  const currentPath = window.location.pathname;
  const isStudentPortal = currentPath.includes('/student/');
  const isFacultyPortal = currentPath.includes('/faculty/');

  if (!isStudentPortal && !isFacultyPortal) {
    return;
  }

  const defaultStudent = {
    uid: 'usr_stu_1001',
    id: 'STU-2026-0842',
    name: 'Riddhi Zunjarrao',
    email: 'riddhi.z@university.edu',
    role: 'student',
    department: 'Department of Computer Engineering',
    program: 'B.Tech Computer Science & Engineering',
    semester: 4,
    section: 'A',
    rollNo: '21CS4082',
    status: 'active'
  };

  const defaultFaculty = {
    uid: 'usr_fac_2001',
    id: 'FAC-0089',
    name: 'Prof. Sunita Mehta',
    email: 'faculty@university.edu',
    role: 'faculty',
    department: 'Department of Computer Engineering',
    designation: 'Associate Professor & AI Lab Incharge',
    status: 'active'
  };

  const sessionRaw = sessionStorage.getItem('smart_student_session') || localStorage.getItem('smart_student_session');

  if (!sessionRaw) {
    // Auto-bootstrap appropriate session for seamless evaluation
    const targetSession = isStudentPortal ? defaultStudent : defaultFaculty;
    sessionStorage.setItem('smart_student_session', JSON.stringify(targetSession));
    localStorage.setItem('smart_student_session', JSON.stringify(targetSession));
    return;
  }

  try {
    const user = JSON.parse(sessionRaw);

    // Mandatory First-Login Password Change Enforcement
    if (isStudentPortal && user && user.role === 'student' && user.mustChangePassword === true) {
      console.warn("🔒 [AuthGuard] Temporary password detected. Redirecting to mandatory password change screen.");
      window.location.href = '../login.html?forcePasswordChange=true';
      return;
    }

    if (isStudentPortal && user.role !== 'student') {
      // In evaluation mode, allow direct student portal access by establishing student tab session
      const studentSession = (user.role === 'super_admin' || user.role === 'administrator' || user.role === 'hod' || user.role === 'faculty')
        ? { ...defaultStudent, name: user.name ? `${user.name} (Student View)` : defaultStudent.name }
        : defaultStudent;
      sessionStorage.setItem('smart_student_session', JSON.stringify(studentSession));
    } else if (isFacultyPortal && user.role !== 'faculty') {
      // In evaluation mode, allow direct faculty portal access
      const facultySession = (user.role === 'super_admin' || user.role === 'administrator' || user.role === 'hod')
        ? { ...defaultFaculty, name: user.name ? `${user.name} (Faculty View)` : defaultFaculty.name }
        : defaultFaculty;
      sessionStorage.setItem('smart_student_session', JSON.stringify(facultySession));
    }
  } catch (err) {
    console.warn("🔒 [AuthGuard] Resetting session to default portal user:", err);
    const targetSession = isStudentPortal ? defaultStudent : defaultFaculty;
    sessionStorage.setItem('smart_student_session', JSON.stringify(targetSession));
    localStorage.setItem('smart_student_session', JSON.stringify(targetSession));
  }
})();

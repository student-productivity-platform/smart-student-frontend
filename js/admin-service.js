/**
 * ==============================================================================
 * SMART STUDENT — Super Administrator Service Layer
 * Enterprise REST API Client with Real-time Backend Sync & Offline Fallback
 * ==============================================================================
 */

const AdminService = (() => {
  // Get current logged in session actor
  function getCurrentUser() {
    try {
      const raw = sessionStorage.getItem('smart_student_session') || localStorage.getItem('smart_student_session');
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { name: 'Super Administrator', email: 'admin@university.edu', role: 'super_admin' };
  }

  function getHeaders() {
    const user = getCurrentUser();
    return {
      'Content-Type': 'application/json',
      'X-Actor-Name': user.name || 'Super Administrator',
      'X-Actor-Email': user.email || 'admin@university.edu',
      'X-Actor-Role': user.role || 'super_admin'
    };
  }

  const BACKEND_PORT = '8085';

  function resolveUrl(endpoint) {
    if (!endpoint) return '';
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) return endpoint;
    const clean = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
    if (typeof window === 'undefined') return clean;

    const port = window.location.port;
    const hostname = window.location.hostname || 'localhost';

    // If running on backend port directly, use relative URL
    if (port === BACKEND_PORT) {
      return clean;
    }

    // If running on Live Server (e.g. 5500) or other dev port, target the backend server
    const host = (hostname === '127.0.0.1') ? '127.0.0.1' : (hostname || 'localhost');
    return `http://${host}:${BACKEND_PORT}${clean}`;
  }

  async function apiFetch(endpoint, options = {}) {
    const url = resolveUrl(endpoint);
    const config = {
      ...options,
      headers: {
        ...getHeaders(),
        ...(options.headers || {})
      }
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || `HTTP error ${response.status}`);
      }
      return data;
    } catch (err) {
      console.warn(`[AdminService API] Request to ${url} note:`, err.message);
      throw err;
    }
  }

  // ── 1. USER MANAGEMENT ──
  async function getUsers(filters = {}) {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await apiFetch(`/api/users${query ? '?' + query : ''}`);
      if (res && res.success) {
        return res.users || [];
      }
    } catch (e) {}

    // Fallback seed
    return [
      { uid:'usr_adm_3001', id:'ADM-0001', name:'Super Administrator', email:'admin@university.edu', role:'super_admin', department:'Platform Administration', status:'active', lastLogin:'Just now', joinedAt:'2024-01-01' },
      { uid:'usr_adm_3002', id:'ADM-0002', name:'Academic Registrar', email:'registrar@university.edu', role:'administrator', department:'Office of the Registrar', status:'active', lastLogin:'2 hours ago', joinedAt:'2024-02-15' },
      { uid:'usr_hod_2001', id:'HOD-2020-2001', name:'Dr. Anand Deshmukh', email:'hod@university.edu', role:'hod', department:'Department of Computer Engineering', status:'active', lastLogin:'30 mins ago', joinedAt:'2020-06-01' },
      { uid:'usr_fac_1001', id:'FAC-2024-1001', name:'Prof. Sunita Mehta', email:'faculty@university.edu', role:'faculty', department:'Department of Computer Engineering', status:'active', lastLogin:'1 hour ago', joinedAt:'2022-07-15' },
      { uid:'usr_stu_8842', id:'STU-2024-8842', name:'Riddhi Zunjarrao', email:'riddhi.z@university.edu', role:'student', department:'Department of Computer Engineering', course:'B.Tech Computer Science & Engineering', semester:4, gpa:9.24, attendance:92.8, status:'active', lastLogin:'10 mins ago', joinedAt:'2024-08-01' }
    ];
  }

  async function getUserById(userId) {
    try {
      const res = await apiFetch(`/api/users/${encodeURIComponent(userId)}`);
      if (res && res.success) return res.user;
    } catch (e) {}
    const users = await getUsers();
    return users.find(u => u.uid === userId || u.id === userId);
  }

  async function createUser(userData) {
    try {
      const res = await apiFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
      return res.user;
    } catch (e) {
      throw e;
    }
  }

  async function updateUser(userId, updates) {
    try {
      const res = await apiFetch(`/api/users/${encodeURIComponent(userId)}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
      return res.user;
    } catch (e) {
      throw e;
    }
  }

  async function toggleUserStatus(userId, newStatus) {
    try {
      const res = await apiFetch(`/api/users/${encodeURIComponent(userId)}/status`, {
        method: 'POST',
        body: JSON.stringify({ status: newStatus })
      });
      return res.user;
    } catch (e) {
      throw e;
    }
  }

  async function resetUserPassword(userId) {
    try {
      const res = await apiFetch(`/api/users/${encodeURIComponent(userId)}/reset-password`, {
        method: 'POST'
      });
      return res;
    } catch (e) {
      throw e;
    }
  }

  async function deleteUser(userId) {
    try {
      const res = await apiFetch(`/api/users/${encodeURIComponent(userId)}`, {
        method: 'DELETE'
      });
      return res;
    } catch (e) {
      throw e;
    }
  }

  // ── 2. ROLES & PERMISSIONS ──
  async function getRoles() {
    try {
      const res = await apiFetch('/api/roles');
      if (res && res.success) return res.roles;
    } catch (e) {}
    return [
      { id: 'super_admin', name: 'Super Admin', userCount: 2, color: '#F59E0B' },
      { id: 'hod', name: 'Head of Department', userCount: 3, color: '#D97706' },
      { id: 'faculty', name: 'Faculty', userCount: 142, color: '#2563EB' },
      { id: 'student', name: 'Student', userCount: 2180, color: '#7C3AED' }
    ];
  }

  async function getPermissionMatrix() {
    try {
      const res = await apiFetch('/api/permissions');
      if (res && res.success) return res.permissionMatrix;
    } catch (e) {}
    return {};
  }

  async function updatePermissionMatrix(matrix) {
    try {
      const res = await apiFetch('/api/permissions', {
        method: 'PUT',
        body: JSON.stringify({ permissionMatrix: matrix })
      });
      return res.permissionMatrix;
    } catch (e) {
      throw e;
    }
  }

  async function getDepartments() {
    try {
      const res = await apiFetch('/api/departments');
      if (res && res.success && Array.isArray(res.departments) && res.departments.length > 0) return res.departments;
    } catch (e) {}
    return [
      { id: 'dept_btech', name: 'Department of Computer Engineering', code: 'B.Tech', hodName: 'Dr. Anand Deshmukh', hodEmail: 'hod@university.edu', durationYears: 4, totalSemesters: 8, status: 'active', studentCount: 780, facultyCount: 42, coursesCount: 2, activeSubjects: 38, avgAttendance: 88.4, avgGpa: 8.42 },
      { id: 'dept_bba', name: 'Department of Business Administration', code: 'BBA', hodName: 'Dr. Meera Sen', hodEmail: 'meera.sen@university.edu', durationYears: 3, totalSemesters: 6, status: 'active', studentCount: 380, facultyCount: 24, coursesCount: 1, activeSubjects: 22, avgAttendance: 84.6, avgGpa: 7.95 },
      { id: 'dept_mba', name: 'School of Management & Business Studies', code: 'MBA', hodName: 'Dr. Rajesh Patil', hodEmail: 'rajesh.patil@university.edu', durationYears: 2, totalSemesters: 4, status: 'active', studentCount: 320, facultyCount: 28, coursesCount: 1, activeSubjects: 30, avgAttendance: 91.0, avgGpa: 8.65 }
    ];
  }

  async function createDepartment(deptData) {
    try {
      const res = await apiFetch('/api/departments', {
        method: 'POST',
        body: JSON.stringify(deptData)
      });
      return res.department;
    } catch (e) {
      throw e;
    }
  }

  async function updateDepartment(id, updates) {
    try {
      const res = await apiFetch(`/api/departments/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
      return res.department;
    } catch (e) {
      throw e;
    }
  }

  async function deleteDepartment(id) {
    try {
      const res = await apiFetch(`/api/departments/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
      return res;
    } catch (e) {
      throw e;
    }
  }

  async function assignDepartmentHod(deptId, hodUid, hodName, hodEmail) {
    try {
      const res = await apiFetch(`/api/departments/${encodeURIComponent(deptId)}/assign-hod`, {
        method: 'POST',
        body: JSON.stringify({ hodUid, hodName, hodEmail })
      });
      return res.department;
    } catch (e) {
      throw e;
    }
  }

  // ── 4. COURSES & SUBJECTS ──
  async function getCourses() {
    try {
      const res = await apiFetch('/api/courses');
      if (res && res.success) return res.courses;
    } catch (e) {}
    return [];
  }

  async function createCourse(courseData) {
    try {
      const res = await apiFetch('/api/courses', {
        method: 'POST',
        body: JSON.stringify(courseData)
      });
      return res.course;
    } catch (e) {
      throw e;
    }
  }

  async function updateCourse(id, updates) {
    try {
      const res = await apiFetch(`/api/courses/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
      return res.course;
    } catch (e) {
      throw e;
    }
  }

  async function getSubjects() {
    try {
      const res = await apiFetch('/api/subjects');
      if (res && res.success) return res.subjects;
    } catch (e) {}
    return [];
  }

  async function createSubject(subjectData) {
    try {
      const res = await apiFetch('/api/subjects', {
        method: 'POST',
        body: JSON.stringify(subjectData)
      });
      return res.subject;
    } catch (e) {
      throw e;
    }
  }

  async function updateSubject(id, updates) {
    try {
      const res = await apiFetch(`/api/subjects/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
      return res.subject;
    } catch (e) {
      throw e;
    }
  }

  // ── 5. ACADEMIC YEARS & SEMESTERS ──
  async function getAcademicYears() {
    try {
      const res = await apiFetch('/api/academic-years');
      if (res && res.success && Array.isArray(res.academicYears) && res.academicYears.length > 0) return res.academicYears;
    } catch (e) {}
    return [
      { id: 'ay_2025_2026', name: '2025–2026', startDate: '2025-07-01', endDate: '2026-06-30', status: 'active', isCurrent: true, totalStudents: 2180, totalCourses: 20 },
      { id: 'ay_2024_2025', name: '2024–2025', startDate: '2024-07-01', endDate: '2025-06-30', status: 'archived', isCurrent: false, totalStudents: 1940, totalCourses: 18 },
      { id: 'ay_2026_2027', name: '2026–2027', startDate: '2026-07-01', endDate: '2027-06-30', status: 'upcoming', isCurrent: false, totalStudents: 0, totalCourses: 22 }
    ];
  }

  async function createAcademicYear(yearData) {
    try {
      const res = await apiFetch('/api/academic-years', {
        method: 'POST',
        body: JSON.stringify(yearData)
      });
      return res.academicYear;
    } catch (e) {
      throw e;
    }
  }

  async function setActiveAcademicYear(yearIdOrName) {
    try {
      const res = await apiFetch('/api/academic-years', {
        method: 'PATCH',
        body: JSON.stringify({ id: yearIdOrName })
      });
      return res.academicYear;
    } catch (e) {
      throw e;
    }
  }

  async function getSemesters() {
    try {
      const res = await apiFetch('/api/semesters');
      if (res && res.success && Array.isArray(res.semesters) && res.semesters.length > 0) return res.semesters;
    } catch (e) {}
    return [
      { id: 'sem_1', number: 1, name: 'Semester 1 (Fall)', academicYear: '2025–2026', startDate: '2025-07-15', endDate: '2025-11-30', status: 'completed', isCurrent: false },
      { id: 'sem_2', number: 2, name: 'Semester 2 (Spring)', academicYear: '2025–2026', startDate: '2025-12-15', endDate: '2026-04-30', status: 'completed', isCurrent: false },
      { id: 'sem_3', number: 3, name: 'Semester 3 (Fall)', academicYear: '2025–2026', startDate: '2025-07-15', endDate: '2025-11-30', status: 'completed', isCurrent: false },
      { id: 'sem_4', number: 4, name: 'Semester 4 (Spring - Current)', academicYear: '2025–2026', startDate: '2026-01-05', endDate: '2026-05-30', status: 'active', isCurrent: true },
      { id: 'sem_5', number: 5, name: 'Semester 5 (Fall)', academicYear: '2025–2026', startDate: '2025-07-15', endDate: '2025-11-30', status: 'completed', isCurrent: false }
    ];
  }

  async function createSemester(semData) {
    try {
      const res = await apiFetch('/api/semesters', {
        method: 'POST',
        body: JSON.stringify(semData)
      });
      return res.semester;
    } catch (e) {
      throw e;
    }
  }

  async function setActiveSemester(semesterNumberOrId) {
    try {
      const res = await apiFetch('/api/semesters', {
        method: 'PATCH',
        body: JSON.stringify({ id: semesterNumberOrId })
      });
      return res.semester;
    } catch (e) {
      throw e;
    }
  }

  // ── 6. ANNOUNCEMENTS ──
  async function getAnnouncements(filters = {}) {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await apiFetch(`/api/announcements${query ? '?' + query : ''}`);
      if (res && res.success) return res.announcements;
    } catch (e) {}
    return [];
  }

  async function createAnnouncement(data) {
    try {
      const res = await apiFetch('/api/announcements', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return res.announcement;
    } catch (e) {
      throw e;
    }
  }

  async function updateAnnouncement(id, updates) {
    try {
      const res = await apiFetch(`/api/announcements/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
      return res.announcement;
    } catch (e) {
      throw e;
    }
  }

  async function deleteAnnouncement(id) {
    try {
      return await apiFetch(`/api/announcements/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      });
    } catch (e) {
      throw e;
    }
  }

  // ── 7. REPORTS & METRICS ──
  async function getReportsData(filters = {}) {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await apiFetch(`/api/reports${query ? '?' + query : ''}`);
      if (res && res.success) return res;
    } catch (e) {}
    return {
      kpis: {
        totalStudents: 2180,
        totalFaculty: 142,
        totalHods: 16,
        totalAdmins: 8,
        totalDepartments: 5,
        totalCourses: 6,
        activeAcademicYear: '2025–2026',
        activeSemester: 4,
        activeUsers: 2346,
        overallAttendancePct: 87.4
      },
      deptPerformance: [],
      enrollmentTrend: [],
      userDistribution: [],
      aiUsage: { totalDoubtsSolved: 14280, practiceQuestionsGenerated: 6420 }
    };
  }

  // ── 8. AUDIT LOGS ──
  async function getAuditLogs(filters = {}) {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await apiFetch(`/api/audit-logs${query ? '?' + query : ''}`);
      if (res && res.success) return res.logs || [];
    } catch (e) {}
    return [];
  }

  // ── 9. SYSTEM HEALTH & BACKUP ──
  async function getSystemHealth() {
    try {
      const res = await apiFetch('/api/system/health');
      if (res && res.success) return res.health;
    } catch (e) {}
    return {
      status: 'Operational',
      uptimeFormatted: '18h 42m (99.99%)',
      responseTimeMs: 18,
      backendApi: { status: 'Operational', latency: '18ms', uptime: '99.99%' },
      database: { status: 'Connected', health: '100% OK' },
      authService: { status: 'Operational', activeSessions: 4 },
      aiService: { status: 'Operational', provider: 'Google Gemini Backend', model: 'gemini-2.5-flash' },
      notificationService: { status: 'Operational' },
      lastBackup: { name: 'suit_db_snapshot_20260920.json', size: '4.2 MB', createdAt: new Date().toISOString() }
    };
  }

  async function pingHealth() {
    try {
      const res = await apiFetch('/api/system/health', { method: 'POST' });
      return res;
    } catch (e) {
      throw e;
    }
  }

  async function getBackups() {
    try {
      const res = await apiFetch('/api/system/backup');
      if (res && res.success) return res.backups;
    } catch (e) {}
    return [];
  }

  async function createBackup() {
    try {
      const res = await apiFetch('/api/system/backup', { method: 'POST' });
      return res.snapshot;
    } catch (e) {
      throw e;
    }
  }

  // ── 10. SYSTEM SETTINGS ──
  async function getSystemSettings() {
    try {
      const res = await apiFetch('/api/system/settings');
      if (res && res.success) return res.settings;
    } catch (e) {}
    return {};
  }

  async function updateSystemSettings(section, settings) {
    try {
      const res = await apiFetch('/api/system/settings', {
        method: 'POST',
        body: JSON.stringify({ section, settings })
      });
      return res.settings;
    } catch (e) {
      throw e;
    }
  }

  // ── 11. SECURITY ──
  async function getSecurityDashboard() {
    try {
      const res = await apiFetch('/api/security');
      if (res && res.success) return res.security;
    } catch (e) {}
    return { healthScore: 98, activeSessions: [], failedLogins: [] };
  }

  async function revokeSession(sessionId) {
    try {
      return await apiFetch('/api/security/revoke-session', {
        method: 'POST',
        body: JSON.stringify({ sessionId })
      });
    } catch (e) {
      throw e;
    }
  }

  // Utility to export CSV
  function exportToCsv(filename, rows) {
    if (!rows || !rows.length) return;
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date ? cell.toLocaleString() : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) cell = `"${cell}"`;
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  return {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    toggleUserStatus,
    resetUserPassword,
    deleteUser,
    getRoles,
    getPermissionMatrix,
    updatePermissionMatrix,
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    assignDepartmentHod,
    getCourses,
    createCourse,
    updateCourse,
    getSubjects,
    createSubject,
    updateSubject,
    getAcademicYears,
    createAcademicYear,
    setActiveAcademicYear,
    getSemesters,
    createSemester,
    setActiveSemester,
    getAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getReportsData,
    getAuditLogs,
    getSystemHealth,
    pingHealth,
    getBackups,
    createBackup,
    getSystemSettings,
    updateSystemSettings,
    getSecurityDashboard,
    revokeSession,
    exportToCsv
  };
})();

if (typeof window !== 'undefined') {
  window.AdminService = AdminService;
}

/**
 * ==========================================================================
 * SMART STUDENT — HOD Departmental Service Layer (F30–F36)
 * Encapsulates department-scoped business operations:
 * - Department KPI & Dashboard Aggregations (F30)
 * - Faculty Allocation Management (F31)
 * - Student Attendance & Performance Monitoring (F32)
 * - Faculty Workload & Allocation Monitoring (F33)
 * - Weekly Departmental Timetable Management (F34)
 * - Academic Approval Processing (F35)
 * - Department Analytical Reports (F36)
 * - HOD Profile & Departmental Settings
 * ==========================================================================
 */

const HODService = (() => {
  const STORAGE_KEY_ALLOCATIONS = 'smart_student_hod_allocations';
  const STORAGE_KEY_TIMETABLE = 'smart_student_hod_timetable';
  const STORAGE_KEY_APPROVALS = 'smart_student_hod_approvals';
  const STORAGE_KEY_SETTINGS = 'smart_student_hod_settings';

  const BACKEND_PORT = '8085';

  // Routes relative API paths to the Node.js backend on port 8085 when running
  // under a dev file server (e.g. VS Code Live Server on port 5500), preventing
  // 405 Method Not Allowed errors caused by the file server receiving API calls.
  function resolveBackendUrl(endpoint) {
    if (!endpoint) return endpoint;
    const clean = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
    if (typeof window === 'undefined') return clean;
    const port = window.location.port;
    const hostname = window.location.hostname || 'localhost';
    // Already on the backend port — use relative URL
    if (port === BACKEND_PORT) return clean;
    // Local dev machine not on backend port — proxy to backend
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `http://${hostname}:${BACKEND_PORT}${clean}`;
    }
    // Deployed environment — use relative path (proxy handles it)
    return clean;
  }

  function getDb() {
    return (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized())
      ? window.SmartStudentFirebase.getDb()
      : null;
  }

  function getStoredOrMock(storageKey, defaultData) {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      localStorage.setItem(storageKey, JSON.stringify(defaultData));
      return JSON.parse(JSON.stringify(defaultData));
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      localStorage.setItem(storageKey, JSON.stringify(defaultData));
      return JSON.parse(JSON.stringify(defaultData));
    }
  }

  function saveToStorage(storageKey, data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  function getRawMock() {
    return window.mockHOD || {
      profile: { name: 'Dr. Anand Deshmukh', role: 'hod' },
      department: { kpis: {} },
      facultyList: [],
      allocations: [],
      students: [],
      timetable: [],
      approvals: [],
      reports: {},
      settings: {}
    };
  }

  // --- Profile & Department Info ---
  function getProfile() {
    const user = AuthService.getCurrentUser();
    if (user && (user.role === 'hod' || user.role === 'domain_admin')) {
      return { ...getRawMock().profile, ...user };
    }
    return getRawMock().profile;
  }

  function getDepartmentInfo() {
    const mock = getRawMock();
    const approvals = getApprovals();
    const pendingCount = approvals.filter(a => a.status === 'Pending').length;
    const faculty = getFacultyList();
    const students = getStudents();

    return {
      ...mock.department,
      kpis: {
        ...mock.department.kpis,
        totalStudents: students.length > 0 ? 248 : 0,
        totalFaculty: faculty.length,
        activeSubjects: 14,
        pendingApprovals: pendingCount
      }
    };
  }

  // --- Faculty Allocation Operations (F31) ---
  function getAllocations(filters = {}) {
    const mock = getRawMock();
    let list = getStoredOrMock(STORAGE_KEY_ALLOCATIONS, mock.allocations);

    if (filters.program && filters.program !== 'all') {
      list = list.filter(item => item.program.toLowerCase().includes(filters.program.toLowerCase()));
    }
    if (filters.semester && filters.semester !== 'all') {
      list = list.filter(item => String(item.semester) === String(filters.semester));
    }
    if (filters.section && filters.section !== 'all') {
      list = list.filter(item => item.section.toUpperCase() === filters.section.toUpperCase());
    }
    if (filters.status && filters.status !== 'all') {
      list = list.filter(item => item.status.toLowerCase() === filters.status.toLowerCase());
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(item =>
        item.facultyName.toLowerCase().includes(q) ||
        item.subjectCode.toLowerCase().includes(q) ||
        item.subjectName.toLowerCase().includes(q)
      );
    }
    return list;
  }

  function saveAllocation(allocationData) {
    const mock = getRawMock();
    const list = getStoredOrMock(STORAGE_KEY_ALLOCATIONS, mock.allocations);
    let targetItem = null;

    if (allocationData.id) {
      const index = list.findIndex(a => a.id === allocationData.id);
      if (index !== -1) {
        list[index] = { ...list[index], ...allocationData };
        targetItem = list[index];
      }
    } else {
      targetItem = {
        id: 'alloc_' + Date.now().toString(36),
        status: 'Allocated',
        academicYear: '2025–2026',
        ...allocationData
      };
      list.unshift(targetItem);
    }
    saveToStorage(STORAGE_KEY_ALLOCATIONS, list);

    const db = getDb();
    if (db && targetItem) {
      try {
        db.collection('facultyAssignments').doc(targetItem.id).set(targetItem, { merge: true });
      } catch (e) { }
    }

    return true;
  }

  function deleteAllocation(id) {
    const mock = getRawMock();
    let list = getStoredOrMock(STORAGE_KEY_ALLOCATIONS, mock.allocations);
    list = list.filter(a => a.id !== id);
    saveToStorage(STORAGE_KEY_ALLOCATIONS, list);

    const db = getDb();
    if (db) {
      try {
        db.collection('facultyAssignments').doc(id).delete();
      } catch (e) { }
    }
    return true;
  }

  // --- Student Monitoring Operations (F32) ---
  function getStudents(filters = {}) {
    const mock = getRawMock();
    let list = [...mock.students];

    if (filters.program && filters.program !== 'all') {
      list = list.filter(s => s.program.toLowerCase().includes(filters.program.toLowerCase()));
    }
    if (filters.semester && filters.semester !== 'all') {
      list = list.filter(s => String(s.semester) === String(filters.semester));
    }
    if (filters.section && filters.section !== 'all') {
      list = list.filter(s => s.section.toUpperCase() === filters.section.toUpperCase());
    }
    if (filters.status && filters.status !== 'all') {
      list = list.filter(s => s.status.toLowerCase() === filters.status.toLowerCase());
    }
    if (filters.attendanceStatus && filters.attendanceStatus !== 'all') {
      if (filters.attendanceStatus === 'critical') {
        list = list.filter(s => s.attendance < 65);
      } else if (filters.attendanceStatus === 'warning') {
        list = list.filter(s => s.attendance >= 65 && s.attendance < 75);
      } else if (filters.attendanceStatus === 'good') {
        list = list.filter(s => s.attendance >= 75);
      }
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.studentId.toLowerCase().includes(q) ||
        s.rollNo.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
      );
    }

    // Sorting support
    if (filters.sortBy) {
      const key = filters.sortBy;
      const order = filters.sortOrder === 'desc' ? -1 : 1;

      list.sort((a, b) => {
        let valA = a[key];
        let valB = b[key];

        if (typeof valA === 'string') {
          return valA.localeCompare(valB) * order;
        }
        if (typeof valA === 'number') {
          return (valA - valB) * order;
        }
        return 0;
      });
    }

    return list;
  }

  function getStudentById(id) {
    const mock = getRawMock();
    return mock.students.find(s => s.id === id || s.studentId === id || s.rollNo === id) || null;
  }

  function getCohortStats() {
    const mock = getRawMock();
    const all = mock.students;
    const total = all.length;
    const healthy = all.filter(s => s.status === 'Healthy').length;
    const attention = all.filter(s => s.status === 'Needs Attention').length;
    const risk = all.filter(s => s.status === 'At Risk').length;

    return {
      totalCohort: 248, // Total departmental cohort
      monitoredActive: total,
      healthyCount: 222,
      healthyPct: 89.5,
      attentionCount: 18,
      attentionPct: 7.3,
      riskCount: 8,
      riskPct: 3.2
    };
  }

  function recordIntervention(studentId, memo) {
    const mock = getRawMock();
    const student = mock.students.find(s => s.id === studentId || s.studentId === studentId);
    if (student) {
      student.recentActivity = `${memo} (Logged by HOD on ${new Date().toLocaleDateString()})`;
      return true;
    }
    return false;
  }

  // --- Faculty Monitoring Operations (F33) ---
  function getFacultyList(filters = {}) {
    const mock = getRawMock();
    let list = [...mock.facultyList];

    if (filters.workloadStatus && filters.workloadStatus !== 'all') {
      list = list.filter(f => f.workloadStatus.toLowerCase() === filters.workloadStatus.toLowerCase());
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.designation.toLowerCase().includes(q) ||
        f.specialization.toLowerCase().includes(q) ||
        f.email.toLowerCase().includes(q)
      );
    }
    return list;
  }

  function getFacultyById(id) {
    const mock = getRawMock();
    return mock.facultyList.find(f => f.id === id || f.facultyId === id) || null;
  }

  function getFacultyWorkloadSummary() {
    const faculty = getFacultyList();
    const overloaded = faculty.filter(f => f.workloadStatus === 'Overloaded').length;
    const optimal = faculty.filter(f => f.workloadStatus === 'Optimal').length;
    const normal = faculty.filter(f => f.workloadStatus === 'Normal').length;
    return {
      total: faculty.length,
      assigned: faculty.filter(f => f.assignedSubjectsCount > 0).length,
      activeSubjects: 14,
      overloaded,
      optimal,
      normal,
      requiringAttention: overloaded
    };
  }

  // --- Timetable Management Operations (F34) ---
  function getTimetable(filters = {}) {
    const mock = getRawMock();
    let list = getStoredOrMock(STORAGE_KEY_TIMETABLE, mock.timetable);

    if (filters.program && filters.program !== 'all') {
      list = list.filter(t => t.program.toLowerCase().includes(filters.program.toLowerCase()));
    }
    if (filters.semester && filters.semester !== 'all') {
      list = list.filter(t => String(t.semester) === String(filters.semester));
    }
    if (filters.section && filters.section !== 'all') {
      list = list.filter(t => t.section.toUpperCase() === filters.section.toUpperCase());
    }
    if (filters.day && filters.day !== 'all') {
      list = list.filter(t => t.day.toLowerCase() === filters.day.toLowerCase());
    }
    return list;
  }

  function saveTimetableEntry(entryData) {
    const mock = getRawMock();
    const list = getStoredOrMock(STORAGE_KEY_TIMETABLE, mock.timetable);
    let target = null;

    if (entryData.id) {
      const index = list.findIndex(t => t.id === entryData.id);
      if (index !== -1) {
        list[index] = { ...list[index], ...entryData };
        target = list[index];
      }
    } else {
      target = {
        id: 'tt_' + Date.now().toString(36),
        ...entryData
      };
      list.push(target);
    }
    saveToStorage(STORAGE_KEY_TIMETABLE, list);

    const db = getDb();
    if (db && target) {
      try {
        db.collection('timetable').doc(target.id).set(target, { merge: true });
      } catch (e) { }
    }

    return true;
  }

  function deleteTimetableEntry(id) {
    const mock = getRawMock();
    let list = getStoredOrMock(STORAGE_KEY_TIMETABLE, mock.timetable);
    list = list.filter(t => t.id !== id);
    saveToStorage(STORAGE_KEY_TIMETABLE, list);

    const db = getDb();
    if (db) {
      try {
        db.collection('timetable').doc(id).delete();
      } catch (e) { }
    }

    return true;
  }

  // --- Academic Approvals Operations (F35) ---
  function getApprovals(statusFilter = 'all') {
    const mock = getRawMock();
    let list = getStoredOrMock(STORAGE_KEY_APPROVALS, mock.approvals);

    if (statusFilter && statusFilter !== 'all') {
      list = list.filter(a => a.status.toLowerCase() === statusFilter.toLowerCase());
    }
    return list;
  }

  function getApprovalById(id) {
    const list = getApprovals('all');
    return list.find(a => a.id === id) || null;
  }

  function approveRequest(id, reviewNote = '') {
    const mock = getRawMock();
    const list = getStoredOrMock(STORAGE_KEY_APPROVALS, mock.approvals);
    const item = list.find(a => a.id === id);

    if (item) {
      item.status = 'Approved';
      item.reviewedAt = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
      item.reviewNotes = reviewNote || 'Approved by HOD.';
      saveToStorage(STORAGE_KEY_APPROVALS, list);

      const db = getDb();
      if (db) {
        try {
          db.collection('approvals').doc(id).set(item, { merge: true });
        } catch (e) { }
      }
      return true;
    }
    return false;
  }

  function rejectRequest(id, reason = '') {
    const mock = getRawMock();
    const list = getStoredOrMock(STORAGE_KEY_APPROVALS, mock.approvals);
    const item = list.find(a => a.id === id);

    if (item) {
      item.status = 'Rejected';
      item.reviewedAt = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
      item.reviewNotes = reason || 'Rejected by HOD.';
      saveToStorage(STORAGE_KEY_APPROVALS, list);

      const db = getDb();
      if (db) {
        try {
          db.collection('approvals').doc(id).set(item, { merge: true });
        } catch (e) { }
      }
      return true;
    }
    return false;
  }

  // --- Department Reports Operations (F36) ---
  function getReports(category = 'all', filters = {}) {
    const mock = getRawMock();
    return mock.reports;
  }

  // --- Settings Operations ---
  function getSettings() {
    const mock = getRawMock();
    return getStoredOrMock(STORAGE_KEY_SETTINGS, mock.settings);
  }

  function saveSettings(settingsData) {
    const current = getSettings();
    const updated = { ...current, ...settingsData };
    saveToStorage(STORAGE_KEY_SETTINGS, updated);

    const db = getDb();
    if (db) {
      try {
        db.collection('systemSettings').doc('hod_settings').set(updated, { merge: true });
      } catch (e) { }
    }

    return true;
  }

  // --- Student Provisioning & Credential Operations ---
  async function createStudent(studentData) {
    const user = AuthService.getCurrentUser() || {
      name: 'Dr. Anand Deshmukh',
      role: 'hod',
      department: 'Department of Computer Engineering',
      departmentId: 'dept_btech'
    };
    const userDept = (user.department && user.department !== 'B.Tech') ? user.department : 'Department of Computer Engineering';
    const userDeptId = user.departmentId || 'dept_btech';

    try {
      const response = await fetch(resolveBackendUrl('/api/admin/students'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Actor-Name': user.name || 'Dr. Anand Deshmukh',
          'X-Actor-Email': user.email || 'hod@university.edu',
          'X-Actor-Role': user.role || 'hod',
          'X-Actor-Uid': user.uid || 'usr_hod_2001',
          'X-Actor-Department': userDept,
          'X-Actor-Department-Id': userDeptId
        },
        body: JSON.stringify(studentData)
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create student.');
      }

      // Also append to local mock if in demo view
      const mock = getRawMock();
      if (mock && mock.students) {
        mock.students.unshift({
          id: data.student.studentId,
          studentId: data.student.studentId,
          rollNo: `2026-${Math.floor(1000 + Math.random() * 9000)}`,
          name: data.student.name,
          email: data.student.email,
          program: data.student.programId || 'B.Tech CSE',
          semester: data.student.semesterId || 4,
          section: data.student.sectionId || 'A',
          attendance: 100,
          cgpa: 9.0,
          status: 'Healthy',
          avatarColor: '#7C3AED'
        });
      }

      // Sync directly to Firestore users collection if db is available
      const db = getDb();
      if (db && data && data.student) {
        try {
          const sUid = data.student.uid || data.student.studentId;
          db.collection('users').doc(sUid).set({
            uid: sUid,
            studentId: data.student.studentId,
            name: data.student.name,
            email: data.student.email,
            role: 'student',
            departmentId: studentData.domainId || 'dept_btech',
            department: 'Department of Computer Engineering',
            program: studentData.programId || 'B.Tech CSE',
            semester: studentData.semesterId || 4,
            section: studentData.sectionId || 'A',
            attendance: 100,
            cgpa: 9.0,
            status: 'Healthy',
            updatedAt: new Date().toISOString()
          }, { merge: true }).catch(() => {});
        } catch (e) {}
      }

      return data;
    } catch (err) {
      if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
        // Dev fallback simulation
        const mock = getRawMock();
        const year = new Date().getFullYear();
        const studentId = `STU${year}-${Math.floor(10000 + Math.random() * 90000)}`;
        const email = `${studentData.name.toLowerCase().replace(/[^a-z]/g, '')}@college.edu`;
        const newStu = {
          id: studentId,
          studentId: studentId,
          rollNo: `2026-${Math.floor(1000 + Math.random() * 9000)}`,
          name: studentData.name,
          email: email,
          program: studentData.programId || 'B.Tech CSE',
          semester: studentData.semesterId || 4,
          section: studentData.sectionId || 'A',
          attendance: 100,
          cgpa: 9.0,
          status: 'Healthy',
          avatarColor: '#7C3AED'
        };
        mock.students.unshift(newStu);

        const db = getDb();
        if (db) {
          try {
            db.collection('users').doc(studentId).set({
              ...newStu,
              uid: studentId,
              role: 'student',
              updatedAt: new Date().toISOString()
            }, { merge: true }).catch(() => {});
          } catch (e) {}
        }

        return {
          success: true,
          student: { uid: `stu_${Date.now()}`, studentId, email, name: studentData.name },
          notification: { email: 'sent', sms: 'sent' }
        };
      }
      throw err;
    }
  }

  async function resendStudentCredentials(studentId) {
    const user = AuthService.getCurrentUser() || {
      name: 'Dr. Anand Deshmukh',
      role: 'hod',
      department: 'Department of Computer Engineering',
      departmentId: 'dept_btech'
    };
    const userDept = (user.department && user.department !== 'B.Tech') ? user.department : 'Department of Computer Engineering';
    const userDeptId = user.departmentId || 'dept_btech';

    try {
      const response = await fetch(resolveBackendUrl('/api/admin/students/resend-credentials'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Actor-Name': user.name || 'Dr. Anand Deshmukh',
          'X-Actor-Email': user.email || 'hod@university.edu',
          'X-Actor-Role': user.role || 'hod',
          'X-Actor-Uid': user.uid || 'usr_hod_2001',
          'X-Actor-Department': userDept,
          'X-Actor-Department-Id': userDeptId
        },
        body: JSON.stringify({ studentId })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to resend credentials.');
      }
      return data;
    } catch (err) {
      if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
        return {
          success: true,
          studentId: studentId,
          notification: { email: 'sent', sms: 'sent' }
        };
      }
      throw err;
    }
  }

  async function removeStudent(studentId) {
    const mock = getRawMock();
    const cleanId = String(studentId || '').trim();
    const idx = mock.students.findIndex(s => s.id === cleanId || s.studentId === cleanId || s.email === cleanId);
    if (idx !== -1) {
      mock.students.splice(idx, 1);
    }

    try {
      await fetch(resolveBackendUrl(`/api/users/${encodeURIComponent(cleanId)}`), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (e) {}

    // Also delete from Firestore if db is active
    const db = getDb();
    if (db) {
      try {
        db.collection('users').doc(cleanId).delete().catch(() => {});
        // Also query by studentId or email in case doc id is uid
        db.collection('users').where('studentId', '==', cleanId).get().then(snap => {
          snap.forEach(d => d.ref.delete().catch(() => {}));
        }).catch(() => {});
      } catch (e) {}
    }

    return { success: true, studentId: cleanId };
  }

  async function fetchStudentsFromFirestore() {
    const db = getDb();
    if (!db) return null;
    try {
      const snap = await db.collection('users').where('role', '==', 'student').get();
      if (!snap.empty) {
        const firestoreStudents = [];
        snap.forEach(doc => {
          const d = doc.data();
          firestoreStudents.push({
            id: d.studentId || d.uid || doc.id,
            studentId: d.studentId || d.uid || doc.id,
            rollNo: d.rollNo || '',
            name: d.name || '',
            email: d.email || '',
            program: d.course || d.program || 'B.Tech CSE',
            semester: d.semester || 4,
            section: d.section || 'A',
            attendance: d.attendance !== undefined ? d.attendance : 85,
            cgpa: d.cgpa !== undefined ? d.cgpa : 8.0,
            status: d.status || 'Healthy',
            mentor: d.mentor || 'Prof. Sunita Mehta',
            avatarColor: d.avatarColor || '#7C3AED'
          });
        });
        if (firestoreStudents.length > 0) {
          const mock = getRawMock();
          mock.students = firestoreStudents;
          return firestoreStudents;
        }
      }
    } catch (e) {
      console.warn('[HODService] Firestore fetch students note:', e.message);
    }
    return null;
  }

  async function fetchFacultyFromFirestore() {
    const db = getDb();
    if (!db) return null;
    try {
      const snap = await db.collection('users').where('role', '==', 'faculty').get();
      if (!snap.empty) {
        const firestoreFaculty = [];
        snap.forEach(doc => {
          const d = doc.data();
          firestoreFaculty.push({
            id: d.facultyId || d.uid || doc.id,
            facultyId: d.facultyId || d.uid || doc.id,
            name: d.name || '',
            email: d.email || '',
            department: d.department || 'Department of Computer Engineering',
            designation: d.designation || 'Associate Professor',
            specialization: d.specialization || 'Computer Science',
            phone: d.phone || '',
            officeRoom: d.officeRoom || '',
            officeHours: d.officeHours || '',
            status: d.status || 'active',
            workloadStatus: d.workloadStatus || 'Optimal'
          });
        });
        if (firestoreFaculty.length > 0) {
          const mock = getRawMock();
          mock.facultyList = firestoreFaculty;
          return firestoreFaculty;
        }
      }
    } catch (e) {
      console.warn('[HODService] Firestore fetch faculty note:', e.message);
    }
    return null;
  }

  return {
    getProfile,
    getDepartmentInfo,
    getAllocations,
    saveAllocation,
    deleteAllocation,
    getStudents,
    getStudentById,
    getCohortStats,
    recordIntervention,
    createStudent,
    removeStudent,
    resendStudentCredentials,
    fetchStudentsFromFirestore,
    fetchFacultyFromFirestore,
    getFacultyList,
    getFacultyById,
    getFacultyWorkloadSummary,
    getTimetable,
    saveTimetableEntry,
    deleteTimetableEntry,
    getApprovals,
    getApprovalById,
    approveRequest,
    rejectRequest,
    getReports,
    getSettings,
    saveSettings
  };
})();

if (typeof window !== 'undefined') {
  window.HODService = HODService;
}

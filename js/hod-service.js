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

  // Helper to load or initialize dataset from mock data
  function getStoredOrMock(storageKey, defaultData) {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      localStorage.setItem(storageKey, JSON.stringify(defaultData));
      return JSON.parse(JSON.stringify(defaultData));
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.warn(`[HODService] Failed to parse ${storageKey}, resetting to default.`, e);
      localStorage.setItem(storageKey, JSON.stringify(defaultData));
      return JSON.parse(JSON.stringify(defaultData));
    }
  }

  function saveToStorage(storageKey, data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  // Ensure mock data availability
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
    return getRawMock().profile;
  }

  function getDepartmentInfo() {
    const mock = getRawMock();
    const approvals = getApprovals();
    const pendingCount = approvals.filter(a => a.status === 'Pending').length;
    const faculty = getFacultyList();
    const students = getStudents();
    const allocations = getAllocations();

    return {
      ...mock.department,
      kpis: {
        ...mock.department.kpis,
        totalStudents: students.length > 0 ? 248 : 0, // Department cohort
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

    if (allocationData.id) {
      // Edit existing
      const index = list.findIndex(a => a.id === allocationData.id);
      if (index !== -1) {
        list[index] = { ...list[index], ...allocationData };
      }
    } else {
      // Create new
      const newAllocation = {
        id: 'alloc_' + Date.now().toString(36),
        status: 'Allocated',
        academicYear: '2025–2026',
        ...allocationData
      };
      list.unshift(newAllocation);
    }
    saveToStorage(STORAGE_KEY_ALLOCATIONS, list);
    return true;
  }

  function deleteAllocation(id) {
    const mock = getRawMock();
    let list = getStoredOrMock(STORAGE_KEY_ALLOCATIONS, mock.allocations);
    list = list.filter(a => a.id !== id);
    saveToStorage(STORAGE_KEY_ALLOCATIONS, list);
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
    return list;
  }

  function getStudentById(id) {
    const mock = getRawMock();
    return mock.students.find(s => s.id === id || s.studentId === id || s.rollNo === id) || null;
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

    if (entryData.id) {
      const index = list.findIndex(t => t.id === entryData.id);
      if (index !== -1) {
        list[index] = { ...list[index], ...entryData };
      }
    } else {
      const newEntry = {
        id: 'tt_' + Date.now().toString(36),
        ...entryData
      };
      list.push(newEntry);
    }
    saveToStorage(STORAGE_KEY_TIMETABLE, list);
    return true;
  }

  function deleteTimetableEntry(id) {
    const mock = getRawMock();
    let list = getStoredOrMock(STORAGE_KEY_TIMETABLE, mock.timetable);
    list = list.filter(t => t.id !== id);
    saveToStorage(STORAGE_KEY_TIMETABLE, list);
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
    return true;
  }

  return {
    getProfile,
    getDepartmentInfo,
    getAllocations,
    saveAllocation,
    deleteAllocation,
    getStudents,
    getStudentById,
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

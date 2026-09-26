/**
 * ==============================================================================
 * SMART STUDENT PRODUCTIVITY PLATFORM — DOMAIN SERVICE LAYER
 * 
 * Provides unified, reactive domain resolution, cross-domain switching,
 * and scoped academic data access for B.Tech, BBA, and MBA domains.
 * ==============================================================================
 */

const DomainService = (() => {
  const STORAGE_KEY = 'smart_student_active_domain';

  function getCatalog() {
    if (typeof DOMAINS_CATALOG !== 'undefined') return DOMAINS_CATALOG;
    if (typeof window !== 'undefined' && window.DOMAINS_CATALOG) return window.DOMAINS_CATALOG;
    try {
      const mod = require('../data/domain-data');
      return mod.DOMAINS_CATALOG || {};
    } catch (_) {}
    return {};
  }

  /**
   * Determine the current active domain ID.
   * Priority:
   * 1. Explicit localStorage selection ('smart_student_active_domain')
   * 2. Logged-in user's department/domain from session
   * 3. Default: 'dept_btech'
   */
  function getActiveDomain() {
    if (typeof window === 'undefined') return 'dept_btech';

    // 1. Primary Ground Truth: Active Authenticated User Session
    try {
      const rawUser = sessionStorage.getItem('smart_student_session') || localStorage.getItem('smart_student_session');
      if (rawUser) {
        const user = JSON.parse(rawUser);
        const deptStr = (user.departmentId || user.domainId || user.department || user.program || user.email || '').toLowerCase();
        if (deptStr.includes('mba')) {
          localStorage.setItem(STORAGE_KEY, 'dept_mba');
          return 'dept_mba';
        }
        if (deptStr.includes('bba')) {
          localStorage.setItem(STORAGE_KEY, 'dept_bba');
          return 'dept_bba';
        }
        if (deptStr.includes('btech') || deptStr.includes('cs') || deptStr.includes('eng') || deptStr.includes('comp')) {
          localStorage.setItem(STORAGE_KEY, 'dept_btech');
          return 'dept_btech';
        }
      }
    } catch (_) {}

    // 2. Secondary Preference: Explicit localStorage override (e.g. for cross-domain admin testing)
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === 'dept_btech' || saved === 'dept_bba' || saved === 'dept_mba')) {
      return saved;
    }

    return 'dept_btech';
  }

  /**
   * Switch the platform's active academic domain.
   */
  function setActiveDomain(domainId, reload = false) {
    const valid = ['dept_btech', 'dept_bba', 'dept_mba'];
    const target = valid.includes(domainId) ? domainId : 'dept_btech';

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, target);

      // If user session exists, update user's department mapping to stay consistent
      try {
        const rawUser = sessionStorage.getItem('smart_student_session') || localStorage.getItem('smart_student_session');
        if (rawUser) {
          const user = JSON.parse(rawUser);
          const domainInfo = getDomain(target);
          if (domainInfo) {
            user.departmentId = target;
            user.department = domainInfo.code;
            user.domainId = domainInfo.domainId;
            if (user.role === 'student' && domainInfo.student) {
              user.name = domainInfo.student.name;
              user.email = domainInfo.student.email;
              user.program = domainInfo.student.program;
              user.rollNo = domainInfo.student.rollNo;
              user.studentId = domainInfo.student.studentId;
            } else if (user.role === 'faculty' && domainInfo.faculty) {
              user.name = domainInfo.faculty.name;
              user.email = domainInfo.faculty.email;
              user.facultyId = domainInfo.faculty.facultyId;
              user.designation = domainInfo.faculty.designation;
            } else if (user.role === 'hod' && domainInfo.hod) {
              user.name = domainInfo.hod.name;
              user.email = domainInfo.hod.email;
              user.designation = domainInfo.hod.designation;
            }
            sessionStorage.setItem('smart_student_session', JSON.stringify(user));
            localStorage.setItem('smart_student_session', JSON.stringify(user));
          }
        }
      } catch (_) {}

      // Dispatch global domain change event
      window.dispatchEvent(new CustomEvent('smartStudentDomainChanged', {
        detail: { domainId: target, domain: getDomain(target) }
      }));

      if (reload) {
        window.location.reload();
      }
    }

    return target;
  }

  function getDomain(domainId) {
    const catalog = getCatalog();
    const id = domainId || getActiveDomain();
    return catalog[id] || catalog.dept_btech;
  }

  function getAllDomains() {
    const catalog = getCatalog();
    return Object.values(catalog);
  }

  function getCourses(domainId) {
    return getDomain(domainId).courses || [];
  }

  function getStudyGroups(domainId) {
    return getDomain(domainId).studyGroups || [];
  }

  function getAssignments(domainId) {
    return getDomain(domainId).assignments || [];
  }

  function getMaterials(domainId) {
    return getDomain(domainId).materials || [];
  }

  function getAttendance(domainId) {
    return getDomain(domainId).attendance || {};
  }

  function getSchedule(domainId) {
    return getDomain(domainId).schedule || [];
  }

  function getExams(domainId) {
    return getDomain(domainId).exams || [];
  }

  function getStudentProfile(domainId) {
    return getDomain(domainId).student || {};
  }

  function getFacultyProfile(domainId) {
    return getDomain(domainId).faculty || {};
  }

  function getHODProfile(domainId) {
    return getDomain(domainId).hod || {};
  }

  function getDepartmentKPIs(domainId) {
    return getDomain(domainId).departmentKPIs || {};
  }

  function getAnalytics(domainId) {
    return getDomain(domainId).analytics || {};
  }

  function getDoubtTopics(domainId) {
    return getDomain(domainId).doubtTopics || [];
  }

  return {
    getActiveDomain,
    setActiveDomain,
    getDomain,
    getAllDomains,
    getCourses,
    getStudyGroups,
    getAssignments,
    getMaterials,
    getAttendance,
    getSchedule,
    getExams,
    getStudentProfile,
    getFacultyProfile,
    getHODProfile,
    getDepartmentKPIs,
    getAnalytics,
    getDoubtTopics
  };
})();

// Global / Module Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DomainService };
} else {
  window.DomainService = DomainService;
}

/**
 * ==========================================================================
 * SMART STUDENT — Learning Materials Service Layer
 * Cloudinary File Delivery & Multi-Domain Firestore Reference Management
 * ==========================================================================
 */

const MaterialService = (() => {
  function getDb() {
    return (typeof window !== 'undefined' && window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized())
      ? window.SmartStudentFirebase.getDb()
      : null;
  }

  function getActiveDomain() {
    if (typeof DomainService !== 'undefined' && DomainService.getActiveDomain) {
      return DomainService.getActiveDomain();
    }
    if (typeof sessionStorage !== 'undefined') {
      try {
        const raw = sessionStorage.getItem('smart_student_session') || localStorage.getItem('smart_student_session');
        if (raw) {
          const u = JSON.parse(raw);
          const d = (u.departmentId || u.department || u.program || u.email || '').toLowerCase();
          if (d.includes('mba')) return 'dept_mba';
          if (d.includes('bba')) return 'dept_bba';
        }
      } catch (_) {}
    }
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('smart_student_active_domain');
      if (saved && (saved === 'dept_btech' || saved === 'dept_bba' || saved === 'dept_mba')) return saved;
    }
    return 'dept_btech';
  }

  async function getRecentMaterials(category = 'all', subjectCode = 'all') {
    const activeDomain = getActiveDomain();
    const db = getDb();
    let list = [];

    function matchesDomain(m) {
      if (m.domainId && m.domainId === activeDomain) return true;
      const code = (m.subjectCode || m.courseCode || '').toUpperCase();
      if (activeDomain === 'dept_mba') return code.startsWith('MBA');
      if (activeDomain === 'dept_bba') return code.startsWith('BBA');
      return code.startsWith('CS');
    }

    if (db) {
      try {
        const snap = await db.collection('materials').get();
        if (!snap.empty) {
          list = snap.docs.map(d => ({ id: d.id, ...d.data() })).filter(matchesDomain);
        }
      } catch (e) {
        console.warn('Materials fetch note:', e);
      }
    }

    // Load domain mock materials
    let domainMock = [];
    if (typeof getMaterialsForDomain === 'function') {
      domainMock = getMaterialsForDomain(activeDomain);
    } else if (typeof window !== 'undefined' && window.getMaterialsForDomain) {
      domainMock = window.getMaterialsForDomain(activeDomain);
    } else if (typeof mockMaterials !== 'undefined') {
      domainMock = mockMaterials;
    }

    const seenIds = new Set(list.map(m => m.id));
    domainMock.forEach(dm => {
      if (!seenIds.has(dm.id) && matchesDomain(dm)) {
        list.push(dm);
      }
    });

    if (list.length === 0) {
      list = [...domainMock];
    }

    if (category && category !== 'all') {
      list = list.filter(m => (m.category || '').toLowerCase() === category.toLowerCase());
    }
    if (subjectCode && subjectCode !== 'all') {
      list = list.filter(m => (m.subjectCode || m.courseCode) === subjectCode);
    }

    return list;
  }

  /**
   * Get secure Cloudinary preview or download URL
   */
  function getDownloadUrl(material) {
    if (material && material.fileUrl) {
      return material.fileUrl;
    }
    return `https://res.cloudinary.com/demo/image/upload/sample.pdf`;
  }

  return {
    getRecentMaterials,
    getDownloadUrl
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MaterialService;
} else if (typeof window !== 'undefined') {
  window.MaterialService = MaterialService;
}

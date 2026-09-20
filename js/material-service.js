/**
 * ==========================================================================
 * SMART STUDENT — Learning Materials Service Layer
 * Cloudinary File Delivery & Firestore Reference Management
 * ==========================================================================
 */

const MaterialService = (() => {
  function getDb() {
    return (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized())
      ? window.SmartStudentFirebase.getDb()
      : null;
  }

  async function getRecentMaterials(category = 'all', subjectCode = 'all') {
    const db = getDb();
    let list = [];

    if (db) {
      try {
        const snap = await db.collection('materials').get();
        if (!snap.empty) {
          list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      } catch (e) {
        console.warn('Materials fetch note:', e);
      }
    }

    if (list.length === 0) {
      list = [...(window.mockMaterials || [])];
    }

    if (category && category !== 'all') {
      list = list.filter(m => (m.category || '').toLowerCase() === category.toLowerCase());
    }
    if (subjectCode && subjectCode !== 'all') {
      list = list.filter(m => m.subjectCode === subjectCode);
    }

    return list;
  }

  /**
   * Get secure Cloudinary preview or download URL
   */
  function getDownloadUrl(material) {
    if (material.fileUrl) {
      return material.fileUrl;
    }
    return `https://res.cloudinary.com/demo/image/upload/sample.pdf`;
  }

  return {
    getRecentMaterials,
    getDownloadUrl
  };
})();

if (typeof window !== 'undefined') {
  window.MaterialService = MaterialService;
}

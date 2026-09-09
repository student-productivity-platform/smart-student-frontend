/**
 * ==========================================================================
 * SMART STUDENT — Learning Materials Service Layer
 * Cloudinary File Delivery & Firestore Reference Management
 * ==========================================================================
 */

const MaterialService = (() => {
  async function getRecentMaterials() {
    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        const snap = await db.collection('materials').orderBy('uploadedAt', 'desc').limit(6).get();
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      } catch (e) {
        console.warn('Materials fetch error:', e);
      }
    }
    return window.mockMaterials || [];
  }

  /**
   * Get secure Cloudinary preview or download URL
   */
  function getDownloadUrl(material) {
    if (material.fileUrl) {
      return material.fileUrl;
    }
    return `https://res.cloudinary.com/demo/image/upload/fl_attachment/${material.cloudinaryPublicId || 'sample'}.pdf`;
  }

  return {
    getRecentMaterials,
    getDownloadUrl
  };
})();

if (typeof window !== 'undefined') {
  window.MaterialService = MaterialService;
}

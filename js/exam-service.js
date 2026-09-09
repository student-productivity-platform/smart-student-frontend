/**
 * ==========================================================================
 * SMART STUDENT — Examination Service Layer
 * ==========================================================================
 */

const ExamService = (() => {
  async function getUpcomingExams() {
    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        const snap = await db.collection('exams').orderBy('date', 'asc').get();
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      } catch (e) {
        console.warn('Exams fetch error:', e);
      }
    }
    return window.mockExams || [];
  }

  return { getUpcomingExams };
})();

if (typeof window !== 'undefined') {
  window.ExamService = ExamService;
}

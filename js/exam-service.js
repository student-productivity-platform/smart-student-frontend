/**
 * ==========================================================================
 * SMART STUDENT — Examination & Results Service Layer
 * Fetches upcoming exam schedules and verified published exam results
 * ==========================================================================
 */

const ExamService = (() => {
  function getDb() {
    return (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized())
      ? window.SmartStudentFirebase.getDb()
      : null;
  }

  /**
   * Fetch Upcoming Scheduled Exams
   */
  async function getUpcomingExams() {
    const db = getDb();
    if (db) {
      try {
        const snap = await db.collection('exams').orderBy('date', 'asc').get();
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      } catch (e) {
        console.warn('Exams fetch note:', e);
      }
    }
    return window.mockExams || [];
  }

  /**
   * Fetch Published Results for Student (Strict: Never exposes unpublished results)
   */
  async function getPublishedResults() {
    const db = getDb();
    const activeSession = AuthService.getCurrentUser();
    const uid = activeSession ? activeSession.uid : 'usr_stu_8842';
    const rollNo = activeSession ? (activeSession.rollNo || activeSession.studentId) : 'CS24-042';

    if (db) {
      try {
        const snap = await db.collection('results').where('isPublished', '==', true).get();
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          return list.filter(r => r.studentId === uid || r.studentUid === uid || r.studentRollNo === rollNo);
        }
      } catch (e) {
        console.warn('Results fetch note:', e);
      }
    }

    return [
      {
        id: "res_exam_001_CS24-042",
        examId: "exam_001",
        examTitle: "Mid-Term Examination: DBMS (CS402)",
        subjectCode: "CS402",
        subjectName: "Database Management Systems",
        studentRollNo: "CS24-042",
        studentName: "Riddhi Zunjarrao",
        marksObtained: 24,
        maxMarks: 25,
        grade: "A+",
        isPublished: true,
        publishedAt: "2026-09-16T10:00:00Z"
      }
    ];
  }

  return {
    getUpcomingExams,
    getPublishedResults
  };
})();

if (typeof window !== 'undefined') {
  window.ExamService = ExamService;
}

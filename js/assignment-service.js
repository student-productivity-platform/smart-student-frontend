/**
 * ==========================================================================
 * SMART STUDENT — Assignment Service Layer
 * Manages upcoming assignments, submissions, Cloudinary uploads, and evaluations
 * ==========================================================================
 */

const AssignmentService = (() => {
  function getDb() {
    return (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized())
      ? window.SmartStudentFirebase.getDb()
      : null;
  }

  /**
   * Get Assignments with optional status filter
   */
  async function getAssignments(statusFilter = null) {
    let list = [];
    const db = getDb();

    if (db) {
      try {
        let query = db.collection('assignments');
        if (statusFilter) {
          query = query.where('status', '==', statusFilter);
        }
        const snapshot = await query.get();
        if (!snapshot.empty) {
          list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn("Firestore assignments fetch note:", err);
      }
    }

    if (list.length === 0) {
      list = [...(window.mockAssignments || [])];
      if (statusFilter) {
        list = list.filter(item => item.status === statusFilter);
      }
    }

    return list;
  }

  /**
   * Get Submissions for current student
   */
  async function getMySubmissions() {
    const activeSession = AuthService.getCurrentUser();
    const uid = activeSession ? activeSession.uid : 'usr_stu_8842';
    const db = getDb();
    let list = [];

    if (db) {
      try {
        const snap = await db.collection('submissions').where('studentId', '==', uid).get();
        if (!snap.empty) {
          list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (e) {}
    }

    return list;
  }

  /**
   * Submit Assignment File
   * Stores Cloudinary file reference in Firestore submissions collection
   */
  async function submitAssignment(assignmentId, fileData) {
    const activeSession = AuthService.getCurrentUser();
    const submissionRecord = {
      assignmentId: assignmentId,
      studentId: activeSession ? activeSession.uid : 'usr_stu_8842',
      studentName: activeSession ? activeSession.name : 'Riddhi Zunjarrao',
      studentRollNo: activeSession ? (activeSession.rollNo || activeSession.studentId) : 'CS24-042',
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      fileName: fileData.name || 'submission.pdf',
      fileUrl: fileData.url || 'https://res.cloudinary.com/demo/image/upload/sample_submission.pdf',
      cloudinaryPublicId: 'student_submissions/' + assignmentId + '_' + Date.now(),
      fileSize: fileData.size || '2.1 MB'
    };

    const db = getDb();
    if (db) {
      try {
        const subId = `sub_${assignmentId}_${submissionRecord.studentId}`;
        await db.collection('submissions').doc(subId).set(submissionRecord, { merge: true });
        await db.collection('assignments').doc(assignmentId).update({ status: 'submitted' });
      } catch (e) {
        console.warn("Firestore submission write note:", e);
      }
    }

    if (window.mockAssignments) {
      const match = window.mockAssignments.find(a => a.id === assignmentId);
      if (match) {
        match.status = 'submitted';
        match.submittedAt = 'Just now';
      }
    }

    return submissionRecord;
  }

  return {
    getAssignments,
    getMySubmissions,
    submitAssignment
  };
})();

if (typeof window !== 'undefined') {
  window.AssignmentService = AssignmentService;
}

/**
 * ==========================================================================
 * SMART STUDENT — Assignment Service Layer
 * Manages upcoming assignments, submissions, and Cloudinary upload references
 * ==========================================================================
 */

const AssignmentService = (() => {
  /**
   * Get Assignments with optional status filter
   */
  async function getAssignments(statusFilter = null) {
    let list = [];

    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        let query = db.collection('assignments');
        if (statusFilter) {
          query = query.where('status', '==', statusFilter);
        }
        const snapshot = await query.get();
        if (!snapshot.empty) {
          list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn("Firestore assignments fetch failed:", err);
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
   * Submit Assignment File
   * Stores Cloudinary file reference in Firestore submissions collection
   */
  async function submitAssignment(assignmentId, fileData) {
    const activeSession = AuthService.getCurrentUser();
    const submissionRecord = {
      assignmentId: assignmentId,
      studentId: activeSession ? activeSession.uid : 'usr_stu_8842',
      studentName: activeSession ? activeSession.name : 'Riddhi Zunjarrao',
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      fileName: fileData.name || 'submission.pdf',
      fileUrl: fileData.url || 'https://res.cloudinary.com/demo/image/upload/sample_submission.pdf',
      cloudinaryPublicId: 'student_submissions/' + assignmentId + '_' + Date.now(),
      fileSize: fileData.size || '2.1 MB'
    };

    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      const db = window.SmartStudentFirebase.getDb();
      await db.collection('submissions').add(submissionRecord);
      await db.collection('assignments').doc(assignmentId).update({ status: 'submitted' });
    }

    // Update local mock array
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
    submitAssignment
  };
})();

if (typeof window !== 'undefined') {
  window.AssignmentService = AssignmentService;
}

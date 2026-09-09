/**
 * ==========================================================================
 * SMART STUDENT — Student Service Layer
 * Interacts with Firestore (users collection) with fallback to mock data
 * ==========================================================================
 */

const StudentService = (() => {
  /**
   * Get Student Profile
   */
  async function getProfile() {
    const activeSession = AuthService.getCurrentUser();
    const userId = activeSession ? activeSession.uid : 'usr_stu_8842';

    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        const doc = await db.collection('users').doc(userId).get();
        if (doc.exists) {
          return { id: doc.id, ...doc.data() };
        }
      } catch (err) {
        console.warn("Firestore read failed, using mock data:", err);
      }
    }

    // Return mock student merged with active session user info
    if (window.mockStudent) {
      return {
        ...window.mockStudent,
        name: activeSession ? activeSession.name : window.mockStudent.name,
        email: activeSession ? activeSession.email : window.mockStudent.email
      };
    }

    return {
      id: "usr_stu_8842",
      name: "Riddhi Zunjarrao",
      email: "riddhi.z@university.edu",
      program: "B.Tech Computer Science & Engineering",
      department: "Department of Computer Engineering",
      semester: 4,
      section: "A",
      academicYear: "2025–2026",
      cgpa: 8.7,
      status: "active"
    };
  }

  /**
   * Get Academic Snapshot Metrics (4 KPIs)
   */
  async function getAcademicSnapshot() {
    return {
      attendancePercentage: 87,
      attendanceStatus: "Safe (+12% above 75%)",
      pendingAssignments: 3,
      upcomingExams: 2,
      cgpa: 8.7,
      cgpaRank: "Top 5% of Class",
      completedCredits: 78,
      totalCredits: 160
    };
  }

  /**
   * Get Today's Class Schedule
   */
  async function getTodaySchedule() {
    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        const snapshot = await db.collection('classes').orderBy('time', 'asc').get();
        if (!snapshot.empty) {
          return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn("Firestore classes fetch failed:", err);
      }
    }
    return window.mockSchedule || [];
  }

  /**
   * Update Student Contact / Profile Info (Student-allowed fields only)
   */
  async function updateProfile(updateData) {
    const activeSession = AuthService.getCurrentUser();
    const userId = activeSession ? activeSession.uid : 'usr_stu_8842';

    // Disallow altering institution-controlled academic fields
    const safeUpdates = {
      phone: updateData.phone,
      address: updateData.address,
      personalEmail: updateData.personalEmail,
      emergencyContact: updateData.emergencyContact
    };

    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      const db = window.SmartStudentFirebase.getDb();
      await db.collection('users').doc(userId).set(safeUpdates, { merge: true });
    }

    if (window.mockStudent) {
      Object.assign(window.mockStudent, safeUpdates);
    }

    return true;
  }

  return {
    getProfile,
    getAcademicSnapshot,
    getTodaySchedule,
    updateProfile
  };
})();

if (typeof window !== 'undefined') {
  window.StudentService = StudentService;
}

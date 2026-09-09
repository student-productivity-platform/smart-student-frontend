/**
 * ==========================================================================
 * SMART STUDENT — Attendance Analytics Service Layer
 * ==========================================================================
 */

const AttendanceService = (() => {
  async function getAttendanceOverview() {
    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        const activeUser = AuthService.getCurrentUser();
        const uid = activeUser ? activeUser.uid : 'usr_stu_8842';
        const doc = await db.collection('attendance').doc(uid).get();
        if (doc.exists) {
          return doc.data();
        }
      } catch (e) {
        console.warn('Attendance fetch error:', e);
      }
    }
    return window.mockAttendance;
  }

  return { getAttendanceOverview };
})();

if (typeof window !== 'undefined') {
  window.AttendanceService = AttendanceService;
}

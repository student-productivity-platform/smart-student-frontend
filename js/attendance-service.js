/**
 * ==========================================================================
 * SMART STUDENT — Attendance Analytics Service Layer
 * Calculates dynamic attendance percentages & thresholds from Firestore
 * ==========================================================================
 */

const AttendanceService = (() => {
  function getDb() {
    return (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized())
      ? window.SmartStudentFirebase.getDb()
      : null;
  }

  async function getAttendanceOverview() {
    const db = getDb();
    const activeUser = AuthService.getCurrentUser();
    const uid = activeUser ? activeUser.uid : 'usr_stu_8842';

    if (db) {
      try {
        const sessionsSnap = await db.collection('attendance').get();
        if (!sessionsSnap.empty) {
          const subjectsMap = {};
          let totalClasses = 0;
          let attendedClasses = 0;

          sessionsSnap.docs.forEach(doc => {
            const session = doc.data();
            const record = (session.records || []).find(r => r.studentId === uid || r.rollNo === (activeUser ? activeUser.rollNo : 'CS24-042'));
            if (record) {
              const code = session.subjectCode;
              if (!subjectsMap[code]) {
                subjectsMap[code] = {
                  code: code,
                  name: session.subjectName || code,
                  attended: 0,
                  total: 0
                };
              }
              subjectsMap[code].total += 1;
              totalClasses += 1;
              if (record.status === 'present' || record.status === 'Present') {
                subjectsMap[code].attended += 1;
                attendedClasses += 1;
              } else if (record.status === 'late' || record.status === 'Late') {
                subjectsMap[code].attended += 0.5;
                attendedClasses += 0.5;
              }
            }
          });

          if (totalClasses > 0) {
            const overallPct = +((attendedClasses / totalClasses) * 100).toFixed(1);
            return {
              overallPercentage: overallPct,
              overallStatus: overallPct >= 75 ? "Safe (+12% above threshold)" : "Attendance Shortage Warning",
              totalConducted: totalClasses,
              totalAttended: attendedClasses,
              requiredToReach75: overallPct < 75 ? Math.ceil((0.75 * totalClasses - attendedClasses) / 0.25) : 0,
              subjects: Object.values(subjectsMap).map(s => ({
                code: s.code,
                name: s.name,
                attended: s.attended,
                total: s.total,
                percentage: s.total > 0 ? +((s.attended / s.total) * 100).toFixed(1) : 100
              }))
            };
          }
        }
      } catch (e) {
        console.warn('Attendance dynamic fetch note:', e);
      }
    }

    return window.mockAttendance || {
      overallPercentage: 87,
      overallStatus: "Safe (+12% above 75%)",
      totalConducted: 142,
      totalAttended: 124,
      requiredToReach75: 0,
      subjects: []
    };
  }

  return { getAttendanceOverview };
})();

if (typeof window !== 'undefined') {
  window.AttendanceService = AttendanceService;
}

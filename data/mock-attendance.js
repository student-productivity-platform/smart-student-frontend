/**
 * Centralized Mock Data: Attendance Metrics
 * Includes overall percentage and per-subject breakdown
 */
const mockAttendance = {
  overallPercentage: 87,
  totalClassesHeld: 185,
  totalAttended: 161,
  thresholdRequired: 75,
  status: "Compliant (+12% above mandatory 75% threshold)",
  subjects: [
    {
      subjectCode: "CS401",
      subjectName: "Data Structures & Algorithms",
      faculty: "Prof. Rajesh Sharma",
      attended: 35,
      total: 38,
      percentage: 92,
      status: "safe",
      safeMargin: "Can miss up to 8 sessions safely"
    },
    {
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      faculty: "Prof. Sunita Mehta",
      attended: 31,
      total: 37,
      percentage: 84,
      status: "safe",
      safeMargin: "Can miss up to 4 sessions safely"
    },
    {
      subjectCode: "CS403",
      subjectName: "Machine Learning",
      faculty: "Prof. Arvind Patil",
      attended: 32,
      total: 36,
      percentage: 89,
      status: "safe",
      safeMargin: "Can miss up to 5 sessions safely"
    },
    {
      subjectCode: "CS404",
      subjectName: "Operating Systems",
      faculty: "Prof. Priya Kulkarni",
      attended: 31,
      total: 37,
      percentage: 83,
      status: "safe",
      safeMargin: "Can miss up to 3 sessions safely"
    },
    {
      subjectCode: "CS405",
      subjectName: "Computer Networks",
      faculty: "Dr. Vikram Joshi",
      attended: 32,
      total: 37,
      percentage: 86,
      status: "safe",
      safeMargin: "Can miss up to 4 sessions safely"
    }
  ],
  recentSessions: [
    { date: "Sep 05, 2026", time: "11:00 AM", subject: "Database Management Systems", subjectCode: "CS402", faculty: "Prof. Sunita Mehta", status: "Present", room: "Room 302" },
    { date: "Sep 05, 2026", time: "09:00 AM", subject: "Data Structures & Algorithms", subjectCode: "CS401", faculty: "Prof. Rajesh Sharma", status: "Present", room: "Room 204" },
    { date: "Sep 04, 2026", time: "02:00 PM", subject: "Machine Learning", subjectCode: "CS403", faculty: "Prof. Arvind Patil", status: "Present", room: "Online Meet" },
    { date: "Sep 04, 2026", time: "10:00 AM", subject: "Computer Networks", subjectCode: "CS405", faculty: "Dr. Vikram Joshi", status: "Present", room: "Room 105" },
    { date: "Sep 03, 2026", time: "03:30 PM", subject: "Operating Systems Lab", subjectCode: "CS404L", faculty: "Prof. Priya Kulkarni", status: "Present", room: "Lab 3" },
    { date: "Sep 02, 2026", time: "11:00 AM", subject: "Database Management Systems", subjectCode: "CS402", faculty: "Prof. Sunita Mehta", status: "Present", room: "Room 302" },
    { date: "Sep 01, 2026", time: "09:00 AM", subject: "Data Structures & Algorithms", subjectCode: "CS401", faculty: "Prof. Rajesh Sharma", status: "Medical Leave", room: "Room 204" }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockAttendance };
} else {
  window.mockAttendance = mockAttendance;
}

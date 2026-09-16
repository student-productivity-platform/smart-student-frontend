/**
 * Centralized Mock Data: Student Profile
 * Matches Firestore Schema: users/{userId}
 */
const mockStudent = {
  id: "usr_stu_8842",
  name: "Riddhi Zunjarrao",
  email: "riddhi.z@university.edu",
  role: "student",
  studentId: "STU-2024-8842",
  program: "B.Tech",
  department: "B.Tech",
  semester: 4,
  section: "A",
  academicYear: "2025–2026",
  rollNo: "CS24-042",
  mentor: "Prof. Rajesh Sharma",
  cgpa: 8.7,
  profileImage: "assets/images/student-avatar.png",
  phone: "+91 98765 43210",
  address: "University Campus Residence, Hall 3, Room 214",
  status: "active",
  createdAt: "2024-08-01T09:00:00Z"
};

// Export for module/global browser usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockStudent };
} else {
  window.mockStudent = mockStudent;
}

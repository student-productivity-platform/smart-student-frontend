/**
 * Centralized Mock Data: Student Profile
 * Matches Firestore Schema: users/{userId}
 * Multi-Domain Dynamic Resolution:
 * - B.Tech CSE: Riddhi Zunjarrao
 * - BBA Finance: Tanvi Bansal
 * - MBA Executive: Aditya Sengupta
 */

const allDomainStudents = {
  dept_btech: {
    id: "usr_stu_8842",
    uid: "usr_stu_8842",
    name: "Riddhi Zunjarrao",
    email: "student@university.edu",
    role: "student",
    studentId: "STU-2024-8842",
    program: "B.Tech Computer Science & Engineering",
    department: "Department of Computer Engineering",
    departmentCode: "B.Tech",
    departmentId: "dept_btech",
    domainId: "domain_eng",
    school: "School of Engineering & Technology",
    semester: 4,
    section: "A",
    academicYear: "2025–2026",
    rollNo: "CS24-042",
    mentor: "Prof. Sunita Mehta",
    cgpa: 8.7,
    sgpa: 9.20,
    profileImage: "assets/images/student-avatar.png",
    phone: "+91 98765 43210",
    address: "University Campus Residence, Hall 3, Room 214",
    status: "active",
    createdAt: "2024-08-01T09:00:00Z"
  },

  dept_bba: {
    id: "usr_stu_bba_1",
    uid: "usr_stu_bba_1",
    name: "Tanvi Bansal",
    email: "bba.student@university.edu",
    role: "student",
    studentId: "STU-2024-7120",
    program: "BBA Financial Management & Analytics",
    department: "Department of Business Administration",
    departmentCode: "BBA",
    departmentId: "dept_bba",
    domainId: "domain_mgmt",
    school: "School of Management & Business Studies",
    semester: 4,
    section: "A",
    academicYear: "2025–2026",
    rollNo: "BBA24-018",
    mentor: "Prof. Priya Nair",
    cgpa: 8.9,
    sgpa: 9.35,
    profileImage: "assets/images/student-avatar.png",
    phone: "+91 98231 66778",
    address: "Management Scholars Wing, Tower B, Room 108",
    status: "active",
    createdAt: "2024-08-01T09:00:00Z"
  },

  dept_mba: {
    id: "usr_stu_mba_1",
    uid: "usr_stu_mba_1",
    name: "Aditya Sengupta",
    email: "mba.student@university.edu",
    role: "student",
    studentId: "STU-2024-6502",
    program: "Master of Business Administration (Executive)",
    department: "School of Management & Business Studies",
    departmentCode: "MBA",
    departmentId: "dept_mba",
    domainId: "domain_mgmt",
    school: "School of Management & Business Studies",
    semester: 4,
    section: "A",
    academicYear: "2025–2026",
    rollNo: "MBA24-007",
    mentor: "Dr. Rajesh Patil",
    cgpa: 9.1,
    sgpa: 9.45,
    profileImage: "assets/images/student-avatar.png",
    phone: "+91 98232 99001",
    address: "Executive Residence Suites, Block C, Suite 302",
    status: "active",
    createdAt: "2024-08-01T09:00:00Z"
  }
};

function getActiveStudentKey() {
  if (typeof DomainService !== 'undefined') {
    return DomainService.getActiveDomain();
  }
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('smart_student_active_domain');
    if (saved && allDomainStudents[saved]) return saved;
    try {
      const raw = sessionStorage.getItem('smart_student_session') || localStorage.getItem('smart_student_session');
      if (raw) {
        const u = JSON.parse(raw);
        const d = (u.departmentId || u.department || u.program || '').toLowerCase();
        if (d.includes('bba')) return 'dept_bba';
        if (d.includes('mba')) return 'dept_mba';
      }
    } catch (_) {}
  }
  return 'dept_btech';
}

function getStudentForDomain(domainId) {
  const d = domainId || getActiveStudentKey();
  return allDomainStudents[d] || allDomainStudents.dept_btech;
}

const mockStudent = new Proxy({}, {
  get(target, prop) {
    const s = getStudentForDomain();
    if (prop === 'all') return allDomainStudents;
    if (prop === 'forDomain') return (id) => getStudentForDomain(id);
    return s[prop];
  },
  set(target, prop, value) {
    const s = getStudentForDomain();
    s[prop] = value;
    return true;
  },
  has(target, prop) {
    const s = getStudentForDomain();
    return prop in s;
  },
  ownKeys() {
    const s = getStudentForDomain();
    return Reflect.ownKeys(s);
  },
  getOwnPropertyDescriptor(target, prop) {
    const s = getStudentForDomain();
    return Reflect.getOwnPropertyDescriptor(s, prop);
  }
});

// Export for module/global browser usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockStudent, allDomainStudents, getStudentForDomain };
} else {
  window.mockStudent = mockStudent;
  window.allDomainStudents = allDomainStudents;
  window.getStudentForDomain = getStudentForDomain;
}

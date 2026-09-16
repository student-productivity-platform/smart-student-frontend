/**
 * ==========================================================================
 * SMART STUDENT — Centralized Mock Data: HOD Portal (F30–F36)
 * Role: Head of Department (HOD) — Dr. Anand Deshmukh
 * Department: Department of Computer Engineering
 * Scope: Strictly Departmental (CSE Programs: B.Tech CSE, M.Tech CSE, B.Tech AI&DS)
 * ==========================================================================
 */

const mockHOD = {
  profile: {
    id: "usr_hod_2001",
    name: "Dr. Anand Deshmukh",
    email: "hod@university.edu",
    role: "hod",
    designation: "Professor & Head of Department",
    department: "Department of Computer Engineering",
    school: "School of Computing & Information Technology",
    institution: "Smart Institute of Technology",
    joiningYear: "2012",
    qualification: "Ph.D. in Distributed Computing (IIT Bombay), M.Tech (CSE), B.E. (CSE)",
    specialization: "Cloud Computing, Parallel Distributed Architectures, Academic Governance",
    officeRoom: "Academic Block 3, HOD Office (Room 301)",
    phone: "+91 98220 99001",
    officeHours: "Mon – Fri: 10:00 AM – 01:00 PM & 03:00 PM – 04:30 PM",
    avatar: "../images/student-study.jpg",
    status: "active"
  },

  department: {
    name: "Department of Computer Engineering",
    code: "CSE",
    establishedYear: 2004,
    currentAcademicYear: "2025–2026",
    currentSemesterTerm: "Even Semester (Spring 2026)",
    programs: [
      { id: "btech_cse", name: "B.Tech Computer Science & Engineering", code: "B.Tech CSE", duration: "4 Years", totalStudents: 168, activeSemesters: [4, 6, 8] },
      { id: "mtech_cse", name: "M.Tech Computer Science & Engineering", code: "M.Tech CSE", duration: "2 Years", totalStudents: 36, activeSemesters: [2, 4] },
      { id: "btech_aids", name: "B.Tech Artificial Intelligence & Data Science", code: "B.Tech AI&DS", duration: "4 Years", totalStudents: 44, activeSemesters: [4, 6] }
    ],
    semesters: [4, 6, 8],
    sections: ["A", "B", "C"],
    kpis: {
      totalStudents: 248,
      totalFaculty: 18,
      activeSubjects: 14,
      pendingApprovals: 5,
      avgAttendance: 84.8,
      avgPerformanceScore: 81.2,
      labUtilization: "88%",
      classesCompletedPct: 76.5
    }
  },

  // Faculty Directory & Workload
  facultyList: [
    {
      id: "fac_1001",
      facultyId: "FAC-2024-1001",
      name: "Prof. Sunita Mehta",
      email: "faculty@university.edu",
      designation: "Associate Professor",
      specialization: "Database Systems, Distributed Cloud",
      experienceYears: 12,
      maxWeeklyHours: 18,
      currentWeeklyHours: 14,
      assignedSubjectsCount: 3,
      assignedSectionsCount: 3,
      workloadStatus: "Optimal", // Normal, Optimal, Overloaded
      status: "Active",
      phone: "+91 98220 11234",
      officeRoom: "Academic Block 3, Cabin 304",
      assignedCourses: ["CS402 (DBMS)", "CS404 (Operating Systems)", "CS402L (DBMS Lab)"]
    },
    {
      id: "fac_1002",
      facultyId: "FAC-2024-1002",
      name: "Dr. Rajesh Sharma",
      email: "rajesh.sharma@university.edu",
      designation: "Professor",
      specialization: "Advanced Algorithms, Machine Learning",
      experienceYears: 18,
      maxWeeklyHours: 16,
      currentWeeklyHours: 16,
      assignedSubjectsCount: 3,
      assignedSectionsCount: 4,
      workloadStatus: "Optimal",
      status: "Active",
      phone: "+91 98220 11235",
      officeRoom: "Academic Block 3, Cabin 302",
      assignedCourses: ["CS401 (Design & Analysis of Algorithms)", "CS601 (Machine Learning)"]
    },
    {
      id: "fac_1003",
      facultyId: "FAC-2024-1003",
      name: "Prof. Amit Kulkarni",
      email: "amit.kulkarni@university.edu",
      designation: "Assistant Professor",
      specialization: "Computer Networks, Network Security",
      experienceYears: 7,
      maxWeeklyHours: 20,
      currentWeeklyHours: 22,
      assignedSubjectsCount: 4,
      assignedSectionsCount: 4,
      workloadStatus: "Overloaded",
      status: "Active",
      phone: "+91 98220 11236",
      officeRoom: "Academic Block 3, Cabin 305",
      assignedCourses: ["CS403 (Computer Networks)", "CS403L (Networks Lab)", "CS604 (Cyber Security)"]
    },
    {
      id: "fac_1004",
      facultyId: "FAC-2024-1004",
      name: "Prof. Priya Deshpande",
      email: "priya.d@university.edu",
      designation: "Assistant Professor",
      specialization: "Software Engineering, Web Technologies",
      experienceYears: 6,
      maxWeeklyHours: 20,
      currentWeeklyHours: 12,
      assignedSubjectsCount: 2,
      assignedSectionsCount: 2,
      workloadStatus: "Normal",
      status: "Active",
      phone: "+91 98220 11237",
      officeRoom: "Academic Block 3, Cabin 306",
      assignedCourses: ["CS405 (Software Engineering)", "CS405L (SE Lab)"]
    },
    {
      id: "fac_1005",
      facultyId: "FAC-2024-1005",
      name: "Dr. Neha Patel",
      email: "neha.patel@university.edu",
      designation: "Associate Professor",
      specialization: "Artificial Intelligence, Deep Learning",
      experienceYears: 11,
      maxWeeklyHours: 18,
      currentWeeklyHours: 15,
      assignedSubjectsCount: 2,
      assignedSectionsCount: 3,
      workloadStatus: "Optimal",
      status: "Active",
      phone: "+91 98220 11238",
      officeRoom: "Academic Block 3, Cabin 307",
      assignedCourses: ["AI401 (Foundations of AI)", "AI402 (Data Mining)"]
    },
    {
      id: "fac_1006",
      facultyId: "FAC-2024-1006",
      name: "Prof. Vikram Singh",
      email: "vikram.singh@university.edu",
      designation: "Assistant Professor",
      specialization: "Theory of Computation, Compiler Design",
      experienceYears: 5,
      maxWeeklyHours: 20,
      currentWeeklyHours: 10,
      assignedSubjectsCount: 1,
      assignedSectionsCount: 2,
      workloadStatus: "Normal",
      status: "Active",
      phone: "+91 98220 11239",
      officeRoom: "Academic Block 3, Cabin 308",
      assignedCourses: ["CS406 (Theory of Computation)"]
    },
    {
      id: "fac_1007",
      facultyId: "FAC-2024-1007",
      name: "Prof. Sneha Joshi",
      email: "sneha.joshi@university.edu",
      designation: "Assistant Professor",
      specialization: "Cloud Computing, DevOps",
      experienceYears: 4,
      maxWeeklyHours: 20,
      currentWeeklyHours: 14,
      assignedSubjectsCount: 2,
      assignedSectionsCount: 2,
      workloadStatus: "Normal",
      status: "Active",
      phone: "+91 98220 11240",
      officeRoom: "Academic Block 3, Cabin 309",
      assignedCourses: ["CS602 (Cloud Computing)", "CS602L (Cloud Lab)"]
    },
    {
      id: "fac_1008",
      facultyId: "FAC-2024-1008",
      name: "Dr. Arvind Rao",
      email: "arvind.rao@university.edu",
      designation: "Professor",
      specialization: "Data Science, Information Retrieval",
      experienceYears: 16,
      maxWeeklyHours: 16,
      currentWeeklyHours: 14,
      assignedSubjectsCount: 2,
      assignedSectionsCount: 2,
      workloadStatus: "Optimal",
      status: "Active",
      phone: "+91 98220 11241",
      officeRoom: "Academic Block 3, Cabin 303",
      assignedCourses: ["CS801 (Distributed Systems)", "CS802 (Big Data Analytics)"]
    }
  ],

  // Faculty Allocations Roster (F31)
  allocations: [
    {
      id: "alloc_01",
      facultyId: "fac_1001",
      facultyName: "Prof. Sunita Mehta",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      program: "B.Tech CSE",
      semester: 4,
      section: "A",
      credits: 4,
      weeklyHours: 4,
      type: "Theory",
      status: "Allocated",
      academicYear: "2025–2026"
    },
    {
      id: "alloc_02",
      facultyId: "fac_1001",
      facultyName: "Prof. Sunita Mehta",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      program: "B.Tech CSE",
      semester: 4,
      section: "B",
      credits: 4,
      weeklyHours: 4,
      type: "Theory",
      status: "Allocated",
      academicYear: "2025–2026"
    },
    {
      id: "alloc_03",
      facultyId: "fac_1001",
      facultyName: "Prof. Sunita Mehta",
      subjectCode: "CS402L",
      subjectName: "DBMS Practical & Lab",
      program: "B.Tech CSE",
      semester: 4,
      section: "A",
      credits: 2,
      weeklyHours: 4,
      type: "Practical",
      status: "Allocated",
      academicYear: "2025–2026"
    },
    {
      id: "alloc_04",
      facultyId: "fac_1002",
      facultyName: "Dr. Rajesh Sharma",
      subjectCode: "CS401",
      subjectName: "Design & Analysis of Algorithms",
      program: "B.Tech CSE",
      semester: 4,
      section: "A",
      credits: 4,
      weeklyHours: 4,
      type: "Theory",
      status: "Allocated",
      academicYear: "2025–2026"
    },
    {
      id: "alloc_05",
      facultyId: "fac_1002",
      facultyName: "Dr. Rajesh Sharma",
      subjectCode: "CS401",
      subjectName: "Design & Analysis of Algorithms",
      program: "B.Tech CSE",
      semester: 4,
      section: "B",
      credits: 4,
      weeklyHours: 4,
      type: "Theory",
      status: "Allocated",
      academicYear: "2025–2026"
    },
    {
      id: "alloc_06",
      facultyId: "fac_1003",
      facultyName: "Prof. Amit Kulkarni",
      subjectCode: "CS403",
      subjectName: "Computer Networks",
      program: "B.Tech CSE",
      semester: 4,
      section: "A",
      credits: 4,
      weeklyHours: 4,
      type: "Theory",
      status: "Allocated",
      academicYear: "2025–2026"
    },
    {
      id: "alloc_07",
      facultyId: "fac_1003",
      facultyName: "Prof. Amit Kulkarni",
      subjectCode: "CS403",
      subjectName: "Computer Networks",
      program: "B.Tech CSE",
      semester: 4,
      section: "B",
      credits: 4,
      weeklyHours: 4,
      type: "Theory",
      status: "Allocated",
      academicYear: "2025–2026"
    },
    {
      id: "alloc_08",
      facultyId: "fac_1003",
      facultyName: "Prof. Amit Kulkarni",
      subjectCode: "CS403L",
      subjectName: "Computer Networks Lab",
      program: "B.Tech CSE",
      semester: 4,
      section: "A",
      credits: 2,
      weeklyHours: 4,
      type: "Practical",
      status: "Allocated",
      academicYear: "2025–2026"
    },
    {
      id: "alloc_09",
      facultyId: "fac_1004",
      facultyName: "Prof. Priya Deshpande",
      subjectCode: "CS405",
      subjectName: "Software Engineering & Agile",
      program: "B.Tech CSE",
      semester: 4,
      section: "A",
      credits: 3,
      weeklyHours: 3,
      type: "Theory",
      status: "Allocated",
      academicYear: "2025–2026"
    },
    {
      id: "alloc_10",
      facultyId: "fac_1004",
      facultyName: "Prof. Priya Deshpande",
      subjectCode: "CS405",
      subjectName: "Software Engineering & Agile",
      program: "B.Tech CSE",
      semester: 4,
      section: "B",
      credits: 3,
      weeklyHours: 3,
      type: "Theory",
      status: "Allocated",
      academicYear: "2025–2026"
    },
    {
      id: "alloc_11",
      facultyId: "fac_1005",
      facultyName: "Dr. Neha Patel",
      subjectCode: "AI401",
      subjectName: "Foundations of Artificial Intelligence",
      program: "B.Tech AI&DS",
      semester: 4,
      section: "A",
      credits: 4,
      weeklyHours: 4,
      type: "Theory",
      status: "Allocated",
      academicYear: "2025–2026"
    },
    {
      id: "alloc_12",
      facultyId: "fac_1006",
      facultyName: "Prof. Vikram Singh",
      subjectCode: "CS406",
      subjectName: "Theory of Computation",
      program: "B.Tech CSE",
      semester: 4,
      section: "A",
      credits: 4,
      weeklyHours: 4,
      type: "Theory",
      status: "Allocated",
      academicYear: "2025–2026"
    },
    {
      id: "alloc_13",
      facultyId: "fac_1007",
      facultyName: "Prof. Sneha Joshi",
      subjectCode: "CS602",
      subjectName: "Cloud Computing Architectures",
      program: "B.Tech CSE",
      semester: 6,
      section: "A",
      credits: 4,
      weeklyHours: 4,
      type: "Theory",
      status: "Allocated",
      academicYear: "2025–2026"
    },
    {
      id: "alloc_14",
      facultyId: "fac_1008",
      facultyName: "Dr. Arvind Rao",
      subjectCode: "CS801",
      subjectName: "Distributed Systems & Edge Computing",
      program: "B.Tech CSE",
      semester: 8,
      section: "A",
      credits: 4,
      weeklyHours: 4,
      type: "Theory",
      status: "Allocated",
      academicYear: "2025–2026"
    }
  ],

  // Department Student Records (F32)
  students: [
    {
      id: "stu_001",
      studentId: "STU-2024-8842",
      rollNo: "CS24-042",
      name: "Riddhi Zunjarrao",
      email: "riddhi.z@university.edu",
      program: "B.Tech CSE",
      semester: 4,
      section: "A",
      attendance: 87.5,
      cgpa: 8.7,
      performanceScore: 88,
      status: "Healthy",
      phone: "+91 98765 43210",
      mentor: "Prof. Sunita Mehta",
      subjectGrades: [
        { code: "CS401", name: "DAA", attendance: 90, marks: 88, grade: "A+" },
        { code: "CS402", name: "DBMS", attendance: 86, marks: 92, grade: "O" },
        { code: "CS403", name: "Computer Networks", attendance: 85, marks: 84, grade: "A" },
        { code: "CS405", name: "Software Eng.", attendance: 89, marks: 86, grade: "A" }
      ],
      recentActivity: "Submitted DBMS Assignment 2 on time • Scored 19/20 in Mid-term quiz"
    },
    {
      id: "stu_002",
      studentId: "STU-2024-8801",
      rollNo: "CS24-001",
      name: "Aarav Sharma",
      email: "aarav.s@university.edu",
      program: "B.Tech CSE",
      semester: 4,
      section: "A",
      attendance: 92.0,
      cgpa: 8.9,
      performanceScore: 91,
      status: "Healthy",
      phone: "+91 98111 00001",
      mentor: "Dr. Rajesh Sharma",
      subjectGrades: [
        { code: "CS401", name: "DAA", attendance: 94, marks: 92, grade: "O" },
        { code: "CS402", name: "DBMS", attendance: 90, marks: 88, grade: "A+" },
        { code: "CS403", name: "Computer Networks", attendance: 92, marks: 90, grade: "A+" }
      ],
      recentActivity: "Presented Research Paper at TechFest • 100% lab attendance"
    },
    {
      id: "stu_003",
      studentId: "STU-2024-8804",
      rollNo: "CS24-004",
      name: "Devansh Patel",
      email: "devansh.p@university.edu",
      program: "B.Tech CSE",
      semester: 4,
      section: "A",
      attendance: 68.5,
      cgpa: 6.2,
      performanceScore: 61,
      status: "Needs Attention",
      phone: "+91 98111 00004",
      mentor: "Prof. Sunita Mehta",
      subjectGrades: [
        { code: "CS401", name: "DAA", attendance: 65, marks: 58, grade: "C" },
        { code: "CS402", name: "DBMS", attendance: 70, marks: 64, grade: "B" },
        { code: "CS403", name: "Computer Networks", attendance: 71, marks: 62, grade: "B" }
      ],
      recentActivity: "Missed 3 consecutive DAA lectures • Parent notification letter sent"
    },
    {
      id: "stu_004",
      studentId: "STU-2024-8809",
      rollNo: "CS24-009",
      name: "Pranav Joshi",
      email: "pranav.j@university.edu",
      program: "B.Tech CSE",
      semester: 4,
      section: "A",
      attendance: 58.0,
      cgpa: 5.4,
      performanceScore: 52,
      status: "At Risk",
      phone: "+91 98111 00009",
      mentor: "Prof. Amit Kulkarni",
      subjectGrades: [
        { code: "CS401", name: "DAA", attendance: 55, marks: 45, grade: "D" },
        { code: "CS402", name: "DBMS", attendance: 60, marks: 51, grade: "C" },
        { code: "CS403", name: "Computer Networks", attendance: 59, marks: 48, grade: "D" }
      ],
      recentActivity: "Attendance below 60% • HOD counseling scheduled for Friday 11 AM"
    },
    {
      id: "stu_005",
      studentId: "STU-2024-8815",
      rollNo: "CS24-015",
      name: "Zoya Khan",
      email: "zoya.k@university.edu",
      program: "B.Tech CSE",
      semester: 4,
      section: "A",
      attendance: 96.0,
      cgpa: 9.4,
      performanceScore: 96,
      status: "Healthy",
      phone: "+91 98111 00015",
      mentor: "Dr. Neha Patel",
      subjectGrades: [
        { code: "CS401", name: "DAA", attendance: 98, marks: 98, grade: "O" },
        { code: "CS402", name: "DBMS", attendance: 95, marks: 95, grade: "O" },
        { code: "CS403", name: "Computer Networks", attendance: 95, marks: 94, grade: "O" }
      ],
      recentActivity: "Department Rank #1 • Mentoring peer study group"
    },
    {
      id: "stu_006",
      studentId: "STU-2024-8851",
      rollNo: "CS24-051",
      name: "Akash Chopra",
      email: "akash.c@university.edu",
      program: "B.Tech CSE",
      semester: 4,
      section: "B",
      attendance: 85.0,
      cgpa: 8.1,
      performanceScore: 82,
      status: "Healthy",
      phone: "+91 98222 00001",
      mentor: "Prof. Priya Deshpande",
      subjectGrades: [
        { code: "CS401", name: "DAA", attendance: 84, marks: 80, grade: "A" },
        { code: "CS402", name: "DBMS", attendance: 86, marks: 83, grade: "A" }
      ],
      recentActivity: "Completed Full-Stack Workshop certification"
    },
    {
      id: "stu_007",
      studentId: "STU-2024-8855",
      rollNo: "CS24-055",
      name: "Gaurav Sen",
      email: "gaurav.s@university.edu",
      program: "B.Tech CSE",
      semester: 4,
      section: "B",
      attendance: 64.0,
      cgpa: 6.5,
      performanceScore: 66,
      status: "Needs Attention",
      phone: "+91 98222 00005",
      mentor: "Prof. Vikram Singh",
      subjectGrades: [
        { code: "CS401", name: "DAA", attendance: 62, marks: 65, grade: "B" },
        { code: "CS402", name: "DBMS", attendance: 66, marks: 68, grade: "B" }
      ],
      recentActivity: "Requested medical leave concession for 4 missing lab sessions"
    },
    {
      id: "stu_008",
      studentId: "STU-2024-8871",
      rollNo: "AI24-002",
      name: "Bhavya Trivedi",
      email: "bhavya.t@university.edu",
      program: "B.Tech AI&DS",
      semester: 4,
      section: "A",
      attendance: 91.0,
      cgpa: 8.8,
      performanceScore: 89,
      status: "Healthy",
      phone: "+91 98333 00002",
      mentor: "Dr. Neha Patel",
      subjectGrades: [
        { code: "AI401", name: "AI Foundations", attendance: 92, marks: 90, grade: "A+" },
        { code: "AI402", name: "Data Mining", attendance: 90, marks: 88, grade: "A+" }
      ],
      recentActivity: "Submitted Kaggle Competition Project"
    },
    {
      id: "stu_009",
      studentId: "STU-2024-8890",
      rollNo: "MT24-005",
      name: "Karan Johar",
      email: "karan.j@university.edu",
      program: "M.Tech CSE",
      semester: 2,
      section: "A",
      attendance: 88.0,
      cgpa: 8.5,
      performanceScore: 86,
      status: "Healthy",
      phone: "+91 98444 00005",
      mentor: "Dr. Anand Deshmukh",
      subjectGrades: [
        { code: "CS801", name: "Adv Distributed Systems", attendance: 90, marks: 87, grade: "A+" }
      ],
      recentActivity: "Submitted Thesis Proposal Milestone 1"
    },
    {
      id: "stu_010",
      studentId: "STU-2024-8814",
      rollNo: "CS24-014",
      name: "Utkarsh Rao",
      email: "utkarsh.r@university.edu",
      program: "B.Tech CSE",
      semester: 4,
      section: "A",
      attendance: 72.0,
      cgpa: 6.8,
      performanceScore: 69,
      status: "Needs Attention",
      phone: "+91 98111 00014",
      mentor: "Prof. Sunita Mehta",
      subjectGrades: [
        { code: "CS401", name: "DAA", attendance: 74, marks: 70, grade: "B+" },
        { code: "CS402", name: "DBMS", attendance: 70, marks: 68, grade: "B" }
      ],
      recentActivity: "Attendance near 75% boundary • Advised regular presence"
    }
  ],

  // Department Weekly Timetable (F34)
  timetable: [
    // Monday
    { id: "tt_01", day: "Monday", timeSlot: "09:00 - 10:00 AM", subjectCode: "CS401", subjectName: "Design & Analysis of Algorithms", faculty: "Dr. Rajesh Sharma", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 301", type: "Lecture" },
    { id: "tt_02", day: "Monday", timeSlot: "10:00 - 11:00 AM", subjectCode: "CS403", subjectName: "Computer Networks", faculty: "Prof. Amit Kulkarni", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 301", type: "Lecture" },
    { id: "tt_03", day: "Monday", timeSlot: "11:00 - 12:00 PM", subjectCode: "CS402", subjectName: "Database Management Systems", faculty: "Prof. Sunita Mehta", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 302 (Smart)", type: "Lecture" },
    { id: "tt_04", day: "Monday", timeSlot: "02:00 - 04:00 PM", subjectCode: "CS402L", subjectName: "DBMS Practical Lab", faculty: "Prof. Sunita Mehta", program: "B.Tech CSE", semester: 4, section: "A", room: "Lab 3 (Ground Floor)", type: "Lab" },
    
    // Tuesday
    { id: "tt_05", day: "Tuesday", timeSlot: "09:00 - 10:00 AM", subjectCode: "CS404", subjectName: "Operating Systems", faculty: "Prof. Sunita Mehta", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 301", type: "Lecture" },
    { id: "tt_06", day: "Tuesday", timeSlot: "10:00 - 11:00 AM", subjectCode: "CS406", subjectName: "Theory of Computation", faculty: "Prof. Vikram Singh", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 301", type: "Lecture" },
    { id: "tt_07", day: "Tuesday", timeSlot: "11:00 - 12:00 PM", subjectCode: "CS401", subjectName: "Design & Analysis of Algorithms", faculty: "Dr. Rajesh Sharma", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 301", type: "Lecture" },
    { id: "tt_08", day: "Tuesday", timeSlot: "02:00 - 04:00 PM", subjectCode: "CS403L", subjectName: "Networks Practical Lab", faculty: "Prof. Amit Kulkarni", program: "B.Tech CSE", semester: 4, section: "A", room: "Lab 2 (First Floor)", type: "Lab" },

    // Wednesday
    { id: "tt_09", day: "Wednesday", timeSlot: "09:00 - 10:00 AM", subjectCode: "CS405", subjectName: "Software Engineering", faculty: "Prof. Priya Deshpande", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 301", type: "Lecture" },
    { id: "tt_10", day: "Wednesday", timeSlot: "10:00 - 11:00 AM", subjectCode: "CS403", subjectName: "Computer Networks", faculty: "Prof. Amit Kulkarni", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 301", type: "Lecture" },
    { id: "tt_11", day: "Wednesday", timeSlot: "11:00 - 12:00 PM", subjectCode: "CS402", subjectName: "Database Management Systems", faculty: "Prof. Sunita Mehta", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 302 (Smart)", type: "Lecture" },
    { id: "tt_12", day: "Wednesday", timeSlot: "02:00 - 03:00 PM", subjectCode: "CS406", subjectName: "Theory of Computation Tutorial", faculty: "Prof. Vikram Singh", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 301", type: "Tutorial" },

    // Thursday
    { id: "tt_13", day: "Thursday", timeSlot: "09:00 - 10:00 AM", subjectCode: "CS401", subjectName: "Design & Analysis of Algorithms", faculty: "Dr. Rajesh Sharma", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 301", type: "Lecture" },
    { id: "tt_14", day: "Thursday", timeSlot: "10:00 - 11:00 AM", subjectCode: "CS404", subjectName: "Operating Systems", faculty: "Prof. Sunita Mehta", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 301", type: "Lecture" },
    { id: "tt_15", day: "Thursday", timeSlot: "11:00 - 12:00 PM", subjectCode: "CS405", subjectName: "Software Engineering", faculty: "Prof. Priya Deshpande", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 301", type: "Lecture" },
    { id: "tt_16", day: "Thursday", timeSlot: "02:00 - 04:00 PM", subjectCode: "CS405L", subjectName: "Software Engineering Lab", faculty: "Prof. Priya Deshpande", program: "B.Tech CSE", semester: 4, section: "A", room: "Lab 1 (Ground Floor)", type: "Lab" },

    // Friday
    { id: "tt_17", day: "Friday", timeSlot: "09:00 - 10:00 AM", subjectCode: "CS403", subjectName: "Computer Networks", faculty: "Prof. Amit Kulkarni", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 301", type: "Lecture" },
    { id: "tt_18", day: "Friday", timeSlot: "10:00 - 11:00 AM", subjectCode: "CS402", subjectName: "Database Management Systems", faculty: "Prof. Sunita Mehta", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 302 (Smart)", type: "Lecture" },
    { id: "tt_19", day: "Friday", timeSlot: "11:00 - 12:00 PM", subjectCode: "CS406", subjectName: "Theory of Computation", faculty: "Prof. Vikram Singh", program: "B.Tech CSE", semester: 4, section: "A", room: "Room 301", type: "Lecture" },
    { id: "tt_20", day: "Friday", timeSlot: "02:00 - 04:00 PM", subjectCode: "CS408", subjectName: "Departmental Project Seminar", faculty: "Dr. Anand Deshmukh", program: "B.Tech CSE", semester: 4, section: "A", room: "Seminar Hall CSE", type: "Seminar" }
  ],

  // Academic Approvals (F35)
  approvals: [
    {
      id: "app_101",
      title: "Faculty Medical Leave Request (3 Days)",
      requestedBy: "Prof. Amit Kulkarni",
      role: "Assistant Professor",
      type: "Faculty Leave",
      date: "14 Sep 2026",
      status: "Pending",
      department: "Department of Computer Engineering",
      program: "B.Tech Computer Science & Engineering",
      semester: 4,
      section: "Section A & B",
      subject: "Computer Networks (CS403)",
      details: "Request for medical leave for 3 working days from 21 Sep 2026 to 23 Sep 2026 due to scheduled minor outpatient medical procedure. Alternate lecture arrangement has been coordinated with Prof. Vikram Singh to handle the CS403 lecture on Tuesday 10:00 AM, and lab batches for CS403L on Wednesday have been rescheduled with Teaching Assistant supervision. All course notes and assignment rubrics have been uploaded to the portal.",
      academicContext: "Computer Networks (CS403) • Sem 4 Sec A & B",
      urgency: "Normal"
    },
    {
      id: "app_102",
      title: "DBMS Lab Syllabus Revision & PostgreSQL 16 Tooling",
      requestedBy: "Prof. Sunita Mehta",
      role: "Associate Professor",
      type: "Curriculum Revision",
      date: "12 Sep 2026",
      status: "Pending",
      department: "Department of Computer Engineering",
      program: "B.Tech Computer Science & Engineering",
      semester: 4,
      section: "Section A & B",
      subject: "DBMS Practical & Lab (CS402L)",
      details: "Proposed update to Unit 4 & Unit 5 practical curriculum experiments: Replace legacy MySQL storage engine syntax with PostgreSQL 16 JSONB indexing, EXPLAIN ANALYZE query plan benchmarks, and connection pooling paradigms. This revision directly aligns student laboratory skills with modern enterprise cloud database requirements and industry placement expectations. Lab manuals and dockerized setup scripts are already prepared.",
      academicContext: "DBMS Lab (CS402L) • Sem 4 Sec A & B",
      urgency: "High"
    },
    {
      id: "app_103",
      title: "Industrial Visit to Tech Cloud Data Center (Pune)",
      requestedBy: "Prof. Sneha Joshi",
      role: "Assistant Professor",
      type: "Industrial Field Visit",
      date: "10 Sep 2026",
      status: "Pending",
      department: "Department of Computer Engineering",
      program: "B.Tech Computer Science & Engineering",
      semester: 6,
      section: "Section A",
      subject: "Cloud Computing (CS602)",
      details: "One-day educational field visit proposed for 60 students of Semester 6 B.Tech CSE to AWS Partner Tier-4 Data Center facility in Hinjewadi, Pune on Thursday, 08 Oct 2026. The visit includes guided architectural walk-throughs of enterprise server racks, cooling infrastructure, redundant power systems, and edge networking setups. Two faculty escorts (Prof. Sneha Joshi & Prof. Amit Kulkarni) and institutional bus transportation have been arranged.",
      academicContext: "Cloud Computing (CS602) • Sem 6 Sec A",
      urgency: "Normal"
    },
    {
      id: "app_104",
      title: "Makeup Mid-Term Exam for Pranav Joshi (Medical Case)",
      requestedBy: "Dr. Rajesh Sharma",
      role: "Professor & Course Coordinator",
      type: "Student Exam Request",
      date: "08 Sep 2026",
      status: "Pending",
      department: "Department of Computer Engineering",
      program: "B.Tech Computer Science & Engineering",
      semester: 4,
      section: "Section A",
      subject: "Design & Analysis of Algorithms (CS401)",
      details: "Student Pranav Joshi (Roll No: CS24-009, Student ID: STU-2024-8809) was hospitalized due to acute viral infection during the scheduled DAA mid-term evaluation on 02 Sep 2026. Verified medical certificates and hospital discharge documents have been submitted and validated by the university health center. Recommended for approval to appear for a re-scheduled makeup mid-term examination paper on 25 Sep 2026 in Room 301.",
      academicContext: "Design & Analysis of Algorithms (CS401) • Sem 4 Sec A",
      urgency: "High"
    },
    {
      id: "app_105",
      title: "High-Performance GPU Server Allocation for AI Lab",
      requestedBy: "Dr. Neha Patel",
      role: "Associate Professor",
      type: "Lab Equipment Requisition",
      date: "05 Sep 2026",
      status: "Pending",
      department: "Department of Computer Engineering",
      program: "B.Tech Artificial Intelligence & Data Science",
      semester: 4,
      section: "Section A",
      subject: "Foundations of AI (AI401)",
      details: "Requisition for provisioning 2x NVIDIA RTX 4090 GPU compute nodes in AI Research Lab (Room 306) dedicated to Semester 4 B.Tech AI&DS students for training Deep Learning and Computer Vision transformer models. The server will be managed under private department LAN subnet with JupyterHub multi-user access quotas configured. Budget allocation sanctioned under SCIT Annual Lab Modernization Fund.",
      academicContext: "Artificial Intelligence & Data Science Lab • Academic Block 3",
      urgency: "Normal"
    },
    {
      id: "app_106",
      title: "Guest Lecture Series on Cloud Native Microservices",
      requestedBy: "Prof. Sneha Joshi",
      role: "Assistant Professor",
      type: "Guest Lecture",
      date: "28 Aug 2026",
      status: "Approved",
      department: "Department of Computer Engineering",
      program: "B.Tech Computer Science & Engineering",
      semester: 6,
      section: "Section A & B",
      subject: "Cloud Computing Architectures (CS602)",
      details: "Proposal to invite Mr. Siddharth K., Principal Architect at Red Hat for a 2-hour interactive technical workshop on Kubernetes cluster orchestration, Service Meshes (Istio), and GitOps CI/CD delivery pipelines on 15 Sep 2026. Virtual seminar hall meeting link will be coordinated.",
      academicContext: "Cloud Computing (CS602) • Sem 6",
      urgency: "Normal",
      reviewedAt: "30 Aug 2026",
      reviewNotes: "Approved. Ensure all Semester 6 students attend and record the session for departmental repository."
    },
    {
      id: "app_107",
      title: "Re-evaluation Request for End-Sem Paper CS401",
      requestedBy: "Devansh Patel",
      role: "Student (CS24-004)",
      type: "Paper Re-evaluation",
      date: "22 Aug 2026",
      status: "Rejected",
      department: "Department of Computer Engineering",
      program: "B.Tech Computer Science & Engineering",
      semester: 4,
      section: "Section A",
      subject: "DAA (CS401)",
      details: "Student requested re-evaluation for Question 4 (Dynamic Programming memoization complexity analysis) in Mid-Term exam paper.",
      academicContext: "DAA (CS401) • Sem 4 Sec A",
      urgency: "Low",
      reviewedAt: "24 Aug 2026",
      reviewNotes: "Re-checked with course coordinator Dr. Rajesh Sharma. Evaluation rubric was followed precisely and marks awarded (6/10) were mathematically correct. No change in total marks."
    }
  ],

  // Department Reports Metrics (F36)
  reports: {
    academic: {
      performanceDistribution: [
        { grade: "O (Outstanding 90%+)", count: 42, percentage: 16.9 },
        { grade: "A+ (Excellent 80-89%)", count: 88, percentage: 35.5 },
        { grade: "A (Very Good 70-79%)", count: 74, percentage: 29.8 },
        { grade: "B (Good 60-69%)", count: 32, percentage: 12.9 },
        { grade: "Needs Attention (<60%)", count: 12, percentage: 4.8 }
      ],
      attendanceBrackets: [
        { bracket: ">= 85% (Optimal)", count: 164, percentage: 66.1 },
        { bracket: "75% - 84% (Satisfactory)", count: 58, percentage: 23.4 },
        { bracket: "65% - 74% (Warning Zone)", count: 18, percentage: 7.3 },
        { bracket: "< 65% (Critical Action)", count: 8, percentage: 3.2 }
      ],
      topPerformingSubjects: [
        { code: "CS402", name: "DBMS", avgScore: 86.4, passRate: 98.2, faculty: "Prof. Sunita Mehta" },
        { code: "AI401", name: "AI Foundations", avgScore: 85.1, passRate: 97.5, faculty: "Dr. Neha Patel" },
        { code: "CS401", name: "DAA", avgScore: 81.6, passRate: 94.0, faculty: "Dr. Rajesh Sharma" },
        { code: "CS403", name: "Computer Networks", avgScore: 78.5, passRate: 91.8, faculty: "Prof. Amit Kulkarni" }
      ]
    },
    faculty: {
      workloadSummary: {
        totalWeeklyTeachingHours: 198,
        avgHoursPerFaculty: 15.2,
        overloadedCount: 1,
        optimalCount: 13,
        underutilizedCount: 4
      },
      distribution: [
        { faculty: "Prof. Amit Kulkarni", hours: 22, max: 20, status: "Overloaded" },
        { faculty: "Dr. Rajesh Sharma", hours: 16, max: 16, status: "Optimal" },
        { faculty: "Dr. Neha Patel", hours: 15, max: 18, status: "Optimal" },
        { faculty: "Prof. Sunita Mehta", hours: 14, max: 18, status: "Optimal" },
        { faculty: "Dr. Arvind Rao", hours: 14, max: 16, status: "Optimal" },
        { faculty: "Prof. Sneha Joshi", hours: 14, max: 20, status: "Normal" },
        { faculty: "Prof. Priya Deshpande", hours: 12, max: 20, status: "Normal" },
        { faculty: "Prof. Vikram Singh", hours: 10, max: 20, status: "Normal" }
      ]
    },
    operational: {
      labUtilizationRate: "88.4%",
      smartClassroomHours: "34 hrs / week",
      totalApprovalsProcessedThisTerm: 28,
      avgApprovalTurnaroundHours: 18.5
    }
  },

  // HOD Settings
  settings: {
    notifications: {
      emailAlerts: true,
      criticalAttendanceThreshold: 75,
      workloadAlertThreshold: 20,
      approvalPushAlerts: true,
      weeklyReportDigest: true
    },
    academicPreferences: {
      defaultGradingScale: "10-Point Relative Scale",
      minMandatoryAttendance: 75,
      labBatchSize: 25,
      academicCalendarYear: "2025–2026"
    }
  }
};

if (typeof window !== 'undefined') {
  window.mockHOD = mockHOD;
}

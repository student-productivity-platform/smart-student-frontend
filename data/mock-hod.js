/**
 * ==========================================================================
 * SMART STUDENT — Centralized Mock Data: HOD Portal (F30–F36)
 * Role: Head of Department (HOD) — Dr. Anand Deshmukh
 * Department: Department of Computer Engineering
 * Scope: Strictly Departmental (CSE Programs: B.Tech CSE, M.Tech CSE, B.Tech AI&DS)
 * ==========================================================================
 */

const mockHODBase = {
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
        { code: "CS401", name: "DAA", credits: 4, attendance: 94, marks: 92, grade: "O" },
        { code: "CS402", name: "DBMS", credits: 4, attendance: 90, marks: 88, grade: "A+" },
        { code: "CS403", name: "Computer Networks", credits: 4, attendance: 92, marks: 90, grade: "A+" }
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
        { code: "CS401", name: "DAA", credits: 4, attendance: 65, marks: 58, grade: "C" },
        { code: "CS402", name: "DBMS", credits: 4, attendance: 70, marks: 64, grade: "B" },
        { code: "CS403", name: "Computer Networks", credits: 4, attendance: 71, marks: 62, grade: "B" }
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
        { code: "CS401", name: "DAA", credits: 4, attendance: 55, marks: 45, grade: "D" },
        { code: "CS402", name: "DBMS", credits: 4, attendance: 60, marks: 51, grade: "C" },
        { code: "CS403", name: "Computer Networks", credits: 4, attendance: 59, marks: 48, grade: "D" }
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
        { code: "CS401", name: "DAA", credits: 4, attendance: 98, marks: 98, grade: "O" },
        { code: "CS402", name: "DBMS", credits: 4, attendance: 95, marks: 95, grade: "O" },
        { code: "CS403", name: "Computer Networks", credits: 4, attendance: 95, marks: 94, grade: "O" }
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
        { code: "CS401", name: "DAA", credits: 4, attendance: 84, marks: 80, grade: "A" },
        { code: "CS402", name: "DBMS", credits: 4, attendance: 86, marks: 83, grade: "A" }
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
        { code: "CS401", name: "DAA", credits: 4, attendance: 62, marks: 65, grade: "B" },
        { code: "CS402", name: "DBMS", credits: 4, attendance: 66, marks: 68, grade: "B" }
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
        { code: "AI401", name: "AI Foundations", credits: 4, attendance: 92, marks: 90, grade: "A+" },
        { code: "AI402", name: "Data Mining", credits: 4, attendance: 90, marks: 88, grade: "A+" }
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
      semester: 4,
      section: "A",
      attendance: 88.0,
      cgpa: 8.5,
      performanceScore: 86,
      status: "Healthy",
      phone: "+91 98444 00005",
      mentor: "Dr. Anand Deshmukh",
      subjectGrades: [
        { code: "CS801", name: "Adv Distributed Systems", credits: 4, attendance: 90, marks: 87, grade: "A+" }
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
        { code: "CS401", name: "DAA", credits: 4, attendance: 74, marks: 70, grade: "B+" },
        { code: "CS402", name: "DBMS", credits: 4, attendance: 70, marks: 68, grade: "B" }
      ],
      recentActivity: "Attendance near 75% boundary • Advised regular presence"
    },
    {
      id: "stu_011",
      studentId: "STU-2023-7721",
      rollNo: "CS23-021",
      name: "Ananya Iyer",
      email: "ananya.i@university.edu",
      program: "B.Tech CSE",
      semester: 6,
      section: "A",
      attendance: 94.5,
      cgpa: 9.1,
      performanceScore: 93,
      status: "Healthy",
      phone: "+91 98555 11021",
      mentor: "Prof. Sneha Joshi",
      subjectGrades: [
        { code: "CS601", name: "Machine Learning", credits: 4, attendance: 95, marks: 92, grade: "O" },
        { code: "CS602", name: "Cloud Computing", credits: 4, attendance: 94, marks: 90, grade: "A+" }
      ],
      recentActivity: "Won 1st Prize in Smart India Hackathon internal round"
    },
    {
      id: "stu_012",
      studentId: "STU-2023-7734",
      rollNo: "CS23-034",
      name: "Rohan Varma",
      email: "rohan.v@university.edu",
      program: "B.Tech CSE",
      semester: 6,
      section: "B",
      attendance: 54.0,
      cgpa: 5.1,
      performanceScore: 49,
      status: "At Risk",
      phone: "+91 98555 11034",
      mentor: "Dr. Rajesh Sharma",
      subjectGrades: [
        { code: "CS601", name: "Machine Learning", credits: 4, attendance: 52, marks: 42, grade: "D" },
        { code: "CS602", name: "Cloud Computing", credits: 4, attendance: 56, marks: 46, grade: "D" }
      ],
      recentActivity: "Chronic absence in 8:30 AM lectures • 2nd warning letter issued"
    },
    {
      id: "stu_013",
      studentId: "STU-2022-6612",
      rollNo: "CS22-012",
      name: "Meera Nair",
      email: "meera.n@university.edu",
      program: "B.Tech CSE",
      semester: 8,
      section: "A",
      attendance: 90.0,
      cgpa: 8.6,
      performanceScore: 87,
      status: "Healthy",
      phone: "+91 98666 22012",
      mentor: "Dr. Arvind Rao",
      subjectGrades: [
        { code: "CS801", name: "Distributed Systems", credits: 4, attendance: 90, marks: 86, grade: "A" },
        { code: "CS802", name: "Capstone Project", credits: 6, attendance: 92, marks: 90, grade: "A+" }
      ],
      recentActivity: "Capstone project demo completed with Distinction"
    },
    {
      id: "stu_014",
      studentId: "STU-2024-8860",
      rollNo: "AI24-015",
      name: "Siddharth Menon",
      email: "siddharth.m@university.edu",
      program: "B.Tech AI&DS",
      semester: 6,
      section: "A",
      attendance: 76.5,
      cgpa: 7.4,
      performanceScore: 75,
      status: "Healthy",
      phone: "+91 98777 33015",
      mentor: "Dr. Neha Patel",
      subjectGrades: [
        { code: "AI601", name: "Deep Learning", credits: 4, attendance: 78, marks: 76, grade: "B+" },
        { code: "AI602", name: "Natural Language Processing", credits: 4, attendance: 75, marks: 74, grade: "B+" }
      ],
      recentActivity: "Attending lab revision sessions regularly"
    },
    {
      id: "stu_015",
      studentId: "STU-2024-8888",
      rollNo: "CS24-088",
      name: "Pooja Hegde",
      email: "pooja.h@university.edu",
      program: "B.Tech CSE",
      semester: 4,
      section: "B",
      attendance: 82.0,
      cgpa: 7.9,
      performanceScore: 80,
      status: "Healthy",
      phone: "+91 98888 44088",
      mentor: "Prof. Priya Deshpande",
      subjectGrades: [
        { code: "CS401", name: "DAA", credits: 4, attendance: 80, marks: 78, grade: "B+" },
        { code: "CS402", name: "DBMS", credits: 4, attendance: 84, marks: 82, grade: "A" }
      ],
      recentActivity: "Active participant in code sprint hackathon"
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

// ── MULTI-DOMAIN HOD CATALOG ──
const allDomainHOD = {
  dept_btech: mockHODBase,

  dept_bba: {
    profile: {
      id: "usr_hod_bba_1",
      uid: "usr_hod_bba_1",
      name: "Dr. Meera Sen",
      email: "meera.sen@university.edu",
      role: "hod",
      designation: "Professor & Head of Department",
      department: "Department of Business Administration",
      departmentCode: "BBA",
      departmentId: "dept_bba",
      domainId: "domain_mgmt",
      school: "School of Management & Business Studies",
      institution: "Smart Institute of Technology",
      joiningYear: "2016",
      qualification: "Ph.D. in Corporate Governance (IIM Bangalore), M.Com, LL.B.",
      specialization: "Corporate Governance, Commercial Law, Organizational Ethics & Policy",
      officeRoom: "Management Block B, Cabin 201",
      phone: "+91 98230 77889",
      officeHours: "Mon – Fri: 11:00 AM – 01:00 PM & 03:00 PM – 04:30 PM",
      avatar: "../images/student-study.jpg",
      status: "active"
    },
    department: {
      name: "Department of Business Administration",
      code: "BBA",
      establishedYear: 2010,
      currentAcademicYear: "2025–2026",
      currentSemesterTerm: "Even Semester (Spring 2026)",
      programs: [
        { id: "bba_gen", name: "Bachelor of Business Administration (BBA)", code: "BBA-GEN", duration: "3 Years", totalStudents: 180, activeSemesters: [2, 4, 6] }
      ],
      semesters: [2, 4, 6],
      sections: ["A", "B"],
      kpis: {
        totalStudents: 180,
        totalFaculty: 12,
        activeSubjects: 10,
        pendingApprovals: 4,
        avgAttendance: 86.2,
        avgPerformanceScore: 83.5,
        labUtilization: "82%",
        classesCompletedPct: 78.0
      }
    },
    facultyList: [
      {
        id: "fac_bba_001",
        facultyId: "FAC-2024-3001",
        name: "Prof. Priya Nair",
        email: "bba.faculty@university.edu",
        designation: "Associate Professor",
        specialization: "Corporate Valuation & Financial Accounting",
        experienceYears: 10,
        maxWeeklyHours: 18,
        currentWeeklyHours: 14,
        assignedSubjectsCount: 3,
        assignedSectionsCount: 3,
        workloadStatus: "Optimal",
        status: "Active",
        phone: "+91 98220 44556",
        officeRoom: "Management Block B, Cabin 208",
        assignedCourses: ["BBA204 (Corporate Finance)", "BBA206 (Spreadsheet Analytics)"]
      },
      {
        id: "fac_bba_002",
        facultyId: "FAC-2024-3002",
        name: "Prof. Vikram Saxena",
        email: "vikram.saxena@university.edu",
        designation: "Associate Professor",
        specialization: "Consumer Behavior & Marketing Strategy",
        experienceYears: 12,
        maxWeeklyHours: 18,
        currentWeeklyHours: 16,
        assignedSubjectsCount: 2,
        assignedSectionsCount: 3,
        workloadStatus: "Optimal",
        status: "Active",
        phone: "+91 98220 44557",
        officeRoom: "Management Block B, Cabin 204",
        assignedCourses: ["BBA201 (Marketing Strategy)", "BBA401 (Brand Management)"]
      },
      {
        id: "fac_bba_003",
        facultyId: "FAC-2024-3003",
        name: "Dr. Ananya Mukherjee",
        email: "ananya.m@university.edu",
        designation: "Assistant Professor",
        specialization: "Human Resource Management & Organizational Behavior",
        experienceYears: 7,
        maxWeeklyHours: 20,
        currentWeeklyHours: 14,
        assignedSubjectsCount: 2,
        assignedSectionsCount: 2,
        workloadStatus: "Normal",
        status: "Active",
        phone: "+91 98220 44558",
        officeRoom: "Management Block B, Cabin 205",
        assignedCourses: ["BBA202 (Organizational Behavior)"]
      },
      {
        id: "fac_bba_004",
        facultyId: "FAC-2024-3004",
        name: "Prof. Siddharth Joshi",
        email: "siddharth.j@university.edu",
        designation: "Assistant Professor",
        specialization: "Managerial Economics & Econometrics",
        experienceYears: 6,
        maxWeeklyHours: 20,
        currentWeeklyHours: 15,
        assignedSubjectsCount: 2,
        assignedSectionsCount: 2,
        workloadStatus: "Optimal",
        status: "Active",
        phone: "+91 98220 44559",
        officeRoom: "Management Block B, Cabin 206",
        assignedCourses: ["BBA203 (Managerial Economics)"]
      }
    ],
    allocations: [
      { id: "alloc_bba_01", facultyName: "Prof. Priya Nair", facultyEmail: "bba.faculty@university.edu", subjectCode: "BBA204", subjectName: "Corporate Financial Accounting", program: "BBA-GEN", semester: 4, section: "A", weeklyHours: 4, status: "Active" },
      { id: "alloc_bba_02", facultyName: "Prof. Priya Nair", facultyEmail: "bba.faculty@university.edu", subjectCode: "BBA204", subjectName: "Corporate Financial Accounting", program: "BBA-GEN", semester: 4, section: "B", weeklyHours: 4, status: "Active" },
      { id: "alloc_bba_03", facultyName: "Prof. Vikram Saxena", facultyEmail: "vikram.saxena@university.edu", subjectCode: "BBA201", subjectName: "Principles of Marketing Strategy", program: "BBA-GEN", semester: 4, section: "A", weeklyHours: 3, status: "Active" },
      { id: "alloc_bba_04", facultyName: "Prof. Siddharth Joshi", facultyEmail: "siddharth.j@university.edu", subjectCode: "BBA203", subjectName: "Managerial Economics", program: "BBA-GEN", semester: 4, section: "A", weeklyHours: 4, status: "Active" }
    ],
    students: [
      { id: "stu_bba_001", studentId: "STU-2024-7120", rollNo: "BBA24-018", name: "Tanvi Bansal", email: "bba.student@university.edu", program: "BBA-GEN", semester: 4, section: "A", cgpa: 8.9, attendancePct: 96, status: "Healthy" },
      { id: "stu_bba_002", studentId: "STU-2024-7101", rollNo: "BBA24-001", name: "Aarav Mehra", email: "aarav.m@university.edu", program: "BBA-GEN", semester: 4, section: "A", cgpa: 8.4, attendancePct: 92, status: "Healthy" },
      { id: "stu_bba_003", studentId: "STU-2024-7102", rollNo: "BBA24-002", name: "Ananya Saxena", email: "ananya.s@university.edu", program: "BBA-GEN", semester: 4, section: "A", cgpa: 8.6, attendancePct: 90, status: "Healthy" },
      { id: "stu_bba_004", studentId: "STU-2024-7119", rollNo: "BBA24-019", name: "Rohan Kapoor", email: "rohan.k@university.edu", program: "BBA-GEN", semester: 4, section: "A", cgpa: 8.2, attendancePct: 84, status: "Healthy" },
      { id: "stu_bba_005", studentId: "STU-2024-7121", rollNo: "BBA24-021", name: "Yash Singhania", email: "yash.s@university.edu", program: "BBA-GEN", semester: 4, section: "A", cgpa: 7.1, attendancePct: 72, status: "Critical" }
    ],
    timetable: [
      { id: "tt_bba_01", day: "Monday", timeSlot: "09:30 AM - 10:30 AM", subjectCode: "BBA204", subjectName: "Corporate Financial Accounting", facultyName: "Prof. Priya Nair", classroom: "Management Hall 101", section: "A" },
      { id: "tt_bba_02", day: "Monday", timeSlot: "11:30 AM - 12:30 PM", subjectCode: "BBA201", subjectName: "Principles of Marketing Strategy", facultyName: "Prof. Vikram Saxena", classroom: "Room 205", section: "A" },
      { id: "tt_bba_03", day: "Tuesday", timeSlot: "01:30 PM - 02:30 PM", subjectCode: "BBA203", subjectName: "Managerial Economics", facultyName: "Prof. Siddharth Joshi", classroom: "Room 208", section: "A" },
      { id: "tt_bba_04", day: "Thursday", timeSlot: "03:00 PM - 04:30 PM", subjectCode: "BBA206", subjectName: "Business Analytics Lab", facultyName: "Prof. Priya Nair", classroom: "Analytics Lab 2", section: "A" }
    ],
    approvals: [
      { id: "app_bba_01", type: "Curriculum Modification", title: "Incorporate Tableau & Power BI into BBA206 Syllabus", submittedBy: "Prof. Priya Nair", date: "2026-09-22", status: "Pending", priority: "High", description: "Modernize BBA spreadsheet course with practical business intelligence tooling." },
      { id: "app_bba_02", type: "Guest Lecture", title: "Deloitte Advisory: Corporate Valuation Multiple Workshop", submittedBy: "Prof. Priya Nair", date: "2026-09-20", status: "Approved", priority: "Medium", description: "Invite Deloitte partner to address Sem 4 BBA students." },
      { id: "app_bba_03", type: "Attendance Exemption", title: "Medical Leave Waiver (Student: Yash Singhania)", submittedBy: "Academic Advisor", date: "2026-09-21", status: "Pending", priority: "Normal", description: "Hospitalization exemption request for 4 sessions." },
      { id: "app_bba_04", type: "Budget Allocation", title: "Digital Marketing Case Studies Subscription Licensing", submittedBy: "Prof. Vikram Saxena", date: "2026-09-18", status: "Pending", priority: "High", description: "HBR / Ivey publishing case package for marketing students." }
    ],
    reports: {
      attendanceTrends: { currentTermAvg: 86.2, previousTermAvg: 84.8, compliantPercentage: 91.5 },
      academicPerformance: { topGpa: 9.8, avgGpa: 8.35, passPercentage: 95.8 },
      faculty: {
        workloadSummary: { totalWeeklyTeachingHours: 142, avgHoursPerFaculty: 14.5, overloadedCount: 0, optimalCount: 10, underutilizedCount: 2 }
      },
      operational: { labUtilizationRate: "82.0%", smartClassroomHours: "28 hrs / week", totalApprovalsProcessedThisTerm: 18, avgApprovalTurnaroundHours: 14.2 }
    },
    settings: mockHODBase.settings
  },

  dept_mba: {
    profile: {
      id: "usr_hod_mba_1",
      uid: "usr_hod_mba_1",
      name: "Dr. Rajesh Patil",
      email: "rajesh.patil@university.edu",
      role: "hod",
      designation: "Professor & Head of School",
      department: "School of Management & Business Studies",
      departmentCode: "MBA",
      departmentId: "dept_mba",
      domainId: "domain_mgmt",
      school: "School of Management & Business Studies",
      institution: "Smart Institute of Technology",
      joiningYear: "2014",
      qualification: "Ph.D. in Strategic Capital Markets (London Business School), MBA (Finance)",
      specialization: "Strategic Governance, Global Corporate Strategy, Private Equity & Capital Markets",
      officeRoom: "Executive Block C, Cabin 105",
      phone: "+91 98230 99112",
      officeHours: "Mon – Fri: 10:00 AM – 12:30 PM & 03:30 PM – 05:00 PM",
      avatar: "../images/student-study.jpg",
      status: "active"
    },
    department: {
      name: "School of Management & Business Studies",
      code: "MBA",
      establishedYear: 2008,
      currentAcademicYear: "2025–2026",
      currentSemesterTerm: "Even Semester (Spring 2026)",
      programs: [
        { id: "mba_exec", name: "Master of Business Administration (Executive)", code: "MBA-EXEC", duration: "2 Years", totalStudents: 260, activeSemesters: [2, 4] }
      ],
      semesters: [2, 4],
      sections: ["A", "B"],
      kpis: {
        totalStudents: 260,
        totalFaculty: 20,
        activeSubjects: 24,
        pendingApprovals: 6,
        avgAttendance: 91.0,
        avgPerformanceScore: 88.4,
        labUtilization: "92%",
        classesCompletedPct: 81.2
      }
    },
    facultyList: [
      {
        id: "fac_mba_001",
        facultyId: "FAC-2024-4001",
        name: "Prof. Arunav Roy",
        email: "mba.faculty@university.edu",
        designation: "Professor of Practice",
        specialization: "Mergers & Acquisitions, Investment Banking & Private Equity",
        experienceYears: 18,
        maxWeeklyHours: 16,
        currentWeeklyHours: 14,
        assignedSubjectsCount: 2,
        assignedSectionsCount: 2,
        workloadStatus: "Optimal",
        status: "Active",
        phone: "+91 98220 77665",
        officeRoom: "Executive Block C, Cabin 110",
        assignedCourses: ["MBA602 (M&A Valuation)", "MBA603 (Investment Banking)"]
      },
      {
        id: "fac_mba_002",
        facultyId: "FAC-2024-4002",
        name: "Dr. Nandini Sen",
        email: "nandini.sen@university.edu",
        designation: "Professor",
        specialization: "Strategic Global Leadership & Enterprise Turnaround",
        experienceYears: 20,
        maxWeeklyHours: 16,
        currentWeeklyHours: 14,
        assignedSubjectsCount: 2,
        assignedSectionsCount: 2,
        workloadStatus: "Optimal",
        status: "Active",
        phone: "+91 98220 77666",
        officeRoom: "Executive Block C, Cabin 112",
        assignedCourses: ["MBA601 (Strategic Leadership)"]
      },
      {
        id: "fac_mba_003",
        facultyId: "FAC-2024-4003",
        name: "Prof. K. V. Raman",
        email: "kv.raman@university.edu",
        designation: "Associate Professor",
        specialization: "Global Supply Chain & Operations Strategy",
        experienceYears: 14,
        maxWeeklyHours: 18,
        currentWeeklyHours: 15,
        assignedSubjectsCount: 2,
        assignedSectionsCount: 2,
        workloadStatus: "Optimal",
        status: "Active",
        phone: "+91 98220 77667",
        officeRoom: "Executive Block C, Cabin 114",
        assignedCourses: ["MBA604 (Global Supply Chain)"]
      },
      {
        id: "fac_mba_004",
        facultyId: "FAC-2024-4004",
        name: "Prof. Sameer Deshpande",
        email: "sameer.d@university.edu",
        designation: "Associate Professor",
        specialization: "FinTech Architecture, CBDC & Digital Disruption",
        experienceYears: 12,
        maxWeeklyHours: 18,
        currentWeeklyHours: 12,
        assignedSubjectsCount: 2,
        assignedSectionsCount: 2,
        workloadStatus: "Normal",
        status: "Active",
        phone: "+91 98220 77668",
        officeRoom: "Executive Block C, Cabin 116",
        assignedCourses: ["MBA605 (FinTech Architecture)"]
      }
    ],
    allocations: [
      { id: "alloc_mba_01", facultyName: "Dr. Nandini Sen", facultyEmail: "nandini.sen@university.edu", subjectCode: "MBA601", subjectName: "Strategic Global Leadership", program: "MBA-EXEC", semester: 4, section: "A", weeklyHours: 4, status: "Active" },
      { id: "alloc_mba_02", facultyName: "Prof. Arunav Roy", facultyEmail: "mba.faculty@university.edu", subjectCode: "MBA602", subjectName: "Mergers & Acquisitions", program: "MBA-EXEC", semester: 4, section: "A", weeklyHours: 4, status: "Active" },
      { id: "alloc_mba_03", facultyName: "Dr. Rajesh Patil", facultyEmail: "rajesh.patil@university.edu", subjectCode: "MBA603", subjectName: "Investment Banking & PE", program: "MBA-EXEC", semester: 4, section: "A", weeklyHours: 4, status: "Active" },
      { id: "alloc_mba_04", facultyName: "Prof. K. V. Raman", facultyEmail: "kv.raman@university.edu", subjectCode: "MBA604", subjectName: "Global Supply Chain", program: "MBA-EXEC", semester: 4, section: "A", weeklyHours: 3, status: "Active" }
    ],
    students: [
      { id: "stu_mba_001", studentId: "STU-2024-6502", rollNo: "MBA24-007", name: "Aditya Sengupta", email: "mba.student@university.edu", program: "MBA-EXEC", semester: 4, section: "A", cgpa: 9.1, attendancePct: 96, status: "Healthy" },
      { id: "stu_mba_002", studentId: "STU-2024-6501", rollNo: "MBA24-001", name: "Anandita Ghosh", email: "anandita.g@university.edu", program: "MBA-EXEC", semester: 4, section: "A", cgpa: 9.3, attendancePct: 95, status: "Healthy" },
      { id: "stu_mba_003", studentId: "STU-2024-6515", rollNo: "MBA24-015", name: "Natasha Roy", email: "natasha.r@university.edu", program: "MBA-EXEC", semester: 4, section: "A", cgpa: 8.8, attendancePct: 92, status: "Healthy" },
      { id: "stu_mba_004", studentId: "STU-2024-6523", rollNo: "MBA24-023", name: "Siddharth Menon", email: "siddharth.m@university.edu", program: "MBA-EXEC", semester: 4, section: "A", cgpa: 8.7, attendancePct: 90, status: "Healthy" },
      { id: "stu_mba_005", studentId: "STU-2024-6541", rollNo: "MBA24-041", name: "Divya Khurana", email: "divya.k@university.edu", program: "MBA-EXEC", semester: 4, section: "A", cgpa: 8.9, attendancePct: 88, status: "Healthy" }
    ],
    timetable: [
      { id: "tt_mba_01", day: "Monday", timeSlot: "10:00 AM - 11:30 AM", subjectCode: "MBA601", subjectName: "Strategic Global Leadership", facultyName: "Dr. Nandini Sen", classroom: "Executive Seminar Room A", section: "A" },
      { id: "tt_mba_02", day: "Tuesday", timeSlot: "12:00 PM - 01:30 PM", subjectCode: "MBA602", subjectName: "Mergers & Acquisitions", facultyName: "Prof. Arunav Roy", classroom: "Room 401", section: "A" },
      { id: "tt_mba_03", day: "Wednesday", timeSlot: "02:30 PM - 04:00 PM", subjectCode: "MBA603", subjectName: "Investment Banking & Private Equity", facultyName: "Dr. Rajesh Patil", classroom: "Executive Lab", section: "A" },
      { id: "tt_mba_04", day: "Friday", timeSlot: "04:30 PM - 05:30 PM", subjectCode: "MBA605", subjectName: "FinTech Architecture", facultyName: "Prof. Sameer Deshpande", classroom: "Virtual Boardroom", section: "A" }
    ],
    approvals: [
      { id: "app_mba_01", type: "Budget Allocation", title: "Bloomberg Professional Terminal Annual Renewal (12 Seats)", submittedBy: "Prof. Arunav Roy", date: "2026-09-23", status: "Pending", priority: "High", description: "Renewal for live market data feed for executive finance lab." },
      { id: "app_mba_02", type: "Practicum Immersion", title: "Wharton Global Consulting Practicum Selection & Travel Grant", submittedBy: "Dr. Nandini Sen", date: "2026-09-21", status: "Approved", priority: "High", description: "Endorsement for top 5 candidates to participate in Philadelphia consulting module." },
      { id: "app_mba_03", type: "Case Licensing", title: "Harvard Business Publishing Enterprise Case Bundle (Fall 2026)", submittedBy: "Dr. Nandini Sen", date: "2026-09-19", status: "Pending", priority: "Medium", description: "Licensing for 6 HBR cases across Strategy and Leadership courses." },
      { id: "app_mba_04", type: "Guest Speaker", title: "Ex-Managing Director Morgan Stanley: Sovereign Wealth Funds", submittedBy: "Prof. Arunav Roy", date: "2026-09-17", status: "Approved", priority: "Medium", description: "Executive masterclass on GCC sovereign investments." }
    ],
    reports: {
      attendanceTrends: { currentTermAvg: 91.0, previousTermAvg: 89.5, compliantPercentage: 96.2 },
      academicPerformance: { topGpa: 9.9, avgGpa: 8.84, passPercentage: 98.4 },
      faculty: {
        workloadSummary: { totalWeeklyTeachingHours: 186, avgHoursPerFaculty: 15.5, overloadedCount: 0, optimalCount: 16, underutilizedCount: 4 }
      },
      operational: { labUtilizationRate: "92.0%", smartClassroomHours: "42 hrs / week", totalApprovalsProcessedThisTerm: 34, avgApprovalTurnaroundHours: 11.8 }
    },
    settings: mockHODBase.settings
  }
};

function getActiveHODDomainKey() {
  if (typeof DomainService !== 'undefined') {
    return DomainService.getActiveDomain();
  }
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('smart_student_active_domain');
    if (saved && allDomainHOD[saved]) return saved;
    try {
      const raw = sessionStorage.getItem('smart_student_session') || localStorage.getItem('smart_student_session');
      if (raw) {
        const u = JSON.parse(raw);
        const d = (u.departmentId || u.department || u.program || u.email || '').toLowerCase();
        if (d.includes('bba')) return 'dept_bba';
        if (d.includes('mba')) return 'dept_mba';
      }
    } catch (_) {}
  }
  return 'dept_btech';
}

function getHODForDomain(domainId) {
  const d = domainId || getActiveHODDomainKey();
  return allDomainHOD[d] || allDomainHOD.dept_btech;
}

const mockHOD = new Proxy({}, {
  get(target, prop) {
    const h = getHODForDomain();
    if (prop === 'all') return allDomainHOD;
    if (prop === 'forDomain') return (id) => getHODForDomain(id);
    return h[prop];
  },
  set(target, prop, value) {
    const h = getHODForDomain();
    h[prop] = value;
    return true;
  },
  has(target, prop) {
    const h = getHODForDomain();
    return prop in h;
  },
  ownKeys() {
    const h = getHODForDomain();
    return Reflect.ownKeys(h);
  },
  getOwnPropertyDescriptor(target, prop) {
    const h = getHODForDomain();
    return Reflect.getOwnPropertyDescriptor(h, prop);
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockHOD, allDomainHOD, getHODForDomain };
} else {
  window.mockHOD = mockHOD;
  window.allDomainHOD = allDomainHOD;
  window.getHODForDomain = getHODForDomain;
}

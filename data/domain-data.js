/**
 * ==============================================================================
 * SMART STUDENT PRODUCTIVITY PLATFORM — CENTRALIZED DOMAIN REGISTRY
 * 
 * Defines comprehensive academic domain models, curricula, faculty rosters,
 * student rosters, study cohorts, assignments, materials, exams, timetables,
 * and HOD departmental governance for:
 * 
 * 1. dept_btech — School of Engineering & Technology (B.Tech Computer Science)
 * 2. dept_bba   — Department of Business Administration (BBA Finance & Analytics)
 * 3. dept_mba   — School of Management & Business Studies (MBA Executive Leadership)
 * ==============================================================================
 */

const DOMAINS_CATALOG = {
  // ────────────────────────────────────────────────────────────────────────────
  // 1. B.TECH — COMPUTER SCIENCE & ENGINEERING (ENGINEERING DOMAIN)
  // ────────────────────────────────────────────────────────────────────────────
  dept_btech: {
    id: "dept_btech",
    code: "B.Tech",
    name: "Department of Computer Engineering",
    school: "School of Engineering & Technology",
    domainId: "domain_eng",
    domainName: "Engineering & Technology",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    badge: "B.Tech CSE",
    icon: "💻",
    accentColor: "#4F46E5", // Indigo
    themeGradient: "linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)",
    durationYears: 4,
    totalSemesters: 8,
    activeSemester: 4,
    academicYear: "2025–2026",

    // Default Personas
    student: {
      id: "usr_stu_8842",
      uid: "usr_stu_8842",
      studentId: "STU-2024-8842",
      name: "Riddhi Zunjarrao",
      email: "student@university.edu",
      role: "student",
      program: "B.Tech Computer Science & Engineering",
      programCode: "B.Tech CSE",
      department: "Department of Computer Engineering",
      departmentCode: "B.Tech",
      departmentId: "dept_btech",
      domainId: "domain_eng",
      school: "School of Engineering & Technology",
      semester: 4,
      section: "A",
      rollNo: "CS24-042",
      mentor: "Prof. Sunita Mehta",
      cgpa: 8.7,
      sgpa: 9.20,
      phone: "+91 98765 43210",
      status: "active"
    },

    faculty: {
      id: "usr_fac_1001",
      uid: "usr_fac_1001",
      facultyId: "FAC-2024-1001",
      name: "Prof. Sunita Mehta",
      email: "faculty@university.edu",
      role: "faculty",
      designation: "Associate Professor",
      department: "Department of Computer Engineering",
      departmentCode: "B.Tech",
      departmentId: "dept_btech",
      domainId: "domain_eng",
      school: "School of Engineering & Technology",
      officeRoom: "Academic Block 3, Cabin 304",
      phone: "+91 98220 11234",
      specialization: "Database Systems & Distributed Cloud Architectures",
      officeHours: "Mon, Wed, Fri: 03:00 PM – 05:00 PM",
      status: "active"
    },

    hod: {
      id: "usr_hod_2001",
      uid: "usr_hod_2001",
      name: "Dr. Anand Deshmukh",
      email: "hod@university.edu",
      secondaryEmail: "hod@gmail.com",
      role: "hod",
      designation: "Professor & Head of Department",
      department: "Department of Computer Engineering",
      departmentCode: "B.Tech",
      departmentId: "dept_btech",
      domainId: "domain_eng",
      school: "School of Engineering & Technology",
      officeRoom: "Admin Block A, HOD Suite 101",
      phone: "+91 98230 45678",
      specialization: "Cloud Computing, Parallel Distributed Architectures",
      status: "active"
    },

    // Enrolled Courses / Curriculum
    courses: [
      {
        id: "crs_cs401",
        code: "CS401",
        name: "Data Structures & Algorithms",
        faculty: "Prof. Rajesh Sharma",
        department: "B.Tech",
        credits: 4,
        semester: 4,
        attendance: 92,
        progress: 78,
        domainCategory: "Core Algorithms",
        nextClass: "Tomorrow • 09:00 AM",
        nextRoom: "Room 204",
        upcomingAssignment: "Balanced Trees & Dynamic Programming",
        officeHours: "Mon & Wed 03:00 PM – 04:30 PM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "Linear Structures & Complexity Analysis", status: "Completed" },
          { unit: "Unit 2", title: "Trees, AVL & Red-Black Trees", status: "Completed" },
          { unit: "Unit 3", title: "Graph Algorithms & Shortest Path", status: "In Progress" },
          { unit: "Unit 4", title: "Dynamic Programming & Greedy Strategies", status: "Upcoming" }
        ]
      },
      {
        id: "crs_cs402",
        code: "CS402",
        name: "Database Management Systems",
        faculty: "Prof. Sunita Mehta",
        department: "B.Tech",
        credits: 4,
        semester: 4,
        attendance: 84,
        progress: 72,
        domainCategory: "Database Systems",
        nextClass: "Today • 11:00 AM",
        nextRoom: "Room 302",
        upcomingAssignment: "Normalization & 3NF Schema Decomposition",
        officeHours: "Tue & Thu 02:00 PM – 03:30 PM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "Relational Models & Relational Algebra", status: "Completed" },
          { unit: "Unit 2", title: "SQL & Query Execution Plans", status: "Completed" },
          { unit: "Unit 3", title: "Functional Dependencies & Normal Forms", status: "In Progress" },
          { unit: "Unit 4", title: "Transaction ACID Properties & NoSQL", status: "Upcoming" }
        ]
      },
      {
        id: "crs_cs403",
        code: "CS403",
        name: "Machine Learning Fundamentals",
        faculty: "Prof. Arvind Patil",
        department: "B.Tech",
        credits: 3,
        semester: 4,
        attendance: 89,
        progress: 65,
        domainCategory: "AI & ML",
        nextClass: "Today • 02:00 PM",
        nextRoom: "Online (Google Meet)",
        upcomingAssignment: "Logistic Regression & Gradient Descent",
        officeHours: "Wed & Fri 11:00 AM – 12:30 PM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "Supervised Learning & Loss Surfaces", status: "Completed" },
          { unit: "Unit 2", title: "Linear & Logistic Regression Models", status: "Completed" },
          { unit: "Unit 3", title: "Neural Networks & Backpropagation", status: "In Progress" },
          { unit: "Unit 4", title: "Unsupervised Clustering & PCA", status: "Upcoming" }
        ]
      },
      {
        id: "crs_cs404",
        code: "CS404",
        name: "Operating Systems",
        faculty: "Prof. Sunita Mehta",
        department: "B.Tech",
        credits: 4,
        semester: 4,
        attendance: 83,
        progress: 68,
        domainCategory: "Systems & Kernel",
        nextClass: "Wednesday • 10:00 AM",
        nextRoom: "Room 204",
        upcomingAssignment: "Process Synchronization with Semaphores",
        officeHours: "Mon & Thu 04:00 PM – 05:00 PM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "OS Architecture & System Call Interface", status: "Completed" },
          { unit: "Unit 2", title: "Process Scheduling & Inter-Process Comm", status: "Completed" },
          { unit: "Unit 3", title: "Deadlock Invariants & POSIX Semaphores", status: "In Progress" },
          { unit: "Unit 4", title: "Virtual Memory, Paging & TLB Caches", status: "Upcoming" }
        ]
      },
      {
        id: "crs_cs405",
        code: "CS405",
        name: "Computer Networks",
        faculty: "Dr. Vikram Joshi",
        department: "B.Tech",
        credits: 3,
        semester: 4,
        attendance: 86,
        progress: 58,
        domainCategory: "Networks & Security",
        nextClass: "Monday • 10:00 AM",
        nextRoom: "Room 105",
        upcomingAssignment: "IPv4 Subnetting & CIDR Calculation",
        officeHours: "Tue & Fri 03:00 PM – 04:00 PM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "OSI & TCP/IP Layered Architectures", status: "Completed" },
          { unit: "Unit 2", title: "Data Link Layer & MAC Protocols", status: "Completed" },
          { unit: "Unit 3", title: "Network Layer Routing & CIDR Addressing", status: "In Progress" },
          { unit: "Unit 4", title: "Transport Layer Handshake & Congestion", status: "Upcoming" }
        ]
      }
    ],

    // Peer Study Cohorts (Max 5 Students Capacity Invariant)
    studyGroups: [
      {
        id: "grp_btech_001",
        name: "Machine Learning — Exam Prep & Derivations",
        subject: "Machine Learning",
        subjectCode: "CS403",
        currentMembers: 4,
        maxMembers: 5,
        isFull: false,
        domainId: "dept_btech",
        topic: "Gradient descent, backpropagation derivation & loss surfaces",
        creator: "Aditya S. (CS4-012)",
        meetLink: "https://meet.google.com/ml-exam-prep",
        members: ["AS", "RZ", "NK", "PD"],
        agenda: "1. Gradient Descent mathematical proof\n2. Cross-Entropy Loss derivation\n3. Mid-Term 2025 PYQ discussion"
      },
      {
        id: "grp_btech_002",
        name: "DBMS Revision & SQL Query Optimization",
        subject: "Database Management Systems",
        subjectCode: "CS402",
        currentMembers: 3,
        maxMembers: 5,
        isFull: false,
        domainId: "dept_btech",
        topic: "BCNF decomposition, indexing strategies & query plans",
        creator: "Neha P. (CS4-028)",
        meetLink: "https://meet.google.com/dbms-rev-room",
        members: ["NP", "RZ", "VK"],
        agenda: "1. 3NF vs BCNF dependency preservation\n2. B+ Tree indexing walkthrough\n3. Lab practical query questions"
      },
      {
        id: "grp_btech_003",
        name: "OS Synchronization & Semaphore Implementation",
        subject: "Operating Systems",
        subjectCode: "CS404",
        currentMembers: 5,
        maxMembers: 5,
        isFull: true,
        domainId: "dept_btech",
        topic: "POSIX Mutex lock, Semaphores & Dining Philosophers problem",
        creator: "Karan V. (CS4-045)",
        meetLink: "https://meet.google.com/os-sync-room",
        members: ["KV", "AR", "SM", "TN", "KL"],
        agenda: "1. Deadlock 4 Coffman conditions\n2. Banker's Algorithm safety check\n3. C implementation of producer-consumer"
      },
      {
        id: "grp_btech_004",
        name: "DSA Problem Solving Squad (LeetCode Daily)",
        subject: "Data Structures & Algorithms",
        subjectCode: "CS401",
        currentMembers: 2,
        maxMembers: 5,
        isFull: false,
        domainId: "dept_btech",
        topic: "Dynamic programming patterns & Graph algorithms (Dijkstra, Prim)",
        creator: "Rohan D. (CS4-061)",
        meetLink: "https://meet.google.com/dsa-squad-live",
        members: ["RD", "RZ"],
        agenda: "1. DP on Trees & Subsets\n2. Shortest path min-heap implementation\n3. Mock technical interview practice"
      },
      {
        id: "grp_btech_005",
        name: "Computer Networks — Packet Tracer & Subnetting",
        subject: "Computer Networks",
        subjectCode: "CS405",
        currentMembers: 4,
        maxMembers: 5,
        isFull: false,
        domainId: "dept_btech",
        topic: "VLSM CIDR calculation, TCP 3-way handshake & Socket Programming",
        creator: "Ananya M. (CS4-008)",
        meetLink: "https://meet.google.com/cn-subnet-prep",
        members: ["AM", "RZ", "PK", "SS"],
        agenda: "1. Classless Inter-Domain Routing practice\n2. WireShark packet capture analysis\n3. Socket programming in Python"
      }
    ],

    // Assignments
    assignments: [
      {
        id: "asg_btech_001",
        title: "Normalization & Relational Schema Design",
        subject: "Database Management Systems",
        subjectCode: "CS402",
        faculty: "Prof. Sunita Mehta",
        dueDate: "Sep 28, 2026",
        dueTime: "11:59 PM",
        status: "pending",
        maxMarks: 20,
        submissionType: "PDF Document Upload",
        domainId: "dept_btech",
        description: "Convert the given unnormalized student enrollment data into 3NF and BCNF. Provide detailed functional dependency diagrams and justification."
      },
      {
        id: "asg_btech_002",
        title: "Linear & Logistic Regression Analysis",
        subject: "Machine Learning",
        subjectCode: "CS403",
        faculty: "Prof. Arvind Patil",
        dueDate: "Sep 30, 2026",
        dueTime: "05:00 PM",
        status: "submitted",
        maxMarks: 25,
        submissionType: "Jupyter Notebook (.ipynb)",
        domainId: "dept_btech",
        description: "Implement cost function and gradient descent for housing price prediction. Compare convergence rates across learning rates."
      },
      {
        id: "asg_btech_003",
        title: "Process Synchronization with Semaphores",
        subject: "Operating Systems",
        subjectCode: "CS404",
        faculty: "Prof. Sunita Mehta",
        dueDate: "Oct 04, 2026",
        dueTime: "11:59 PM",
        status: "pending",
        maxMarks: 15,
        submissionType: "C Source File (.c)",
        domainId: "dept_btech",
        description: "Solve the Dining Philosophers Problem avoiding deadlock using mutex locks and POSIX semaphores."
      },
      {
        id: "asg_btech_004",
        title: "IPv4 Subnetting & CIDR Calculation",
        subject: "Computer Networks",
        subjectCode: "CS405",
        faculty: "Dr. Vikram Joshi",
        dueDate: "Sep 20, 2026",
        dueTime: "11:59 PM",
        status: "graded",
        score: 14,
        maxMarks: 15,
        grade: "A+",
        domainId: "dept_btech",
        feedback: "Exceptional subnetting table. Minor deduction for missing broadcast calculation in Subnet 4."
      }
    ],

    // Attendance Breakdown
    attendance: {
      overallPercentage: 87,
      totalClassesHeld: 185,
      totalAttended: 161,
      thresholdRequired: 75,
      status: "Compliant (+12% above mandatory 75% threshold)",
      subjects: [
        { subjectCode: "CS401", subjectName: "Data Structures & Algorithms", faculty: "Prof. Rajesh Sharma", attended: 35, total: 38, percentage: 92, status: "safe", safeMargin: "Can miss up to 8 sessions safely" },
        { subjectCode: "CS402", subjectName: "Database Management Systems", faculty: "Prof. Sunita Mehta", attended: 31, total: 37, percentage: 84, status: "safe", safeMargin: "Can miss up to 4 sessions safely" },
        { subjectCode: "CS403", subjectName: "Machine Learning", faculty: "Prof. Arvind Patil", attended: 32, total: 36, percentage: 89, status: "safe", safeMargin: "Can miss up to 5 sessions safely" },
        { subjectCode: "CS404", subjectName: "Operating Systems", faculty: "Prof. Sunita Mehta", attended: 31, total: 37, percentage: 83, status: "safe", safeMargin: "Can miss up to 3 sessions safely" },
        { subjectCode: "CS405", subjectName: "Computer Networks", faculty: "Dr. Vikram Joshi", attended: 32, total: 37, percentage: 86, status: "safe", safeMargin: "Can miss up to 4 sessions safely" }
      ]
    },

    // Daily Timetable
    schedule: [
      { id: "cls_bt_1", time: "09:00 AM", endTime: "10:00 AM", subject: "Data Structures & Algorithms", subjectCode: "CS401", faculty: "Prof. Rajesh Sharma", room: "Room 204", isOnline: false, isActive: false },
      { id: "cls_bt_2", time: "11:00 AM", endTime: "12:00 PM", subject: "Database Management Systems", subjectCode: "CS402", faculty: "Prof. Sunita Mehta", room: "Room 302", isOnline: false, isActive: true },
      { id: "cls_bt_3", time: "02:00 PM", endTime: "03:00 PM", subject: "Machine Learning Fundamentals", subjectCode: "CS403", faculty: "Prof. Arvind Patil", room: "Online Lecture", isOnline: true, meetingUrl: "https://meet.google.com/abc-defg-hij", isActive: false },
      { id: "cls_bt_4", time: "03:30 PM", endTime: "05:00 PM", subject: "Operating Systems Lab", subjectCode: "CS404L", faculty: "Prof. Sunita Mehta", room: "Computer Lab 3", isOnline: false, isActive: false }
    ],

    // Analytics Cylinders & Progress Distribution
    analytics: {
      cylinders: [
        { label: "DSA", pct: 92, class: "fill-red", color: "#EF4444" },
        { label: "DBMS", pct: 84, class: "fill-purple", color: "#8B5CF6" },
        { label: "ML", pct: 89, class: "fill-violet", color: "#A855F7" },
        { label: "OS", pct: 83, class: "fill-indigo", color: "#6366F1" },
        { label: "CN", pct: 86, class: "fill-emerald", color: "#10B981" }
      ],
      progressionTitle: "Computer Science Progression",
      progressionSummary: "78 / 160 Credits (48.8%)",
      donutSegments: [
        { label: "Core CS", credits: "40 Cr", color: "#8B5CF6", dash: "115 238", offset: "0" },
        { label: "AI & ML", credits: "18 Cr", color: "#A855F7", dash: "55 238", offset: "-115" },
        { label: "Systems", credits: "12 Cr", color: "#C084FC", dash: "36 238", offset: "-170" },
        { label: "Labs", credits: "8 Cr", color: "#DDD6FE", dash: "24 238", offset: "-206" }
      ]
    },

    // Materials
    materials: [
      { id: "mat_bt_1", title: "DBMS Unit 3: Normalization & Functional Dependencies", subject: "Database Management Systems", subjectCode: "CS402", category: "Notes", faculty: "Prof. Sunita Mehta", uploadedAt: "Sep 02, 2026", fileType: "pdf", fileSize: "3.4 MB", pages: 42, fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf" },
      { id: "mat_bt_2", title: "Machine Learning: Linear & Logistic Regression Deck", subject: "Machine Learning", subjectCode: "CS403", category: "Presentations", faculty: "Prof. Arvind Patil", uploadedAt: "Aug 29, 2026", fileType: "ppt", fileSize: "5.1 MB", slides: 58, fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pptx" },
      { id: "mat_bt_3", title: "Operating Systems: Process Synchronization & Mutexes", subject: "Operating Systems", subjectCode: "CS404", category: "Notes", faculty: "Prof. Sunita Mehta", uploadedAt: "Aug 25, 2026", fileType: "pdf", fileSize: "4.2 MB", pages: 36, fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf" },
      { id: "mat_bt_4", title: "DSA: Balanced Search Trees (AVL & Red-Black) Cheatsheet", subject: "Data Structures & Algorithms", subjectCode: "CS401", category: "Reference Material", faculty: "Prof. Rajesh Sharma", uploadedAt: "Aug 20, 2026", fileType: "pdf", fileSize: "1.8 MB", pages: 14, fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf" }
    ],

    // Scheduled Exams
    exams: [
      { id: "exm_bt_1", subject: "Machine Learning", subjectCode: "CS403", title: "Mid-Term Examination", type: "Mid-Term", date: "September 28, 2026", day: "28", month: "SEP", time: "10:00 AM – 12:00 PM", duration: "2 Hours", venue: "Exam Hall A (Block 2)", seatNumber: "Row 4 • Desk 18", hallTicketNo: "HT-2026-CS4-042", totalMarks: 50, passingMarks: 20 },
      { id: "exm_bt_2", subject: "Database Management Systems", subjectCode: "CS402", title: "Internal Assessment 1", type: "Internal Assessment", date: "October 02, 2026", day: "02", month: "OCT", time: "02:00 PM – 03:30 PM", duration: "1.5 Hours", venue: "Room 302 (Block 1)", seatNumber: "Desk 24", hallTicketNo: "HT-2026-CS4-042", totalMarks: 30, passingMarks: 12 }
    ],

    // AI Doubts Topic Seeds
    doubtTopics: [
      { id: "dbt_bt_1", question: "Explain database normalization (1NF, 2NF, 3NF) with a student table example.", subject: "Database Management Systems", answer: "Normalization decomposes tables to eliminate redundancy and update/delete anomalies without losing information." },
      { id: "dbt_bt_2", question: "What is the difference between TCP and UDP protocols?", subject: "Computer Networks", answer: "TCP provides connection-oriented reliable byte-stream transfer with error checking; UDP is connectionless and low-latency." }
    ],

    // HOD Portal Stats & Department Overview
    departmentKPIs: {
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

  // ────────────────────────────────────────────────────────────────────────────
  // 2. BBA — BUSINESS ADMINISTRATION & FINANCE (MANAGEMENT UNDERGRADUATE)
  // ────────────────────────────────────────────────────────────────────────────
  dept_bba: {
    id: "dept_bba",
    code: "BBA",
    name: "Department of Business Administration",
    school: "School of Management & Business Studies",
    domainId: "domain_mgmt",
    domainName: "Management & Business Studies",
    degree: "Bachelor of Business Administration (BBA Financial Management & Analytics)",
    badge: "BBA Fin & Analytics",
    icon: "📊",
    accentColor: "#059669", // Emerald
    themeGradient: "linear-gradient(135deg, #059669 0%, #0D9488 100%)",
    durationYears: 3,
    totalSemesters: 6,
    activeSemester: 4,
    academicYear: "2025–2026",

    // Default Personas
    student: {
      id: "usr_stu_bba_1",
      uid: "usr_stu_bba_1",
      studentId: "STU-2024-7120",
      name: "Tanvi Bansal",
      email: "bba.student@university.edu",
      role: "student",
      program: "BBA Financial Management & Analytics",
      programCode: "BBA-FIN",
      department: "Department of Business Administration",
      departmentCode: "BBA",
      departmentId: "dept_bba",
      domainId: "domain_mgmt",
      school: "School of Management & Business Studies",
      semester: 4,
      section: "A",
      rollNo: "BBA24-018",
      mentor: "Prof. Priya Nair",
      cgpa: 8.9,
      sgpa: 9.35,
      phone: "+91 98231 66778",
      status: "active"
    },

    faculty: {
      id: "usr_fac_bba_1",
      uid: "usr_fac_bba_1",
      facultyId: "FAC-2024-3001",
      name: "Prof. Priya Nair",
      email: "bba.faculty@university.edu",
      role: "faculty",
      designation: "Associate Professor",
      department: "Department of Business Administration",
      departmentCode: "BBA",
      departmentId: "dept_bba",
      domainId: "domain_mgmt",
      school: "School of Management & Business Studies",
      officeRoom: "Management Block B, Cabin 208",
      phone: "+91 98220 44556",
      specialization: "Corporate Financial Accounting & Working Capital Valuation",
      officeHours: "Mon, Wed, Thu: 02:00 PM – 04:00 PM",
      status: "active"
    },

    hod: {
      id: "usr_hod_bba_1",
      uid: "usr_hod_bba_1",
      name: "Dr. Meera Sen",
      email: "meera.sen@university.edu",
      secondaryEmail: "meera.sen@university.edu",
      role: "hod",
      designation: "Professor & Head of Department",
      department: "Department of Business Administration",
      departmentCode: "BBA",
      departmentId: "dept_bba",
      domainId: "domain_mgmt",
      school: "School of Management & Business Studies",
      officeRoom: "Management Block B, Cabin 201",
      phone: "+91 98230 77889",
      specialization: "Corporate Governance, Commercial Law & Organizational Policy",
      status: "active"
    },

    // Enrolled Courses / Curriculum
    courses: [
      {
        id: "crs_bba204",
        code: "BBA204",
        name: "Corporate Financial Accounting",
        faculty: "Prof. Priya Nair",
        department: "BBA",
        credits: 4,
        semester: 4,
        attendance: 88,
        progress: 74,
        domainCategory: "Corporate Finance",
        nextClass: "Today • 09:30 AM",
        nextRoom: "Management Hall 101",
        upcomingAssignment: "Cash Flow Forecasting & Working Capital Models",
        officeHours: "Mon & Wed 02:00 PM – 03:30 PM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "Balance Sheet Architectures & GAAP/IFRS", status: "Completed" },
          { unit: "Unit 2", title: "Cash Flow Statement Derivations & EBITDA", status: "Completed" },
          { unit: "Unit 3", title: "Working Capital Optimization & WACC", status: "In Progress" },
          { unit: "Unit 4", title: "Capital Budgeting (NPV, IRR & Payback)", status: "Upcoming" }
        ]
      },
      {
        id: "crs_bba201",
        code: "BBA201",
        name: "Principles of Marketing Strategy",
        faculty: "Prof. Vikram Saxena",
        department: "BBA",
        credits: 3,
        semester: 4,
        attendance: 89,
        progress: 70,
        domainCategory: "Marketing & Strategy",
        nextClass: "Today • 11:30 AM",
        nextRoom: "Room 205",
        upcomingAssignment: "Brand Positioning & Omnichannel Pitch Deck",
        officeHours: "Tue & Thu 10:00 AM – 11:30 AM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "Market Segmentation, Targeting & Positioning (STP)", status: "Completed" },
          { unit: "Unit 2", title: "Product Life Cycle & Pricing Dynamics", status: "Completed" },
          { unit: "Unit 3", title: "Digital Ad Funnels, CAC & Customer LTV", status: "In Progress" },
          { unit: "Unit 4", title: "Global Brand Equity & Consumer Behavior", status: "Upcoming" }
        ]
      },
      {
        id: "crs_bba203",
        code: "BBA203",
        name: "Managerial Economics & Market Structures",
        faculty: "Prof. Siddharth Joshi",
        department: "BBA",
        credits: 4,
        semester: 4,
        attendance: 85,
        progress: 68,
        domainCategory: "Economics",
        nextClass: "Tomorrow • 01:30 PM",
        nextRoom: "Room 208",
        upcomingAssignment: "Oligopoly Price Rigidity & Kinked Demand Curve",
        officeHours: "Wed & Fri 03:00 PM – 04:30 PM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "Elasticity of Demand & Marginal Revenue", status: "Completed" },
          { unit: "Unit 2", title: "Production Functions & Isoquants", status: "Completed" },
          { unit: "Unit 3", title: "Monopoly vs Oligopoly Market Structures", status: "In Progress" },
          { unit: "Unit 4", title: "Game Theory & Nash Equilibrium Basics", status: "Upcoming" }
        ]
      },
      {
        id: "crs_bba205",
        code: "BBA205",
        name: "Business Law & Corporate Ethics",
        faculty: "Dr. Meera Sen",
        department: "BBA",
        credits: 3,
        semester: 4,
        attendance: 90,
        progress: 76,
        domainCategory: "Business Law",
        nextClass: "Wednesday • 10:30 AM",
        nextRoom: "Auditorium 2",
        upcomingAssignment: "Legal Assessment of Breach of Contract Clauses",
        officeHours: "Mon & Fri 11:00 AM – 12:30 PM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "The Indian Contract Act 1872 Essentials", status: "Completed" },
          { unit: "Unit 2", title: "Sale of Goods Act & Consumer Protection", status: "Completed" },
          { unit: "Unit 3", title: "Companies Act 2013 & Directors' Fiduciary Duties", status: "In Progress" },
          { unit: "Unit 4", title: "Corporate Governance & ESG Compliance", status: "Upcoming" }
        ]
      },
      {
        id: "crs_bba206",
        code: "BBA206",
        name: "Business Analytics & Spreadsheet Modeling",
        faculty: "Prof. Rohan Malhotra",
        department: "BBA",
        credits: 3,
        semester: 4,
        attendance: 87,
        progress: 62,
        domainCategory: "Analytics",
        nextClass: "Thursday • 03:00 PM",
        nextRoom: "Analytics Lab 2",
        upcomingAssignment: "Financial DCF Model & Sensitivity Matrix in Excel",
        officeHours: "Tue & Thu 04:00 PM – 05:00 PM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "Advanced Financial Formulas & XLOOKUP", status: "Completed" },
          { unit: "Unit 2", title: "Pivot Tables, Data Tables & Scenario Manager", status: "Completed" },
          { unit: "Unit 3", title: "Regression Modeling for Sales Forecasting", status: "In Progress" },
          { unit: "Unit 4", title: "Tableau Executive Business Dashboards", status: "Upcoming" }
        ]
      }
    ],

    // Peer Study Cohorts
    studyGroups: [
      {
        id: "grp_bba_001",
        name: "Corporate Valuation & Financial Modeling Squad",
        subject: "Corporate Financial Accounting",
        subjectCode: "BBA204",
        currentMembers: 4,
        maxMembers: 5,
        isFull: false,
        domainId: "dept_bba",
        topic: "DCF modeling, Weighted Average Cost of Capital (WACC) & Unlevered Beta",
        creator: "Tanvi B. (BBA24-018)",
        meetLink: "https://meet.google.com/bba-val-room",
        members: ["TB", "RK", "SK", "YS"],
        agenda: "1. Free Cash Flow to Firm (FCFF) calculation\n2. Cost of Equity CAPM calculation\n3. Terminal Value exit multiple walkthrough"
      },
      {
        id: "grp_bba_002",
        name: "Digital Marketing Strategy & Brand Funnels",
        subject: "Principles of Marketing Strategy",
        subjectCode: "BBA201",
        currentMembers: 3,
        maxMembers: 5,
        isFull: false,
        domainId: "dept_bba",
        topic: "Customer Acquisition Cost (CAC), Lifetime Value (LTV) & Omnichannel Positioning",
        creator: "Aman G. (BBA24-034)",
        meetLink: "https://meet.google.com/bba-mkt-squad",
        members: ["AG", "TB", "NR"],
        agenda: "1. Brand Equity Keller Pyramid analysis\n2. B2B vs B2C funnel optimization\n3. Live campaign budget allocation practice"
      },
      {
        id: "grp_bba_003",
        name: "Managerial Economics Problem Solving Desk",
        subject: "Managerial Economics",
        subjectCode: "BBA203",
        currentMembers: 5,
        maxMembers: 5,
        isFull: true,
        domainId: "dept_bba",
        topic: "Oligopoly, Cournot Equilibrium & Kinked Demand Curve elasticity",
        creator: "Ritu S. (BBA24-051)",
        meetLink: "https://meet.google.com/bba-econ-full",
        members: ["RS", "DK", "PM", "TJ", "AL"],
        agenda: "1. Price elasticity calculus derivations\n2. Deadweight loss diagram walkthrough\n3. Mid-Term past paper question sets"
      },
      {
        id: "grp_bba_004",
        name: "Business Law Case Briefings & Moot Court",
        subject: "Business Law & Corporate Ethics",
        subjectCode: "BBA205",
        currentMembers: 2,
        maxMembers: 5,
        isFull: false,
        domainId: "dept_bba",
        topic: "Breach of contract remedies, indemnities & corporate veil piercing",
        creator: "Dev P. (BBA24-011)",
        meetLink: "https://meet.google.com/bba-law-room",
        members: ["DP", "TB"],
        agenda: "1. Salomon v. Salomon principle review\n2. Doctrine of Indoor Management\n3. Contract drafting checklist practice"
      },
      {
        id: "grp_bba_005",
        name: "Business Analytics & Tableau Dashboard Hub",
        subject: "Business Analytics",
        subjectCode: "BBA206",
        currentMembers: 4,
        maxMembers: 5,
        isFull: false,
        domainId: "dept_bba",
        topic: "Financial dashboard KPI design, cohort retention & Monte Carlo simulation",
        creator: "Kritika V. (BBA24-042)",
        meetLink: "https://meet.google.com/bba-analytics-live",
        members: ["KV", "TB", "RP", "MN"],
        agenda: "1. Data cleaning with Power Query\n2. Financial sensitivity tables\n3. Tableau story presentation review"
      }
    ],

    // Assignments
    assignments: [
      {
        id: "asg_bba_001",
        title: "Cash Flow Forecasting & Working Capital Analysis",
        subject: "Corporate Financial Accounting",
        subjectCode: "BBA204",
        faculty: "Prof. Priya Nair",
        dueDate: "Sep 29, 2026",
        dueTime: "11:59 PM",
        status: "pending",
        maxMarks: 25,
        submissionType: "Excel Model (.xlsx) + PDF Summary",
        domainId: "dept_bba",
        description: "Build a 3-statement financial projection model with working capital assumptions, cash conversion cycle, and sensitivity table."
      },
      {
        id: "asg_bba_002",
        title: "Omnichannel Brand Positioning Strategy Pitch",
        subject: "Principles of Marketing Strategy",
        subjectCode: "BBA201",
        faculty: "Prof. Vikram Saxena",
        dueDate: "Oct 02, 2026",
        dueTime: "05:00 PM",
        status: "submitted",
        maxMarks: 20,
        submissionType: "Pitch Deck Presentation (.pptx)",
        domainId: "dept_bba",
        description: "Analyze a competitive retail brand and propose a repositioning campaign targeting Gen-Z with CAC and ROAS benchmarks."
      },
      {
        id: "asg_bba_003",
        title: "Legal Assessment of Breach of Contract Clauses",
        subject: "Business Law & Corporate Ethics",
        subjectCode: "BBA205",
        faculty: "Dr. Meera Sen",
        dueDate: "Oct 06, 2026",
        dueTime: "11:59 PM",
        status: "pending",
        maxMarks: 15,
        submissionType: "PDF Legal Brief",
        domainId: "dept_bba",
        description: "Critique a standard commercial vendor agreement. Identify unfair limitation of liability and draft recommended revisions."
      }
    ],

    // Attendance Breakdown
    attendance: {
      overallPercentage: 88,
      totalClassesHeld: 172,
      totalAttended: 151,
      thresholdRequired: 75,
      status: "Compliant (+13% above mandatory 75% threshold)",
      subjects: [
        { subjectCode: "BBA204", subjectName: "Corporate Financial Accounting", faculty: "Prof. Priya Nair", attended: 35, total: 40, percentage: 88, status: "safe", safeMargin: "Can miss up to 5 sessions safely" },
        { subjectCode: "BBA201", subjectName: "Principles of Marketing Strategy", faculty: "Prof. Vikram Saxena", attended: 32, total: 36, percentage: 89, status: "safe", safeMargin: "Can miss up to 4 sessions safely" },
        { subjectCode: "BBA203", subjectName: "Managerial Economics", faculty: "Prof. Siddharth Joshi", attended: 34, total: 40, percentage: 85, status: "safe", safeMargin: "Can miss up to 3 sessions safely" },
        { subjectCode: "BBA205", subjectName: "Business Law & Corporate Ethics", faculty: "Dr. Meera Sen", attended: 27, total: 30, percentage: 90, status: "safe", safeMargin: "Can miss up to 4 sessions safely" },
        { subjectCode: "BBA206", subjectName: "Business Analytics", faculty: "Prof. Rohan Malhotra", attended: 23, total: 26, percentage: 88, status: "safe", safeMargin: "Can miss up to 3 sessions safely" }
      ]
    },

    // Daily Timetable
    schedule: [
      { id: "cls_bba_1", time: "09:30 AM", endTime: "10:30 AM", subject: "Corporate Financial Accounting", subjectCode: "BBA204", faculty: "Prof. Priya Nair", room: "Management Hall 101", isOnline: false, isActive: false },
      { id: "cls_bba_2", time: "11:30 AM", endTime: "12:30 PM", subject: "Principles of Marketing Strategy", subjectCode: "BBA201", faculty: "Prof. Vikram Saxena", room: "Room 205", isOnline: false, isActive: true },
      { id: "cls_bba_3", time: "01:30 PM", endTime: "02:30 PM", subject: "Managerial Economics & Market Structures", subjectCode: "BBA203", faculty: "Prof. Siddharth Joshi", room: "Room 208", isOnline: false, isActive: false },
      { id: "cls_bba_4", time: "03:00 PM", endTime: "04:30 PM", subject: "Business Analytics & Spreadsheet Lab", subjectCode: "BBA206", faculty: "Prof. Rohan Malhotra", room: "Analytics Lab 2", isOnline: false, isActive: false }
    ],

    // Analytics Cylinders & Progress Distribution
    analytics: {
      cylinders: [
        { label: "FinAcc", pct: 88, class: "fill-emerald", color: "#10B981" },
        { label: "Mktg", pct: 89, class: "fill-purple", color: "#8B5CF6" },
        { label: "Econ", pct: 85, class: "fill-red", color: "#EF4444" },
        { label: "Law", pct: 90, class: "fill-indigo", color: "#6366F1" },
        { label: "Analytics", pct: 87, class: "fill-violet", color: "#A855F7" }
      ],
      progressionTitle: "Business Administration Progression",
      progressionSummary: "72 / 140 Credits (51.4%)",
      donutSegments: [
        { label: "Corporate Finance", credits: "36 Cr", color: "#10B981", dash: "122 238", offset: "0" },
        { label: "Marketing", credits: "18 Cr", color: "#8B5CF6", dash: "58 238", offset: "-122" },
        { label: "Economics", credits: "12 Cr", color: "#3B82F6", dash: "38 238", offset: "-180" },
        { label: "Analytics & Law", credits: "6 Cr", color: "#F59E0B", dash: "20 238", offset: "-218" }
      ]
    },

    // Materials
    materials: [
      { id: "mat_bba_1", title: "Corporate Finance Unit 4: Capital Structure & WACC Calculations", subject: "Corporate Financial Accounting", subjectCode: "BBA204", category: "Notes", faculty: "Prof. Priya Nair", uploadedAt: "Sep 05, 2026", fileType: "pdf", fileSize: "4.1 MB", pages: 38, fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf" },
      { id: "mat_bba_2", title: "Marketing Strategy: Consumer Decision Funnel & Omni-channel Deck", subject: "Principles of Marketing Strategy", subjectCode: "BBA201", category: "Presentations", faculty: "Prof. Vikram Saxena", uploadedAt: "Sep 01, 2026", fileType: "ppt", fileSize: "6.2 MB", slides: 45, fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pptx" },
      { id: "mat_bba_3", title: "Business Law: The Indian Companies Act 2013 Primer", subject: "Business Law & Corporate Ethics", subjectCode: "BBA205", category: "Reference Material", faculty: "Dr. Meera Sen", uploadedAt: "Aug 28, 2026", fileType: "pdf", fileSize: "2.8 MB", pages: 26, fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf" }
    ],

    // Scheduled Exams
    exams: [
      { id: "exm_bba_1", subject: "Corporate Financial Accounting", subjectCode: "BBA204", title: "Mid-Term Examination", type: "Mid-Term", date: "September 29, 2026", day: "29", month: "SEP", time: "09:30 AM – 11:30 AM", duration: "2 Hours", venue: "Management Hall 101", seatNumber: "Desk B-14", hallTicketNo: "HT-2026-BBA-018", totalMarks: 50, passingMarks: 20 },
      { id: "exm_bba_2", subject: "Principles of Marketing Strategy", subjectCode: "BBA201", title: "Internal Assessment 1", type: "Internal Assessment", date: "October 03, 2026", day: "03", month: "OCT", time: "02:00 PM – 03:30 PM", duration: "1.5 Hours", venue: "Room 205", seatNumber: "Desk A-08", hallTicketNo: "HT-2026-BBA-018", totalMarks: 30, passingMarks: 12 }
    ],

    // AI Doubts Topic Seeds
    doubtTopics: [
      { id: "dbt_bba_1", question: "What is the difference between Operating Cash Flow and Free Cash Flow to Firm (FCFF)?", subject: "Corporate Financial Accounting", answer: "Operating Cash Flow reflects cash generated from core operational activities, while FCFF subtracts capital expenditures (CapEx) to represent available cash for all debt and equity providers." },
      { id: "dbt_bba_2", question: "Explain the Doctrine of Indoor Management in Company Law.", subject: "Business Law & Corporate Ethics", answer: "The Doctrine of Indoor Management (Royal British Bank v Turquand) protects third parties acting in good faith by presuming that internal company governance requirements have been fulfilled." }
    ],

    // HOD Portal Stats & Department Overview
    departmentKPIs: {
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

  // ────────────────────────────────────────────────────────────────────────────
  // 3. MBA — SCHOOL OF MANAGEMENT & BUSINESS STUDIES (EXECUTIVE POSTGRADUATE)
  // ────────────────────────────────────────────────────────────────────────────
  dept_mba: {
    id: "dept_mba",
    code: "MBA",
    name: "School of Management & Business Studies",
    school: "School of Management & Business Studies",
    domainId: "domain_mgmt",
    domainName: "Management & Business Studies",
    degree: "Master of Business Administration (Executive Leadership & Strategic Finance)",
    badge: "MBA Executive",
    icon: "💼",
    accentColor: "#7C3AED", // Royal Purple
    themeGradient: "linear-gradient(135deg, #7C3AED 0%, #D97706 100%)",
    durationYears: 2,
    totalSemesters: 4,
    activeSemester: 4,
    academicYear: "2025–2026",

    // Default Personas
    student: {
      id: "usr_stu_mba_1",
      uid: "usr_stu_mba_1",
      studentId: "STU-2024-6502",
      name: "Aditya Sengupta",
      email: "mba.student@university.edu",
      role: "student",
      program: "Master of Business Administration (Executive)",
      programCode: "MBA-EXEC",
      department: "School of Management & Business Studies",
      departmentCode: "MBA",
      departmentId: "dept_mba",
      domainId: "domain_mgmt",
      school: "School of Management & Business Studies",
      semester: 4,
      section: "A",
      rollNo: "MBA24-007",
      mentor: "Dr. Rajesh Patil",
      cgpa: 9.1,
      sgpa: 9.45,
      phone: "+91 98232 99001",
      status: "active"
    },

    faculty: {
      id: "usr_fac_mba_1",
      uid: "usr_fac_mba_1",
      facultyId: "FAC-2024-4001",
      name: "Prof. Arunav Roy",
      email: "mba.faculty@university.edu",
      role: "faculty",
      designation: "Professor of Practice",
      department: "School of Management & Business Studies",
      departmentCode: "MBA",
      departmentId: "dept_mba",
      domainId: "domain_mgmt",
      school: "School of Management & Business Studies",
      officeRoom: "Executive Block C, Cabin 110",
      phone: "+91 98220 77665",
      specialization: "Mergers & Acquisitions, Investment Banking & Private Equity",
      officeHours: "Tue, Thu: 03:00 PM – 05:30 PM",
      status: "active"
    },

    hod: {
      id: "usr_hod_mba_1",
      uid: "usr_hod_mba_1",
      name: "Dr. Rajesh Patil",
      email: "rajesh.patil@university.edu",
      secondaryEmail: "rajesh.patil@university.edu",
      role: "hod",
      designation: "Professor & Head of School",
      department: "School of Management & Business Studies",
      departmentCode: "MBA",
      departmentId: "dept_mba",
      domainId: "domain_mgmt",
      school: "School of Management & Business Studies",
      officeRoom: "Executive Block C, Cabin 105",
      phone: "+91 98230 99112",
      specialization: "Strategic Governance, Global Corporate Strategy & Capital Markets",
      status: "active"
    },

    // Enrolled Courses / Curriculum
    courses: [
      {
        id: "crs_mba601",
        code: "MBA601",
        name: "Strategic Global Leadership",
        faculty: "Dr. Nandini Sen",
        department: "MBA",
        credits: 4,
        semester: 4,
        attendance: 94,
        progress: 82,
        domainCategory: "Leadership & Strategy",
        nextClass: "Today • 10:00 AM",
        nextRoom: "Executive Seminar Room A",
        upcomingAssignment: "Boardroom Turnaround Case Defense",
        officeHours: "Mon & Wed 01:00 PM – 02:30 PM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "Enterprise Transformation & Blue Ocean Innovation", status: "Completed" },
          { unit: "Unit 2", title: "Geopolitical Risk & Cross-Border Governance", status: "Completed" },
          { unit: "Unit 3", title: "Boardroom Dynamics, Stakeholder Activism & ESG", status: "In Progress" },
          { unit: "Unit 4", title: "Crisis Management & Institutional Turnarounds", status: "Upcoming" }
        ]
      },
      {
        id: "crs_mba602",
        code: "MBA602",
        name: "Mergers, Acquisitions & Restructuring",
        faculty: "Prof. Arunav Roy",
        department: "MBA",
        credits: 4,
        semester: 4,
        attendance: 91,
        progress: 78,
        domainCategory: "Investment Banking",
        nextClass: "Today • 12:00 PM",
        nextRoom: "Room 401",
        upcomingAssignment: "Cross-Border LBO Due Diligence Valuation Deck",
        officeHours: "Tue & Thu 03:00 PM – 04:30 PM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "Strategic Rationale & Synergies Valuation", status: "Completed" },
          { unit: "Unit 2", title: "Leveraged Buyouts (LBO) Debt Structuring", status: "Completed" },
          { unit: "Unit 3", title: "Antitrust Regimes & Hostile Takeover Defenses", status: "In Progress" },
          { unit: "Unit 4", title: "Post-Merger Integration & Cultural Harmonization", status: "Upcoming" }
        ]
      },
      {
        id: "crs_mba603",
        code: "MBA603",
        name: "Investment Banking & Private Equity",
        faculty: "Dr. Rajesh Patil",
        department: "MBA",
        credits: 4,
        semester: 4,
        attendance: 92,
        progress: 75,
        domainCategory: "Private Equity",
        nextClass: "Wednesday • 02:30 PM",
        nextRoom: "Executive Lab",
        upcomingAssignment: "Black-Litterman Portfolio Asset Allocation Model",
        officeHours: "Wed & Fri 04:00 PM – 05:30 PM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "IPO Underwriting & Book Building Mechanics", status: "Completed" },
          { unit: "Unit 2", title: "Private Equity Fund Structuring (2-and-20)", status: "Completed" },
          { unit: "Unit 3", title: "Venture Capital Term Sheets & Waterfall Distributions", status: "In Progress" },
          { unit: "Unit 4", title: "Distressed Debt & Special Situations Investing", status: "Upcoming" }
        ]
      },
      {
        id: "crs_mba604",
        code: "MBA604",
        name: "Global Supply Chain & Operations Strategy",
        faculty: "Prof. K. V. Raman",
        department: "MBA",
        credits: 3,
        semester: 4,
        attendance: 88,
        progress: 70,
        domainCategory: "Operations",
        nextClass: "Thursday • 11:00 AM",
        nextRoom: "Room 402",
        upcomingAssignment: "Bullwhip Effect Simulation & S&OP Stress Test",
        officeHours: "Mon & Thu 02:00 PM – 03:30 PM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "Global Logistics Networks & Resilience Design", status: "Completed" },
          { unit: "Unit 2", title: "Sales & Operations Planning (S&OP) Integration", status: "Completed" },
          { unit: "Unit 3", title: "Nearshoring, Friendshoring & Tariff Risk", status: "In Progress" },
          { unit: "Unit 4", title: "Sustainable Closed-Loop Supply Chains", status: "Upcoming" }
        ]
      },
      {
        id: "crs_mba605",
        code: "MBA605",
        name: "FinTech Architecture & Digital Disruption",
        faculty: "Prof. Sameer Deshpande",
        department: "MBA",
        credits: 3,
        semester: 4,
        attendance: 90,
        progress: 68,
        domainCategory: "FinTech & Tech",
        nextClass: "Friday • 04:30 PM",
        nextRoom: "Virtual Boardroom",
        upcomingAssignment: "Decentralized Finance (DeFi) Lending Rails Critique",
        officeHours: "Wed & Fri 05:30 PM – 06:30 PM",
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        units: [
          { unit: "Unit 1", title: "Open Banking APIs & Neobanking Unit Economics", status: "Completed" },
          { unit: "Unit 2", title: "Payment Rails (FedNow, UPI, SWIFT ISO 20022)", status: "Completed" },
          { unit: "Unit 3", title: "Blockchain Settlement & Central Bank Digital Currencies", status: "In Progress" },
          { unit: "Unit 4", title: "AI in Algorithmic Credit Underwriting & Fraud", status: "Upcoming" }
        ]
      }
    ],

    // Peer Study Cohorts
    studyGroups: [
      {
        id: "grp_mba_001",
        name: "Harvard Business Review Strategy Defense Squad",
        subject: "Strategic Global Leadership",
        subjectCode: "MBA601",
        currentMembers: 4,
        maxMembers: 5,
        isFull: false,
        domainId: "dept_mba",
        topic: "Enterprise turnaround, blue ocean shift & geopolitical resilience",
        creator: "Aditya S. (MBA24-007)",
        meetLink: "https://meet.google.com/mba-strat-room",
        members: ["AS", "NR", "SM", "DK"],
        agenda: "1. HBR Case 2025: Satya Nadella's cultural overhaul\n2. Shareholder vs Stakeholder capitalism trade-offs\n3. Board memo drafting session"
      },
      {
        id: "grp_mba_002",
        name: "M&A Due Diligence & LBO Modeling Lab",
        subject: "Mergers, Acquisitions & Restructuring",
        subjectCode: "MBA602",
        currentMembers: 3,
        maxMembers: 5,
        isFull: false,
        domainId: "dept_mba",
        topic: "EBITDA adjustments, debt covenant waterfalls & returns sensitivity",
        creator: "Natasha R. (MBA24-015)",
        meetLink: "https://meet.google.com/mba-mna-lab",
        members: ["NR", "AS", "VK"],
        agenda: "1. Accretion/Dilution analysis mechanics\n2. Term loan B vs Mezzanine debt tranche returns\n3. Antitrust Hart-Scott-Rodino filing review"
      },
      {
        id: "grp_mba_003",
        name: "Venture Capital Term Sheet & Cap Table Workshop",
        subject: "Investment Banking & Private Equity",
        subjectCode: "MBA603",
        currentMembers: 5,
        maxMembers: 5,
        isFull: true,
        domainId: "dept_mba",
        topic: "Participating Preferred vs Non-participating, Drag-along & Anti-dilution",
        creator: "Siddharth M. (MBA24-023)",
        meetLink: "https://meet.google.com/mba-vc-squad",
        members: ["SM", "DK", "RM", "TN", "AB"],
        agenda: "1. Series B $40M term sheet teardown\n2. Broad-based weighted average anti-dilution proof\n3. Carried interest hurdle rate calculation"
      },
      {
        id: "grp_mba_004",
        name: "FinTech Disruption & DeFi Payment Rails",
        subject: "FinTech Architecture",
        subjectCode: "MBA605",
        currentMembers: 2,
        maxMembers: 5,
        isFull: false,
        domainId: "dept_mba",
        topic: "Central Bank Digital Currencies (CBDC), smart contract escrow & RegTech",
        creator: "Divya K. (MBA24-041)",
        meetLink: "https://meet.google.com/mba-fintech-hub",
        members: ["DK", "AS"],
        agenda: "1. Cross-border wholesale CBDC architecture\n2. ISO 20022 message structure deep-dive\n3. AI algorithmic credit bias audit"
      },
      {
        id: "grp_mba_005",
        name: "Resilient Global Supply Chain Stress Test",
        subject: "Global Supply Chain",
        subjectCode: "MBA604",
        currentMembers: 4,
        maxMembers: 5,
        isFull: false,
        domainId: "dept_mba",
        topic: "Dual-sourcing strategies, lead-time variance & carbon border adjustments",
        creator: "Rohan M. (MBA24-032)",
        meetLink: "https://meet.google.com/mba-ops-circle",
        members: ["RM", "AS", "PK", "SS"],
        agenda: "1. Red Sea logistics detour cost modeling\n2. Safety stock vs carrying cost optimization\n3. Scope 3 carbon emission audit methodologies"
      }
    ],

    // Assignments
    assignments: [
      {
        id: "asg_mba_001",
        title: "Cross-Border Acquisition Feasibility & DCF Valuation",
        subject: "Mergers, Acquisitions & Restructuring",
        subjectCode: "MBA602",
        faculty: "Prof. Arunav Roy",
        dueDate: "Sep 30, 2026",
        dueTime: "11:59 PM",
        status: "pending",
        maxMarks: 30,
        submissionType: "Executive Valuation Brief + Financial Model",
        domainId: "dept_mba",
        description: "Perform comprehensive DCF and precedent transaction valuation for a $1.2B cross-border acquisition. Include synergy risk haircut."
      },
      {
        id: "asg_mba_002",
        title: "Boardroom Strategy Simulation: Enterprise Turnaround",
        subject: "Strategic Global Leadership",
        subjectCode: "MBA601",
        faculty: "Dr. Nandini Sen",
        dueDate: "Oct 05, 2026",
        dueTime: "05:00 PM",
        status: "submitted",
        maxMarks: 25,
        submissionType: "Executive Memorandum (.pdf)",
        domainId: "dept_mba",
        description: "Draft a confidential board memorandum addressing activist investor demands, spin-off divestitures, and leadership realignment."
      },
      {
        id: "asg_mba_003",
        title: "Portfolio Optimization & Black-Litterman Asset Allocation",
        subject: "Investment Banking & Private Equity",
        subjectCode: "MBA603",
        faculty: "Dr. Rajesh Patil",
        dueDate: "Oct 09, 2026",
        dueTime: "11:59 PM",
        status: "pending",
        maxMarks: 20,
        submissionType: "Python Notebook / Excel Quant Model",
        domainId: "dept_mba",
        description: "Apply Bayesian prior equilibrium returns combined with tactical investor views to build an efficient frontier multi-asset portfolio."
      }
    ],

    // Attendance Breakdown
    attendance: {
      overallPercentage: 91,
      totalClassesHeld: 160,
      totalAttended: 146,
      thresholdRequired: 75,
      status: "Compliant (+16% above mandatory 75% threshold)",
      subjects: [
        { subjectCode: "MBA601", subjectName: "Strategic Global Leadership", faculty: "Dr. Nandini Sen", attended: 35, total: 38, percentage: 92, status: "safe", safeMargin: "Can miss up to 6 sessions safely" },
        { subjectCode: "MBA602", subjectName: "Mergers & Acquisitions", faculty: "Prof. Arunav Roy", attended: 36, total: 40, percentage: 90, status: "safe", safeMargin: "Can miss up to 5 sessions safely" },
        { subjectCode: "MBA603", subjectName: "Investment Banking & PE", faculty: "Dr. Rajesh Patil", attended: 37, total: 40, percentage: 93, status: "safe", safeMargin: "Can miss up to 7 sessions safely" },
        { subjectCode: "MBA604", subjectName: "Global Supply Chain", faculty: "Prof. K. V. Raman", attended: 19, total: 22, percentage: 86, status: "safe", safeMargin: "Can miss up to 2 sessions safely" },
        { subjectCode: "MBA605", subjectName: "FinTech Architecture", faculty: "Prof. Sameer Deshpande", attended: 19, total: 20, percentage: 95, status: "safe", safeMargin: "Can miss up to 4 sessions safely" }
      ]
    },

    // Daily Timetable
    schedule: [
      { id: "cls_mba_1", time: "10:00 AM", endTime: "11:30 AM", subject: "Strategic Global Leadership", subjectCode: "MBA601", faculty: "Dr. Nandini Sen", room: "Executive Seminar Room A", isOnline: false, isActive: false },
      { id: "cls_mba_2", time: "12:00 PM", endTime: "01:30 PM", subject: "Mergers, Acquisitions & Restructuring", subjectCode: "MBA602", faculty: "Prof. Arunav Roy", room: "Room 401", isOnline: false, isActive: true },
      { id: "cls_mba_3", time: "02:30 PM", endTime: "04:00 PM", subject: "Investment Banking & Private Equity", subjectCode: "MBA603", faculty: "Dr. Rajesh Patil", room: "Executive Lab", isOnline: false, isActive: false },
      { id: "cls_mba_4", time: "04:30 PM", endTime: "05:30 PM", subject: "FinTech Architecture & Digital Disruption", subjectCode: "MBA605", faculty: "Prof. Sameer Deshpande", room: "Virtual Boardroom", isOnline: true, meetingUrl: "https://meet.google.com/mba-fintech-exec", isActive: false }
    ],

    // Analytics Cylinders & Progress Distribution
    analytics: {
      cylinders: [
        { label: "Strat", pct: 92, class: "fill-purple", color: "#8B5CF6" },
        { label: "M&A", pct: 90, class: "fill-violet", color: "#A855F7" },
        { label: "IB/PE", pct: 93, class: "fill-emerald", color: "#10B981" },
        { label: "Ops", pct: 86, class: "fill-indigo", color: "#6366F1" },
        { label: "FinTech", pct: 95, class: "fill-red", color: "#EF4444" }
      ],
      progressionTitle: "Executive MBA Progression",
      progressionSummary: "56 / 80 Credits (70.0%)",
      donutSegments: [
        { label: "Strategic Finance & M&A", credits: "28 Cr", color: "#8B5CF6", dash: "135 238", offset: "0" },
        { label: "Global Leadership", credits: "16 Cr", color: "#A855F7", dash: "62 238", offset: "-135" },
        { label: "Ops & SCM", credits: "8 Cr", color: "#10B981", dash: "25 238", offset: "-197" },
        { label: "FinTech & Tech", credits: "4 Cr", color: "#F59E0B", dash: "16 238", offset: "-222" }
      ]
    },

    // Materials
    materials: [
      { id: "mat_mba_1", title: "Executive Strategy: Porter's Value Chain & Blue Ocean Deck", subject: "Strategic Global Leadership", subjectCode: "MBA601", category: "Presentations", faculty: "Dr. Nandini Sen", uploadedAt: "Sep 08, 2026", fileType: "ppt", fileSize: "7.8 MB", slides: 62, fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pptx" },
      { id: "mat_mba_2", title: "Corporate Valuation: Discounted Cash Flow & Multiples Guide", subject: "Mergers, Acquisitions & Restructuring", subjectCode: "MBA602", category: "Notes", faculty: "Prof. Arunav Roy", uploadedAt: "Sep 03, 2026", fileType: "pdf", fileSize: "5.4 MB", pages: 48, fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf" },
      { id: "mat_mba_3", title: "Private Equity: Leveraged Buyout (LBO) Debt Structuring Framework", subject: "Investment Banking & Private Equity", subjectCode: "MBA603", category: "Reference Material", faculty: "Dr. Rajesh Patil", uploadedAt: "Aug 30, 2026", fileType: "pdf", fileSize: "3.9 MB", pages: 34, fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf" }
    ],

    // Scheduled Exams
    exams: [
      { id: "exm_mba_1", subject: "Mergers, Acquisitions & Restructuring", subjectCode: "MBA602", title: "Comprehensive Case Assessment", type: "Mid-Term", date: "September 30, 2026", day: "30", month: "SEP", time: "10:00 AM – 01:00 PM", duration: "3 Hours", venue: "Executive Boardroom C", seatNumber: "Executive Desk 07", hallTicketNo: "HT-2026-MBA-007", totalMarks: 100, passingMarks: 50 },
      { id: "exm_mba_2", subject: "Strategic Global Leadership", subjectCode: "MBA601", title: "Mid-Term Case Defense", type: "Internal Assessment", date: "October 04, 2026", day: "04", month: "OCT", time: "02:00 PM – 04:00 PM", duration: "2 Hours", venue: "Seminar Room A", seatNumber: "Desk 12", hallTicketNo: "HT-2026-MBA-007", totalMarks: 50, passingMarks: 25 }
    ],

    // AI Doubts Topic Seeds
    doubtTopics: [
      { id: "dbt_mba_1", question: "How does the Terminal Value Exit Multiple method compare against the Gordon Growth Perpetuity Model in DCF?", subject: "Mergers, Acquisitions & Restructuring", answer: "The Exit Multiple reflects prevailing EV/EBITDA market multiples in comparable transactions, while Gordon Growth assumes a steady, mature-state long-term growth rate." },
      { id: "dbt_mba_2", question: "Explain the Bullwhip Effect in Global Supply Chains and three mitigating strategies.", subject: "Global Supply Chain & Operations Strategy", answer: "The Bullwhip Effect refers to increasing swing in inventory in response to shifts in customer demand. Countermeasures include POS data sharing (CPFR), lead-time reduction, and Everyday Low Pricing (EDLP)." }
    ],

    // HOD Portal Stats & Department Overview
    departmentKPIs: {
      totalStudents: 260,
      totalFaculty: 20,
      activeSubjects: 24,
      pendingApprovals: 6,
      avgAttendance: 91.0,
      avgPerformanceScore: 88.4,
      labUtilization: "92%",
      classesCompletedPct: 81.2
    }
  }
};

// Global / Module Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DOMAINS_CATALOG };
} else {
  window.DOMAINS_CATALOG = DOMAINS_CATALOG;
}

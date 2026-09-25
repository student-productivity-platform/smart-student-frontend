/**
 * ==========================================================================
 * SMART STUDENT — Centralized Mock Data: Faculty Portal (F21–F29)
 * Faculty: Prof. Sunita Mehta (Associate Professor, Computer Engineering)
 * ==========================================================================
 */

const mockFacultyBase = {
  profile: {
    id: "usr_fac_1001",
    name: "Prof. Sunita Mehta",
    email: "faculty@university.edu",
    role: "faculty",
    facultyId: "FAC-2024-1001",
    designation: "Associate Professor",
    department: "Department of Computer Engineering",
    school: "School of Computing & Information Technology",
    joiningYear: "2018",
    qualification: "Ph.D. in Computer Science (IIT Bombay), M.Tech (CSE)",
    specialization: "Distributed Systems, Database Architectures & Cloud Computing",
    officeRoom: "Academic Block 3, Cabin 304",
    phone: "+91 98220 11234",
    officeHours: "Mon, Wed, Fri: 03:00 PM – 05:00 PM",
    avatar: "../images/student-study.jpg",
    status: "active"
  },

  assignedSubjects: [
    {
      id: "subj_cs402",
      code: "CS402",
      name: "Database Management Systems",
      semester: 4,
      department: "Computer Engineering",
      credits: 4,
      totalHours: 45,
      completedHours: 24,
      sections: ["A", "B"],
      totalStudents: 74,
      schedule: "Mon (11:00 AM), Wed (11:00 AM), Fri (10:00 AM)",
      classroom: "Room 302 / Smart Classroom",
      avgAttendance: 85.6,
      syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      description: "Relational models, SQL, Normalization, Query Processing, Transactions & NoSQL paradigms."
    },
    {
      id: "subj_cs404",
      code: "CS404",
      name: "Operating Systems",
      semester: 4,
      department: "Computer Engineering",
      credits: 4,
      totalHours: 45,
      completedHours: 22,
      sections: ["A"],
      totalStudents: 38,
      schedule: "Tue (09:00 AM), Thu (10:00 AM), Fri (02:00 PM)",
      classroom: "Room 204",
      avgAttendance: 83.2,
      syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      description: "Process management, CPU scheduling, synchronization, memory management & file systems."
    },
    {
      id: "subj_cs402l",
      code: "CS402L",
      name: "DBMS Practical & Lab",
      semester: 4,
      department: "Computer Engineering",
      credits: 2,
      totalHours: 30,
      completedHours: 16,
      sections: ["A", "B"],
      totalStudents: 74,
      schedule: "Tue (02:00 PM - 04:00 PM), Thu (02:00 PM - 04:00 PM)",
      classroom: "Computer Lab 3 (Ground Floor)",
      avgAttendance: 91.4,
      syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      description: "Hands-on PostgreSQL, Indexing, PL/SQL triggers, procedure design & MongoDB integration."
    }
  ],

  // Student Roster assigned to Prof. Sunita Mehta
  studentRoster: [
    { id: "stu_001", rollNo: "CS24-001", name: "Aarav Sharma", email: "aarav.s@university.edu", semester: 4, section: "A", attendance: 92, submissions: 5, avgScore: 18.5, phone: "+91 98111 00001", status: "Good Standing" },
    { id: "stu_002", rollNo: "CS24-002", name: "Aditi Deshmukh", email: "aditi.d@university.edu", semester: 4, section: "A", attendance: 88, submissions: 5, avgScore: 17.0, phone: "+91 98111 00002", status: "Good Standing" },
    { id: "stu_003", rollNo: "CS24-003", name: "Ananya Iyer", email: "ananya.i@university.edu", semester: 4, section: "A", attendance: 95, submissions: 5, avgScore: 19.5, phone: "+91 98111 00003", status: "Outstanding" },
    { id: "stu_004", rollNo: "CS24-004", name: "Devansh Patel", email: "devansh.p@university.edu", semester: 4, section: "A", attendance: 71, submissions: 3, avgScore: 13.0, phone: "+91 98111 00004", status: "Low Attendance Warning" },
    { id: "stu_005", rollNo: "CS24-005", name: "Ishita Roy", email: "ishita.r@university.edu", semester: 4, section: "A", attendance: 84, submissions: 4, avgScore: 16.5, phone: "+91 98111 00005", status: "Good Standing" },
    { id: "stu_006", rollNo: "CS24-006", name: "Kabir Verma", email: "kabir.v@university.edu", semester: 4, section: "A", attendance: 78, submissions: 4, avgScore: 15.0, phone: "+91 98111 00006", status: "Good Standing" },
    { id: "stu_007", rollNo: "CS24-007", name: "Manish Kulkarni", email: "manish.k@university.edu", semester: 4, section: "A", attendance: 82, submissions: 4, avgScore: 16.0, phone: "+91 98111 00007", status: "Good Standing" },
    { id: "stu_008", rollNo: "CS24-008", name: "Neha Gupta", email: "neha.g@university.edu", semester: 4, section: "A", attendance: 90, submissions: 5, avgScore: 18.0, phone: "+91 98111 00008", status: "Good Standing" },
    { id: "stu_009", rollNo: "CS24-009", name: "Pranav Joshi", email: "pranav.j@university.edu", semester: 4, section: "A", attendance: 67, submissions: 2, avgScore: 11.5, phone: "+91 98111 00009", status: "Critical Attendance" },
    { id: "stu_011", rollNo: "CS24-011", name: "Rohan Nair", email: "rohan.n@university.edu", semester: 4, section: "A", attendance: 89, submissions: 5, avgScore: 17.5, phone: "+91 98111 00011", status: "Good Standing" },
    { id: "stu_012", rollNo: "CS24-012", name: "Sanya Malhotra", email: "sanya.m@university.edu", semester: 4, section: "A", attendance: 94, submissions: 5, avgScore: 18.8, phone: "+91 98111 00012", status: "Outstanding" },
    { id: "stu_013", rollNo: "CS24-013", name: "Tanmay Shinde", email: "tanmay.s@university.edu", semester: 4, section: "A", attendance: 81, submissions: 4, avgScore: 15.5, phone: "+91 98111 00013", status: "Good Standing" },
    { id: "stu_014", rollNo: "CS24-014", name: "Utkarsh Rao", email: "utkarsh.r@university.edu", semester: 4, section: "A", attendance: 74, submissions: 3, avgScore: 14.0, phone: "+91 98111 00014", status: "Low Attendance Warning" },
    { id: "stu_015", rollNo: "CS24-015", name: "Zoya Khan", email: "zoya.k@university.edu", semester: 4, section: "A", attendance: 96, submissions: 5, avgScore: 19.8, phone: "+91 98111 00015", status: "Outstanding" },
    // Section B Students
    { id: "stu_016", rollNo: "CS24-051", name: "Akash Chopra", email: "akash.c@university.edu", semester: 4, section: "B", attendance: 85, submissions: 5, avgScore: 16.5, phone: "+91 98222 00001", status: "Good Standing" },
    { id: "stu_017", rollNo: "CS24-052", name: "Bhavna Bhatt", email: "bhavna.b@university.edu", semester: 4, section: "B", attendance: 91, submissions: 5, avgScore: 18.2, phone: "+91 98222 00002", status: "Good Standing" },
    { id: "stu_018", rollNo: "CS24-053", name: "Chirag Singhania", email: "chirag.s@university.edu", semester: 4, section: "B", attendance: 76, submissions: 4, avgScore: 14.5, phone: "+91 98222 00003", status: "Good Standing" },
    { id: "stu_019", rollNo: "CS24-054", name: "Divya Pillai", email: "divya.p@university.edu", semester: 4, section: "B", attendance: 88, submissions: 5, avgScore: 17.8, phone: "+91 98222 00004", status: "Good Standing" },
    { id: "stu_020", rollNo: "CS24-055", name: "Gaurav Pandey", email: "gaurav.p@university.edu", semester: 4, section: "B", attendance: 69, submissions: 3, avgScore: 12.0, phone: "+91 98222 00005", status: "Low Attendance Warning" },
    { id: "stu_021", rollNo: "CS24-056", name: "Harsh Vardhan", email: "harsh.v@university.edu", semester: 4, section: "B", attendance: 83, submissions: 4, avgScore: 15.5, phone: "+91 98222 00006", status: "Good Standing" },
    { id: "stu_022", rollNo: "CS24-057", name: "Kritika Sen", email: "kritika.s@university.edu", semester: 4, section: "B", attendance: 93, submissions: 5, avgScore: 19.0, phone: "+91 98222 00007", status: "Outstanding" },
    { id: "stu_023", rollNo: "CS24-058", name: "Mohit Agarwal", email: "mohit.a@university.edu", semester: 4, section: "B", attendance: 79, submissions: 4, avgScore: 16.0, phone: "+91 98222 00008", status: "Good Standing" },
    { id: "stu_024", rollNo: "CS24-059", name: "Nikhil Sawant", email: "nikhil.s@university.edu", semester: 4, section: "B", attendance: 86, submissions: 5, avgScore: 17.2, phone: "+91 98222 00009", status: "Good Standing" },
    { id: "stu_025", rollNo: "CS24-060", name: "Pooja Hegde", email: "pooja.h@university.edu", semester: 4, section: "B", attendance: 90, submissions: 5, avgScore: 18.0, phone: "+91 98222 00010", status: "Good Standing" }
  ],

  // Faculty Assignments (F24)
  assignments: [
    {
      id: "fac_asg_001",
      title: "Normalization & Relational Schema Design",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      sections: ["A", "B"],
      dueDate: "2026-09-08",
      dueTime: "23:59",
      maxMarks: 20,
      submissionType: "PDF Document",
      status: "active",
      publishedAt: "2026-08-28",
      totalAssigned: 74,
      totalSubmitted: 61,
      totalGraded: 45,
      pendingGrading: 16,
      description: "Convert the unnormalized enrollment table into 1NF, 2NF, 3NF and BCNF with functional dependency graphs.",
      attachmentName: "DBMS_Assignment_1_Spec.pdf"
    },
    {
      id: "fac_asg_002",
      title: "Process Synchronization with Semaphores",
      subjectCode: "CS404",
      subjectName: "Operating Systems",
      sections: ["A"],
      dueDate: "2026-09-12",
      dueTime: "23:59",
      maxMarks: 15,
      submissionType: "C Source Code (.c)",
      status: "active",
      publishedAt: "2026-09-01",
      totalAssigned: 38,
      totalSubmitted: 29,
      totalGraded: 12,
      pendingGrading: 17,
      description: "Implement the Dining Philosophers Problem in C utilizing POSIX mutexes and semaphores to eliminate deadlock.",
      attachmentName: "OS_Sync_Problem_Statement.pdf"
    },
    {
      id: "fac_asg_003",
      title: "Complex SQL Joins, Triggers & PL/SQL Procedures",
      subjectCode: "CS402L",
      subjectName: "DBMS Practical & Lab",
      sections: ["A", "B"],
      dueDate: "2026-09-15",
      dueTime: "17:00",
      maxMarks: 25,
      submissionType: "SQL Script (.sql) & Report",
      status: "active",
      publishedAt: "2026-09-03",
      totalAssigned: 74,
      totalSubmitted: 32,
      totalGraded: 0,
      pendingGrading: 32,
      description: "Write schema migration scripts and implement audit logging triggers using PL/pgSQL on the e-commerce database.",
      attachmentName: "Lab3_PLSQL_Assignment_Guide.pdf"
    },
    {
      id: "fac_asg_004",
      title: "ER Modeling & Schema Transformation",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      sections: ["A", "B"],
      dueDate: "2026-08-20",
      dueTime: "23:59",
      maxMarks: 20,
      submissionType: "PDF Document",
      status: "completed",
      publishedAt: "2026-08-10",
      totalAssigned: 74,
      totalSubmitted: 72,
      totalGraded: 72,
      pendingGrading: 0,
      description: "Design an Extended ER diagram for a multi-specialty hospital management system with cardinalities and constraints.",
      attachmentName: "ER_Modeling_Hospital_Case.pdf"
    }
  ],

  // Student Submissions for Evaluation (F25)
  submissions: [
    {
      id: "sub_101",
      assignmentId: "fac_asg_001",
      assignmentTitle: "Normalization & Relational Schema Design",
      subjectCode: "CS402",
      studentId: "stu_010",
      studentName: "Riddhi Zunjarrao",
      rollNo: "CS24-042",
      section: "A",
      submittedAt: "2026-09-04 15:24",
      fileName: "Riddhi_Zunjarrao_CS402_Assign1.pdf",
      fileSize: "2.4 MB",
      status: "submitted",
      marks: null,
      maxMarks: 20,
      feedback: "",
      rubric: { completeness: null, clarity: null, correctness: null }
    },
    {
      id: "sub_102",
      assignmentId: "fac_asg_001",
      assignmentTitle: "Normalization & Relational Schema Design",
      subjectCode: "CS402",
      studentId: "stu_001",
      studentName: "Aarav Sharma",
      rollNo: "CS24-001",
      section: "A",
      submittedAt: "2026-09-05 11:10",
      fileName: "Aarav_Sharma_DBMS_A1.pdf",
      fileSize: "1.8 MB",
      status: "graded",
      marks: 19,
      maxMarks: 20,
      feedback: "Excellent functional dependency diagrams. Minimal loss join proof is well articulated.",
      rubric: { completeness: 5, clarity: 5, correctness: 9 }
    },
    {
      id: "sub_103",
      assignmentId: "fac_asg_001",
      assignmentTitle: "Normalization & Relational Schema Design",
      subjectCode: "CS402",
      studentId: "stu_003",
      studentName: "Ananya Iyer",
      rollNo: "CS24-003",
      section: "A",
      submittedAt: "2026-09-03 18:45",
      fileName: "Ananya_Iyer_CS402_Normalization.pdf",
      fileSize: "3.1 MB",
      status: "graded",
      marks: 20,
      maxMarks: 20,
      feedback: "Flawless decomposition into BCNF. Great presentation.",
      rubric: { completeness: 5, clarity: 5, correctness: 10 }
    },
    {
      id: "sub_104",
      assignmentId: "fac_asg_001",
      assignmentTitle: "Normalization & Relational Schema Design",
      subjectCode: "CS402",
      studentId: "stu_004",
      studentName: "Devansh Patel",
      rollNo: "CS24-004",
      section: "A",
      submittedAt: "2026-09-07 09:15",
      fileName: "Devansh_DBMS_Assignment.pdf",
      fileSize: "1.2 MB",
      status: "submitted",
      marks: null,
      maxMarks: 20,
      feedback: "",
      rubric: { completeness: null, clarity: null, correctness: null }
    },
    {
      id: "sub_105",
      assignmentId: "fac_asg_002",
      assignmentTitle: "Process Synchronization with Semaphores",
      subjectCode: "CS404",
      studentId: "stu_010",
      studentName: "Riddhi Zunjarrao",
      rollNo: "CS24-042",
      section: "A",
      submittedAt: "2026-09-06 14:10",
      fileName: "riddhi_dining_philosophers.c",
      fileSize: "14 KB",
      status: "submitted",
      marks: null,
      maxMarks: 15,
      feedback: "",
      rubric: { logic: null, compilation: null, codeQuality: null }
    },
    {
      id: "sub_106",
      assignmentId: "fac_asg_002",
      assignmentTitle: "Process Synchronization with Semaphores",
      subjectCode: "CS404",
      studentId: "stu_006",
      studentName: "Kabir Verma",
      rollNo: "CS24-006",
      section: "A",
      submittedAt: "2026-09-05 20:30",
      fileName: "kabir_sync_semaphores.c",
      fileSize: "18 KB",
      status: "submitted",
      marks: null,
      maxMarks: 15,
      feedback: "",
      rubric: { logic: null, compilation: null, codeQuality: null }
    },
    {
      id: "sub_107",
      assignmentId: "fac_asg_002",
      assignmentTitle: "Process Synchronization with Semaphores",
      subjectCode: "CS404",
      studentId: "stu_008",
      studentName: "Neha Gupta",
      rollNo: "CS24-008",
      section: "A",
      submittedAt: "2026-09-04 17:00",
      fileName: "neha_philosophers.c",
      fileSize: "12 KB",
      status: "graded",
      marks: 14,
      maxMarks: 15,
      feedback: "Clean implementation with pthread mutex locks. Added logging is helpful.",
      rubric: { logic: 5, compilation: 5, codeQuality: 4 }
    }
  ],

  // Attendance Sessions History (F26)
  attendanceHistory: [
    {
      id: "att_rec_001",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      section: "A",
      date: "2026-09-05",
      time: "11:00 AM - 12:00 PM",
      totalStudents: 38,
      presentCount: 34,
      absentCount: 4,
      percentage: 89.5,
      topicsCovered: "3NF Normalization & BCNF Comparison"
    },
    {
      id: "att_rec_002",
      subjectCode: "CS404",
      subjectName: "Operating Systems",
      section: "A",
      date: "2026-09-04",
      time: "02:00 PM - 03:00 PM",
      totalStudents: 38,
      presentCount: 32,
      absentCount: 6,
      percentage: 84.2,
      topicsCovered: "Classical Synchronization Problems & Mutexes"
    },
    {
      id: "att_rec_003",
      subjectCode: "CS402L",
      subjectName: "DBMS Practical & Lab",
      section: "A",
      date: "2026-09-03",
      time: "02:00 PM - 04:00 PM",
      totalStudents: 38,
      presentCount: 36,
      absentCount: 2,
      percentage: 94.7,
      topicsCovered: "Lab 3: PostgreSQL Complex Queries & Subqueries"
    },
    {
      id: "att_rec_004",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      section: "B",
      date: "2026-09-02",
      time: "11:00 AM - 12:00 PM",
      totalStudents: 36,
      presentCount: 31,
      absentCount: 5,
      percentage: 86.1,
      topicsCovered: "Functional Dependency Inference Rules (Armstrong Axioms)"
    }
  ],

  // Assessment / Examination Evaluations (F27)
  exams: [
    {
      id: "exam_001",
      title: "Semester 4 Mid-Term Examination",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      date: "2026-09-18",
      time: "10:00 AM - 12:00 PM",
      maxMarks: 50,
      weightage: "30%",
      status: "scheduled",
      sections: ["A", "B"],
      totalStudents: 74,
      evaluatedCount: 0,
      isPublished: false
    },
    {
      id: "exam_002",
      title: "DBMS Unit Test 1 (Relational Algebra & SQL)",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      date: "2026-08-25",
      time: "11:00 AM - 12:00 PM",
      maxMarks: 25,
      weightage: "10%",
      status: "evaluated",
      sections: ["A", "B"],
      totalStudents: 74,
      evaluatedCount: 74,
      isPublished: true,
      stats: { average: 20.4, highest: 25, lowest: 12, passRate: 97.3 },
      studentMarks: [
        { studentId: "stu_001", rollNo: "CS24-001", name: "Aarav Sharma", section: "A", marks: 23, maxMarks: 25, grade: "A+", status: "Pass" },
        { studentId: "stu_002", rollNo: "CS24-002", name: "Aditi Deshmukh", section: "A", marks: 21, maxMarks: 25, grade: "A", status: "Pass" },
        { studentId: "stu_003", rollNo: "CS24-003", name: "Ananya Iyer", section: "A", marks: 25, maxMarks: 25, grade: "O", status: "Pass" },
        { studentId: "stu_004", rollNo: "CS24-004", name: "Devansh Patel", section: "A", marks: 14, maxMarks: 25, grade: "C", status: "Pass" },
        { studentId: "stu_005", rollNo: "CS24-005", name: "Ishita Roy", section: "A", marks: 20, maxMarks: 25, grade: "A", status: "Pass" },
        { studentId: "stu_008", rollNo: "CS24-008", name: "Neha Gupta", section: "A", marks: 22, maxMarks: 25, grade: "A+", status: "Pass" },
        { studentId: "stu_010", rollNo: "CS24-042", name: "Riddhi Zunjarrao", section: "A", marks: 24, maxMarks: 25, grade: "O", status: "Pass" },
        { studentId: "stu_012", rollNo: "CS24-012", name: "Sanya Malhotra", section: "A", marks: 24, maxMarks: 25, grade: "O", status: "Pass" },
        { studentId: "stu_015", rollNo: "CS24-015", name: "Zoya Khan", section: "A", marks: 25, maxMarks: 25, grade: "O", status: "Pass" }
      ]
    },
    {
      id: "exam_003",
      title: "Operating Systems Quiz 1 (CPU Scheduling)",
      subjectCode: "CS404",
      subjectName: "Operating Systems",
      date: "2026-08-28",
      time: "09:00 AM - 10:00 AM",
      maxMarks: 20,
      weightage: "10%",
      status: "evaluated",
      sections: ["A"],
      totalStudents: 38,
      evaluatedCount: 38,
      isPublished: true,
      stats: { average: 16.8, highest: 20, lowest: 9, passRate: 94.7 },
      studentMarks: [
        { studentId: "stu_001", rollNo: "CS24-001", name: "Aarav Sharma", section: "A", marks: 18, maxMarks: 20, grade: "A+", status: "Pass" },
        { studentId: "stu_003", rollNo: "CS24-003", name: "Ananya Iyer", section: "A", marks: 20, maxMarks: 20, grade: "O", status: "Pass" },
        { studentId: "stu_006", rollNo: "CS24-006", name: "Kabir Verma", section: "A", marks: 15, maxMarks: 20, grade: "B+", status: "Pass" },
        { studentId: "stu_010", rollNo: "CS24-042", name: "Riddhi Zunjarrao", section: "A", marks: 19, maxMarks: 20, grade: "O", status: "Pass" }
      ]
    }
  ],

  // Google Meet Online Classes / Meetings (F28)
  meetings: [
    {
      id: "meet_001",
      title: "DBMS Mid-Term Revision & Query Optimization Workshop",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      section: "Section A & B",
      date: "2026-09-14",
      startTime: "04:00 PM",
      duration: "60 mins",
      meetUrl: "https://meet.google.com/new",
      status: "upcoming",
      attendeeCount: 74,
      agenda: "Reviewing 3NF vs BCNF decompositions, indexing mechanisms, and answering student mid-term doubts."
    },
    {
      id: "meet_002",
      title: "Operating Systems Deadlock & Memory Management Extra Lecture",
      subjectCode: "CS404",
      subjectName: "Operating Systems",
      section: "Section A",
      date: "2026-09-16",
      startTime: "05:00 PM",
      duration: "45 mins",
      meetUrl: "https://meet.google.com/new",
      status: "upcoming",
      attendeeCount: 38,
      agenda: "Banker's Algorithm implementation and paging hardware architecture walkthrough."
    },
    {
      id: "meet_003",
      title: "DBMS Lab 3 PL/SQL Demonstration & Doubt Clearing",
      subjectCode: "CS402L",
      subjectName: "DBMS Practical & Lab",
      section: "Section A",
      date: "2026-09-02",
      startTime: "04:30 PM",
      duration: "50 mins",
      meetUrl: "https://meet.google.com/new",
      status: "completed",
      recordingUrl: "https://drive.google.com/file/d/sample-recording/view",
      attendeeCount: 35,
      agenda: "Live coding demonstration of PostgreSQL stored functions and audit triggers."
    }
  ],

  // Faculty Course Materials (F23)
  materials: [
    {
      id: "fac_mat_001",
      title: "DBMS Unit 3: Normalization & Functional Dependencies",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      category: "Notes",
      sections: ["A", "B"],
      uploadedAt: "2026-09-02",
      fileType: "pdf",
      fileSize: "3.4 MB",
      pages: 42,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      downloads: 68,
      description: "Comprehensive notes covering 1NF to BCNF, lossless join decomposition algorithms, and worked exam questions."
    },
    {
      id: "fac_mat_002",
      title: "DBMS Lecture 8: Relational Query Processing & Cost Estimation",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      category: "Presentations",
      sections: ["A", "B"],
      uploadedAt: "2026-08-30",
      fileType: "ppt",
      fileSize: "4.8 MB",
      slides: 52,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pptx",
      downloads: 64,
      description: "Lecture slides detailing query parse trees, relational algebra optimization rules, and external merge sort."
    },
    {
      id: "fac_mat_003",
      title: "Operating Systems: Process Synchronization & Mutexes",
      subjectCode: "CS404",
      subjectName: "Operating Systems",
      category: "Notes",
      sections: ["A"],
      uploadedAt: "2026-08-25",
      fileType: "pdf",
      fileSize: "4.2 MB",
      pages: 36,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      downloads: 36,
      description: "Critical section problems, Peterson's algorithm, hardware atomic test-and-set, and POSIX semaphore library functions in C."
    },
    {
      id: "fac_mat_004",
      title: "DBMS Lab Manual 2026: PostgreSQL & MongoDB",
      subjectCode: "CS402L",
      subjectName: "DBMS Practical & Lab",
      category: "Lab Manuals",
      sections: ["A", "B"],
      uploadedAt: "2026-08-15",
      fileType: "pdf",
      fileSize: "5.6 MB",
      pages: 64,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      downloads: 72,
      description: "Official practical workbook containing 12 experiments, sample test queries, and rubric guidelines."
    },
    {
      id: "fac_mat_005",
      title: "DBMS Previous 3-Year Mid-Term Exam Question Papers with Solutions",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      category: "Question Papers",
      sections: ["A", "B"],
      uploadedAt: "2026-08-12",
      fileType: "pdf",
      fileSize: "2.8 MB",
      pages: 18,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      downloads: 71,
      description: "University past question papers from 2023–2025 with step-by-step solutions for 3NF and SQL subqueries."
    }
  ],

  // Faculty Announcements (F29)
  announcements: [
    {
      id: "fac_anc_001",
      title: "DBMS Assignment 1 Deadline Extended to Sep 08",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      targetSections: ["A", "B"],
      priority: "high",
      postedAt: "2026-09-04",
      author: "Prof. Sunita Mehta",
      content: "Due to campus sports activities, the submission deadline for Normalization & Schema Design (Assignment 1) is extended to Sep 08, 11:59 PM. Please ensure PDF submissions are clear and legible."
    },
    {
      id: "fac_anc_002",
      title: "Mid-Term Question Paper Format & Syllabus Coverage",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      targetSections: ["A", "B"],
      priority: "urgent",
      postedAt: "2026-09-02",
      author: "Prof. Sunita Mehta",
      content: "The upcoming mid-term exam on Sep 18 will cover Units 1, 2, and 3 (Relational Algebra, SQL, and Normalization up to BCNF). Total marks: 50. Calculators are permitted."
    },
    {
      id: "fac_anc_003",
      title: "Operating Systems Lab 3 Submission Guidelines",
      subjectCode: "CS404",
      subjectName: "Operating Systems",
      targetSections: ["A"],
      priority: "normal",
      postedAt: "2026-08-29",
      author: "Prof. Sunita Mehta",
      content: "Please attach your raw .c source code files along with terminal execution screenshot logs in a zipped folder for the Semaphore practical evaluation."
    }
  ],

  // Student Doubts & Queries Queue (F29)
  doubts: [
    {
      id: "conv_seed_002",
      doubtId: "conv_seed_002",
      studentId: "usr_stu_1001",
      studentName: "Riddhi Zunjarrao",
      studentEmail: "riddhi.z@university.edu",
      rollNo: "21CS4082",
      studentRollNo: "21CS4082",
      subjectCode: "CS405",
      subjectName: "Computer Networks",
      question: "What is the difference between TCP and UDP transport protocols and how does the 3-way handshake work?",
      note: "I am not getting this concept",
      notes: "I am not getting this concept",
      assignedFaculty: "Ramesh Gupta (Department of Computer Engineering)",
      status: "unanswered",
      createdAt: "Today at 07:19 PM",
      answer: ""
    },
    {
      id: "dbt_fac_001",
      studentId: "stu_010",
      studentName: "Riddhi Zunjarrao",
      rollNo: "CS24-042",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      question: "In 3NF decomposition, if a table has composite primary key (A, B) and functional dependency B -> C, is it violating 2NF or 3NF?",
      status: "unanswered",
      createdAt: "Today at 09:30 AM",
      answer: ""
    },
    {
      id: "dbt_fac_002",
      studentId: "stu_004",
      studentName: "Devansh Patel",
      rollNo: "CS24-004",
      subjectCode: "CS404",
      subjectName: "Operating Systems",
      question: "Could you please explain why Peterson's solution does not work reliably on modern multicore architectures with reordered memory instructions?",
      status: "unanswered",
      createdAt: "Yesterday at 04:15 PM",
      answer: ""
    },
    {
      id: "dbt_fac_003",
      studentId: "stu_001",
      studentName: "Aarav Sharma",
      rollNo: "CS24-001",
      subjectCode: "CS402",
      subjectName: "Database Management Systems",
      question: "What is the key difference between Lossless Join Decomposition and Dependency Preservation in relational design?",
      status: "resolved",
      createdAt: "Sep 03, 2026",
      answer: "Lossless Join Decomposition ensures that when sub-relations are natural-joined back together, no spurious tuples are generated (information is not lost). Dependency Preservation ensures that each original functional dependency can be verified on a single decomposed relation without needing expensive cross-table joins.",
      answeredAt: "Sep 03, 2026 at 06:20 PM"
    },
    {
      id: "dbt_fac_004",
      studentId: "stu_015",
      studentName: "Zoya Khan",
      rollNo: "CS24-015",
      subjectCode: "CS402L",
      subjectName: "DBMS Practical & Lab",
      question: "In PostgreSQL, what is the best index type to use for geospatial latitude/longitude queries?",
      status: "resolved",
      createdAt: "Sep 01, 2026",
      answer: "Use GiST (Generalized Search Tree) or SP-GiST indexes with the PostGIS extension, specifically utilizing the R-Tree bounding box operators (e.g. ST_DWithin or &&).",
      answeredAt: "Sep 01, 2026 at 08:00 PM"
    }
  ]
};

// ── MULTI-DOMAIN FACULTY CATALOG ──
const allDomainFaculty = {
  dept_btech: mockFacultyBase,

  dept_bba: {
    profile: {
      id: "usr_fac_bba_1",
      name: "Prof. Priya Nair",
      email: "bba.faculty@university.edu",
      role: "faculty",
      facultyId: "FAC-2024-3001",
      designation: "Associate Professor",
      department: "Department of Business Administration",
      school: "School of Management & Business Studies",
      joiningYear: "2019",
      qualification: "Ph.D. in Corporate Finance (IIM Ahmedabad), M.Com, CFA",
      specialization: "Corporate Valuation, Working Capital Strategies & Financial Statement Analysis",
      officeRoom: "Management Block B, Cabin 208",
      phone: "+91 98220 44556",
      officeHours: "Mon, Wed, Thu: 02:00 PM – 04:00 PM",
      avatar: "../images/student-study.jpg",
      status: "active"
    },
    assignedSubjects: [
      {
        id: "subj_bba204",
        code: "BBA204",
        name: "Corporate Financial Accounting",
        semester: 4,
        department: "Business Administration",
        credits: 4,
        totalHours: 45,
        completedHours: 25,
        sections: ["A", "B"],
        totalStudents: 76,
        schedule: "Mon (09:30 AM), Wed (09:30 AM), Fri (11:00 AM)",
        classroom: "Management Hall 101",
        avgAttendance: 88.0,
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        description: "GAAP/IFRS standards, Balance sheet analysis, Cash flow statements, and Working capital models."
      },
      {
        id: "subj_bba201",
        code: "BBA201",
        name: "Principles of Marketing Strategy",
        semester: 4,
        department: "Business Administration",
        credits: 3,
        totalHours: 40,
        completedHours: 20,
        sections: ["A"],
        totalStudents: 38,
        schedule: "Tue (11:30 AM), Thu (11:30 AM)",
        classroom: "Room 205",
        avgAttendance: 89.2,
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        description: "Market segmentation, STP framework, consumer behavior, omnichannel advertising funnels, and brand equity."
      },
      {
        id: "subj_bba206",
        code: "BBA206",
        name: "Business Analytics & Spreadsheet Modeling",
        semester: 4,
        department: "Business Administration",
        credits: 3,
        totalHours: 35,
        completedHours: 18,
        sections: ["A", "B"],
        totalStudents: 76,
        schedule: "Thu (03:00 PM - 04:30 PM)",
        classroom: "Analytics Lab 2",
        avgAttendance: 87.4,
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        description: "Excel DCF valuation models, scenario managers, regression forecasting, and executive dashboards."
      }
    ],
    studentRoster: [
      { id: "stu_bba_001", rollNo: "BBA24-001", name: "Aarav Mehra", email: "aarav.m@university.edu", semester: 4, section: "A", attendance: 92, submissions: 4, avgScore: 18.0, phone: "+91 98231 00001", status: "Good Standing" },
      { id: "stu_bba_002", rollNo: "BBA24-002", name: "Ananya Saxena", email: "ananya.s@university.edu", semester: 4, section: "A", attendance: 90, submissions: 4, avgScore: 17.5, phone: "+91 98231 00002", status: "Good Standing" },
      { id: "stu_bba_003", rollNo: "BBA24-018", name: "Tanvi Bansal", email: "bba.student@university.edu", semester: 4, section: "A", attendance: 96, submissions: 4, avgScore: 19.5, phone: "+91 98231 66778", status: "Outstanding" },
      { id: "stu_bba_004", rollNo: "BBA24-019", name: "Rohan Kapoor", email: "rohan.k@university.edu", semester: 4, section: "A", attendance: 84, submissions: 3, avgScore: 16.0, phone: "+91 98231 00004", status: "Good Standing" },
      { id: "stu_bba_005", rollNo: "BBA24-020", name: "Simran Kaur", email: "simran.k@university.edu", semester: 4, section: "A", attendance: 88, submissions: 4, avgScore: 17.8, phone: "+91 98231 00005", status: "Good Standing" },
      { id: "stu_bba_006", rollNo: "BBA24-021", name: "Yash Singhania", email: "yash.s@university.edu", semester: 4, section: "A", attendance: 72, submissions: 3, avgScore: 13.5, phone: "+91 98231 00006", status: "Low Attendance Warning" }
    ],
    assignments: [
      {
        id: "fac_asg_bba_001",
        title: "Cash Flow Statement Derivations & Working Capital Analysis",
        subjectCode: "BBA204",
        subjectName: "Corporate Financial Accounting",
        sections: ["A", "B"],
        dueDate: "2026-09-29",
        dueTime: "23:59",
        maxMarks: 25,
        submissionType: "Excel Model (.xlsx) + PDF",
        status: "active",
        publishedAt: "2026-09-15",
        totalAssigned: 76,
        totalSubmitted: 58,
        totalGraded: 35,
        pendingGrading: 23,
        description: "Analyze the 3-statement financial statements of a manufacturing company and evaluate the operating cash cycle."
      },
      {
        id: "fac_asg_bba_002",
        title: "Omnichannel Brand Positioning & Strategy Pitch",
        subjectCode: "BBA201",
        subjectName: "Principles of Marketing Strategy",
        sections: ["A"],
        dueDate: "2026-10-02",
        dueTime: "17:00",
        maxMarks: 20,
        submissionType: "Pitch Deck Presentation (.pptx)",
        status: "active",
        publishedAt: "2026-09-18",
        totalAssigned: 38,
        totalSubmitted: 28,
        totalGraded: 10,
        pendingGrading: 18,
        description: "Develop a brand repositioning strategy targeting Gen-Z with detailed CAC, LTV and ROAS projections."
      }
    ],
    submissions: [
      {
        id: "sub_bba_101",
        assignmentId: "fac_asg_bba_001",
        assignmentTitle: "Cash Flow Statement Derivations",
        subjectCode: "BBA204",
        studentId: "stu_bba_003",
        studentName: "Tanvi Bansal",
        rollNo: "BBA24-018",
        section: "A",
        submittedAt: "2026-09-20 14:15",
        fileName: "Tanvi_Bansal_BBA204_CashFlow.xlsx",
        fileSize: "1.9 MB",
        status: "submitted",
        marks: null,
        maxMarks: 25,
        feedback: ""
      }
    ],
    attendanceHistory: [
      { id: "att_bba_001", date: "2026-09-24", subjectCode: "BBA204", subjectName: "Corporate Financial Accounting", section: "A", totalStudents: 38, presentCount: 34, absentCount: 4, attendancePercentage: 89.5 },
      { id: "att_bba_002", date: "2026-09-23", subjectCode: "BBA201", subjectName: "Principles of Marketing Strategy", section: "A", totalStudents: 38, presentCount: 35, absentCount: 3, attendancePercentage: 92.1 }
    ],
    exams: [
      { id: "exm_fac_bba_1", subject: "Corporate Financial Accounting", subjectCode: "BBA204", title: "Mid-Term Examination", date: "2026-09-29", time: "09:30 AM – 11:30 AM", venue: "Management Hall 101", totalMarks: 50, passingMarks: 20 },
      { id: "exm_fac_bba_2", subject: "Principles of Marketing Strategy", subjectCode: "BBA201", title: "Internal Assessment 1", date: "2026-10-03", time: "02:00 PM – 03:30 PM", venue: "Room 205", totalMarks: 30, passingMarks: 12 }
    ],
    meetings: [
      { id: "meet_bba_001", title: "Corporate Valuation & WACC Office Hours", subjectCode: "BBA204", date: "2026-09-26", time: "02:30 PM", durationMinutes: 60, meetLink: "https://meet.google.com/bba-val-office", attendees: 18 }
    ],
    materials: [
      { id: "mat_fac_bba_1", title: "Corporate Finance Unit 4: Capital Structure & WACC", subjectCode: "BBA204", subject: "Corporate Financial Accounting", category: "Notes", uploadedAt: "Sep 05, 2026", fileType: "pdf", fileSize: "4.1 MB" },
      { id: "mat_fac_bba_2", title: "Marketing Strategy: Consumer Decision Funnel & Omni-channel Deck", subjectCode: "BBA201", subject: "Principles of Marketing Strategy", category: "Presentations", uploadedAt: "Sep 01, 2026", fileType: "ppt", fileSize: "6.2 MB" }
    ],
    announcements: [
      { id: "ann_fac_bba_1", title: "Financial Modeling Lab Guest Lecture by Deloitte Advisory", date: "2026-09-22", author: "Prof. Priya Nair", content: "Industry speaker session on M&A valuation multiples this Friday at 3:00 PM in Management Hall 101." }
    ],
    doubts: [
      { id: "dbt_fac_bba_001", studentId: "stu_bba_003", studentName: "Tanvi Bansal", rollNo: "BBA24-018", subjectCode: "BBA204", subjectName: "Corporate Financial Accounting", question: "When calculating WACC, why do we use market value of debt and equity rather than book value?", status: "unanswered", createdAt: "Today at 10:15 AM", answer: "" }
    ]
  },

  dept_mba: {
    profile: {
      id: "usr_fac_mba_1",
      name: "Prof. Arunav Roy",
      email: "mba.faculty@university.edu",
      role: "faculty",
      facultyId: "FAC-2024-4001",
      designation: "Professor of Practice",
      department: "School of Management & Business Studies",
      school: "School of Management & Business Studies",
      joiningYear: "2017",
      qualification: "MBA (Wharton), B.Tech (IIT Delhi), Ex-Managing Director Goldman Sachs",
      specialization: "Mergers & Acquisitions, Investment Banking, LBO Modeling & Private Equity",
      officeRoom: "Executive Block C, Cabin 110",
      phone: "+91 98220 77665",
      officeHours: "Tue, Thu: 03:00 PM – 05:30 PM",
      avatar: "../images/student-study.jpg",
      status: "active"
    },
    assignedSubjects: [
      {
        id: "subj_mba602",
        code: "MBA602",
        name: "Mergers, Acquisitions & Restructuring",
        semester: 4,
        department: "MBA",
        credits: 4,
        totalHours: 45,
        completedHours: 28,
        sections: ["A"],
        totalStudents: 60,
        schedule: "Tue (12:00 PM), Thu (12:00 PM)",
        classroom: "Room 401 / Executive Case Room",
        avgAttendance: 91.5,
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        description: "Accretion/dilution modeling, LBO debt structuring, synergy realization, and antitrust regulatory review."
      },
      {
        id: "subj_mba603",
        code: "MBA603",
        name: "Investment Banking & Private Equity",
        semester: 4,
        department: "MBA",
        credits: 4,
        totalHours: 45,
        completedHours: 26,
        sections: ["A"],
        totalStudents: 60,
        schedule: "Wed (02:30 PM), Fri (02:30 PM)",
        classroom: "Executive Lab",
        avgAttendance: 93.0,
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        description: "IPO syndication, private equity fund economics, venture capital term sheet waterfalls, and distressed debt."
      },
      {
        id: "subj_mba601",
        code: "MBA601",
        name: "Strategic Global Leadership",
        semester: 4,
        department: "MBA",
        credits: 4,
        totalHours: 40,
        completedHours: 24,
        sections: ["A"],
        totalStudents: 60,
        schedule: "Mon (10:00 AM), Wed (10:00 AM)",
        classroom: "Executive Seminar Room A",
        avgAttendance: 94.2,
        syllabusUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
        description: "Harvard Business School case studies, boardroom governance simulations, corporate turnarounds, and ESG."
      }
    ],
    studentRoster: [
      { id: "stu_mba_001", rollNo: "MBA24-001", name: "Anandita Ghosh", email: "anandita.g@university.edu", semester: 4, section: "A", attendance: 95, submissions: 4, avgScore: 28.5, phone: "+91 98232 00001", status: "Outstanding" },
      { id: "stu_mba_002", rollNo: "MBA24-007", name: "Aditya Sengupta", email: "mba.student@university.edu", semester: 4, section: "A", attendance: 96, submissions: 4, avgScore: 29.2, phone: "+91 98232 99001", status: "Outstanding" },
      { id: "stu_mba_003", rollNo: "MBA24-015", name: "Natasha Roy", email: "natasha.r@university.edu", semester: 4, section: "A", attendance: 92, submissions: 4, avgScore: 27.5, phone: "+91 98232 00003", status: "Good Standing" },
      { id: "stu_mba_004", rollNo: "MBA24-023", name: "Siddharth Menon", email: "siddharth.m@university.edu", semester: 4, section: "A", attendance: 90, submissions: 3, avgScore: 26.0, phone: "+91 98232 00004", status: "Good Standing" },
      { id: "stu_mba_005", rollNo: "MBA24-041", name: "Divya Khurana", email: "divya.k@university.edu", semester: 4, section: "A", attendance: 88, submissions: 4, avgScore: 27.0, phone: "+91 98232 00005", status: "Good Standing" }
    ],
    assignments: [
      {
        id: "fac_asg_mba_001",
        title: "Cross-Border Acquisition Feasibility & DCF Valuation",
        subjectCode: "MBA602",
        subjectName: "Mergers, Acquisitions & Restructuring",
        sections: ["A"],
        dueDate: "2026-09-30",
        dueTime: "23:59",
        maxMarks: 30,
        submissionType: "Executive Valuation Brief + Financial Model",
        status: "active",
        publishedAt: "2026-09-12",
        totalAssigned: 60,
        totalSubmitted: 48,
        totalGraded: 32,
        pendingGrading: 16,
        description: "Perform comprehensive DCF and precedent transaction valuation for a $1.2B cross-border acquisition."
      },
      {
        id: "fac_asg_mba_002",
        title: "Portfolio Optimization & Black-Litterman Asset Allocation",
        subjectCode: "MBA603",
        subjectName: "Investment Banking & Private Equity",
        sections: ["A"],
        dueDate: "2026-10-09",
        dueTime: "23:59",
        maxMarks: 20,
        submissionType: "Python Notebook / Excel Quant Model",
        status: "active",
        publishedAt: "2026-09-18",
        totalAssigned: 60,
        totalSubmitted: 36,
        totalGraded: 12,
        pendingGrading: 24,
        description: "Apply Bayesian prior equilibrium returns combined with tactical investor views to build an efficient frontier multi-asset portfolio."
      }
    ],
    submissions: [
      {
        id: "sub_mba_101",
        assignmentId: "fac_asg_mba_001",
        assignmentTitle: "Cross-Border Acquisition Feasibility",
        subjectCode: "MBA602",
        studentId: "stu_mba_002",
        studentName: "Aditya Sengupta",
        rollNo: "MBA24-007",
        section: "A",
        submittedAt: "2026-09-22 17:40",
        fileName: "Aditya_Sengupta_MBA602_Valuation.pdf",
        fileSize: "4.8 MB",
        status: "submitted",
        marks: null,
        maxMarks: 30,
        feedback: ""
      }
    ],
    attendanceHistory: [
      { id: "att_mba_001", date: "2026-09-24", subjectCode: "MBA602", subjectName: "Mergers & Acquisitions", section: "A", totalStudents: 60, presentCount: 56, absentCount: 4, attendancePercentage: 93.3 },
      { id: "att_mba_002", date: "2026-09-23", subjectCode: "MBA603", subjectName: "Investment Banking & PE", section: "A", totalStudents: 60, presentCount: 57, absentCount: 3, attendancePercentage: 95.0 }
    ],
    exams: [
      { id: "exm_fac_mba_1", subject: "Mergers, Acquisitions & Restructuring", subjectCode: "MBA602", title: "Comprehensive Case Assessment", date: "2026-09-30", time: "10:00 AM – 01:00 PM", venue: "Executive Boardroom C", totalMarks: 100, passingMarks: 50 },
      { id: "exm_fac_mba_2", subject: "Strategic Global Leadership", subjectCode: "MBA601", title: "Mid-Term Case Defense", date: "2026-10-04", time: "02:00 PM – 04:00 PM", venue: "Seminar Room A", totalMarks: 50, passingMarks: 25 }
    ],
    meetings: [
      { id: "meet_mba_001", title: "M&A Deal Room Negotiation Simulation", subjectCode: "MBA602", date: "2026-09-27", time: "03:00 PM", durationMinutes: 90, meetLink: "https://meet.google.com/mba-dealroom-live", attendees: 45 }
    ],
    materials: [
      { id: "mat_fac_mba_1", title: "Corporate Valuation: Discounted Cash Flow & Multiples Guide", subjectCode: "MBA602", subject: "Mergers, Acquisitions & Restructuring", category: "Notes", uploadedAt: "Sep 03, 2026", fileType: "pdf", fileSize: "5.4 MB" },
      { id: "mat_fac_mba_2", title: "Private Equity: Leveraged Buyout (LBO) Debt Structuring Framework", subjectCode: "MBA603", subject: "Investment Banking & Private Equity", category: "Reference Material", uploadedAt: "Aug 30, 2026", fileType: "pdf", fileSize: "3.9 MB" }
    ],
    announcements: [
      { id: "ann_fac_mba_1", title: "Wharton Global Consulting Practicum Selection Process", date: "2026-09-21", author: "Prof. Arunav Roy", content: "Executive MBA candidates wishing to participate in the international consulting exchange must submit their cover memo by Friday." }
    ],
    doubts: [
      { id: "dbt_fac_mba_001", studentId: "stu_mba_002", studentName: "Aditya Sengupta", rollNo: "MBA24-007", subjectCode: "MBA602", subjectName: "Mergers, Acquisitions & Restructuring", question: "How does the purchase price allocation (PPA) affect future amortization of identified intangible assets and deferred tax liabilities?", status: "unanswered", createdAt: "Today at 08:45 AM", answer: "" }
    ]
  }
};

function getActiveFacultyDomainKey() {
  if (typeof DomainService !== 'undefined') {
    return DomainService.getActiveDomain();
  }
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('smart_student_active_domain');
    if (saved && allDomainFaculty[saved]) return saved;
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

function getFacultyForDomain(domainId) {
  const d = domainId || getActiveFacultyDomainKey();
  return allDomainFaculty[d] || allDomainFaculty.dept_btech;
}

const mockFaculty = new Proxy({}, {
  get(target, prop) {
    const f = getFacultyForDomain();
    if (prop === 'all') return allDomainFaculty;
    if (prop === 'forDomain') return (id) => getFacultyForDomain(id);
    return f[prop];
  },
  set(target, prop, value) {
    const f = getFacultyForDomain();
    f[prop] = value;
    return true;
  },
  has(target, prop) {
    const f = getFacultyForDomain();
    return prop in f;
  },
  ownKeys() {
    const f = getFacultyForDomain();
    return Reflect.ownKeys(f);
  },
  getOwnPropertyDescriptor(target, prop) {
    const f = getFacultyForDomain();
    return Reflect.getOwnPropertyDescriptor(f, prop);
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockFaculty, allDomainFaculty, getFacultyForDomain };
} else {
  window.mockFaculty = mockFaculty;
  window.allDomainFaculty = allDomainFaculty;
  window.getFacultyForDomain = getFacultyForDomain;
}

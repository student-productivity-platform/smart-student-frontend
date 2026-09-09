/**
 * ==========================================================================
 * SMART STUDENT — Course Service Layer
 * ==========================================================================
 */

const CourseService = (() => {
  const COURSES = [
    {
      id: "crs_cs401",
      code: "CS401",
      name: "Data Structures & Algorithms",
      faculty: "Prof. Rajesh Sharma",
      department: "Computer Engineering",
      credits: 4,
      semester: 4,
      attendance: 92,
      progress: 78,
      nextClass: "Tomorrow • 09:00 AM",
      nextRoom: "Room 204",
      upcomingAssignment: "Balanced Trees & DP (Due Sep 18)",
      officeHours: "Mon & Wed 03:00 PM – 04:30 PM",
      syllabusUrl: "https://res.cloudinary.com/demo/image/upload/syllabus_cs401.pdf",
      units: [
        { unit: "Unit 1", title: "Linear Structures & Analysis", status: "Completed" },
        { unit: "Unit 2", title: "Trees, AVL & B-Trees", status: "Completed" },
        { unit: "Unit 3", title: "Graph Algorithms & Shortest Path", status: "In Progress" },
        { unit: "Unit 4", title: "Dynamic Programming & Greedy", status: "Upcoming" }
      ]
    },
    {
      id: "crs_cs402",
      code: "CS402",
      name: "Database Management Systems",
      faculty: "Prof. Sunita Mehta",
      department: "Computer Engineering",
      credits: 4,
      semester: 4,
      attendance: 84,
      progress: 72,
      nextClass: "Today • 11:00 AM",
      nextRoom: "Room 302",
      upcomingAssignment: "Normalization & 3NF Design (Due Sep 08)",
      officeHours: "Tue & Thu 02:00 PM – 03:30 PM",
      syllabusUrl: "https://res.cloudinary.com/demo/image/upload/syllabus_cs402.pdf",
      units: [
        { unit: "Unit 1", title: "ER Model & Relational Algebra", status: "Completed" },
        { unit: "Unit 2", title: "SQL & Complex Queries", status: "Completed" },
        { unit: "Unit 3", title: "Normalization & Normal Forms", status: "In Progress" },
        { unit: "Unit 4", title: "Transaction & Concurrency Control", status: "Upcoming" }
      ]
    },
    {
      id: "crs_cs403",
      code: "CS403",
      name: "Machine Learning Fundamentals",
      faculty: "Prof. Arvind Patil",
      department: "Computer Engineering",
      credits: 3,
      semester: 4,
      attendance: 89,
      progress: 65,
      nextClass: "Today • 02:00 PM",
      nextRoom: "Online (Google Meet)",
      upcomingAssignment: "Logistic Regression Notebook (Due Sep 10)",
      officeHours: "Wed & Fri 11:00 AM – 12:30 PM",
      syllabusUrl: "https://res.cloudinary.com/demo/image/upload/syllabus_cs403.pdf",
      units: [
        { unit: "Unit 1", title: "Supervised Learning & Cost Functions", status: "Completed" },
        { unit: "Unit 2", title: "Linear & Logistic Regression", status: "Completed" },
        { unit: "Unit 3", title: "Neural Networks & Backpropagation", status: "In Progress" },
        { unit: "Unit 4", title: "Unsupervised Clustering & PCA", status: "Upcoming" }
      ]
    },
    {
      id: "crs_cs404",
      code: "CS404",
      name: "Operating Systems",
      faculty: "Prof. Priya Kulkarni",
      department: "Computer Engineering",
      credits: 4,
      semester: 4,
      attendance: 83,
      progress: 68,
      nextClass: "Friday • 03:30 PM",
      nextRoom: "Computer Lab 3",
      upcomingAssignment: "Process Synchronization (Due Sep 12)",
      officeHours: "Mon & Thu 04:00 PM – 05:00 PM",
      syllabusUrl: "https://res.cloudinary.com/demo/image/upload/syllabus_cs404.pdf",
      units: [
        { unit: "Unit 1", title: "OS Architecture & System Calls", status: "Completed" },
        { unit: "Unit 2", title: "Process Scheduling & IPC", status: "Completed" },
        { unit: "Unit 3", title: "Deadlocks & Semaphores", status: "In Progress" },
        { unit: "Unit 4", title: "Memory Management & Paging", status: "Upcoming" }
      ]
    },
    {
      id: "crs_cs405",
      code: "CS405",
      name: "Computer Networks",
      faculty: "Dr. Vikram Joshi",
      department: "Computer Engineering",
      credits: 3,
      semester: 4,
      attendance: 88,
      progress: 58,
      nextClass: "Monday • 10:00 AM",
      nextRoom: "Room 105",
      upcomingAssignment: "IPv4 Subnetting & CIDR (Graded)",
      officeHours: "Tue & Fri 03:00 PM – 04:00 PM",
      syllabusUrl: "https://res.cloudinary.com/demo/image/upload/syllabus_cs405.pdf",
      units: [
        { unit: "Unit 1", title: "OSI & TCP/IP Layered Architecture", status: "Completed" },
        { unit: "Unit 2", title: "Data Link Layer & MAC Protocols", status: "Completed" },
        { unit: "Unit 3", title: "Network Layer & IPv4/IPv6 Routing", status: "In Progress" },
        { unit: "Unit 4", title: "Transport Layer UDP/TCP & Congestion", status: "Upcoming" }
      ]
    }
  ];

  async function getEnrolledCourses() {
    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        const snap = await db.collection('courses').get();
        if (!snap.empty) {
          return snap.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      } catch (e) {
        console.warn('Courses fetch error:', e);
      }
    }
    return COURSES;
  }

  return { getEnrolledCourses };
})();

if (typeof window !== 'undefined') {
  window.CourseService = CourseService;
}

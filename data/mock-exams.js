/**
 * Centralized Mock Data: Scheduled Exams & Internal Assessments
 */
const mockExams = [
  {
    id: "exm_001",
    subject: "Machine Learning",
    subjectCode: "CS403",
    title: "Mid-Term Examination",
    type: "Mid-Term",
    date: "September 14, 2026",
    day: "14",
    month: "SEP",
    time: "10:00 AM – 12:00 PM",
    duration: "2 Hours",
    venue: "Exam Hall A (Block 2)",
    seatNumber: "Row 4 • Desk 18",
    hallTicketNo: "HT-2026-CS4-042",
    syllabus: "Units 1, 2 & 3: Supervised Regression, Gradient Descent, Classification Models",
    totalMarks: 50,
    passingMarks: 20,
    instructions: "Scientific calculators allowed. Mobile phones and smart watches strictly prohibited in the exam hall. Arrive 15 minutes prior to start."
  },
  {
    id: "exm_002",
    subject: "Database Management Systems",
    subjectCode: "CS402",
    title: "Internal Assessment 1",
    type: "Internal Assessment",
    date: "September 17, 2026",
    day: "17",
    month: "SEP",
    time: "02:00 PM – 03:30 PM",
    duration: "1.5 Hours",
    venue: "Room 302 (Block 1)",
    seatNumber: "Desk 24",
    hallTicketNo: "HT-2026-CS4-042",
    syllabus: "ER Modeling, Relational Algebra, SQL Query Optimization & 3NF Decomposition",
    totalMarks: 30,
    passingMarks: 12,
    instructions: "Standard blue/black pen required. Rough sheets will be provided."
  },
  {
    id: "exm_003",
    subject: "Data Structures & Algorithms",
    subjectCode: "CS401",
    title: "Mid-Term Examination",
    type: "Mid-Term",
    date: "September 22, 2026",
    day: "22",
    month: "SEP",
    time: "09:30 AM – 11:30 AM",
    duration: "2 Hours",
    venue: "Exam Hall B (Block 1)",
    seatNumber: "Row 2 • Desk 08",
    hallTicketNo: "HT-2026-CS4-042",
    syllabus: "Trees (AVL/Red-Black), Graph Traversal (DFS/BFS), Shortest Path & Dynamic Programming",
    totalMarks: 50,
    passingMarks: 20,
    instructions: "Clean pseudocode or C++/Java syntax accepted. Draw complete diagrams for tree rotations."
  },
  {
    id: "exm_004",
    subject: "Operating Systems",
    subjectCode: "CS404",
    title: "Practical Lab Examination",
    type: "Lab Assessment",
    date: "September 25, 2026",
    day: "25",
    month: "SEP",
    time: "01:30 PM – 04:30 PM",
    duration: "3 Hours",
    venue: "Computing Lab 3",
    seatNumber: "Terminal 14",
    hallTicketNo: "HT-2026-CS4-042",
    syllabus: "POSIX Semaphores, Mutex Implementation, Fork/Exec Processes, Paging Algorithms",
    totalMarks: 25,
    passingMarks: 10,
    instructions: "Linux terminal workstation will be assigned. Code compilation and viva voce will be conducted by internal faculty."
  },
  {
    id: "exm_005",
    subject: "Computer Networks",
    subjectCode: "CS405",
    title: "Mid-Term Examination",
    type: "Mid-Term",
    date: "September 29, 2026",
    day: "29",
    month: "SEP",
    time: "10:00 AM – 12:00 PM",
    duration: "2 Hours",
    venue: "Exam Hall A (Block 2)",
    seatNumber: "Row 5 • Desk 22",
    hallTicketNo: "HT-2026-CS4-042",
    syllabus: "OSI/TCP Reference Models, Framing, CSMA/CD, IPv4 Subnetting & Dijkstra Routing",
    totalMarks: 50,
    passingMarks: 20,
    instructions: "Calculator allowed for subnetting calculations."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockExams };
} else {
  window.mockExams = mockExams;
}

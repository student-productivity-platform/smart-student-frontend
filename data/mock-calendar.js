/**
 * Centralized Mock Data: Academic Calendar Events & Milestones
 * Semester 4 — Academic Year 2026-2027
 */
const mockCalendar = [
  {
    id: "cal_001",
    date: "2026-09-08",
    displayDate: "Sep 08, 2026",
    time: "11:59 PM",
    title: "DBMS Normalization Assignment Deadline",
    courseId: "CS402",
    subject: "Database Management Systems",
    type: "assignment",
    venue: "Canvas / Smart Student Portal",
    description: "Submit 3NF and BCNF relational decomposition report and schema validation scripts."
  },
  {
    id: "cal_002",
    date: "2026-09-09",
    displayDate: "Sep 09, 2026",
    time: "10:00 AM - 11:30 AM",
    title: "Operating Systems Semaphore Practical Lab",
    courseId: "CS404",
    subject: "Operating Systems",
    type: "class",
    venue: "Lab Complex Room 402",
    description: "Hands-on implementation of POSIX Semaphores and Producer-Consumer problem in C."
  },
  {
    id: "cal_003",
    date: "2026-09-11",
    displayDate: "Sep 11, 2026",
    time: "02:00 PM - 03:00 PM",
    title: "Operating Systems Surprise Quiz",
    courseId: "CS404",
    subject: "Operating Systems",
    type: "exam",
    venue: "Lecture Hall LH-301",
    description: "Assessment covering Deadlock prevention, Banker's Algorithm, and Semaphores."
  },
  {
    id: "cal_004",
    date: "2026-09-14",
    displayDate: "Sep 14, 2026",
    time: "10:00 AM - 01:00 PM",
    title: "Machine Learning Mid-Term Examination",
    courseId: "CS403",
    subject: "Machine Learning",
    type: "exam",
    venue: "Exam Center Hall B (Desk 042)",
    description: "University mid-term theory exam covering Supervised Learning, Gradient Descent, and SVMs."
  },
  {
    id: "cal_005",
    date: "2026-09-15",
    displayDate: "Sep 15, 2026",
    time: "11:59 PM",
    title: "Software Engineering SRS Deliverable",
    courseId: "CS406",
    subject: "Software Engineering",
    type: "assignment",
    venue: "Portal Portal Upload",
    description: "Comprehensive IEEE-standard Software Requirements Specification with UML diagrams."
  },
  {
    id: "cal_006",
    date: "2026-09-16",
    displayDate: "Sep 16, 2026",
    time: "10:00 AM - 01:00 PM",
    title: "Database Management Systems Mid-Term",
    courseId: "CS402",
    subject: "Database Management Systems",
    type: "exam",
    venue: "Exam Center Hall B (Desk 042)",
    description: "University mid-term exam covering SQL, Relational Algebra, and Normal Forms."
  },
  {
    id: "cal_007",
    date: "2026-09-19",
    displayDate: "Sep 19, 2026",
    time: "03:30 PM - 05:00 PM",
    title: "Faculty Mentorship & Academic Review Session",
    courseId: "ACAD",
    subject: "Academic Advising",
    type: "milestone",
    venue: "Department Seminar Room CS-2",
    description: "One-on-one progress review with Dr. Arvind Menon regarding attendance and project roadmap."
  },
  {
    id: "cal_008",
    date: "2026-09-22",
    displayDate: "Sep 22, 2026",
    time: "11:59 PM",
    title: "Computer Networks Packet Tracer Lab Submission",
    courseId: "CS405",
    subject: "Computer Networks",
    type: "assignment",
    venue: "Portal Upload",
    description: "Configured .pkt topology with RIP routing and VLAN segregation."
  },
  {
    id: "cal_009",
    date: "2026-09-25",
    displayDate: "Sep 25, 2026",
    time: "09:00 AM - 05:00 PM",
    title: "Annual University Hackathon — DevSprint 2026",
    courseId: "EXTRA",
    subject: "Student Activities",
    type: "milestone",
    venue: "Main Auditorium & Innovation Hub",
    description: "24-hour university coding sprint for engineering students."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockCalendar };
} else {
  window.mockCalendar = mockCalendar;
}

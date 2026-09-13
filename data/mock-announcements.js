/**
 * Centralized Mock Data: Institutional Announcements & Circulars
 */
const mockAnnouncements = [
  {
    id: "anc_001",
    title: "Mid-Term Examination Schedule Published",
    description: "The official timetable for Semester 4 Mid-Term Examinations is now released. Students must check their hall allocations.",
    date: "Sep 04, 2026",
    author: "Office of the Controller of Examinations",
    priority: "high"
  },
  {
    id: "anc_002",
    title: "Machine Learning Doubt Clarification Session",
    description: "Prof. Arvind Patil will host an online Google Meet review session this Friday at 4:00 PM to address Unit 2 queries.",
    date: "Sep 03, 2026",
    author: "Dept. of Computer Engineering",
    priority: "normal"
  },
  {
    id: "anc_003",
    title: "Project Submission Deadline Updated",
    description: "Phase 1 Software Engineering SRS submission deadline has been extended to September 15, 2026 by 11:59 PM.",
    date: "Sep 01, 2026",
    author: "Project Coordination Committee",
    priority: "normal"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockAnnouncements };
} else {
  window.mockAnnouncements = mockAnnouncements;
}

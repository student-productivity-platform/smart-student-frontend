/**
 * Centralized Mock Data: Today's Class Timetable
 * Schema includes Google Meet details for online lectures
 */
const mockSchedule = [
  {
    id: "cls_001",
    time: "09:00 AM",
    endTime: "10:00 AM",
    subject: "Data Structures & Algorithms",
    subjectCode: "CS401",
    faculty: "Prof. Rajesh Sharma",
    room: "Room 204",
    isOnline: false,
    isActive: false
  },
  {
    id: "cls_002",
    time: "11:00 AM",
    endTime: "12:00 PM",
    subject: "Database Management Systems",
    subjectCode: "CS402",
    faculty: "Prof. Sunita Mehta",
    room: "Room 302",
    isOnline: false,
    isActive: true // Current / Upcoming active class
  },
  {
    id: "cls_003",
    time: "02:00 PM",
    endTime: "03:00 PM",
    subject: "Machine Learning Fundamentals",
    subjectCode: "CS403",
    faculty: "Prof. Arvind Patil",
    room: "Online Lecture",
    isOnline: true,
    meetingUrl: "https://meet.google.com/abc-defg-hij",
    meetingId: "abc-defg-hij",
    isActive: false
  },
  {
    id: "cls_004",
    time: "03:30 PM",
    endTime: "05:00 PM",
    subject: "Operating Systems Lab",
    subjectCode: "CS404L",
    faculty: "Prof. Priya Kulkarni",
    room: "Computer Lab 3",
    isOnline: false,
    isActive: false
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockSchedule };
} else {
  window.mockSchedule = mockSchedule;
}

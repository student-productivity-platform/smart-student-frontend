/**
 * Centralized Mock Data: Today's Class Timetable
 * Schema includes Google Meet details for online lectures
 * Multi-Domain Dynamic Resolution:
 * - dept_btech (Computer Science & Engineering)
 * - dept_bba   (Business Administration & Analytics)
 * - dept_mba   (Executive Leadership & Strategic Finance)
 */

const allDomainSchedules = {
  dept_btech: [
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
  ],

  dept_bba: [
    {
      id: "cls_bba_1",
      time: "09:30 AM",
      endTime: "10:30 AM",
      subject: "Corporate Financial Accounting",
      subjectCode: "BBA204",
      faculty: "Prof. Priya Nair",
      room: "Management Hall 101",
      isOnline: false,
      isActive: false
    },
    {
      id: "cls_bba_2",
      time: "11:30 AM",
      endTime: "12:30 PM",
      subject: "Principles of Marketing Strategy",
      subjectCode: "BBA201",
      faculty: "Prof. Vikram Saxena",
      room: "Room 205",
      isOnline: false,
      isActive: true
    },
    {
      id: "cls_bba_3",
      time: "01:30 PM",
      endTime: "02:30 PM",
      subject: "Managerial Economics & Market Structures",
      subjectCode: "BBA203",
      faculty: "Prof. Siddharth Joshi",
      room: "Room 208",
      isOnline: false,
      isActive: false
    },
    {
      id: "cls_bba_4",
      time: "03:00 PM",
      endTime: "04:30 PM",
      subject: "Business Analytics & Spreadsheet Lab",
      subjectCode: "BBA206",
      faculty: "Prof. Rohan Malhotra",
      room: "Analytics Lab 2",
      isOnline: false,
      isActive: false
    }
  ],

  dept_mba: [
    {
      id: "cls_mba_1",
      time: "09:00 AM",
      endTime: "10:30 AM",
      subject: "Strategic Leadership & Corporate Governance",
      subjectCode: "MBA501",
      faculty: "Dr. Rajesh Patil",
      room: "Executive Boardroom 1",
      isOnline: false,
      isActive: false
    },
    {
      id: "cls_mba_2",
      time: "11:00 AM",
      endTime: "12:30 PM",
      subject: "Corporate Financial Engineering & Restructuring",
      subjectCode: "MBA502",
      faculty: "Prof. Arunav Roy",
      room: "Case Study Room B",
      isOnline: false,
      isActive: true
    },
    {
      id: "cls_mba_3",
      time: "02:00 PM",
      endTime: "03:30 PM",
      subject: "Advanced Marketing Analytics & Consumer Insights",
      subjectCode: "MBA503",
      faculty: "Prof. Sunaina Kapoor",
      room: "Analytics Suite",
      isOnline: false,
      isActive: false
    },
    {
      id: "cls_mba_4",
      time: "04:00 PM",
      endTime: "05:30 PM",
      subject: "Global Supply Chain Strategy & Logistics",
      subjectCode: "MBA504",
      faculty: "Prof. Sanjay Rao",
      room: "Executive Virtual Suite",
      isOnline: true,
      meetingUrl: "https://meet.google.com/mba-exec-supply",
      meetingId: "mba-exec-supply",
      isActive: false
    }
  ]
};

function getActiveDomainKey() {
  if (typeof DomainService !== 'undefined' && DomainService.getActiveDomain) {
    return DomainService.getActiveDomain();
  }
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('smart_student_active_domain');
    if (saved && (saved === 'dept_btech' || saved === 'dept_bba' || saved === 'dept_mba')) return saved;
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

function getScheduleForDomain(domainId) {
  const d = domainId || getActiveDomainKey();
  if (typeof DOMAINS_CATALOG !== 'undefined' && DOMAINS_CATALOG[d]?.schedule) {
    return DOMAINS_CATALOG[d].schedule;
  }
  if (typeof window !== 'undefined' && window.DOMAINS_CATALOG && window.DOMAINS_CATALOG[d]?.schedule) {
    return window.DOMAINS_CATALOG[d].schedule;
  }
  try {
    const mod = require('./domain-data');
    if (mod.DOMAINS_CATALOG && mod.DOMAINS_CATALOG[d]?.schedule) {
      return mod.DOMAINS_CATALOG[d].schedule;
    }
  } catch (_) {}
  return allDomainSchedules[d] || allDomainSchedules.dept_btech;
}

const mockSchedule = new Proxy([], {
  get(target, prop) {
    const activeList = getScheduleForDomain();
    if (prop === 'length') return activeList.length;
    if (prop === 'getAll') return () => [
      ...allDomainSchedules.dept_btech,
      ...allDomainSchedules.dept_bba,
      ...allDomainSchedules.dept_mba
    ];
    if (prop === 'forDomain') return (id) => getScheduleForDomain(id);
    if (typeof activeList[prop] === 'function') {
      return activeList[prop].bind(activeList);
    }
    return activeList[prop];
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockSchedule, allDomainSchedules, getScheduleForDomain };
} else {
  window.mockSchedule = mockSchedule;
  window.allDomainSchedules = allDomainSchedules;
  window.getScheduleForDomain = getScheduleForDomain;
}

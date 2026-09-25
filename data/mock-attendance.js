/**
 * Centralized Mock Data: Attendance Metrics
 * Includes overall percentage, per-subject breakdown, and recent sessions
 * Multi-Domain Dynamic Resolution:
 * - dept_btech (Computer Science & Engineering)
 * - dept_bba   (Business Administration & Analytics)
 * - dept_mba   (Executive Leadership & Strategic Finance)
 */

const allDomainAttendance = {
  dept_btech: {
    overallPercentage: 87,
    totalClassesHeld: 185,
    totalAttended: 161,
    thresholdRequired: 75,
    status: "Compliant (+12% above mandatory 75% threshold)",
    subjects: [
      {
        subjectCode: "CS401",
        subjectName: "Data Structures & Algorithms",
        faculty: "Prof. Rajesh Sharma",
        attended: 35,
        total: 38,
        percentage: 92,
        status: "safe",
        safeMargin: "Can miss up to 8 sessions safely"
      },
      {
        subjectCode: "CS402",
        subjectName: "Database Management Systems",
        faculty: "Prof. Sunita Mehta",
        attended: 31,
        total: 37,
        percentage: 84,
        status: "safe",
        safeMargin: "Can miss up to 4 sessions safely"
      },
      {
        subjectCode: "CS403",
        subjectName: "Machine Learning",
        faculty: "Prof. Arvind Patil",
        attended: 32,
        total: 36,
        percentage: 89,
        status: "safe",
        safeMargin: "Can miss up to 5 sessions safely"
      },
      {
        subjectCode: "CS404",
        subjectName: "Operating Systems",
        faculty: "Prof. Priya Kulkarni",
        attended: 31,
        total: 37,
        percentage: 83,
        status: "safe",
        safeMargin: "Can miss up to 3 sessions safely"
      },
      {
        subjectCode: "CS405",
        subjectName: "Computer Networks",
        faculty: "Dr. Vikram Joshi",
        attended: 32,
        total: 37,
        percentage: 86,
        status: "safe",
        safeMargin: "Can miss up to 4 sessions safely"
      }
    ],
    recentSessions: [
      { date: "Sep 05, 2026", time: "11:00 AM", subject: "Database Management Systems", subjectCode: "CS402", faculty: "Prof. Sunita Mehta", status: "Present", room: "Room 302" },
      { date: "Sep 05, 2026", time: "09:00 AM", subject: "Data Structures & Algorithms", subjectCode: "CS401", faculty: "Prof. Rajesh Sharma", status: "Present", room: "Room 204" },
      { date: "Sep 04, 2026", time: "02:00 PM", subject: "Machine Learning", subjectCode: "CS403", faculty: "Prof. Arvind Patil", status: "Present", room: "Online Meet" },
      { date: "Sep 04, 2026", time: "10:00 AM", subject: "Computer Networks", subjectCode: "CS405", faculty: "Dr. Vikram Joshi", status: "Present", room: "Room 105" },
      { date: "Sep 03, 2026", time: "03:30 PM", subject: "Operating Systems Lab", subjectCode: "CS404L", faculty: "Prof. Priya Kulkarni", status: "Present", room: "Lab 3" },
      { date: "Sep 02, 2026", time: "11:00 AM", subject: "Database Management Systems", subjectCode: "CS402", faculty: "Prof. Sunita Mehta", status: "Present", room: "Room 302" },
      { date: "Sep 01, 2026", time: "09:00 AM", subject: "Data Structures & Algorithms", subjectCode: "CS401", faculty: "Prof. Rajesh Sharma", status: "Medical Leave", room: "Room 204" }
    ]
  },

  dept_bba: {
    overallPercentage: 89,
    totalClassesHeld: 172,
    totalAttended: 153,
    thresholdRequired: 75,
    status: "Compliant (+14% above mandatory 75% threshold)",
    subjects: [
      {
        subjectCode: "BBA204",
        subjectName: "Corporate Financial Accounting",
        faculty: "Prof. Priya Nair",
        attended: 35,
        total: 38,
        percentage: 92,
        status: "safe",
        safeMargin: "Can miss up to 7 sessions safely"
      },
      {
        subjectCode: "BBA201",
        subjectName: "Principles of Marketing Strategy",
        faculty: "Prof. Vikram Saxena",
        attended: 31,
        total: 35,
        percentage: 89,
        status: "safe",
        safeMargin: "Can miss up to 5 sessions safely"
      },
      {
        subjectCode: "BBA203",
        subjectName: "Managerial Economics & Market Structures",
        faculty: "Prof. Siddharth Joshi",
        attended: 29,
        total: 34,
        percentage: 85,
        status: "safe",
        safeMargin: "Can miss up to 4 sessions safely"
      },
      {
        subjectCode: "BBA205",
        subjectName: "Business Law & Corporate Ethics",
        faculty: "Dr. Meera Sen",
        attended: 31,
        total: 34,
        percentage: 91,
        status: "safe",
        safeMargin: "Can miss up to 6 sessions safely"
      },
      {
        subjectCode: "BBA206",
        subjectName: "Business Analytics & Spreadsheet Lab",
        faculty: "Prof. Rohan Malhotra",
        attended: 27,
        total: 31,
        percentage: 87,
        status: "safe",
        safeMargin: "Can miss up to 4 sessions safely"
      }
    ],
    recentSessions: [
      { date: "Sep 05, 2026", time: "09:30 AM", subject: "Corporate Financial Accounting", subjectCode: "BBA204", faculty: "Prof. Priya Nair", status: "Present", room: "Management Hall 101" },
      { date: "Sep 05, 2026", time: "11:30 AM", subject: "Principles of Marketing Strategy", subjectCode: "BBA201", faculty: "Prof. Vikram Saxena", status: "Present", room: "Room 205" },
      { date: "Sep 04, 2026", time: "01:30 PM", subject: "Managerial Economics & Market Structures", subjectCode: "BBA203", faculty: "Prof. Siddharth Joshi", status: "Present", room: "Room 208" },
      { date: "Sep 03, 2026", time: "03:00 PM", subject: "Business Analytics & Spreadsheet Lab", subjectCode: "BBA206", faculty: "Prof. Rohan Malhotra", status: "Present", room: "Analytics Lab 2" },
      { date: "Sep 02, 2026", time: "10:00 AM", subject: "Business Law & Corporate Ethics", subjectCode: "BBA205", faculty: "Dr. Meera Sen", status: "Present", room: "Hall 101" }
    ]
  },

  dept_mba: {
    overallPercentage: 92,
    totalClassesHeld: 154,
    totalAttended: 142,
    thresholdRequired: 80,
    status: "Compliant (+12% above executive 80% threshold)",
    subjects: [
      {
        subjectCode: "MBA502",
        subjectName: "Corporate Financial Engineering & Restructuring",
        faculty: "Prof. Arunav Roy",
        attended: 32,
        total: 34,
        percentage: 94,
        status: "safe",
        safeMargin: "Can miss up to 5 sessions safely"
      },
      {
        subjectCode: "MBA501",
        subjectName: "Strategic Leadership & Corporate Governance",
        faculty: "Dr. Rajesh Patil",
        attended: 29,
        total: 31,
        percentage: 93,
        status: "safe",
        safeMargin: "Can miss up to 4 sessions safely"
      },
      {
        subjectCode: "MBA503",
        subjectName: "Advanced Marketing Analytics & Consumer Insights",
        faculty: "Prof. Sunaina Kapoor",
        attended: 28,
        total: 30,
        percentage: 93,
        status: "safe",
        safeMargin: "Can miss up to 4 sessions safely"
      },
      {
        subjectCode: "MBA504",
        subjectName: "Global Supply Chain Strategy & Logistics",
        faculty: "Prof. Sanjay Rao",
        attended: 27,
        total: 30,
        percentage: 90,
        status: "safe",
        safeMargin: "Can miss up to 3 sessions safely"
      },
      {
        subjectCode: "MBA505",
        subjectName: "People Analytics & Executive Organization Design",
        faculty: "Dr. Rajesh Patil",
        attended: 26,
        total: 29,
        percentage: 90,
        status: "safe",
        safeMargin: "Can miss up to 3 sessions safely"
      }
    ],
    recentSessions: [
      { date: "Sep 05, 2026", time: "09:00 AM", subject: "Strategic Leadership & Corporate Governance", subjectCode: "MBA501", faculty: "Dr. Rajesh Patil", status: "Present", room: "Executive Boardroom 1" },
      { date: "Sep 05, 2026", time: "11:00 AM", subject: "Corporate Financial Engineering & Restructuring", subjectCode: "MBA502", faculty: "Prof. Arunav Roy", status: "Present", room: "Case Study Room B" },
      { date: "Sep 04, 2026", time: "02:00 PM", subject: "Advanced Marketing Analytics & Consumer Insights", subjectCode: "MBA503", faculty: "Prof. Sunaina Kapoor", status: "Present", room: "Analytics Suite" },
      { date: "Sep 03, 2026", time: "04:00 PM", subject: "Global Supply Chain Strategy & Logistics", subjectCode: "MBA504", faculty: "Prof. Sanjay Rao", status: "Present", room: "Boardroom 2" }
    ]
  }
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

function getAttendanceForDomain(domainId) {
  const d = domainId || getActiveDomainKey();
  if (typeof DOMAINS_CATALOG !== 'undefined' && DOMAINS_CATALOG[d]?.attendance) {
    return DOMAINS_CATALOG[d].attendance;
  }
  if (typeof window !== 'undefined' && window.DOMAINS_CATALOG && window.DOMAINS_CATALOG[d]?.attendance) {
    return window.DOMAINS_CATALOG[d].attendance;
  }
  try {
    const mod = require('./domain-data');
    if (mod.DOMAINS_CATALOG && mod.DOMAINS_CATALOG[d]?.attendance) {
      return mod.DOMAINS_CATALOG[d].attendance;
    }
  } catch (_) {}
  return allDomainAttendance[d] || allDomainAttendance.dept_btech;
}

const mockAttendance = new Proxy({}, {
  get(target, prop) {
    const activeData = getAttendanceForDomain();
    if (prop === 'all') return allDomainAttendance;
    if (prop === 'forDomain') return (id) => getAttendanceForDomain(id);
    return activeData[prop];
  },
  set(target, prop, value) {
    const activeData = getAttendanceForDomain();
    activeData[prop] = value;
    return true;
  },
  has(target, prop) {
    const activeData = getAttendanceForDomain();
    return prop in activeData;
  },
  ownKeys() {
    const activeData = getAttendanceForDomain();
    return Reflect.ownKeys(activeData);
  },
  getOwnPropertyDescriptor(target, prop) {
    const activeData = getAttendanceForDomain();
    return Reflect.getOwnPropertyDescriptor(activeData, prop);
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockAttendance, allDomainAttendance, getAttendanceForDomain };
} else {
  window.mockAttendance = mockAttendance;
  window.allDomainAttendance = allDomainAttendance;
  window.getAttendanceForDomain = getAttendanceForDomain;
}

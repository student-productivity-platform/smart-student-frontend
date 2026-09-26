/**
 * Centralized Mock Data: Academic Calendar Events & Milestones
 * Multi-Domain Dynamic Resolution:
 * - dept_btech (Computer Science & Engineering)
 * - dept_bba   (Business Administration & Analytics)
 * - dept_mba   (Executive Leadership & Strategic Finance)
 */

const allDomainCalendar = {
  dept_btech: [
    {
      id: "cal_001",
      date: "2026-09-08",
      displayDate: "Sep 08, 2026",
      time: "11:59 PM",
      title: "DBMS Normalization Assignment Deadline",
      courseId: "CS402",
      subject: "Database Management Systems",
      type: "assignment",
      venue: "Portal Submission",
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
      venue: "Portal Upload",
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
  ],

  dept_bba: [
    {
      id: "cal_bba_001",
      date: "2026-09-09",
      displayDate: "Sep 09, 2026",
      time: "10:00 AM - 11:30 AM",
      title: "Financial Statement Analysis & Ratio Workshop",
      courseId: "BBA204",
      subject: "Corporate Financial Accounting",
      type: "class",
      venue: "Management Hall 101",
      description: "Hands-on analysis of balance sheet liquidity, DuPont decomposition, and working capital cycles."
    },
    {
      id: "cal_bba_002",
      date: "2026-09-12",
      displayDate: "Sep 12, 2026",
      time: "11:59 PM",
      title: "Principles of Marketing Segmentation Brief Submission",
      courseId: "BBA201",
      subject: "Principles of Marketing Strategy",
      type: "assignment",
      venue: "Institutional Portal",
      description: "Submit STP positioning matrix and demographic targeting teardown report."
    },
    {
      id: "cal_bba_003",
      date: "2026-09-15",
      displayDate: "Sep 15, 2026",
      time: "02:00 PM - 03:30 PM",
      title: "Managerial Economics Monopoly Pricing Case",
      courseId: "BBA203",
      subject: "Managerial Economics",
      type: "class",
      venue: "Room 205 (Management Block)",
      description: "Analysis of deadweight loss, price discrimination, and market equilibrium."
    },
    {
      id: "cal_bba_004",
      date: "2026-09-18",
      displayDate: "Sep 18, 2026",
      time: "11:59 PM",
      title: "Corporate Accounting Case Study Submission",
      courseId: "BBA204",
      subject: "Corporate Financial Accounting",
      type: "assignment",
      venue: "Institutional Portal",
      description: "Complete financial statement audit case with revenue recognition and inventory valuations."
    },
    {
      id: "cal_bba_005",
      date: "2026-09-22",
      displayDate: "Sep 22, 2026",
      time: "03:00 PM - 05:00 PM",
      title: "Corporate Leadership & Industry Immersion Talk",
      courseId: "ACAD",
      subject: "Executive Colloquium",
      type: "milestone",
      venue: "Management Seminar Hall 1",
      description: "Guest keynote by senior industry leaders on emerging retail and consumer market disruptions."
    },
    {
      id: "cal_bba_006",
      date: "2026-09-26",
      displayDate: "Sep 26, 2026",
      time: "09:30 AM - 11:30 AM",
      title: "Organizational Behavior Team Presentation",
      courseId: "BBA202",
      subject: "Organizational Behavior",
      type: "class",
      venue: "Seminar Room 104",
      description: "Group case presentations on team conflict resolution, organizational culture, and change management."
    },
    {
      id: "cal_bba_007",
      date: "2026-09-29",
      displayDate: "Sep 29, 2026",
      time: "09:30 AM - 11:30 AM",
      title: "Corporate Financial Accounting Mid-Term Exam",
      courseId: "BBA204",
      subject: "Corporate Financial Accounting",
      type: "exam",
      venue: "Management Hall 101",
      description: "Mid-term university exam covering financial statements, cash flow modeling, and capital structure."
    },
    {
      id: "cal_bba_008",
      date: "2026-10-03",
      displayDate: "Oct 03, 2026",
      time: "02:00 PM - 03:30 PM",
      title: "Marketing Strategy Internal Assessment 1",
      courseId: "BBA201",
      subject: "Principles of Marketing Strategy",
      type: "exam",
      venue: "Room 205 (Management Block)",
      description: "Internal assessment covering brand positioning, STP framework, and 4Ps tactical execution."
    }
  ],

  dept_mba: [
    {
      id: "cal_mba_001",
      date: "2026-09-08",
      displayDate: "Sep 08, 2026",
      time: "10:00 AM - 11:30 AM",
      title: "Strategic Global Leadership Executive Masterclass",
      courseId: "MBA601",
      subject: "Strategic Global Leadership",
      type: "class",
      venue: "Executive Seminar Room A",
      description: "Case discussion on enterprise turnaround, blue ocean shift, and geopolitical supply chain disruption."
    },
    {
      id: "cal_mba_002",
      date: "2026-09-12",
      displayDate: "Sep 12, 2026",
      time: "12:00 PM - 01:30 PM",
      title: "M&A LBO Debt Structuring & Synergies Lab",
      courseId: "MBA602",
      subject: "Mergers, Acquisitions & Restructuring",
      type: "class",
      venue: "Executive Lab 401",
      description: "Hands-on financial modeling of debt tranches, interest tax shields, and post-merger integration."
    },
    {
      id: "cal_mba_003",
      date: "2026-09-15",
      displayDate: "Sep 15, 2026",
      time: "11:59 PM",
      title: "Cross-Border Acquisition DCF Valuation Submission",
      courseId: "MBA602",
      subject: "Mergers, Acquisitions & Restructuring",
      type: "assignment",
      venue: "Executive Portal Upload",
      description: "Submission of DCF valuation deck and sensitivity tables for $1.2B cross-border acquisition."
    },
    {
      id: "cal_mba_004",
      date: "2026-09-18",
      displayDate: "Sep 18, 2026",
      time: "02:30 PM - 04:00 PM",
      title: "Investment Banking & Private Equity Term Sheet Clinic",
      courseId: "MBA603",
      subject: "Investment Banking & Private Equity",
      type: "class",
      venue: "Executive Lab",
      description: "Review of Series B VC term sheets, liquidation preferences, anti-dilution clauses, and waterfall returns."
    },
    {
      id: "cal_mba_005",
      date: "2026-09-21",
      displayDate: "Sep 21, 2026",
      time: "04:30 PM - 05:30 PM",
      title: "FinTech Architecture & Digital Assets Seminar",
      courseId: "MBA605",
      subject: "FinTech Architecture",
      type: "milestone",
      venue: "Virtual Boardroom",
      description: "Guest seminar on wholesale CBDC rails, smart contract escrow systems, and algorithmic credit scoring."
    },
    {
      id: "cal_mba_006",
      date: "2026-09-24",
      displayDate: "Sep 24, 2026",
      time: "02:00 PM - 04:00 PM",
      title: "Boardroom Case Defense Simulation",
      courseId: "MBA601",
      subject: "Strategic Global Leadership",
      type: "exam",
      venue: "Executive Boardroom 3",
      description: "Executive board presentation defense addressing activist investors and turnaround strategy."
    },
    {
      id: "cal_mba_007",
      date: "2026-09-30",
      displayDate: "Sep 30, 2026",
      time: "10:00 AM - 01:00 PM",
      title: "Mergers, Acquisitions & Restructuring Comprehensive Exam",
      courseId: "MBA602",
      subject: "Mergers, Acquisitions & Restructuring",
      type: "exam",
      venue: "Executive Boardroom C",
      description: "Executive 3-hour comprehensive case exam on corporate valuation, LBO, and antitrust takeover defense."
    },
    {
      id: "cal_mba_008",
      date: "2026-10-04",
      displayDate: "Oct 04, 2026",
      time: "02:00 PM - 04:00 PM",
      title: "Strategic Global Leadership Mid-Term Defense",
      courseId: "MBA601",
      subject: "Strategic Global Leadership",
      type: "exam",
      venue: "Executive Seminar Room A",
      description: "Comprehensive mid-term case defense covering enterprise governance and competitive strategy."
    }
  ]
};

function getActiveDomainKey() {
  if (typeof DomainService !== 'undefined' && DomainService.getActiveDomain) {
    return DomainService.getActiveDomain();
  }
  if (typeof sessionStorage !== 'undefined') {
    try {
      const raw = sessionStorage.getItem('smart_student_session') || localStorage.getItem('smart_student_session');
      if (raw) {
        const u = JSON.parse(raw);
        const d = (u.departmentId || u.department || u.program || u.email || '').toLowerCase();
        if (d.includes('mba')) return 'dept_mba';
        if (d.includes('bba')) return 'dept_bba';
      }
    } catch (_) {}
  }
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('smart_student_active_domain');
    if (saved && (saved === 'dept_btech' || saved === 'dept_bba' || saved === 'dept_mba')) return saved;
  }
  return 'dept_btech';
}

function getCalendarForDomain(domainId) {
  const d = domainId || getActiveDomainKey();
  return allDomainCalendar[d] || allDomainCalendar.dept_btech;
}

const mockCalendar = new Proxy([], {
  get(target, prop) {
    const activeList = getCalendarForDomain();
    if (prop === 'length') return activeList.length;
    if (prop === 'getAll') return () => [
      ...allDomainCalendar.dept_btech,
      ...allDomainCalendar.dept_bba,
      ...allDomainCalendar.dept_mba
    ];
    if (prop === 'forDomain') return (id) => getCalendarForDomain(id);
    if (typeof activeList[prop] === 'function') {
      return activeList[prop].bind(activeList);
    }
    return activeList[prop];
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockCalendar, allDomainCalendar, getCalendarForDomain };
} else {
  window.mockCalendar = mockCalendar;
  window.allDomainCalendar = allDomainCalendar;
  window.getCalendarForDomain = getCalendarForDomain;
}

/**
 * Centralized Mock Data: Scheduled Exams & Internal Assessments
 * Multi-Domain Dynamic Resolution:
 * - dept_btech (Computer Science & Engineering)
 * - dept_bba   (Business Administration & Analytics)
 * - dept_mba   (Executive Leadership & Strategic Finance)
 */

const allDomainExams = {
  dept_btech: [
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
      title: "Internal Assessment 2",
      type: "Internal Assessment",
      date: "September 26, 2026",
      day: "26",
      month: "SEP",
      time: "11:00 AM – 12:30 PM",
      duration: "1.5 Hours",
      venue: "Room 204 (Block 2)",
      seatNumber: "Desk 11",
      hallTicketNo: "HT-2026-CS4-042",
      syllabus: "Deadlock (Coffman conditions, Banker's Algorithm), Memory Management & Paging",
      totalMarks: 30,
      passingMarks: 12,
      instructions: "Calculators not required. No electronic gadgets permitted."
    }
  ],

  dept_bba: [
    {
      id: "exm_bba_1",
      subject: "Corporate Financial Accounting",
      subjectCode: "BBA204",
      title: "Mid-Term Examination",
      type: "Mid-Term",
      date: "September 29, 2026",
      day: "29",
      month: "SEP",
      time: "09:30 AM – 11:30 AM",
      duration: "2 Hours",
      venue: "Management Hall 101",
      seatNumber: "Desk B-14",
      hallTicketNo: "HT-2026-BBA-018",
      syllabus: "Financial Statements Analysis, Working Capital, Ratio Modeling & Cash Flow Analysis",
      totalMarks: 50,
      passingMarks: 20,
      instructions: "Financial calculators permitted. Graph sheets provided for trend plotting."
    },
    {
      id: "exm_bba_2",
      subject: "Principles of Marketing Strategy",
      subjectCode: "BBA201",
      title: "Internal Assessment 1",
      type: "Internal Assessment",
      date: "October 03, 2026",
      day: "03",
      month: "OCT",
      time: "02:00 PM – 03:30 PM",
      duration: "1.5 Hours",
      venue: "Room 205 (Management Block)",
      seatNumber: "Desk A-08",
      hallTicketNo: "HT-2026-BBA-018",
      syllabus: "STP Framework, Brand Positioning, 4Ps Strategy & Consumer Decision Funnels",
      totalMarks: 30,
      passingMarks: 12,
      instructions: "Answer with concise business illustrations and real-world case citations."
    },
    {
      id: "exm_bba_3",
      subject: "Managerial Economics & Market Structures",
      subjectCode: "BBA203",
      title: "Mid-Term Examination",
      type: "Mid-Term",
      date: "October 08, 2026",
      day: "08",
      month: "OCT",
      time: "10:00 AM – 12:00 PM",
      duration: "2 Hours",
      venue: "Management Hall 102",
      seatNumber: "Desk C-03",
      hallTicketNo: "HT-2026-BBA-018",
      syllabus: "Demand Forecasting, Production Functions, Market Forms & Game Theory",
      totalMarks: 50,
      passingMarks: 20,
      instructions: "Show step-by-step mathematical working for equilibrium price determinations."
    }
  ],

  dept_mba: [
    {
      id: "exm_mba_1",
      subject: "Corporate Financial Engineering & Restructuring",
      subjectCode: "MBA502",
      title: "Executive Comprehensive Assessment",
      type: "Mid-Term",
      date: "October 02, 2026",
      day: "02",
      month: "OCT",
      time: "09:00 AM – 12:00 PM",
      duration: "3 Hours",
      venue: "Executive Suite Hall 1",
      seatNumber: "Desk EX-05",
      hallTicketNo: "HT-2026-MBA-007",
      syllabus: "LBO Structuring, M&A Synergy Valuation, Debt Capacity & Insolvency Workouts",
      totalMarks: 100,
      passingMarks: 40,
      instructions: "Case analysis format. Excel laptops supplied with secure exam lock-in browser."
    },
    {
      id: "exm_mba_2",
      subject: "Strategic Leadership & Corporate Governance",
      subjectCode: "MBA501",
      title: "Boardroom Case Defense",
      type: "Internal Assessment",
      date: "October 06, 2026",
      day: "06",
      month: "OCT",
      time: "02:00 PM – 04:00 PM",
      duration: "2 Hours",
      venue: "Executive Boardroom 3",
      seatNumber: "Executive Chair 7",
      hallTicketNo: "HT-2026-MBA-007",
      syllabus: "Turnaround Strategy, Activist Investor Negotiations, Board Governance & ESG",
      totalMarks: 50,
      passingMarks: 20,
      instructions: "Individual oral presentation followed by written memorandum submission."
    },
    {
      id: "exm_mba_3",
      subject: "Global Supply Chain Strategy & Logistics",
      subjectCode: "MBA504",
      title: "Supply Chain Crisis Simulation",
      type: "Mid-Term",
      date: "October 12, 2026",
      day: "12",
      month: "OCT",
      time: "10:00 AM – 01:00 PM",
      duration: "3 Hours",
      venue: "Management Simulation Lab",
      seatNumber: "Pod 4",
      hallTicketNo: "HT-2026-MBA-007",
      syllabus: "Geopolitical Risk, Nearshoring Strategy, Inventory Buffering & Bullwhip Control",
      totalMarks: 80,
      passingMarks: 32,
      instructions: "Live simulation scenario with injected market shock events."
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

function getExamsForDomain(domainId) {
  const d = domainId || getActiveDomainKey();
  if (typeof DOMAINS_CATALOG !== 'undefined' && DOMAINS_CATALOG[d]?.exams) {
    return DOMAINS_CATALOG[d].exams;
  }
  if (typeof window !== 'undefined' && window.DOMAINS_CATALOG && window.DOMAINS_CATALOG[d]?.exams) {
    return window.DOMAINS_CATALOG[d].exams;
  }
  try {
    const mod = require('./domain-data');
    if (mod.DOMAINS_CATALOG && mod.DOMAINS_CATALOG[d]?.exams) {
      return mod.DOMAINS_CATALOG[d].exams;
    }
  } catch (_) {}
  return allDomainExams[d] || allDomainExams.dept_btech;
}

const mockExams = new Proxy([], {
  get(target, prop) {
    const activeList = getExamsForDomain();
    if (prop === 'length') return activeList.length;
    if (prop === 'getAll') return () => [
      ...allDomainExams.dept_btech,
      ...allDomainExams.dept_bba,
      ...allDomainExams.dept_mba
    ];
    if (prop === 'forDomain') return (id) => getExamsForDomain(id);
    if (typeof activeList[prop] === 'function') {
      return activeList[prop].bind(activeList);
    }
    return activeList[prop];
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockExams, allDomainExams, getExamsForDomain };
} else {
  window.mockExams = mockExams;
  window.allDomainExams = allDomainExams;
  window.getExamsForDomain = getExamsForDomain;
}

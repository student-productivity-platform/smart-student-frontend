/**
 * Centralized Mock Data: Student Assignments
 * Supports statuses: Pending, Submitted, Overdue, Graded
 * Multi-Domain Dynamic Resolution:
 * - dept_btech (Computer Science & Engineering)
 * - dept_bba   (Business Administration & Analytics)
 * - dept_mba   (Executive Leadership & Strategic Finance)
 */

const allDomainAssignments = {
  dept_btech: [
    {
      id: "asg_001",
      title: "Normalization & Relational Schema Design",
      subject: "Database Management Systems",
      subjectCode: "CS402",
      faculty: "Prof. Sunita Mehta",
      dueDate: "Sep 08, 2026",
      dueTime: "11:59 PM",
      status: "pending",
      maxMarks: 20,
      submissionType: "PDF Document Upload",
      description: "Convert the given unnormalized student enrollment data into 3NF and BCNF. Provide detailed functional dependency diagrams and justification for each decomposition step.",
      attachmentName: "DBMS_Assignment_1_Specification.pdf"
    },
    {
      id: "asg_002",
      title: "Linear & Logistic Regression Analysis",
      subject: "Machine Learning",
      subjectCode: "CS403",
      faculty: "Prof. Arvind Patil",
      dueDate: "Sep 10, 2026",
      dueTime: "05:00 PM",
      status: "submitted",
      submittedAt: "Sep 04, 2026 at 03:24 PM",
      maxMarks: 25,
      submissionType: "Jupyter Notebook (.ipynb)",
      description: "Implement cost function and gradient descent for housing price prediction. Compare convergence rates across different learning rates.",
      attachmentName: "housing_dataset_v2.csv",
      submittedFile: "Riddhi_Zunjarrao_ML_Assignment2.ipynb"
    },
    {
      id: "asg_003",
      title: "Process Synchronization with Semaphores",
      subject: "Operating Systems",
      subjectCode: "CS404",
      faculty: "Prof. Priya Kulkarni",
      dueDate: "Sep 12, 2026",
      dueTime: "11:59 PM",
      status: "pending",
      maxMarks: 15,
      submissionType: "C Source File (.c)",
      description: "Solve the Dining Philosophers Problem avoiding deadlock using mutex locks and POSIX semaphores. Include thread execution output logs.",
      attachmentName: "OS_Sync_Lab_Problem_Statement.pdf"
    },
    {
      id: "asg_004",
      title: "IPv4 Subnetting & CIDR Calculation",
      subject: "Computer Networks",
      subjectCode: "CS405",
      faculty: "Dr. Vikram Joshi",
      dueDate: "Aug 30, 2026",
      dueTime: "11:59 PM",
      status: "graded",
      submittedAt: "Aug 29, 2026",
      maxMarks: 15,
      score: 14,
      grade: "A+",
      feedback: "Exceptional subnetting table. Minor deduction for missing broadcast calculation in Subnet 4.",
      submissionType: "Document",
      description: "Design subnet masks for an organization with 5 departments and 250 hosts.",
      submittedFile: "CS405_Subnetting_Solution.pdf"
    },
    {
      id: "asg_005",
      title: "Red-Black Tree Insertion & Rotations",
      subject: "Data Structures & Algorithms",
      subjectCode: "CS401",
      faculty: "Prof. Rajesh Sharma",
      dueDate: "Sep 03, 2026",
      dueTime: "11:59 PM",
      status: "overdue",
      maxMarks: 20,
      submissionType: "PDF Document",
      description: "Trace insertions of 10 keys into an empty Red-Black tree and illustrate each color flip and rotation clearly.",
      attachmentName: "DSA_Trees_Assignment.pdf"
    }
  ],

  dept_bba: [
    {
      id: "asg_bba_1",
      title: "Financial Ratio Analysis & Insolvency Risk Modeling",
      subject: "Corporate Financial Accounting",
      subjectCode: "BBA204",
      faculty: "Prof. Priya Nair",
      dueDate: "Sep 14, 2026",
      dueTime: "11:59 PM",
      status: "pending",
      maxMarks: 25,
      submissionType: "Excel Financial Model (.xlsx)",
      description: "Perform liquidity, solvency, and profitability ratio analysis for selected FMCG conglomerates. Build an Altman Z-score predictor in Excel.",
      attachmentName: "FMCG_Financial_Statements_FY25.xlsx"
    },
    {
      id: "asg_bba_2",
      title: "Omni-channel Customer Acquisition & CAC/LTV Strategy",
      subject: "Principles of Marketing Strategy",
      subjectCode: "BBA201",
      faculty: "Prof. Vikram Saxena",
      dueDate: "Sep 08, 2026",
      dueTime: "05:00 PM",
      status: "submitted",
      submittedAt: "Sep 04, 2026 at 11:20 AM",
      maxMarks: 20,
      submissionType: "Presentation (.pptx)",
      description: "Devise a go-to-market plan for an eco-friendly direct-to-consumer lifestyle brand. Include digital funnel metrics and customer acquisition cost models.",
      submittedFile: "Tanvi_Bansal_GTM_Strategy.pptx"
    },
    {
      id: "asg_bba_3",
      title: "Cross-Elasticity of Demand & Market Pricing Model",
      subject: "Managerial Economics & Market Structures",
      subjectCode: "BBA203",
      faculty: "Prof. Siddharth Joshi",
      dueDate: "Sep 18, 2026",
      dueTime: "11:59 PM",
      status: "pending",
      maxMarks: 20,
      submissionType: "PDF Document",
      description: "Evaluate price elasticity and substitute vulnerability in the Indian ride-hailing and quick-commerce sectors.",
      attachmentName: "Managerial_Economics_Case_2026.pdf"
    },
    {
      id: "asg_bba_4",
      title: "Corporate Governance Audit: The Companies Act Compliance",
      subject: "Business Law & Corporate Ethics",
      subjectCode: "BBA205",
      faculty: "Dr. Meera Sen",
      dueDate: "Aug 29, 2026",
      dueTime: "11:59 PM",
      status: "graded",
      submittedAt: "Aug 28, 2026",
      maxMarks: 15,
      score: 14.5,
      grade: "A+",
      feedback: "Exceptional legal rigor regarding independent director fiduciary responsibilities.",
      submissionType: "Document",
      description: "Critique the board composition and CSR audit compliance of 3 listed Indian entities.",
      submittedFile: "Corporate_Governance_Report_BBA.pdf"
    },
    {
      id: "asg_bba_5",
      title: "Pivot Analysis & Cohort Retention Forecasting",
      subject: "Business Analytics & Spreadsheet Lab",
      subjectCode: "BBA206",
      faculty: "Prof. Rohan Malhotra",
      dueDate: "Sep 02, 2026",
      dueTime: "11:59 PM",
      status: "overdue",
      maxMarks: 20,
      submissionType: "Workbook (.xlsx)",
      description: "Analyze 50,000 retail transaction records using power pivots and dynamic charts.",
      attachmentName: "Retail_Transactions_Dataset.xlsx"
    }
  ],

  dept_mba: [
    {
      id: "asg_mba_1",
      title: "Private Equity Leveraged Buyout (LBO) Model",
      subject: "Corporate Financial Engineering & Restructuring",
      subjectCode: "MBA502",
      faculty: "Prof. Arunav Roy",
      dueDate: "Sep 16, 2026",
      dueTime: "11:59 PM",
      status: "pending",
      maxMarks: 30,
      submissionType: "Excel Financial Model (.xlsx)",
      description: "Construct a dynamic 3-statement LBO model with senior, mezzanine, and sponsor equity tranches. Evaluate IRR sensitivity under multiple exit multiples.",
      attachmentName: "TargetCo_LBO_Specification.xlsx"
    },
    {
      id: "asg_mba_2",
      title: "Corporate M&A Synergy Audit & Post-Merger Integration",
      subject: "Strategic Leadership & Corporate Governance",
      subjectCode: "MBA501",
      faculty: "Dr. Rajesh Patil",
      dueDate: "Sep 09, 2026",
      dueTime: "06:00 PM",
      status: "submitted",
      submittedAt: "Sep 05, 2026 at 09:40 PM",
      maxMarks: 25,
      submissionType: "Executive Dossier (.pdf)",
      description: "Evaluate a $2.4B cross-border acquisition and formulate a 100-day post-merger cultural and operational integration roadmap.",
      submittedFile: "Aditya_Sengupta_Strategic_Integration_Dossier.pdf"
    },
    {
      id: "asg_mba_3",
      title: "Global Supply Chain Disruptions & Nearshoring Strategy",
      subject: "Global Supply Chain Strategy & Logistics",
      subjectCode: "MBA504",
      faculty: "Prof. Sanjay Rao",
      dueDate: "Sep 22, 2026",
      dueTime: "11:59 PM",
      status: "pending",
      maxMarks: 25,
      submissionType: "Strategy Memorandum",
      description: "Formulate a dual-sourcing procurement network resisting geopolitical disruptions in semiconductor supply chains.",
      attachmentName: "Global_Supply_Chain_2026_Brief.pdf"
    },
    {
      id: "asg_mba_4",
      title: "Customer Lifetime Value (CLV) Optimization via Machine Learning",
      subject: "Advanced Marketing Analytics & Consumer Insights",
      subjectCode: "MBA503",
      faculty: "Prof. Sunaina Kapoor",
      dueDate: "Aug 27, 2026",
      dueTime: "11:59 PM",
      status: "graded",
      submittedAt: "Aug 26, 2026",
      maxMarks: 20,
      score: 19,
      grade: "O (Outstanding)",
      feedback: "Boardroom-ready data storytelling with flawless cohort survival analysis.",
      submissionType: "Executive Deck",
      description: "Quantify churn probabilities and design targeted retention offers for banking wealth management clients.",
      submittedFile: "CLV_Predictive_Model_MBA.pdf"
    },
    {
      id: "asg_mba_5",
      title: "Executive Compensation & Incentive Alignment Simulation",
      subject: "People Analytics & Executive Organization Design",
      subjectCode: "MBA505",
      faculty: "Dr. Rajesh Patil",
      dueDate: "Sep 01, 2026",
      dueTime: "11:59 PM",
      status: "overdue",
      maxMarks: 20,
      submissionType: "Board Resolution Paper",
      description: "Design an ESOP and performance-share unit incentive plan tied to TSR benchmarks.",
      attachmentName: "Compensation_Committee_Brief.pdf"
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

function getAssignmentsForDomain(domainId) {
  const d = domainId || getActiveDomainKey();
  if (typeof DOMAINS_CATALOG !== 'undefined' && DOMAINS_CATALOG[d]?.assignments) {
    return DOMAINS_CATALOG[d].assignments;
  }
  if (typeof window !== 'undefined' && window.DOMAINS_CATALOG && window.DOMAINS_CATALOG[d]?.assignments) {
    return window.DOMAINS_CATALOG[d].assignments;
  }
  try {
    const mod = require('./domain-data');
    if (mod.DOMAINS_CATALOG && mod.DOMAINS_CATALOG[d]?.assignments) {
      return mod.DOMAINS_CATALOG[d].assignments;
    }
  } catch (_) {}
  return allDomainAssignments[d] || allDomainAssignments.dept_btech;
}

const mockAssignments = new Proxy([], {
  get(target, prop) {
    const activeList = getAssignmentsForDomain();
    if (prop === 'length') return activeList.length;
    if (prop === 'getAll') return () => [
      ...allDomainAssignments.dept_btech,
      ...allDomainAssignments.dept_bba,
      ...allDomainAssignments.dept_mba
    ];
    if (prop === 'forDomain') return (id) => getAssignmentsForDomain(id);
    if (typeof activeList[prop] === 'function') {
      return activeList[prop].bind(activeList);
    }
    return activeList[prop];
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockAssignments, allDomainAssignments, getAssignmentsForDomain };
} else {
  window.mockAssignments = mockAssignments;
  window.allDomainAssignments = allDomainAssignments;
  window.getAssignmentsForDomain = getAssignmentsForDomain;
}

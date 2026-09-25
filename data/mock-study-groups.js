/**
 * Centralized Mock Data: Study Community Groups
 * Academic Business Rule: Strictly maximum 5 students per study group.
 * If members === 5, status is "full" and join button is disabled with "Room Full".
 * 
 * Multi-Domain Support:
 * - dept_btech (Computer Science & Engineering)
 * - dept_bba   (Business Administration & Analytics)
 * - dept_mba   (Executive Leadership & Strategic Finance)
 */

const allDomainStudyGroups = {
  dept_btech: [
    {
      id: "grp_001",
      groupId: "grp_001",
      domainId: "dept_btech",
      name: "Machine Learning — Exam Prep & Derivations",
      subject: "Machine Learning",
      subjectCode: "CS403",
      currentMembers: 4,
      maxMembers: 5,
      isFull: false,
      topic: "Gradient descent, backpropagation derivation & loss surfaces",
      creator: "Aditya S. (CS4-012)",
      meetLink: "https://meet.google.com/ml-exam-prep",
      members: ["AS", "RZ", "NK", "PD"],
      agenda: "1. Gradient Descent mathematical proof\n2. Cross-Entropy Loss derivation\n3. Mid-Term 2025 PYQ discussion"
    },
    {
      id: "grp_002",
      groupId: "grp_002",
      domainId: "dept_btech",
      name: "DBMS Revision & SQL Query Optimization",
      subject: "Database Management Systems",
      subjectCode: "CS402",
      currentMembers: 3,
      maxMembers: 5,
      isFull: false,
      topic: "BCNF decomposition, indexing strategies & query plans",
      creator: "Neha P. (CS4-028)",
      meetLink: "https://meet.google.com/dbms-rev-room",
      members: ["NP", "RZ", "VK"],
      agenda: "1. 3NF vs BCNF dependency preservation\n2. B+ Tree indexing walkthrough\n3. Lab practical query questions"
    },
    {
      id: "grp_003",
      groupId: "grp_003",
      domainId: "dept_btech",
      name: "OS Synchronization & Semaphore Implementation",
      subject: "Operating Systems",
      subjectCode: "CS404",
      currentMembers: 5,
      maxMembers: 5,
      isFull: true, // Strictly full - Join button disabled
      topic: "POSIX Mutex lock, Semaphores & Dining Philosophers problem",
      creator: "Karan V. (CS4-045)",
      meetLink: "https://meet.google.com/os-sync-room",
      members: ["KV", "AR", "SM", "TN", "KL"],
      agenda: "1. Deadlock 4 Coffman conditions\n2. Banker's Algorithm safety check\n3. C implementation of producer-consumer"
    },
    {
      id: "grp_004",
      groupId: "grp_004",
      domainId: "dept_btech",
      name: "DSA Problem Solving Squad (LeetCode Daily)",
      subject: "Data Structures & Algorithms",
      subjectCode: "CS401",
      currentMembers: 2,
      maxMembers: 5,
      isFull: false,
      topic: "Dynamic programming patterns & Graph algorithms (Dijkstra, Prim)",
      creator: "Rohan D. (CS4-061)",
      meetLink: "https://meet.google.com/dsa-squad-live",
      members: ["RD", "RZ"],
      agenda: "1. DP on Trees & Subsets\n2. Shortest path min-heap implementation\n3. Mock technical interview practice"
    },
    {
      id: "grp_005",
      groupId: "grp_005",
      domainId: "dept_btech",
      name: "Computer Networks — Packet Tracer & Subnetting",
      subject: "Computer Networks",
      subjectCode: "CS405",
      currentMembers: 4,
      maxMembers: 5,
      isFull: false,
      topic: "VLSM CIDR calculation, TCP 3-way handshake & Socket Programming",
      creator: "Ananya M. (CS4-008)",
      meetLink: "https://meet.google.com/cn-subnet-prep",
      members: ["AM", "RZ", "PK", "SS"],
      agenda: "1. Classless Inter-Domain Routing practice\n2. WireShark packet capture analysis\n3. Socket programming in Python"
    }
  ],

  dept_bba: [
    {
      id: "grp_bba_001",
      groupId: "grp_bba_001",
      domainId: "dept_bba",
      name: "Corporate Valuation & Financial Modeling Squad",
      subject: "Corporate Financial Accounting",
      subjectCode: "BBA204",
      currentMembers: 4,
      maxMembers: 5,
      isFull: false,
      topic: "DCF modeling, Weighted Average Cost of Capital (WACC) & Unlevered Beta",
      creator: "Tanvi B. (BBA24-018)",
      meetLink: "https://meet.google.com/bba-val-room",
      members: ["TB", "RK", "SK", "YS"],
      agenda: "1. Free Cash Flow to Firm (FCFF) calculation\n2. Cost of Equity CAPM calculation\n3. Terminal Value exit multiple walkthrough"
    },
    {
      id: "grp_bba_002",
      groupId: "grp_bba_002",
      domainId: "dept_bba",
      name: "Digital Marketing Strategy & Brand Funnels",
      subject: "Principles of Marketing Strategy",
      subjectCode: "BBA201",
      currentMembers: 3,
      maxMembers: 5,
      isFull: false,
      topic: "Customer Acquisition Cost (CAC), Lifetime Value (LTV) & Omnichannel Positioning",
      creator: "Aman G. (BBA24-034)",
      meetLink: "https://meet.google.com/bba-mkt-squad",
      members: ["AG", "TB", "NR"],
      agenda: "1. Brand Equity Keller Pyramid analysis\n2. B2B vs B2C funnel optimization\n3. Live campaign budget allocation practice"
    },
    {
      id: "grp_bba_003",
      groupId: "grp_bba_003",
      domainId: "dept_bba",
      name: "Managerial Economics Problem Solving Desk",
      subject: "Managerial Economics & Market Structures",
      subjectCode: "BBA203",
      currentMembers: 5,
      maxMembers: 5,
      isFull: true,
      topic: "Oligopoly, Cournot Equilibrium & Kinked Demand Curve elasticity",
      creator: "Ritu S. (BBA24-051)",
      meetLink: "https://meet.google.com/bba-econ-full",
      members: ["RS", "DK", "PM", "TJ", "AL"],
      agenda: "1. Price elasticity calculus derivations\n2. Deadweight loss diagram walkthrough\n3. Mid-Term past paper question sets"
    },
    {
      id: "grp_bba_004",
      groupId: "grp_bba_004",
      domainId: "dept_bba",
      name: "Business Law Case Briefings & Moot Court",
      subject: "Business Law & Corporate Ethics",
      subjectCode: "BBA205",
      currentMembers: 2,
      maxMembers: 5,
      isFull: false,
      topic: "Breach of contract remedies, indemnities & corporate veil piercing",
      creator: "Dev P. (BBA24-011)",
      meetLink: "https://meet.google.com/bba-law-room",
      members: ["DP", "TB"],
      agenda: "1. Salomon v. Salomon principle review\n2. Doctrine of Indoor Management\n3. Contract drafting checklist practice"
    },
    {
      id: "grp_bba_005",
      groupId: "grp_bba_005",
      domainId: "dept_bba",
      name: "Business Analytics & Tableau Dashboard Hub",
      subject: "Business Analytics & Spreadsheet Modeling",
      subjectCode: "BBA206",
      currentMembers: 4,
      maxMembers: 5,
      isFull: false,
      topic: "Financial dashboard KPI design, cohort retention & Monte Carlo simulation",
      creator: "Kritika V. (BBA24-042)",
      meetLink: "https://meet.google.com/bba-analytics-live",
      members: ["KV", "TB", "RP", "MN"],
      agenda: "1. Data cleaning with Power Query\n2. Financial sensitivity tables\n3. Tableau story presentation review"
    }
  ],

  dept_mba: [
    {
      id: "grp_mba_001",
      groupId: "grp_mba_001",
      domainId: "dept_mba",
      name: "Harvard Business Review Strategy Defense Squad",
      subject: "Strategic Global Leadership",
      subjectCode: "MBA601",
      currentMembers: 4,
      maxMembers: 5,
      isFull: false,
      topic: "Enterprise turnaround, blue ocean shift & geopolitical resilience",
      creator: "Aditya S. (MBA24-007)",
      meetLink: "https://meet.google.com/mba-strat-room",
      members: ["AS", "NR", "SM", "DK"],
      agenda: "1. HBR Case 2025: Satya Nadella's cultural overhaul\n2. Shareholder vs Stakeholder capitalism trade-offs\n3. Board memo drafting session"
    },
    {
      id: "grp_mba_002",
      groupId: "grp_mba_002",
      domainId: "dept_mba",
      name: "M&A Due Diligence & LBO Modeling Lab",
      subject: "Mergers, Acquisitions & Restructuring",
      subjectCode: "MBA602",
      currentMembers: 3,
      maxMembers: 5,
      isFull: false,
      topic: "EBITDA adjustments, debt covenant waterfalls & returns sensitivity",
      creator: "Natasha R. (MBA24-015)",
      meetLink: "https://meet.google.com/mba-mna-lab",
      members: ["NR", "AS", "VK"],
      agenda: "1. Accretion/Dilution analysis mechanics\n2. Term loan B vs Mezzanine debt tranche returns\n3. Antitrust Hart-Scott-Rodino filing review"
    },
    {
      id: "grp_mba_003",
      groupId: "grp_mba_003",
      domainId: "dept_mba",
      name: "Venture Capital Term Sheet & Cap Table Workshop",
      subject: "Investment Banking & Private Equity",
      subjectCode: "MBA603",
      currentMembers: 5,
      maxMembers: 5,
      isFull: true,
      topic: "Participating Preferred vs Non-participating, Drag-along & Anti-dilution",
      creator: "Siddharth M. (MBA24-023)",
      meetLink: "https://meet.google.com/mba-vc-squad",
      members: ["SM", "DK", "RM", "TN", "AB"],
      agenda: "1. Series B $40M term sheet teardown\n2. Broad-based weighted average anti-dilution proof\n3. Carried interest hurdle rate calculation"
    },
    {
      id: "grp_mba_004",
      groupId: "grp_mba_004",
      domainId: "dept_mba",
      name: "FinTech Disruption & DeFi Payment Rails",
      subject: "FinTech Architecture & Digital Disruption",
      subjectCode: "MBA605",
      currentMembers: 2,
      maxMembers: 5,
      isFull: false,
      topic: "Central Bank Digital Currencies (CBDC), smart contract escrow & RegTech",
      creator: "Divya K. (MBA24-041)",
      meetLink: "https://meet.google.com/mba-fintech-hub",
      members: ["DK", "AS"],
      agenda: "1. Cross-border wholesale CBDC architecture\n2. ISO 20022 message structure deep-dive\n3. AI algorithmic credit bias audit"
    },
    {
      id: "grp_mba_005",
      groupId: "grp_mba_005",
      domainId: "dept_mba",
      name: "Resilient Global Supply Chain Stress Test",
      subject: "Global Supply Chain & Operations Strategy",
      subjectCode: "MBA604",
      currentMembers: 4,
      maxMembers: 5,
      isFull: false,
      topic: "Dual-sourcing strategies, lead-time variance & carbon border adjustments",
      creator: "Rohan M. (MBA24-032)",
      meetLink: "https://meet.google.com/mba-ops-circle",
      members: ["RM", "AS", "PK", "SS"],
      agenda: "1. Red Sea logistics detour cost modeling\n2. Safety stock vs carrying cost optimization\n3. Scope 3 carbon emission audit methodologies"
    }
  ]
};

function getActiveDomainKey() {
  if (typeof DomainService !== 'undefined') {
    return DomainService.getActiveDomain();
  }
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('smart_student_active_domain');
    if (saved && allDomainStudyGroups[saved]) return saved;
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

function getStudyGroupsForDomain(domainId) {
  const d = domainId || getActiveDomainKey();
  return allDomainStudyGroups[d] || allDomainStudyGroups.dept_btech;
}

const mockStudyGroups = new Proxy([], {
  get(target, prop) {
    const activeList = getStudyGroupsForDomain();
    if (prop === 'length') return activeList.length;
    if (prop === 'getAll') return () => [
      ...allDomainStudyGroups.dept_btech,
      ...allDomainStudyGroups.dept_bba,
      ...allDomainStudyGroups.dept_mba
    ];
    if (prop === 'forDomain') return (id) => getStudyGroupsForDomain(id);
    if (typeof activeList[prop] === 'function') {
      return activeList[prop].bind(activeList);
    }
    return activeList[prop];
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockStudyGroups, allDomainStudyGroups, getStudyGroupsForDomain };
} else {
  window.mockStudyGroups = mockStudyGroups;
  window.allDomainStudyGroups = allDomainStudyGroups;
  window.getStudyGroupsForDomain = getStudyGroupsForDomain;
}

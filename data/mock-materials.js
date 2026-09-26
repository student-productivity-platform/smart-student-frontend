/**
 * Centralized Mock Data: Academic Learning Materials
 * References Cloudinary storage architecture
 * Multi-Domain Dynamic Resolution:
 * - dept_btech (Computer Science & Engineering)
 * - dept_bba   (Business Administration & Analytics)
 * - dept_mba   (Executive Leadership & Strategic Finance)
 */

const allDomainMaterials = {
  dept_btech: [
    {
      id: "mat_001",
      title: "DBMS Unit 3: Normalization & Functional Dependencies",
      subject: "Database Management Systems",
      subjectCode: "CS402",
      category: "Notes",
      faculty: "Prof. Sunita Mehta",
      uploadedAt: "Sep 02, 2026",
      fileType: "pdf",
      fileSize: "3.4 MB",
      pages: 42,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      description: "Comprehensive notes covering 1NF to BCNF, lossless join decomposition, and dependency preservation algorithms with exam questions."
    },
    {
      id: "mat_002",
      title: "Machine Learning: Linear & Logistic Regression Deck",
      subject: "Machine Learning",
      subjectCode: "CS403",
      category: "Presentations",
      faculty: "Prof. Arvind Patil",
      uploadedAt: "Aug 29, 2026",
      fileType: "ppt",
      fileSize: "5.1 MB",
      slides: 58,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pptx",
      description: "Lecture slides explaining cost function optimization, learning rate tuning, and decision boundary derivations."
    },
    {
      id: "mat_003",
      title: "Operating Systems: Process Synchronization & Mutexes",
      subject: "Operating Systems",
      subjectCode: "CS404",
      category: "Notes",
      faculty: "Prof. Priya Kulkarni",
      uploadedAt: "Aug 25, 2026",
      fileType: "pdf",
      fileSize: "4.2 MB",
      pages: 36,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      description: "Detailed unit covering race conditions, Peterson's algorithm, hardware atomic instructions, and semaphore implementations in C."
    },
    {
      id: "mat_004",
      title: "DSA: Balanced Search Trees (AVL & Red-Black) Cheatsheet",
      subject: "Data Structures & Algorithms",
      subjectCode: "CS401",
      category: "Reference Material",
      faculty: "Prof. Rajesh Sharma",
      uploadedAt: "Aug 20, 2026",
      fileType: "pdf",
      fileSize: "1.8 MB",
      pages: 14,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      description: "Quick revision formulae for balance factors, single/double rotation algorithms, and asymptotic complexity lookup tables."
    },
    {
      id: "mat_005",
      title: "Computer Networks: Subnetting Cheat Sheet & RFC Reference",
      subject: "Computer Networks",
      subjectCode: "CS405",
      category: "Reference Material",
      faculty: "Dr. Vikram Joshi",
      uploadedAt: "Aug 15, 2026",
      fileType: "pdf",
      fileSize: "2.1 MB",
      pages: 18,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      description: "Handy IP subnetting lookup sheet, CIDR prefix table, private IP ranges, and standard TCP/UDP port cheat sheet."
    }
  ],

  dept_bba: [
    {
      id: "mat_bba_1",
      title: "Corporate Finance Unit 4: Capital Structure & WACC Calculations",
      subject: "Corporate Financial Accounting",
      subjectCode: "BBA204",
      category: "Notes",
      faculty: "Prof. Priya Nair",
      uploadedAt: "Sep 05, 2026",
      fileType: "pdf",
      fileSize: "4.1 MB",
      pages: 38,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      description: "Comprehensive lecture guide on weighted average cost of capital, Modigliani-Miller theorems, and financial leverage ratios."
    },
    {
      id: "mat_bba_2",
      title: "Marketing Strategy: Consumer Decision Funnel & Omni-channel Deck",
      subject: "Principles of Marketing Strategy",
      subjectCode: "BBA201",
      category: "Presentations",
      faculty: "Prof. Vikram Saxena",
      uploadedAt: "Sep 01, 2026",
      fileType: "ppt",
      fileSize: "6.2 MB",
      slides: 45,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pptx",
      description: "Case studies on customer journey mapping, attribution models, and retention loops for direct-to-consumer businesses."
    },
    {
      id: "mat_bba_3",
      title: "Business Law: The Indian Companies Act 2013 Primer",
      subject: "Business Law & Corporate Ethics",
      subjectCode: "BBA205",
      category: "Reference Material",
      faculty: "Dr. Meera Sen",
      uploadedAt: "Aug 28, 2026",
      fileType: "pdf",
      fileSize: "2.8 MB",
      pages: 26,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      description: "Statutory provisions governing board resolutions, independent directors, and CSR expenditure obligations."
    },
    {
      id: "mat_bba_4",
      title: "Managerial Economics: Oligopoly Game Theory & Nash Equilibrium",
      subject: "Managerial Economics & Market Structures",
      subjectCode: "BBA203",
      category: "Notes",
      faculty: "Prof. Siddharth Joshi",
      uploadedAt: "Aug 22, 2026",
      fileType: "pdf",
      fileSize: "3.5 MB",
      pages: 30,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      description: "Cournot, Bertrand, and Stackelberg competition models applied to airline and telecommunications oligopolies."
    }
  ],

  dept_mba: [
    {
      id: "mat_mba_1",
      title: "LBO Modeling Architecture & Debt Paydown Mechanics",
      subject: "Corporate Financial Engineering & Restructuring",
      subjectCode: "MBA502",
      category: "Notes",
      faculty: "Prof. Arunav Roy",
      uploadedAt: "Sep 04, 2026",
      fileType: "pdf",
      fileSize: "5.4 MB",
      pages: 52,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      description: "Advanced financial modeling templates, cash sweep logic, returns waterfalls, and mezzanine debt structuring."
    },
    {
      id: "mat_mba_2",
      title: "Strategic Management: Corporate Transformation & Boardroom Governance",
      subject: "Strategic Leadership & Corporate Governance",
      subjectCode: "MBA501",
      category: "Presentations",
      faculty: "Dr. Rajesh Patil",
      uploadedAt: "Aug 31, 2026",
      fileType: "ppt",
      fileSize: "7.8 MB",
      slides: 60,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pptx",
      description: "Executive presentation decks on turnaround management, activist investor defense, and ESG boardroom strategy."
    },
    {
      id: "mat_mba_3",
      title: "Predictive Analytics: Machine Learning for Customer Churn Prevention",
      subject: "Advanced Marketing Analytics & Consumer Insights",
      subjectCode: "MBA503",
      category: "Reference Material",
      faculty: "Prof. Sunaina Kapoor",
      uploadedAt: "Aug 26, 2026",
      fileType: "pdf",
      fileSize: "3.9 MB",
      pages: 34,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      description: "Python notebooks and decision frameworks for survival analysis and uplift modeling in subscription business models."
    },
    {
      id: "mat_mba_4",
      title: "Global Supply Chain: Geopolitical Risk & Dual-Sourcing Networks",
      subject: "Global Supply Chain Strategy & Logistics",
      subjectCode: "MBA504",
      category: "Notes",
      faculty: "Prof. Sanjay Rao",
      uploadedAt: "Aug 19, 2026",
      fileType: "pdf",
      fileSize: "4.6 MB",
      pages: 44,
      fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
      description: "Frameworks for building antifragile supply networks, inventory buffers, and tariff-resistant distribution hubs."
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

function getMaterialsForDomain(domainId) {
  const d = domainId || getActiveDomainKey();
  if (typeof DOMAINS_CATALOG !== 'undefined' && DOMAINS_CATALOG[d]?.materials) {
    return DOMAINS_CATALOG[d].materials;
  }
  if (typeof window !== 'undefined' && window.DOMAINS_CATALOG && window.DOMAINS_CATALOG[d]?.materials) {
    return window.DOMAINS_CATALOG[d].materials;
  }
  try {
    const mod = require('./domain-data');
    if (mod.DOMAINS_CATALOG && mod.DOMAINS_CATALOG[d]?.materials) {
      return mod.DOMAINS_CATALOG[d].materials;
    }
  } catch (_) {}
  return allDomainMaterials[d] || allDomainMaterials.dept_btech;
}

const mockMaterials = new Proxy([], {
  get(target, prop) {
    const activeList = getMaterialsForDomain();
    if (prop === 'length') return activeList.length;
    if (prop === 'getAll') return () => [
      ...allDomainMaterials.dept_btech,
      ...allDomainMaterials.dept_bba,
      ...allDomainMaterials.dept_mba
    ];
    if (prop === 'forDomain') return (id) => getMaterialsForDomain(id);
    if (typeof activeList[prop] === 'function') {
      return activeList[prop].bind(activeList);
    }
    return activeList[prop];
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockMaterials, allDomainMaterials, getMaterialsForDomain };
} else {
  window.mockMaterials = mockMaterials;
  window.allDomainMaterials = allDomainMaterials;
  window.getMaterialsForDomain = getMaterialsForDomain;
}

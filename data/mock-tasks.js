/**
 * Centralized Mock Data: Student Academic Tasks
 * Multi-Domain Dynamic Resolution:
 * - dept_btech (Computer Science & Engineering)
 * - dept_bba   (Business Administration & Analytics)
 * - dept_mba   (Executive Leadership & Strategic Finance)
 */

const allDomainTasks = {
  dept_btech: [
    {
      id: "tsk_001",
      title: "Complete DBMS normalization assignment",
      dueDate: "Today, 11:59 PM",
      priority: "high",
      completed: false,
      courseId: "CS402",
      status: "todo",
      domainId: "dept_btech"
    },
    {
      id: "tsk_002",
      title: "Revise Machine Learning Unit 2 (Gradient Descent)",
      dueDate: "Tomorrow",
      priority: "medium",
      completed: false,
      courseId: "CS403",
      status: "inprogress",
      domainId: "dept_btech"
    },
    {
      id: "tsk_003",
      title: "Prepare for OS quiz on Semaphore implementation",
      dueDate: "Sep 09",
      priority: "high",
      completed: false,
      courseId: "CS404",
      status: "todo",
      domainId: "dept_btech"
    },
    {
      id: "tsk_004",
      title: "Submit Software Engineering project documentation",
      dueDate: "Sep 15",
      priority: "low",
      completed: false,
      courseId: "CS406",
      status: "todo",
      domainId: "dept_btech"
    },
    {
      id: "tsk_005",
      title: "Review Graph Theory notes for DSA lab practical",
      dueDate: "Sep 18",
      priority: "medium",
      completed: true,
      courseId: "CS401",
      status: "done",
      domainId: "dept_btech"
    }
  ],

  dept_bba: [
    {
      id: "tsk_bba_001",
      title: "Complete Cash Flow Forecasting & Working Capital Spreadsheet",
      dueDate: "Today, 11:59 PM",
      priority: "high",
      completed: false,
      courseId: "BBA204",
      status: "todo",
      domainId: "dept_bba"
    },
    {
      id: "tsk_bba_002",
      title: "Finalize Omnichannel Brand Positioning Strategy Pitch Deck",
      dueDate: "Tomorrow",
      priority: "high",
      completed: false,
      courseId: "BBA201",
      status: "inprogress",
      domainId: "dept_bba"
    },
    {
      id: "tsk_bba_003",
      title: "Review Indian Companies Act Case Studies on Director Liability",
      dueDate: "Sep 09",
      priority: "medium",
      completed: false,
      courseId: "BBA205",
      status: "todo",
      domainId: "dept_bba"
    },
    {
      id: "tsk_bba_004",
      title: "Prepare Financial Ratio Analysis Report for Manufacturing Firm",
      dueDate: "Sep 15",
      priority: "medium",
      completed: false,
      courseId: "BBA204",
      status: "todo",
      domainId: "dept_bba"
    },
    {
      id: "tsk_bba_005",
      title: "Draft Consumer Decision Funnel Survey Analysis",
      dueDate: "Sep 18",
      priority: "low",
      completed: true,
      courseId: "BBA201",
      status: "done",
      domainId: "dept_bba"
    }
  ],

  dept_mba: [
    {
      id: "tsk_mba_001",
      title: "Prepare Executive Case Analysis for Porter's Value Chain",
      dueDate: "Today, 11:59 PM",
      priority: "high",
      completed: false,
      courseId: "MBA601",
      status: "todo",
      domainId: "dept_mba"
    },
    {
      id: "tsk_mba_002",
      title: "Build DCF Valuation Model for Cross-Border M&A",
      dueDate: "Tomorrow",
      priority: "high",
      completed: false,
      courseId: "MBA602",
      status: "inprogress",
      domainId: "dept_mba"
    },
    {
      id: "tsk_mba_003",
      title: "Review LBO Debt Structuring Framework & Covenants",
      dueDate: "Sep 09",
      priority: "medium",
      completed: false,
      courseId: "MBA603",
      status: "todo",
      domainId: "dept_mba"
    },
    {
      id: "tsk_mba_004",
      title: "Draft Term Sheet for Private Equity Syndication",
      dueDate: "Sep 15",
      priority: "medium",
      completed: false,
      courseId: "MBA603",
      status: "todo",
      domainId: "dept_mba"
    },
    {
      id: "tsk_mba_005",
      title: "Analyze Global ESG Governance Guidelines for Boardroom Pitch",
      dueDate: "Sep 18",
      priority: "low",
      completed: true,
      courseId: "MBA601",
      status: "done",
      domainId: "dept_mba"
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

function getTasksForDomain(domainId) {
  const d = domainId || getActiveDomainKey();
  return allDomainTasks[d] || allDomainTasks.dept_btech;
}

const mockTasks = new Proxy([], {
  get(target, prop) {
    const activeList = getTasksForDomain();
    if (prop === 'length') return activeList.length;
    if (prop === 'getAll') return () => [
      ...allDomainTasks.dept_btech,
      ...allDomainTasks.dept_bba,
      ...allDomainTasks.dept_mba
    ];
    if (prop === 'forDomain') return (id) => getTasksForDomain(id);
    if (typeof activeList[prop] === 'function') {
      return activeList[prop].bind(activeList);
    }
    return activeList[prop];
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockTasks, allDomainTasks, getTasksForDomain };
} else {
  window.mockTasks = mockTasks;
  window.allDomainTasks = allDomainTasks;
  window.getTasksForDomain = getTasksForDomain;
}

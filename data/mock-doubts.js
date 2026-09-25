/**
 * Centralized Mock Data: AI Doubt Solver History & Responses
 * Multi-Domain Dynamic Resolution:
 * - dept_btech (Computer Science & Engineering)
 * - dept_bba   (Business Administration & Analytics)
 * - dept_mba   (Executive Leadership & Strategic Finance)
 */

const allDomainDoubts = {
  dept_btech: [
    {
      id: "dbt_001",
      question: "Explain database normalization (1NF, 2NF, 3NF) with a simple student table example.",
      subject: "Database Management Systems",
      subjectCode: "CS402",
      status: "answered",
      createdAt: "Yesterday at 08:30 PM",
      answer: "Database normalization is the systematic approach of decomposing tables to eliminate data redundancy and insertion/update/deletion anomalies.\n\n1. 1NF (First Normal Form): Eliminate repeating groups; ensure every column contains atomic (indivisible) values.\n2. 2NF (Second Normal Form): Must be in 1NF, and all non-key attributes must be fully functionally dependent on the primary key (no partial dependencies).\n3. 3NF (Third Normal Form): Must be in 2NF, and no non-key attribute can depend on another non-key attribute (no transitive dependencies X → Y and Y → Z)."
    },
    {
      id: "dbt_002",
      question: "What is the difference between TCP and UDP transport protocols?",
      subject: "Computer Networks",
      subjectCode: "CS405",
      status: "answered",
      createdAt: "Sep 02, 2026",
      answer: "TCP is connection-oriented, reliable, guarantees ordered delivery with 3-way handshaking and error checking (used for HTTP/HTTPS, FTP, SSH). UDP is connectionless, lightweight, has no guaranteed order or retransmission (used for live streaming, DNS, VoIP, gaming)."
    },
    {
      id: "dbt_003",
      question: "How does Gradient Descent minimize the cost function in Linear Regression?",
      subject: "Machine Learning",
      subjectCode: "CS403",
      status: "answered",
      createdAt: "Aug 30, 2026",
      answer: "Gradient Descent is an iterative optimization algorithm. It calculates the partial derivatives (gradients) of the Mean Squared Error (MSE) cost function with respect to weights and bias: θ := θ - α * (∂J/∂θ), where α is the learning rate. Moving in the opposite direction of the gradient steps down towards the global minimum."
    }
  ],

  dept_bba: [
    {
      id: "dbt_bba_1",
      question: "What is the difference between Operating Cash Flow and Free Cash Flow to Firm (FCFF)?",
      subject: "Corporate Financial Accounting",
      subjectCode: "BBA204",
      status: "answered",
      createdAt: "Yesterday at 07:15 PM",
      answer: "Operating Cash Flow (OCF) reflects cash generated from core operational activities (Net Income + Non-Cash Charges - Working Capital changes). FCFF subtracts Capital Expenditures (CapEx) from OCF: FCFF = OCF - CapEx. FCFF represents the discretionary cash available to distribute to all capital providers (both debt and equity holders)."
    },
    {
      id: "dbt_bba_2",
      question: "Explain the Doctrine of Indoor Management in Company Law.",
      subject: "Business Law & Corporate Ethics",
      subjectCode: "BBA205",
      status: "answered",
      createdAt: "Sep 03, 2026",
      answer: "The Doctrine of Indoor Management (established in Royal British Bank v Turquand) protects outside third parties dealing with a company in good faith. Outsiders are entitled to presume that internal governance procedures, company authorizations, and board resolutions have been properly complied with by the company's officers."
    },
    {
      id: "dbt_bba_3",
      question: "How is Customer Lifetime Value (CLV) calculated in digital marketing?",
      subject: "Principles of Marketing Strategy",
      subjectCode: "BBA201",
      status: "answered",
      createdAt: "Aug 29, 2026",
      answer: "CLV = (Average Purchase Value × Purchase Frequency × Average Customer Lifespan) × Gross Margin. Alternatively in subscription models: CLV = (ARPU × Gross Margin %) / Churn Rate. A healthy SaaS or eCommerce business aims for a CLV to CAC (Customer Acquisition Cost) ratio of at least 3:1."
    }
  ],

  dept_mba: [
    {
      id: "dbt_mba_1",
      question: "How do you evaluate Debt Paydown and Cash Sweep in an LBO model?",
      subject: "Corporate Financial Engineering & Restructuring",
      subjectCode: "MBA502",
      status: "answered",
      createdAt: "Yesterday at 09:45 PM",
      answer: "In a Leveraged Buyout (LBO), Free Cash Flow (FCF) after mandatory debt service (senior interest and principal amortization) is swept to prepay callable senior debt tranches. A 100% cash sweep accelerates de-leveraging, compressing debt-to-EBITDA multiples and expanding sponsor equity returns (IRR) upon exit."
    },
    {
      id: "dbt_mba_2",
      question: "What are the key levers in Porter's Strategic Positioning versus Operational Effectiveness?",
      subject: "Strategic Leadership & Corporate Governance",
      subjectCode: "MBA501",
      status: "answered",
      createdAt: "Sep 02, 2026",
      answer: "Operational Effectiveness (OE) means performing similar activities better than rivals (benchmarking, TQM), which inevitably leads to competitive convergence and zero-sum price wars. Strategic Positioning means performing different activities from rivals or performing similar activities differently to deliver unique value (trade-offs, system-of-activities fit)."
    },
    {
      id: "dbt_mba_3",
      question: "How can multi-echelon inventory optimization mitigate the Bullwhip Effect in global supply chains?",
      subject: "Global Supply Chain Strategy & Logistics",
      subjectCode: "MBA504",
      status: "answered",
      createdAt: "Aug 31, 2026",
      answer: "The Bullwhip Effect occurs when demand forecast variance amplifies upstream. Multi-echelon inventory optimization mitigates this through point-of-sale (POS) data visibility, Vendor Managed Inventory (VMI), collaborative planning (CPFR), lead time reduction, and decoupling buffer stock across network nodes."
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

function getDoubtsForDomain(domainId) {
  const d = domainId || getActiveDomainKey();
  if (typeof DOMAINS_CATALOG !== 'undefined' && DOMAINS_CATALOG[d]?.doubtTopics) {
    // If doubtTopics has question/answer
    const list = DOMAINS_CATALOG[d].doubtTopics.map(t => ({
      id: t.id,
      question: t.question,
      subject: t.subject,
      status: 'answered',
      createdAt: 'Recent',
      answer: t.answer
    }));
    if (list.length > 0) return list;
  }
  return allDomainDoubts[d] || allDomainDoubts.dept_btech;
}

const mockDoubts = new Proxy([], {
  get(target, prop) {
    const activeList = getDoubtsForDomain();
    if (prop === 'length') return activeList.length;
    if (prop === 'getAll') return () => [
      ...allDomainDoubts.dept_btech,
      ...allDomainDoubts.dept_bba,
      ...allDomainDoubts.dept_mba
    ];
    if (prop === 'forDomain') return (id) => getDoubtsForDomain(id);
    if (typeof activeList[prop] === 'function') {
      return activeList[prop].bind(activeList);
    }
    return activeList[prop];
  }
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockDoubts, allDomainDoubts, getDoubtsForDomain };
} else {
  window.mockDoubts = mockDoubts;
  window.allDomainDoubts = allDomainDoubts;
  window.getDoubtsForDomain = getDoubtsForDomain;
}

/**
 * Centralized Mock Data: Academic Learning Materials
 * References Cloudinary storage architecture
 */
const mockMaterials = [
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
    title: "Computer Networks: Subnetting & CIDR Workshop Deck",
    subject: "Computer Networks",
    subjectCode: "CS405",
    category: "Presentations",
    faculty: "Dr. Vikram Joshi",
    uploadedAt: "Aug 18, 2026",
    fileType: "ppt",
    fileSize: "6.8 MB",
    slides: 44,
    fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pptx",
    description: "Hands-on slides for calculating network ID, broadcast address, and host address ranges for Variable Length Subnet Masking (VLSM)."
  },
  {
    id: "mat_006",
    title: "Semester 4 Mid-Term Past Year Question Paper (2025)",
    subject: "Computer Engineering",
    subjectCode: "ALL-CS4",
    category: "Question Papers",
    faculty: "Examination Cell",
    uploadedAt: "Aug 10, 2026",
    fileType: "pdf",
    fileSize: "2.5 MB",
    pages: 12,
    fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
    description: "Official university previous year question papers for DBMS, OS, DSA, ML, and CN with solution hints and mark weightage."
  },
  {
    id: "mat_007",
    title: "POSIX Threads & Semaphore IPC Lab Code Starter",
    subject: "Operating Systems",
    subjectCode: "CS404",
    category: "Assignments",
    faculty: "Prof. Priya Kulkarni",
    uploadedAt: "Aug 05, 2026",
    fileType: "code",
    fileSize: "45 KB",
    pages: 1,
    fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
    description: "Modular C source code template for initializing pthread mutexes and semaphores for the Dining Philosophers synchronization lab."
  },
  {
    id: "mat_008",
    title: "Neural Networks & Backpropagation Video Lecture Series",
    subject: "Machine Learning",
    subjectCode: "CS403",
    category: "Videos",
    faculty: "Prof. Arvind Patil",
    uploadedAt: "Aug 01, 2026",
    fileType: "video",
    fileSize: "1.2 GB",
    pages: 1,
    fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.mp4",
    description: "Recorded classroom video walkthrough of mathematical matrix chain rule derivation for backward propagation."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockMaterials };
} else {
  window.mockMaterials = mockMaterials;
}

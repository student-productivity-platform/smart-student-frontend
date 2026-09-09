/**
 * Centralized Mock Data: Study Community Groups
 * Academic Business Rule: Strictly maximum 5 students per study group.
 * If members === 5, status is "full" and join button is disabled with "Room Full".
 */
const mockStudyGroups = [
  {
    id: "grp_001",
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
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockStudyGroups };
} else {
  window.mockStudyGroups = mockStudyGroups;
}

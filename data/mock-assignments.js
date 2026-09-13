/**
 * Centralized Mock Data: Student Assignments
 * Supports statuses: Pending, Submitted, Overdue
 */
const mockAssignments = [
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
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockAssignments };
} else {
  window.mockAssignments = mockAssignments;
}

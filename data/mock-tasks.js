/**
 * Centralized Mock Data: Student Academic Tasks
 */
const mockTasks = [
  {
    id: "tsk_001",
    title: "Complete DBMS normalization assignment",
    dueDate: "Today, 11:59 PM",
    priority: "high",
    completed: false,
    courseId: "CS402"
  },
  {
    id: "tsk_002",
    title: "Revise Machine Learning Unit 2 (Gradient Descent)",
    dueDate: "Tomorrow",
    priority: "medium",
    completed: false,
    courseId: "CS403"
  },
  {
    id: "tsk_003",
    title: "Prepare for OS quiz on Semaphore implementation",
    dueDate: "Sep 09",
    priority: "high",
    completed: false,
    courseId: "CS404"
  },
  {
    id: "tsk_004",
    title: "Submit Software Engineering project documentation",
    dueDate: "Sep 15",
    priority: "low",
    completed: false,
    courseId: "CS406"
  },
  {
    id: "tsk_005",
    title: "Review Graph Theory notes for DSA lab practical",
    dueDate: "Sep 18",
    priority: "medium",
    completed: true,
    courseId: "CS401"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockTasks };
} else {
  window.mockTasks = mockTasks;
}

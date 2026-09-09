/**
 * Centralized Mock Data: AI Doubt Solver History & Responses
 */
const mockDoubts = [
  {
    id: "dbt_001",
    question: "Explain database normalization (1NF, 2NF, 3NF) with a simple student table example.",
    subject: "Database Management Systems",
    status: "answered",
    createdAt: "Yesterday at 08:30 PM",
    answer: "Database normalization is the systematic approach of decomposing tables to eliminate data redundancy and insertion/update/deletion anomalies.\n\n1. 1NF (First Normal Form): Eliminate repeating groups; ensure every column contains atomic (indivisible) values.\n2. 2NF (Second Normal Form): Must be in 1NF, and all non-key attributes must be fully functionally dependent on the primary key (no partial dependencies).\n3. 3NF (Third Normal Form): Must be in 2NF, and no non-key attribute can depend on another non-key attribute (no transitive dependencies X → Y and Y → Z)."
  },
  {
    id: "dbt_002",
    question: "What is the difference between TCP and UDP transport protocols?",
    subject: "Computer Networks",
    status: "answered",
    createdAt: "Sep 02, 2026",
    answer: "TCP is connection-oriented, reliable, guarantees ordered delivery with 3-way handshaking and error checking (used for HTTP/HTTPS, FTP, SSH). UDP is connectionless, lightweight, has no guaranteed order or retransmission (used for live streaming, DNS, VoIP, gaming)."
  },
  {
    id: "dbt_003",
    question: "How does Gradient Descent minimize the cost function in Linear Regression?",
    subject: "Machine Learning",
    status: "answered",
    createdAt: "Aug 30, 2026",
    answer: "Gradient Descent is an iterative optimization algorithm. It calculates the partial derivatives (gradients) of the Mean Squared Error (MSE) cost function with respect to weights and bias: θ := θ - α * (∂J/∂θ), where α is the learning rate. Moving in the opposite direction of the gradient steps down towards the global minimum."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockDoubts };
} else {
  window.mockDoubts = mockDoubts;
}

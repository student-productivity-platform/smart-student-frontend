module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Actor-Name, X-Actor-Email, X-Actor-Role');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const facultyMembers = [
    {
      id: "usr_fac_1001",
      facultyId: "FAC-2024-1001",
      name: "Prof. Sunita Mehta",
      email: "faculty@university.edu",
      role: "faculty",
      designation: "Associate Professor",
      department: "Department of Computer Engineering",
      departmentId: "dept_btech",
      subjects: ["Database Management Systems (CS402)"],
      officeRoom: "Academic Block 3, Cabin 304",
      officeHours: "Mon, Wed, Fri: 03:00 PM – 05:00 PM",
      status: "active"
    },
    {
      id: "usr_fac_1002",
      facultyId: "FAC-2024-1002",
      name: "Dr. Vikram Joshi",
      email: "vikram.j@university.edu",
      role: "faculty",
      designation: "Professor",
      department: "Department of Computer Engineering",
      departmentId: "dept_btech",
      subjects: ["Design & Analysis of Algorithms (CS401)"],
      officeRoom: "Academic Block 3, Cabin 306",
      officeHours: "Tue, Thu: 02:00 PM – 04:00 PM",
      status: "active"
    },
    {
      id: "usr_fac_1003",
      facultyId: "FAC-2024-1003",
      name: "Dr. Ramesh Gupta",
      email: "ramesh.g@university.edu",
      role: "faculty",
      designation: "Professor & Senior Researcher",
      department: "Department of Computer Engineering",
      departmentId: "dept_btech",
      subjects: ["Operating Systems (CS403)"],
      officeRoom: "Academic Block 2, Room 204",
      officeHours: "Mon, Fri: 11:00 AM – 01:00 PM",
      status: "active"
    },
    {
      id: "usr_fac_1004",
      facultyId: "FAC-2024-1004",
      name: "Prof. Sunaina Kapoor",
      email: "sunaina.k@university.edu",
      role: "faculty",
      designation: "Assistant Professor",
      department: "Department of Computer Engineering",
      departmentId: "dept_btech",
      subjects: ["Computer Networks (CS404)"],
      officeRoom: "Academic Block 3, Room 308",
      officeHours: "Wed, Thu: 02:00 PM – 04:00 PM",
      status: "active"
    },
    {
      id: "usr_fac_1005",
      facultyId: "FAC-2024-1005",
      name: "Dr. Shalini Deshmukh",
      email: "shalini.d@university.edu",
      role: "faculty",
      designation: "Associate Professor",
      department: "Department of Information Technology",
      departmentId: "dept_btech",
      subjects: ["Machine Learning & Pattern Recognition (CS405)"],
      officeRoom: "Academic Block 4, Room 402",
      officeHours: "Tue, Fri: 01:00 PM – 03:00 PM",
      status: "active"
    }
  ];

  return res.status(200).json({
    success: true,
    users: facultyMembers,
    total: facultyMembers.length
  });
};

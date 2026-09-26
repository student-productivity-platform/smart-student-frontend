module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const exams = [
    {
      id: "exm_001",
      name: "Mid-Term Examination (CS403)",
      title: "Mid-Term Examination",
      subject: "Machine Learning",
      subjectCode: "CS403",
      courseCode: "CS403",
      type: "Mid-Term",
      date: "September 14, 2026",
      time: "10:00 AM – 12:00 PM",
      duration: "2 Hours",
      venue: "Exam Hall A (Block 2)",
      totalMarks: 50,
      passingMarks: 20
    },
    {
      id: "exm_002",
      name: "Internal Assessment 1 (CS402)",
      title: "Internal Assessment 1",
      subject: "Database Management Systems",
      subjectCode: "CS402",
      courseCode: "CS402",
      type: "Internal Assessment",
      date: "September 17, 2026",
      time: "02:00 PM – 03:30 PM",
      duration: "1.5 Hours",
      venue: "Room 302 (Block 1)",
      totalMarks: 30,
      passingMarks: 12
    },
    {
      id: "exam_fac_101",
      name: "Semester 4 Mid-Term MCQ Examination",
      title: "Semester 4 Mid-Term MCQ Examination",
      subject: "Database Management Systems (CS402)",
      subjectCode: "CS402",
      courseCode: "CS402",
      type: "mcq",
      date: "September 28, 2026",
      time: "10:00 AM – 11:30 AM",
      duration: "90 Minutes",
      venue: "Online Exam Hall / Lab 4",
      totalMarks: 50,
      passingMarks: 20,
      createdBy: "Prof. Sunita Mehta",
      isFacultyCreated: true
    }
  ];

  return res.status(200).json(exams);
};

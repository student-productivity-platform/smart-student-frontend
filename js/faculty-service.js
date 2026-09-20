/**
 * ==========================================================================
 * SMART STUDENT — Faculty Portal Service Layer (F21–F29)
 * Full Integration with Cloud Firestore, Cloud Functions & Cloudinary
 * Handles:
 * F21: Faculty Dashboard & KPI Overview
 * F22: Academic Mapping (Subjects, Sections & Students)
 * F23: Course / Content Management (Upload, Filter, Categorize)
 * F24: Assignment Creation & Management
 * F25: Assignment Evaluation & Grading
 * F26: Attendance Recording & Subject-wise Management
 * F27: Assessment / Examination Evaluation & Publishing
 * F28: Online Meeting Scheduling via Google Meet
 * F29: Faculty Communication (Announcements & Doubt Answering)
 * ==========================================================================
 */

const FacultyService = (() => {
  const STORAGE_KEYS = {
    PROFILE: 'smart_faculty_profile',
    SUBJECTS: 'smart_faculty_subjects',
    STUDENTS: 'smart_faculty_students',
    ASSIGNMENTS: 'smart_faculty_assignments',
    SUBMISSIONS: 'smart_faculty_submissions',
    ATTENDANCE: 'smart_faculty_attendance',
    EXAMS: 'smart_faculty_exams',
    MEETINGS: 'smart_faculty_meetings',
    MATERIALS: 'smart_faculty_materials',
    ANNOUNCEMENTS: 'smart_faculty_announcements',
    DOUBTS: 'smart_faculty_doubts'
  };

  function getDb() {
    return (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized())
      ? window.SmartStudentFirebase.getDb()
      : null;
  }

  function initStorage() {
    const rawMock = (typeof mockFaculty !== 'undefined') ? mockFaculty : {};

    if (!localStorage.getItem(STORAGE_KEYS.PROFILE) && rawMock.profile) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(rawMock.profile));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SUBJECTS) && rawMock.assignedSubjects) {
      localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(rawMock.assignedSubjects));
    }
    if (!localStorage.getItem(STORAGE_KEYS.STUDENTS) && rawMock.studentRoster) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(rawMock.studentRoster));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS) && rawMock.assignments) {
      localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(rawMock.assignments));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) && rawMock.submissions) {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(rawMock.submissions));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ATTENDANCE) && rawMock.attendanceHistory) {
      localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(rawMock.attendanceHistory));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EXAMS) && rawMock.exams) {
      localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(rawMock.exams));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MEETINGS) && rawMock.meetings) {
      localStorage.setItem(STORAGE_KEYS.MEETINGS, JSON.stringify(rawMock.meetings));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MATERIALS) && rawMock.materials) {
      localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(rawMock.materials));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS) && rawMock.announcements) {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(rawMock.announcements));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DOUBTS) && rawMock.doubts) {
      localStorage.setItem(STORAGE_KEYS.DOUBTS, JSON.stringify(rawMock.doubts));
    }
  }

  function getStored(key, fallback = []) {
    initStorage();
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStored(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // =========================================================================
  // F21: Faculty Dashboard & KPI Overview
  // =========================================================================
  function getDashboardStats() {
    initStorage();
    const subjects = getSubjects();
    const students = getStudents();
    const submissions = getSubmissions();
    const meetings = getMeetings();
    const doubts = getDoubts();
    const assignments = getAssignments();

    const pendingSubmissions = submissions.filter(s => s.status === 'submitted').length;
    const unansweredDoubts = doubts.filter(d => d.status === 'unanswered').length;
    const upcomingMeetings = meetings.filter(m => m.status === 'upcoming');
    const totalStudents = students.length;

    return {
      totalSubjects: subjects.length,
      totalStudents,
      pendingSubmissions,
      unansweredDoubts,
      upcomingMeetings,
      activeAssignments: assignments.filter(a => a.status === 'active').length
    };
  }

  // =========================================================================
  // F22: Academic Mapping (Subjects, Sections & Students)
  // =========================================================================
  function getProfile() {
    const user = AuthService.getCurrentUser();
    const stored = getStored(STORAGE_KEYS.PROFILE, (typeof mockFaculty !== 'undefined' ? mockFaculty.profile : {}));
    if (user && user.role === 'faculty') {
      return { ...stored, ...user };
    }
    return stored;
  }

  function updateProfile(updatedData) {
    const current = getProfile();
    const merged = { ...current, ...updatedData };
    setStored(STORAGE_KEYS.PROFILE, merged);

    const db = getDb();
    if (db && current.uid) {
      try {
        db.collection('users').doc(current.uid).set(updatedData, { merge: true });
      } catch (e) {}
    }

    return merged;
  }

  function getSubjects() {
    return getStored(STORAGE_KEYS.SUBJECTS, (typeof mockFaculty !== 'undefined' ? mockFaculty.assignedSubjects : []));
  }

  function getStudents(section = 'all') {
    const allStudents = getStored(STORAGE_KEYS.STUDENTS, (typeof mockFaculty !== 'undefined' ? mockFaculty.studentRoster : []));
    if (section && section !== 'all') {
      return allStudents.filter(s => s.section === section);
    }
    return allStudents;
  }

  function getStudentById(id) {
    const students = getStudents();
    return students.find(s => s.id === id || s.rollNo === id) || null;
  }

  // =========================================================================
  // F23: Course & Content Management (Upload, Categorize, Delete)
  // =========================================================================
  function getMaterials(category = 'all', subjectCode = 'all') {
    let list = getStored(STORAGE_KEYS.MATERIALS, (typeof mockFaculty !== 'undefined' ? mockFaculty.materials : []));
    if (category && category !== 'all') {
      list = list.filter(m => m.category.toLowerCase() === category.toLowerCase());
    }
    if (subjectCode && subjectCode !== 'all') {
      list = list.filter(m => m.subjectCode === subjectCode);
    }
    return list;
  }

  function uploadMaterial(material) {
    const list = getMaterials();
    const newMaterial = {
      id: 'fac_mat_' + Date.now(),
      uploadedAt: new Date().toISOString().split('T')[0],
      downloads: 0,
      fileUrl: material.fileUrl || 'https://res.cloudinary.com/demo/image/upload/sample.pdf',
      ...material
    };
    list.unshift(newMaterial);
    setStored(STORAGE_KEYS.MATERIALS, list);

    const db = getDb();
    if (db) {
      try {
        db.collection('materials').doc(newMaterial.id).set(newMaterial);
      } catch (e) {}
    }

    return newMaterial;
  }

  function deleteMaterial(id) {
    let list = getMaterials();
    list = list.filter(m => m.id !== id);
    setStored(STORAGE_KEYS.MATERIALS, list);

    const db = getDb();
    if (db) {
      try {
        db.collection('materials').doc(id).delete();
      } catch (e) {}
    }
    return true;
  }

  // =========================================================================
  // F24: Assignment Creation & Management
  // =========================================================================
  function getAssignments(subjectCode = 'all') {
    let list = getStored(STORAGE_KEYS.ASSIGNMENTS, (typeof mockFaculty !== 'undefined' ? mockFaculty.assignments : []));
    if (subjectCode && subjectCode !== 'all') {
      list = list.filter(a => a.subjectCode === subjectCode);
    }
    return list;
  }

  function createAssignment(assignmentData) {
    const list = getAssignments();
    const newAssignment = {
      id: 'fac_asg_' + Date.now(),
      publishedAt: new Date().toISOString().split('T')[0],
      totalAssigned: assignmentData.totalAssigned || 74,
      totalSubmitted: 0,
      totalGraded: 0,
      pendingGrading: 0,
      status: 'active',
      ...assignmentData
    };
    list.unshift(newAssignment);
    setStored(STORAGE_KEYS.ASSIGNMENTS, list);

    const db = getDb();
    if (db) {
      try {
        db.collection('assignments').doc(newAssignment.id).set(newAssignment);
        // Create notification
        db.collection('notifications').add({
          title: "New Assignment Published",
          message: `${newAssignment.subjectCode}: "${newAssignment.title}" due ${newAssignment.dueDate}`,
          type: "assignment",
          isUnread: true,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } catch (e) {}
    }

    return newAssignment;
  }

  function deleteAssignment(id) {
    let list = getAssignments();
    list = list.filter(a => a.id !== id);
    setStored(STORAGE_KEYS.ASSIGNMENTS, list);

    const db = getDb();
    if (db) {
      try {
        db.collection('assignments').doc(id).delete();
      } catch (e) {}
    }
    return true;
  }

  // =========================================================================
  // F25: Assignment Evaluation & Grading
  // =========================================================================
  function getSubmissions(assignmentId = 'all', status = 'all') {
    let list = getStored(STORAGE_KEYS.SUBMISSIONS, (typeof mockFaculty !== 'undefined' ? mockFaculty.submissions : []));
    if (assignmentId && assignmentId !== 'all') {
      list = list.filter(s => s.assignmentId === assignmentId);
    }
    if (status && status !== 'all') {
      list = list.filter(s => s.status === status);
    }
    return list;
  }

  function gradeSubmission(submissionId, { marks, feedback, rubric }) {
    const list = getStored(STORAGE_KEYS.SUBMISSIONS, []);
    const index = list.findIndex(s => s.id === submissionId);
    if (index === -1) throw new Error('Submission not found.');

    list[index].marks = Number(marks);
    list[index].feedback = feedback || '';
    list[index].rubric = rubric || {};
    list[index].status = 'graded';
    list[index].gradedAt = new Date().toISOString().split('T')[0];

    setStored(STORAGE_KEYS.SUBMISSIONS, list);

    // Update assignment counter
    const assignmentId = list[index].assignmentId;
    const assignments = getAssignments();
    const asgIndex = assignments.findIndex(a => a.id === assignmentId);
    if (asgIndex !== -1) {
      const assignmentSubs = list.filter(s => s.assignmentId === assignmentId);
      assignments[asgIndex].totalGraded = assignmentSubs.filter(s => s.status === 'graded').length;
      assignments[asgIndex].pendingGrading = assignmentSubs.filter(s => s.status === 'submitted').length;
      setStored(STORAGE_KEYS.ASSIGNMENTS, assignments);
    }

    const db = getDb();
    if (db) {
      try {
        db.collection('submissions').doc(submissionId).update({
          marks: Number(marks),
          feedback: feedback || '',
          rubric: rubric || {},
          status: 'graded',
          gradedAt: new Date().toISOString().split('T')[0]
        });
      } catch (e) {}
    }

    return list[index];
  }

  // =========================================================================
  // F26: Attendance Recording & Management
  // =========================================================================
  function getAttendanceHistory(subjectCode = 'all') {
    let list = getStored(STORAGE_KEYS.ATTENDANCE, (typeof mockFaculty !== 'undefined' ? mockFaculty.attendanceHistory : []));
    if (subjectCode && subjectCode !== 'all') {
      list = list.filter(a => a.subjectCode === subjectCode);
    }
    return list;
  }

  function recordAttendance(attendanceData) {
    const list = getAttendanceHistory();
    const newRecord = {
      id: 'att_rec_' + Date.now(),
      ...attendanceData
    };
    list.unshift(newRecord);
    setStored(STORAGE_KEYS.ATTENDANCE, list);

    const db = getDb();
    if (db) {
      try {
        db.collection('attendance').doc(newRecord.id).set(newRecord);
      } catch (e) {}
    }

    return newRecord;
  }

  // =========================================================================
  // F27: Assessment / Examination Evaluation
  // =========================================================================
  function getExams(subjectCode = 'all') {
    let list = getStored(STORAGE_KEYS.EXAMS, (typeof mockFaculty !== 'undefined' ? mockFaculty.exams : []));
    if (subjectCode && subjectCode !== 'all') {
      list = list.filter(e => e.subjectCode === subjectCode);
    }
    return list;
  }

  function createExam(examData) {
    const list = getExams();
    const newExam = {
      id: 'exam_' + Date.now(),
      evaluatedCount: 0,
      isPublished: false,
      status: 'scheduled',
      ...examData
    };
    list.unshift(newExam);
    setStored(STORAGE_KEYS.EXAMS, list);

    const db = getDb();
    if (db) {
      try {
        db.collection('exams').doc(newExam.id).set(newExam);
      } catch (e) {}
    }

    return newExam;
  }

  function saveExamMarks(examId, studentMarksList, isPublished = false) {
    const list = getExams();
    const index = list.findIndex(e => e.id === examId);
    if (index === -1) throw new Error('Exam not found.');

    const scores = studentMarksList.map(m => Number(m.marks)).filter(s => !isNaN(s));
    const highest = scores.length ? Math.max(...scores) : 0;
    const lowest = scores.length ? Math.min(...scores) : 0;
    const sum = scores.reduce((a, b) => a + b, 0);
    const average = scores.length ? +(sum / scores.length).toFixed(1) : 0;
    const maxMarks = list[index].maxMarks || 25;
    const passingScore = maxMarks * 0.4;
    const passCount = scores.filter(s => s >= passingScore).length;
    const passRate = scores.length ? +((passCount / scores.length) * 100).toFixed(1) : 100;

    list[index].studentMarks = studentMarksList;
    list[index].evaluatedCount = studentMarksList.length;
    list[index].status = 'evaluated';
    list[index].isPublished = isPublished;
    list[index].stats = { average, highest, lowest, passRate };

    setStored(STORAGE_KEYS.EXAMS, list);

    const db = getDb();
    if (db) {
      try {
        db.collection('exams').doc(examId).update({
          studentMarks: studentMarksList,
          evaluatedCount: studentMarksList.length,
          status: isPublished ? 'published' : 'evaluated',
          isPublished: isPublished,
          stats: list[index].stats
        });

        if (isPublished) {
          studentMarksList.forEach(st => {
            const resId = `res_${examId}_${st.id || st.rollNo}`;
            db.collection('results').doc(resId).set({
              id: resId,
              examId: examId,
              examTitle: list[index].title,
              subjectCode: list[index].subjectCode,
              studentId: st.id,
              studentRollNo: st.rollNo,
              studentName: st.name,
              marksObtained: st.marks,
              maxMarks: maxMarks,
              grade: st.grade || 'A',
              isPublished: true,
              publishedAt: new Date().toISOString()
            }, { merge: true });
          });
        }
      } catch (e) {}
    }

    return list[index];
  }

  // =========================================================================
  // F28: Online Meeting Scheduling via Google Meet
  // =========================================================================
  function getMeetings(status = 'all') {
    let list = getStored(STORAGE_KEYS.MEETINGS, (typeof mockFaculty !== 'undefined' ? mockFaculty.meetings : []));
    if (status && status !== 'all') {
      list = list.filter(m => m.status === status);
    }
    return list;
  }

  function scheduleMeeting(meetingData) {
    const list = getMeetings();
    const randomCode = Math.random().toString(36).substring(2, 5) + '-' +
      Math.random().toString(36).substring(2, 6) + '-' +
      Math.random().toString(36).substring(2, 5);

    const newMeeting = {
      id: 'meet_' + Date.now(),
      meetUrl: meetingData.meetUrl || `https://meet.google.com/${randomCode}`,
      status: 'upcoming',
      attendeeCount: meetingData.attendeeCount || 74,
      ...meetingData
    };
    list.unshift(newMeeting);
    setStored(STORAGE_KEYS.MEETINGS, list);

    const db = getDb();
    if (db) {
      try {
        db.collection('meetings').doc(newMeeting.id).set(newMeeting);
        db.collection('notifications').add({
          title: "Online Class Scheduled",
          message: `${newMeeting.subjectCode}: "${newMeeting.title}" on ${newMeeting.date} at ${newMeeting.time}. Link: ${newMeeting.meetUrl}`,
          type: "meeting",
          isUnread: true,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } catch (e) {}
    }

    return newMeeting;
  }

  function deleteMeeting(id) {
    let list = getMeetings();
    list = list.filter(m => m.id !== id);
    setStored(STORAGE_KEYS.MEETINGS, list);

    const db = getDb();
    if (db) {
      try {
        db.collection('meetings').doc(id).delete();
      } catch (e) {}
    }
    return true;
  }

  // =========================================================================
  // F29: Faculty Communication (Announcements & Doubts)
  // =========================================================================
  function getAnnouncements(subjectCode = 'all') {
    let list = getStored(STORAGE_KEYS.ANNOUNCEMENTS, (typeof mockFaculty !== 'undefined' ? mockFaculty.announcements : []));
    if (subjectCode && subjectCode !== 'all') {
      list = list.filter(a => a.subjectCode === subjectCode);
    }
    return list;
  }

  function postAnnouncement(data) {
    const list = getAnnouncements();
    const profile = getProfile();
    const newAnc = {
      id: 'fac_anc_' + Date.now(),
      postedAt: new Date().toISOString().split('T')[0],
      author: profile.name || 'Prof. Sunita Mehta',
      ...data
    };
    list.unshift(newAnc);
    setStored(STORAGE_KEYS.ANNOUNCEMENTS, list);

    const db = getDb();
    if (db) {
      try {
        db.collection('announcements').doc(newAnc.id).set(newAnc);
      } catch (e) {}
    }

    return newAnc;
  }

  function deleteAnnouncement(id) {
    let list = getAnnouncements();
    list = list.filter(a => a.id !== id);
    setStored(STORAGE_KEYS.ANNOUNCEMENTS, list);

    const db = getDb();
    if (db) {
      try {
        db.collection('announcements').doc(id).delete();
      } catch (e) {}
    }
    return true;
  }

  function getDoubts(status = 'all', subjectCode = 'all') {
    let list = getStored(STORAGE_KEYS.DOUBTS, (typeof mockFaculty !== 'undefined' ? mockFaculty.doubts : []));
    if (status && status !== 'all') {
      list = list.filter(d => d.status === status);
    }
    if (subjectCode && subjectCode !== 'all') {
      list = list.filter(d => d.subjectCode === subjectCode);
    }
    return list;
  }

  function answerDoubt(id, answerText) {
    const list = getStored(STORAGE_KEYS.DOUBTS, []);
    const index = list.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Doubt record not found.');

    list[index].answer = answerText;
    list[index].status = 'resolved';
    list[index].answeredAt = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setStored(STORAGE_KEYS.DOUBTS, list);

    const db = getDb();
    if (db) {
      try {
        db.collection('doubts').doc(id).update({
          answer: answerText,
          status: 'resolved',
          answeredAt: list[index].answeredAt
        });
      } catch (e) {}
    }

    return list[index];
  }

  // Initialize data on load
  initStorage();

  return {
    getProfile,
    updateProfile,
    getDashboardStats,
    getSubjects,
    getStudents,
    getStudentById,
    getMaterials,
    uploadMaterial,
    deleteMaterial,
    getAssignments,
    createAssignment,
    deleteAssignment,
    getSubmissions,
    gradeSubmission,
    getAttendanceHistory,
    recordAttendance,
    getExams,
    createExam,
    saveExamMarks,
    getMeetings,
    scheduleMeeting,
    deleteMeeting,
    getAnnouncements,
    postAnnouncement,
    deleteAnnouncement,
    getDoubts,
    answerDoubt
  };
})();

if (typeof window !== 'undefined') {
  window.FacultyService = FacultyService;
}

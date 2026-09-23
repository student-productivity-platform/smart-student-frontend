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
    const unansweredDoubts = doubts.filter(d => d.status === 'unanswered' || d.status === 'escalated' || (!d.answer || d.answer.trim().length === 0)).length;
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
    const user = (typeof AuthService !== 'undefined' && AuthService.getCurrentUser) ? AuthService.getCurrentUser() : null;
    const stored = getStored(STORAGE_KEYS.PROFILE, (typeof mockFaculty !== 'undefined' ? mockFaculty.profile : {}));

    if (user && (user.role === 'faculty' || user.role === 'hod')) {
      // Live session always wins over cached profile storage
      return { ...stored, ...user };
    }
    // No valid session: use stored profile (may be mock)
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
      } catch (e) { }
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
      } catch (e) { }
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
      } catch (e) { }
    }
    return true;
  }

  // =========================================================================
  // F24: Assignment Creation & Management
  // =========================================================================
  function getAssignments(subjectCode = 'all') {
    let list = getStored(STORAGE_KEYS.ASSIGNMENTS, (typeof mockFaculty !== 'undefined' ? mockFaculty.assignments : []));
    let subs = [];
    try {
      subs = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]');
    } catch (_) { }

    list.forEach(a => {
      const rel = subs.filter(s => s.assignmentId === a.id);
      if (rel.length > 0) {
        const pending = rel.filter(s => s.status === 'submitted').length;
        const graded = rel.filter(s => s.status === 'graded').length;
        if ((a.totalSubmitted || 0) < rel.length || (a.pendingGrading === 0 && pending > 0)) {
          a.totalSubmitted = Math.max(a.totalSubmitted || 0, rel.length);
          a.pendingGrading = pending;
          a.totalGraded = Math.max(a.totalGraded || 0, graded);
        }
      }
    });

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

    // Sync to backend API
    try {
      fetch(resolveBackendUrl('/api/assignments'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAssignment)
      }).catch(() => { });
    } catch (_) { }

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
      } catch (e) { }
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
      } catch (e) { }
    }
    return true;
  }

  // =========================================================================
  // F25: Assignment Evaluation & Grading
  // =========================================================================
  function getSubmissions(assignmentId = 'all', status = 'all') {
    // Reconcile with any student submissions stored locally
    try {
      const stuSubs = JSON.parse(localStorage.getItem('smart_student_submissions') || '[]');
      if (Array.isArray(stuSubs) && stuSubs.length > 0) {
        let facSubs = getStored(STORAGE_KEYS.SUBMISSIONS, (typeof mockFaculty !== 'undefined' ? mockFaculty.submissions : []));
        let changed = false;
        stuSubs.forEach(s => {
          const exists = facSubs.some(x => x.id === s.id || (x.assignmentId === s.assignmentId && (x.studentId === s.studentId || x.rollNo === s.rollNo)));
          if (!exists) {
            facSubs.unshift(s);
            changed = true;
          }
        });
        if (changed) {
          setStored(STORAGE_KEYS.SUBMISSIONS, facSubs);
        }
      }
    } catch (_) { }

    let list = getStored(STORAGE_KEYS.SUBMISSIONS, (typeof mockFaculty !== 'undefined' ? mockFaculty.submissions : []));
    if (assignmentId && assignmentId !== 'all') {
      list = list.filter(s => s.assignmentId === assignmentId);
    }
    if (status && status !== 'all') {
      list = list.filter(s => s.status === status);
    }
    return list;
  }

  async function syncSubmissionsWithBackend() {
    let freshSubmissions = [];

    // 1. Fetch from Backend API
    try {
      const resp = await fetch(resolveBackendUrl('/api/submissions'), {
        headers: { 'Accept': 'application/json' }
      });
      if (resp.ok) {
        const body = await resp.json();
        if (Array.isArray(body)) {
          freshSubmissions = body;
        } else if (body && Array.isArray(body.submissions)) {
          freshSubmissions = body.submissions;
        }
      }
    } catch (e) {
      console.warn('[FacultyService] Submissions fetch note:', e.message);
    }

    // 2. Query Cloud Firestore directly if available
    try {
      const db = getDb();
      if (db) {
        const snap = await db.collection('submissions').get();
        snap.forEach(doc => {
          const sData = doc.data();
          if (sData) {
            const exists = freshSubmissions.some(s => s.id === doc.id || (s.assignmentId === sData.assignmentId && s.studentId === sData.studentId));
            if (!exists) {
              freshSubmissions.push({ id: doc.id, ...sData });
            }
          }
        });

        const snap2 = await db.collection('assignmentSubmissions').get();
        snap2.forEach(doc => {
          const sData = doc.data();
          if (sData) {
            const exists = freshSubmissions.some(s => s.id === doc.id || (s.assignmentId === sData.assignmentId && s.studentId === sData.studentId));
            if (!exists) {
              freshSubmissions.push({ id: doc.id, ...sData });
            }
          }
        });
      }
    } catch (fErr) {
      console.warn('[FacultyService] Firestore submission check note:', fErr.message);
    }

    // 3. Also check student submissions stored locally in case offline
    try {
      const stuSubs = JSON.parse(localStorage.getItem('smart_student_submissions') || '[]');
      stuSubs.forEach(s => {
        const exists = freshSubmissions.some(x => x.id === s.id || (x.assignmentId === s.assignmentId && x.studentId === s.studentId));
        if (!exists) {
          freshSubmissions.push(s);
        }
      });
    } catch (_) { }

    // Always start with mock data as base
    const mockBase = (typeof mockFaculty !== 'undefined' && Array.isArray(mockFaculty.submissions)) ? mockFaculty.submissions : [];
    let stored = getStored(STORAGE_KEYS.SUBMISSIONS, mockBase);

    // Merge mock base
    mockBase.forEach(mSub => {
      const exists = stored.some(s => s.id === mSub.id);
      if (!exists) {
        stored.push(mSub);
      }
    });

    // Merge fresh incoming submissions
    if (freshSubmissions.length > 0) {
      const assignments = getStored(STORAGE_KEYS.ASSIGNMENTS, (typeof mockFaculty !== 'undefined' ? mockFaculty.assignments : []));
      freshSubmissions.forEach(bSub => {
        const asgId = bSub.assignmentId || bSub.asgId;
        const matchedAsg = assignments.find(a => a.id === asgId);

        const normalized = {
          id: bSub.id || bSub.submissionId || `sub_${asgId}_${bSub.studentId || Date.now()}`,
          assignmentId: asgId,
          assignmentTitle: bSub.assignmentTitle || (matchedAsg ? matchedAsg.title : 'Assignment'),
          subjectCode: bSub.subjectCode || (matchedAsg ? matchedAsg.subjectCode : 'CS402'),
          subjectName: bSub.subjectName || (matchedAsg ? matchedAsg.subjectName : ''),
          studentId: bSub.studentId || bSub.studentUid || 'stu_010',
          studentName: bSub.studentName || 'Student',
          rollNo: bSub.rollNo || bSub.studentRollNo || 'CS24-042',
          section: bSub.section || 'A',
          submittedAt: bSub.submittedAt ? (bSub.submittedAt.includes('T') ? bSub.submittedAt.replace('T', ' ').substring(0, 16) : bSub.submittedAt) : new Date().toISOString().replace('T', ' ').substring(0, 16),
          fileName: bSub.fileName || 'submission.pdf',
          fileUrl: (bSub.fileUrl && !bSub.fileUrl.includes('res.cloudinary.com/demo/image/upload/sample')) ? bSub.fileUrl : '/uploads/submissions/sample_submission.pdf',
          fileSize: bSub.fileSize || '2.1 MB',
          status: bSub.status || 'submitted',
          marks: bSub.marks !== undefined ? bSub.marks : null,
          maxMarks: bSub.maxMarks || (matchedAsg ? Number(matchedAsg.maxMarks) || 20 : 20),
          feedback: bSub.feedback || '',
          rubric: bSub.rubric || { completeness: null, clarity: null, correctness: null }
        };

        const idx = stored.findIndex(s => s.id === normalized.id || (s.assignmentId === normalized.assignmentId && (s.studentId === normalized.studentId || s.rollNo === normalized.rollNo)));
        if (idx >= 0) {
          stored[idx] = { ...stored[idx], ...normalized };
        } else {
          stored.unshift(normalized);
        }
      });
    }

    setStored(STORAGE_KEYS.SUBMISSIONS, stored);

    // 4. Update assignment counters in STORAGE_KEYS.ASSIGNMENTS
    let asgList = getStored(STORAGE_KEYS.ASSIGNMENTS, (typeof mockFaculty !== 'undefined' ? mockFaculty.assignments : []));
    let asgChanged = false;
    asgList.forEach(asg => {
      const relatedSubs = stored.filter(s => s.assignmentId === asg.id);
      if (relatedSubs.length > 0) {
        const gradedCount = relatedSubs.filter(s => s.status === 'graded').length;
        const submittedCount = relatedSubs.length;
        const pendingCount = relatedSubs.filter(s => s.status === 'submitted').length;
        if ((asg.totalSubmitted || 0) < submittedCount || asg.pendingGrading !== pendingCount || asg.totalGraded !== gradedCount) {
          asg.totalSubmitted = Math.max(asg.totalSubmitted || 0, submittedCount);
          asg.totalGraded = Math.max(asg.totalGraded || 0, gradedCount);
          asg.pendingGrading = pendingCount;
          asgChanged = true;
        }
      }
    });
    if (asgChanged) {
      setStored(STORAGE_KEYS.ASSIGNMENTS, asgList);
    }

    return stored;
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

    // Sync to backend API
    try {
      fetch(resolveBackendUrl('/api/submissions/grade'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId,
          marks: Number(marks),
          feedback: feedback || '',
          rubric: rubric || {},
          actor: getProfile()
        })
      }).catch(() => { });
    } catch (_) { }

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
      } catch (e) { }
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
      } catch (e) { }
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
      } catch (e) { }
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
      } catch (e) { }
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
      } catch (e) { }
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
      } catch (e) { }
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
      } catch (e) { }
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
      } catch (e) { }
    }
    return true;
  }

  const BACKEND_PORT = '8085';

  function resolveBackendUrl(endpoint) {
    if (!endpoint) return endpoint;
    const clean = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
    if (typeof window === 'undefined') return clean;
    const port = window.location.port;
    const hostname = window.location.hostname || 'localhost';
    if (port === BACKEND_PORT) return clean;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `http://${hostname}:${BACKEND_PORT}${clean}`;
    }
    return clean;
  }

  async function syncDoubtsWithBackend() {
    let freshDoubts = [];

    // 1. Fetch from live Backend API
    try {
      const url = resolveBackendUrl('/api/doubts');
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && Array.isArray(data.doubts)) {
          freshDoubts = data.doubts;
        }
      }
    } catch (e) {
      console.warn('[FacultyService] Doubt fetch note:', e.message);
    }

    // 2. Query Cloud Firestore directly if available
    try {
      const db = getDb();
      if (db) {
        const snap = await db.collection('doubts').get();
        snap.forEach(doc => {
          const dData = doc.data();
          if (dData && dData.question) {
            const exists = freshDoubts.some(d => (d.id && d.id === doc.id) || (d.doubtId && d.doubtId === doc.id));
            if (!exists) {
              freshDoubts.push({ id: doc.id, ...dData });
            }
          }
        });
      }
    } catch (fErr) {
      console.warn('[FacultyService] Firestore doubt check note:', fErr.message);
    }

    // Always start with mock data as a base to ensure seed doubts appear
    const mockBase = (typeof mockFaculty !== 'undefined' && Array.isArray(mockFaculty.doubts)) ? mockFaculty.doubts : [];
    let stored = getStored(STORAGE_KEYS.DOUBTS, mockBase);

    // Merge mock base entries that are not yet in stored
    mockBase.forEach(mDoubt => {
      const exists = stored.some(d => d.id === mDoubt.id);
      if (!exists) {
        stored.unshift(mDoubt);
      }
    });

    if (freshDoubts.length > 0) {
      freshDoubts.forEach(bDoubt => {
        const normalized = {
          id: bDoubt.id || bDoubt.doubtId,
          studentId: bDoubt.studentId || bDoubt.studentUid || 'stu_010',
          studentName: bDoubt.studentName || 'Student',
          rollNo: bDoubt.rollNo || bDoubt.studentRollNo || 'CS24-042',
          studentRollNo: bDoubt.studentRollNo || bDoubt.rollNo || 'CS24-042',
          subjectCode: bDoubt.subjectCode || 'CS405',
          subjectName: bDoubt.subject || bDoubt.subjectName || 'Computer Networks',
          question: bDoubt.question || '',
          note: bDoubt.note || bDoubt.notes || '',
          assignedFaculty: bDoubt.assignedFaculty || '',
          status: (bDoubt.status === 'escalated' || bDoubt.status === 'unanswered' || !bDoubt.answer) ? 'unanswered' : (bDoubt.status === 'resolved' || bDoubt.status === 'answered' ? 'resolved' : bDoubt.status),
          createdAt: bDoubt.askedAt || (bDoubt.createdAt ? new Date(bDoubt.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Today'),
          answer: bDoubt.answer || bDoubt.facultyAnswer || '',
          answeredAt: bDoubt.answeredAt || ''
        };

        const idx = stored.findIndex(d => d.id === normalized.id);
        if (idx >= 0) {
          stored[idx] = { ...stored[idx], ...normalized };
        } else {
          stored.unshift(normalized);
        }
      });
    }

    setStored(STORAGE_KEYS.DOUBTS, stored);
    return stored;
  }

  function getDoubts(status = 'all', subjectCode = 'all') {
    let list = getStored(STORAGE_KEYS.DOUBTS, (typeof mockFaculty !== 'undefined' ? mockFaculty.doubts : []));
    if (status && status !== 'all') {
      if (status === 'unanswered') {
        list = list.filter(d => d.status === 'unanswered' || d.status === 'escalated' || !d.answer || d.answer.trim().length === 0);
      } else if (status === 'resolved') {
        list = list.filter(d => d.status === 'resolved' || d.status === 'answered' || (d.answer && d.answer.trim().length > 0));
      } else {
        list = list.filter(d => d.status === status);
      }
    }
    if (subjectCode && subjectCode !== 'all') {
      list = list.filter(d =>
        (d.subjectCode && d.subjectCode.toUpperCase() === subjectCode.toUpperCase()) ||
        (d.subjectName && d.subjectName.toLowerCase().includes(subjectCode.toLowerCase()))
      );
    }
    return list;
  }

  async function answerDoubt(id, answerText) {
    const list = getStored(STORAGE_KEYS.DOUBTS, []);
    const index = list.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Doubt record not found.');

    list[index].answer = answerText;
    list[index].status = 'resolved';
    list[index].answeredAt = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setStored(STORAGE_KEYS.DOUBTS, list);

    // Sync to backend API
    try {
      fetch(resolveBackendUrl('/api/doubts/answer'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doubtId: id, answer: answerText, actor: getProfile() })
      }).catch(() => { });
    } catch (e) { }

    const db = getDb();
    if (db) {
      try {
        db.collection('doubts').doc(id).set({
          answer: answerText,
          status: 'resolved',
          answeredAt: list[index].answeredAt
        }, { merge: true }).catch(() => { });
      } catch (e) { }
    }

    return list[index];
  }

  // =========================================================================
  // Profile UI Renderer — Called on every faculty page to show logged-in user
  // =========================================================================
  function renderFacultyProfile() {
    const profile = getProfile();
    const name = profile.name || profile.displayName || 'Faculty Member';
    const designation = profile.designation || profile.role || 'Faculty';

    // Compute initials (up to 2 chars from name words)
    const parts = name.replace(/^(Prof\.|Dr\.|Mr\.|Mrs\.|Ms\.)\s*/i, '').trim().split(/\s+/);
    const initials = (parts[0]?.[0] || '') + (parts[1]?.[0] || '');

    // --- Sidebar bottom card ---
    document.querySelectorAll('.user-avatar-initials').forEach(el => { el.textContent = initials.toUpperCase() || 'FA'; });
    document.querySelectorAll('.user-name, #sidebar-user-name').forEach(el => { el.textContent = name; });
    document.querySelectorAll('.user-role-tag, #sidebar-user-role').forEach(el => { el.textContent = designation; });

    // --- Topbar user menu ---
    const topbarName = document.getElementById('topbar-user-name');
    if (topbarName) topbarName.textContent = name;
    const topbarSub = document.querySelector('.user-menu-sub');
    if (topbarSub) topbarSub.textContent = designation;
    const userMenuName = document.querySelector('.user-menu-name');
    if (userMenuName) userMenuName.textContent = name;

    // --- Dashboard welcome banner ---
    const banner = document.getElementById('banner-faculty-name');
    if (banner) banner.textContent = name;

    // --- Profile page specific fields ---
    const profName = document.getElementById('prof-name');
    if (profName) profName.textContent = name;
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
    syncSubmissionsWithBackend,
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
    syncDoubtsWithBackend,
    answerDoubt,
    renderFacultyProfile
  };
})();

if (typeof window !== 'undefined') {
  window.FacultyService = FacultyService;
}

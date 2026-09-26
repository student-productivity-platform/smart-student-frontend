/**
 * ==========================================================================
 * SMART STUDENT — Assignment Service Layer
 * Manages upcoming assignments, submissions, Cloudinary uploads, and evaluations
 * ==========================================================================
 */

const AssignmentService = (() => {
  function getDb() {
    return (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized())
      ? window.SmartStudentFirebase.getDb()
      : null;
  }

  function resolveBackendUrl(endpoint) {
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      const currentPort = window.location.port;
      if (currentPort && currentPort !== '8085') {
        return `http://${window.location.hostname}:8085${endpoint}`;
      }
    }
    return endpoint;
  }

  /**
   * Get Assignments with optional status filter
   */
  /**
   * Get Assignments with optional status filter
   * Merges mock assignments, faculty-published assignments, and Firestore assignments
   */
  async function getAssignments(statusFilter = null) {
    let list = [];
    const db = getDb();
    const activeDomain = (typeof DomainService !== 'undefined' && DomainService.getActiveDomain)
      ? DomainService.getActiveDomain()
      : 'dept_btech';

    function matchesDomain(a, domId) {
      if (a.domainId && a.domainId === domId) return true;
      if (a.departmentId && a.departmentId === domId) return true;
      const dept = (a.department || '').toLowerCase();
      const code = (a.subjectCode || a.code || '').toUpperCase();
      if (domId === 'dept_mba') {
        return dept.includes('mba') || dept.includes('management') || code.startsWith('MBA');
      } else if (domId === 'dept_bba') {
        return dept.includes('bba') || dept.includes('business') || code.startsWith('BBA');
      } else {
        return dept.includes('b.tech') || dept.includes('btech') || dept.includes('comp') || dept.includes('cs') || code.startsWith('CS');
      }
    }

    function normalizeAsg(a) {
      const subject = a.subject || a.subjectName || a.title || 'Course';
      const subjectCode = a.subjectCode || a.code || 'COURSE';
      const faculty = a.faculty || a.facultyName || 'Course Faculty';
      return {
        ...a,
        subject,
        subjectName: subject,
        subjectCode,
        faculty
      };
    }

    // 1. Fetch from Firestore
    if (db) {
      try {
        let query = db.collection('assignments');
        if (statusFilter && statusFilter !== 'all') {
          query = query.where('status', '==', statusFilter);
        }
        const snapshot = await query.get();
        if (!snapshot.empty) {
          list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (err) {
        console.warn("Firestore assignments fetch note:", err);
      }
    }

    // 2. Fetch from Backend API
    try {
      const resp = await fetch('/api/assignments');
      if (resp.ok) {
        const bAsgs = await resp.json();
        if (Array.isArray(bAsgs)) {
          bAsgs.forEach(b => {
            const idx = list.findIndex(a => a.id === b.id);
            if (idx >= 0) list[idx] = { ...list[idx], ...b };
            else list.push(b);
          });
        }
      }
    } catch (_) {}

    // 3. Merge faculty published assignments from localStorage
    try {
      const facAsgs = JSON.parse(localStorage.getItem('smart_faculty_assignments') || '[]');
      if (Array.isArray(facAsgs)) {
        facAsgs.forEach(f => {
          const idx = list.findIndex(a => a.id === f.id);
          if (idx >= 0) {
            list[idx] = { ...f, ...list[idx] };
          } else {
            list.push({
              ...f,
              subject: f.subjectName || f.subjectCode || 'Coursework',
              faculty: f.faculty || 'Course Faculty'
            });
          }
        });
      }
    } catch (_) {}

    // 4. Normalize and filter remote/local items by active student domain
    list = list.map(normalizeAsg).filter(a => matchesDomain(a, activeDomain));

    // 5. Merge domain-scoped mock assignments if missing
    let domainMocks = [];
    if (typeof getAssignmentsForDomain === 'function') {
      domainMocks = getAssignmentsForDomain(activeDomain);
    } else if (typeof allDomainAssignments !== 'undefined' && allDomainAssignments[activeDomain]) {
      domainMocks = allDomainAssignments[activeDomain];
    } else if (typeof window !== 'undefined' && window.mockAssignments) {
      domainMocks = window.mockAssignments;
    }

    if (Array.isArray(domainMocks)) {
      domainMocks.forEach(m => {
        const norm = normalizeAsg(m);
        if (!list.some(a => a.id === norm.id || (a.title === norm.title && a.subjectCode === norm.subjectCode))) {
          list.push(norm);
        }
      });
    }

    // 6. Cross-check against student submissions
    const activeSession = (typeof AuthService !== 'undefined' && AuthService.getCurrentUser) ? AuthService.getCurrentUser() : null;
    const uid = activeSession ? (activeSession.uid || activeSession.id) : (activeDomain === 'dept_mba' ? 'usr_stu_mba_1' : (activeDomain === 'dept_bba' ? 'usr_stu_bba_1' : 'usr_stu_8842'));
    const rollNo = activeSession ? (activeSession.rollNo || activeSession.studentId || 'CS24-042') : 'CS24-042';

    let allSubs = [];
    try {
      allSubs = JSON.parse(localStorage.getItem('smart_faculty_submissions') || '[]');
    } catch (_) {}
    try {
      const stuSubs = JSON.parse(localStorage.getItem('smart_student_submissions') || '[]');
      stuSubs.forEach(s => {
        if (!allSubs.some(x => x.id === s.id)) allSubs.push(s);
      });
    } catch (_) {}

    list.forEach(asg => {
      const mySub = allSubs.find(s => s.assignmentId === asg.id && (s.studentId === uid || s.rollNo === rollNo));
      if (mySub) {
        asg.status = mySub.status || 'submitted';
        asg.submittedFile = mySub.fileName;
        asg.submittedAt = mySub.submittedAt || 'Submitted';
        if (mySub.marks !== null && mySub.marks !== undefined) {
          asg.score = mySub.marks;
          asg.maxMarks = mySub.maxMarks || asg.maxMarks || 20;
          asg.feedback = mySub.feedback || 'Evaluated';
          asg.grade = (asg.score / asg.maxMarks) >= 0.9 ? 'O' : (asg.score / asg.maxMarks) >= 0.8 ? 'A+' : 'A';
        }
      } else if (!asg.status || asg.status === 'active') {
        asg.status = 'pending';
      }
    });

    if (statusFilter && statusFilter !== 'all') {
      list = list.filter(item => item.status === statusFilter);
    }

    return list;
  }

  /**
   * Get Submissions for current student
   */
  async function getMySubmissions() {
    const activeSession = (typeof AuthService !== 'undefined' && AuthService.getCurrentUser) ? AuthService.getCurrentUser() : null;
    const uid = activeSession ? (activeSession.uid || activeSession.id) : 'usr_stu_8842';
    const rollNo = activeSession ? (activeSession.rollNo || activeSession.studentId || 'CS24-042') : 'CS24-042';
    const db = getDb();
    let list = [];

    if (db) {
      try {
        const snap = await db.collection('submissions').where('studentId', '==', uid).get();
        if (!snap.empty) {
          list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
      } catch (e) {}
    }

    // Check localStorage
    try {
      const facSubs = JSON.parse(localStorage.getItem('smart_faculty_submissions') || '[]');
      facSubs.filter(s => s.studentId === uid || s.rollNo === rollNo).forEach(s => {
        if (!list.some(x => x.id === s.id)) list.push(s);
      });
    } catch (_) {}

    return list;
  }

  /**
   * Upload File (Cloudinary with local server fallback    */
  async function uploadFile(file, folder = 'assignments') {
    if (!file) throw new Error('No file provided for upload.');

    // Convert file to Base64
    const base64Data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });

    const fileName = (file.name || 'submission.pdf').replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileSize = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

    // 1. Direct Cloudinary upload check
    try {
      const sigResp = await fetch(resolveBackendUrl(`/api/generateUploadSignature?folder=${encodeURIComponent(folder)}`));
      if (sigResp.ok) {
        const sigData = await sigResp.json();
        if (sigData.isConfigured && sigData.cloudName && sigData.apiKey && !sigData.apiKey.startsWith('demo')) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('api_key', sigData.apiKey);
          formData.append('timestamp', sigData.timestamp);
          formData.append('signature', sigData.signature);
          formData.append('folder', sigData.folder || folder);

          const clResp = await fetch(`https://api.cloudinary.com/v1_1/${sigData.cloudName}/auto/upload`, {
            method: 'POST',
            body: formData
          });

          if (clResp.ok) {
            const clData = await clResp.json();
            if (clData.secure_url) {
              return {
                url: clData.secure_url,
                publicId: clData.public_id,
                fileName: fileName,
                fileSize: fileSize,
                folder: clData.asset_folder || folder,
                provider: 'cloudinary'
              };
            }
          }
        }
      }
    } catch (e) {
      console.warn('[AssignmentService] Direct Cloudinary check note:', e);
    }

    // 2. Upload through Backend Server (/api/upload)
    try {
      const uploadResp = await fetch(resolveBackendUrl('/api/upload'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: fileName,
          fileData: base64Data,
          folder: folder
        })
      });

      if (uploadResp.ok) {
        const result = await uploadResp.json();
        if (result.success && result.url) {
          return {
            url: result.url,
            publicId: result.publicId || `${folder}/${Date.now()}_${fileName}`,
            fileName: fileName,
            fileSize: result.fileSize || fileSize,
            folder: result.folder || folder,
            provider: result.provider || 'cloudinary'
          };
        }
      }
    } catch (err) {
      console.warn('[AssignmentService] Backend upload note:', err);
    }

    // 3. Fallback: Base64 data URL
    return {
      url: base64Data,
      publicId: `data_${Date.now()}`,
      fileName: fileName,
      fileSize: fileSize,
      folder: folder,
      provider: 'client_base64'
    };
  }

  /**
   * Submit Assignment File
   * Persists to:
   * 1. localStorage['smart_faculty_submissions'] (instant faculty portal sync)
   * 2. localStorage['smart_faculty_assignments'] (increments pendingGrading & totalSubmitted)
   * 3. localStorage['smart_student_submissions']
   * 4. Cloud Firestore (submissions & assignmentSubmissions collections)
   * 5. Backend Server API (/api/assignments/submit)
   */
  async function submitAssignment(assignmentId, fileData) {
    const activeSession = (typeof AuthService !== 'undefined' && AuthService.getCurrentUser) ? AuthService.getCurrentUser() : null;
    const studentUid = activeSession ? (activeSession.uid || activeSession.id) : 'usr_stu_8842';
    const studentName = activeSession ? (activeSession.name || activeSession.displayName) : 'Riddhi Zunjarrao';
    const rollNo = activeSession ? (activeSession.rollNo || activeSession.studentId || 'CS24-042') : 'CS24-042';
    const section = activeSession ? (activeSession.section || 'A') : 'A';

    // Find assignment details
    let targetAsg = null;
    try {
      const facAsgs = JSON.parse(localStorage.getItem('smart_faculty_assignments') || '[]');
      targetAsg = facAsgs.find(a => a.id === assignmentId);
    } catch (_) {}

    if (!targetAsg && typeof window !== 'undefined' && Array.isArray(window.mockAssignments)) {
      targetAsg = window.mockAssignments.find(a => a.id === assignmentId);
    }

    const subId = `sub_${assignmentId}_${studentUid}`;
    const submissionDateFormatted = new Date().toISOString().replace('T', ' ').substring(0, 16);

    // Ensure fileUrl is a valid accessible URL
    let resolvedFileUrl = '/uploads/submissions/sample_submission.pdf';
    const incomingUrl = fileData ? (fileData.url || fileData.fileUrl) : null;
    if (incomingUrl && !incomingUrl.includes('res.cloudinary.com/demo/image/upload/sample')) {
      resolvedFileUrl = incomingUrl;
    }

    const submissionRecord = {
      id: subId,
      submissionId: subId,
      assignmentId: assignmentId,
      assignmentTitle: targetAsg ? targetAsg.title : 'Assignment Submission',
      subjectCode: targetAsg ? targetAsg.subjectCode : 'CS402',
      subjectName: targetAsg ? (targetAsg.subject || targetAsg.subjectName || 'Coursework') : 'Coursework',
      studentId: studentUid,
      studentName: studentName,
      rollNo: rollNo,
      studentRollNo: rollNo,
      section: section,
      submittedAt: submissionDateFormatted,
      status: 'submitted',
      fileName: (fileData && fileData.name) ? fileData.name : 'submission.pdf',
      fileUrl: resolvedFileUrl,
      cloudinaryPublicId: (fileData && fileData.cloudinaryPublicId) ? fileData.cloudinaryPublicId : ('student_submissions/' + assignmentId + '_' + Date.now()),
      fileSize: (fileData && fileData.size) ? fileData.size : '2.1 MB',
      marks: null,
      maxMarks: targetAsg ? (Number(targetAsg.maxMarks) || 20) : 20,
      feedback: '',
      rubric: { completeness: null, clarity: null, correctness: null }
    };

    // 1. Immediately store into localStorage['smart_faculty_submissions']
    try {
      const storedKey = 'smart_faculty_submissions';
      let existingSubs = [];
      const raw = localStorage.getItem(storedKey);
      if (raw) {
        existingSubs = JSON.parse(raw);
      } else if (typeof mockFaculty !== 'undefined' && Array.isArray(mockFaculty.submissions)) {
        existingSubs = [...mockFaculty.submissions];
      }

      const idx = existingSubs.findIndex(s => s.id === subId || (s.assignmentId === assignmentId && (s.studentId === studentUid || s.rollNo === rollNo)));
      if (idx >= 0) {
        existingSubs[idx] = { ...existingSubs[idx], ...submissionRecord };
      } else {
        existingSubs.unshift(submissionRecord);
      }
      localStorage.setItem(storedKey, JSON.stringify(existingSubs));
    } catch (localErr) {
      console.warn('[AssignmentService] Faculty submissions storage note:', localErr);
    }

    // 2. Update assignment counters in localStorage['smart_faculty_assignments']
    try {
      let facultyAsgs = [];
      const rawAsgs = localStorage.getItem('smart_faculty_assignments');
      if (rawAsgs) {
        facultyAsgs = JSON.parse(rawAsgs);
      } else if (typeof mockFaculty !== 'undefined' && Array.isArray(mockFaculty.assignments)) {
        facultyAsgs = [...mockFaculty.assignments];
      }

      const asgIdx = facultyAsgs.findIndex(a => a.id === assignmentId);
      if (asgIdx >= 0) {
        const rawSubs = localStorage.getItem('smart_faculty_submissions');
        const allSubs = rawSubs ? JSON.parse(rawSubs) : [];
        const relatedSubs = allSubs.filter(s => s.assignmentId === assignmentId);
        facultyAsgs[asgIdx].totalSubmitted = Math.max(relatedSubs.length, (facultyAsgs[asgIdx].totalSubmitted || 0) + 1);
        facultyAsgs[asgIdx].pendingGrading = relatedSubs.filter(s => s.status === 'submitted').length || 1;
        facultyAsgs[asgIdx].totalGraded = relatedSubs.filter(s => s.status === 'graded').length || 0;
        localStorage.setItem('smart_faculty_assignments', JSON.stringify(facultyAsgs));
      }
    } catch (asgErr) {
      console.warn('[AssignmentService] Faculty assignments counter update note:', asgErr);
    }

    // 3. Store into student local submissions cache
    try {
      let studentSubs = [];
      const rawStu = localStorage.getItem('smart_student_submissions');
      if (rawStu) studentSubs = JSON.parse(rawStu);
      const sIdx = studentSubs.findIndex(s => s.assignmentId === assignmentId);
      if (sIdx >= 0) studentSubs[sIdx] = submissionRecord;
      else studentSubs.unshift(submissionRecord);
      localStorage.setItem('smart_student_submissions', JSON.stringify(studentSubs));
    } catch (_) {}

    // 4. Sync to Firestore
    const db = getDb();
    if (db) {
      try {
        await db.collection('submissions').doc(subId).set(submissionRecord, { merge: true });
        await db.collection('assignmentSubmissions').doc(subId).set(submissionRecord, { merge: true });
        await db.collection('assignments').doc(assignmentId).set({
          totalSubmitted: firebase.firestore.FieldValue ? firebase.firestore.FieldValue.increment(1) : 1,
          pendingGrading: firebase.firestore.FieldValue ? firebase.firestore.FieldValue.increment(1) : 1
        }, { merge: true });
      } catch (e) {
        console.warn("[AssignmentService] Firestore submission write note:", e);
      }
    }

    // 5. Sync to Backend API
    try {
      fetch('/api/assignments/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionRecord)
      }).catch(() => {});
    } catch (_) {}

    if (window.mockAssignments) {
      const match = window.mockAssignments.find(a => a.id === assignmentId);
      if (match) {
        match.status = 'submitted';
        match.submittedAt = 'Just now';
        match.submittedFile = submissionRecord.fileName;
      }
    }

    return submissionRecord;
  }

  return {
    getAssignments,
    getMySubmissions,
    uploadFile,
    submitAssignment
  };
})();

if (typeof window !== 'undefined') {
  window.AssignmentService = AssignmentService;
}

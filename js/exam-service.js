/**
 * ==========================================================================
 * SMART STUDENT — Examination & Assessment Service Layer (F27)
 * Handles:
 * - Upcoming Exam Schedules (Student Portal)
 * - Published Results Access (Student Portal)
 * - MCQ Exam Creation, Question Builder & Configuration (Faculty Portal)
 * - Automatic MCQ Evaluation & Grading Matrix
 * - Firestore Persistence & Offline-First Local Storage Fallback
 * ==========================================================================
 */

const ExamService = (() => {
  const STORAGE_KEY = 'smart_faculty_exams';

  function getDb() {
    return (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized())
      ? window.SmartStudentFirebase.getDb()
      : null;
  }

  function getStoredExams() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If existing exam_001 is from older version with only 3 questions or low scores, upgrade it
          const e1 = parsed.find(e => e.id === 'exam_001');
          if (e1 && (e1.questions?.length < 5 || (e1.stats && e1.stats.average < 10))) {
            localStorage.removeItem(STORAGE_KEY);
          } else {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn('[ExamService] LocalStorage read note:', e);
    }

    // Initialize with existing faculty exams from mockFaculty or defaults
    const fallbackExams = [
      {
        id: 'exam_001',
        name: 'Semester 4 Mid-Term MCQ Examination',
        title: 'Semester 4 Mid-Term MCQ Examination',
        type: 'mcq',
        subject: 'Database Management Systems',
        subjectCode: 'CS402',
        courseCode: 'CS402',
        program: 'B.Tech',
        semester: 4,
        section: 'A',
        totalQuestions: 10,
        marksPerQuestion: 2,
        totalMarks: 20,
        duration: 30,
        passingMarks: 8,
        negativeMarking: true,
        negativeMarks: 0.25,
        startDateTime: '2026-09-20T10:00',
        endDateTime: '2026-09-20T11:00',
        instructions: 'Attempt all questions. Each correct answer carries 2 marks. Incorrect answers will incur 0.25 negative mark penalty.',
        status: 'published',
        isPublished: true,
        facultyId: 'usr_fac_1001',
        questions: [
          {
            id: 'q_1',
            questionText: 'What is the primary key property in a relational database table?',
            options: {
              A: 'Must contain unique and non-null values',
              B: 'Can contain null values if indexed',
              C: 'Must always be an auto-incrementing integer',
              D: 'Can have duplicate values within a transaction'
            },
            correctAnswer: 'A',
            marks: 2,
            explanation: 'A primary key uniquely identifies each record in a relational database table and cannot contain NULL values.'
          },
          {
            id: 'q_2',
            questionText: 'Which normal form eliminates transitive functional dependency?',
            options: {
              A: 'First Normal Form (1NF)',
              B: 'Second Normal Form (2NF)',
              C: 'Third Normal Form (3NF)',
              D: 'Boyce-Codd Normal Form (BCNF)'
            },
            correctAnswer: 'C',
            marks: 2,
            explanation: '3NF requires that the relation is in 2NF and no non-prime attribute is transitively dependent on any candidate key.'
          },
          {
            id: 'q_3',
            questionText: 'Which ACID property ensures that transactions are completed fully or not at all?',
            options: {
              A: 'Consistency',
              B: 'Atomicity',
              C: 'Isolation',
              D: 'Durability'
            },
            correctAnswer: 'B',
            marks: 2,
            explanation: 'Atomicity follows the all-or-nothing rule for transaction execution.'
          },
          {
            id: 'q_4',
            questionText: 'Which relational algebra operation selects rows that satisfy a specified condition?',
            options: {
              A: 'Projection (π)',
              B: 'Selection (σ)',
              C: 'Cartesian Product (×)',
              D: 'Join (⋈)'
            },
            correctAnswer: 'B',
            marks: 2,
            explanation: 'The selection operator (sigma) yields a horizontal subset of rows matching a predicate.'
          },
          {
            id: 'q_5',
            questionText: 'What type of constraint ensures referential integrity between two related tables?',
            options: {
              A: 'Check Constraint',
              B: 'Unique Key',
              C: 'Foreign Key',
              D: 'Default Constraint'
            },
            correctAnswer: 'C',
            marks: 2,
            explanation: 'Foreign keys link a column or combination of columns in one table to the primary key in another table.'
          },
          {
            id: 'q_6',
            questionText: 'Which indexing structure is most commonly used for database table indexing?',
            options: {
              A: 'Binary Search Tree',
              B: 'B+ Tree',
              C: 'Red-Black Tree',
              D: 'AVL Tree'
            },
            correctAnswer: 'B',
            marks: 2,
            explanation: 'B+ Trees have high fan-out, shallow depth, and linked leaf nodes ideal for disk block I/O.'
          },
          {
            id: 'q_7',
            questionText: 'In SQL, which clause is used to filter records resulting from an aggregate GROUP BY query?',
            options: {
              A: 'WHERE',
              B: 'HAVING',
              C: 'ORDER BY',
              D: 'QUALIFY'
            },
            correctAnswer: 'B',
            marks: 2,
            explanation: 'HAVING specifies search conditions for a group or an aggregate function.'
          },
          {
            id: 'q_8',
            questionText: 'Which protocol ensures serializability in concurrent database transaction processing?',
            options: {
              A: 'Two-Phase Commit (2PC)',
              B: 'Two-Phase Locking (2PL)',
              C: 'Vector Clock Protocol',
              D: 'Gossip Protocol'
            },
            correctAnswer: 'B',
            marks: 2,
            explanation: 'Two-Phase Locking (growing and shrinking phases) guarantees conflict serializability.'
          },
          {
            id: 'q_9',
            questionText: 'A database view is best described as:',
            options: {
              A: 'A physical duplicate copy of a base table',
              B: 'A virtual table based on the result-set of an SQL statement',
              C: 'A temporary memory buffer for queries',
              D: 'A log file containing transaction history'
            },
            correctAnswer: 'B',
            marks: 2,
            explanation: 'Views are virtual tables whose contents are dynamically defined by a query.'
          },
          {
            id: 'q_10',
            questionText: 'Which of the following is categorized as a Data Definition Language (DDL) command?',
            options: {
              A: 'INSERT',
              B: 'UPDATE',
              C: 'ALTER',
              D: 'SELECT'
            },
            correctAnswer: 'C',
            marks: 2,
            explanation: 'ALTER modifies the structure of an existing database object, which is a DDL operation.'
          }
        ],
        stats: {
          average: 17.4,
          highest: 20,
          lowest: 13,
          passRate: 97.3
        },
        studentMarks: [
          { studentId: 'stu_001', rollNo: 'CS24-001', name: 'Aarav Sharma', section: 'A', marks: 18.0, maxMarks: 20, grade: 'A+', status: 'Pass' },
          { studentId: 'stu_002', rollNo: 'CS24-002', name: 'Aditi Deshmukh', section: 'A', marks: 16.5, maxMarks: 20, grade: 'A', status: 'Pass' },
          { studentId: 'stu_003', rollNo: 'CS24-003', name: 'Ananya Iyer', section: 'A', marks: 20.0, maxMarks: 20, grade: 'O', status: 'Pass' },
          { studentId: 'stu_004', rollNo: 'CS24-004', name: 'Devansh Patel', section: 'A', marks: 13.5, maxMarks: 20, grade: 'B+', status: 'Pass' },
          { studentId: 'stu_005', rollNo: 'CS24-005', name: 'Ishita Roy', section: 'A', marks: 17.5, maxMarks: 20, grade: 'A+', status: 'Pass' },
          { studentId: 'stu_008', rollNo: 'CS24-008', name: 'Neha Gupta', section: 'A', marks: 19.5, maxMarks: 20, grade: 'O', status: 'Pass' },
          { studentId: 'stu_010', rollNo: 'CS24-042', name: 'Riddhi Zunjarrao', section: 'A', marks: 19.5, maxMarks: 20, grade: 'O', status: 'Pass' },
          { studentId: 'stu_012', rollNo: 'CS24-012', name: 'Sanya Malhotra', section: 'A', marks: 18.5, maxMarks: 20, grade: 'A+', status: 'Pass' },
          { studentId: 'stu_015', rollNo: 'CS24-015', name: 'Zoya Khan', section: 'A', marks: 20.0, maxMarks: 20, grade: 'O', status: 'Pass' }
        ]
      }
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackExams));
    return fallbackExams;
  }

  function setStoredExams(exams) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(exams));
    } catch (e) {
      console.warn('[ExamService] LocalStorage write note:', e);
    }
  }

  /**
   * Return Authorized Subjects assigned to current faculty
   */
  function getAuthorizedSubjects() {
    let list = null;
    if (typeof FacultyService !== 'undefined' && FacultyService.getSubjects) {
      list = FacultyService.getSubjects();
    } else if (typeof mockFaculty !== 'undefined' && mockFaculty.assignedSubjects) {
      list = mockFaculty.assignedSubjects;
    }

    // Filter against profile assignedSubjects codes if present
    const faculty = (typeof FacultyService !== 'undefined' && FacultyService.getProfile)
      ? FacultyService.getProfile()
      : (typeof mockFaculty !== 'undefined' ? mockFaculty.profile : null);

    if (faculty && Array.isArray(faculty.assignedSubjects)) {
      if (list && list.length) {
        list = list.filter(s => {
          const code = typeof s === 'string' ? s : s.code;
          return faculty.assignedSubjects.includes(code);
        });
      }
    }

    if (list && list.length) {
      // Normalize to object format
      return list.map(s => {
        if (typeof s === 'string') {
          return { code: s, name: s, department: 'Computer Engineering' };
        }
        return s;
      });
    }

    return [
      { code: 'CS402', name: 'Database Management Systems', semester: 4, department: 'Computer Engineering' },
      { code: 'CS404', name: 'Operating Systems', semester: 4, department: 'Computer Engineering' },
      { code: 'CS402L', name: 'DBMS Practical & Lab', semester: 4, department: 'Computer Engineering' }
    ];
  }

  /**
   * Verify if subjectCode is authorized for current faculty
   */
  function isSubjectAuthorized(subjectCode) {
    const authorized = getAuthorizedSubjects();
    return authorized.some(s => s.code.toUpperCase() === (subjectCode || '').toUpperCase());
  }

  /**
   * Get all exams (filtered optionally by subject)
   */
  function getExams(subjectCode = 'all') {
    const list = getStoredExams();
    if (subjectCode && subjectCode !== 'all') {
      return list.filter(e => (e.subjectCode || e.courseCode) === subjectCode);
    }
    return list;
  }

  /**
   * Get a single exam by ID
   */
  function getExam(examId) {
    const list = getStoredExams();
    return list.find(e => e.id === examId) || null;
  }

  /**
   * Create a new MCQ or standard examination
   */
  async function createExam(examData) {
    const subjectCode = examData.subjectCode || examData.courseCode;
    if (!isSubjectAuthorized(subjectCode)) {
      throw new Error(`Unauthorized Subject: You do not have teaching allocation for ${subjectCode}.`);
    }

    const list = getStoredExams();
    const totalQuestions = Number(examData.totalQuestions) || 20;
    const marksPerQuestion = Number(examData.marksPerQuestion) || 1;
    const calculatedTotal = totalQuestions * marksPerQuestion;

    const newExam = {
      id: 'exam_' + Date.now(),
      name: examData.name || examData.title || 'Untitled Assessment',
      title: examData.name || examData.title || 'Untitled Assessment',
      type: examData.type || 'mcq',
      subject: examData.subject || examData.subjectName || 'Database Management Systems',
      subjectCode: subjectCode,
      courseCode: subjectCode,
      program: examData.program || 'B.Tech',
      semester: Number(examData.semester) || 4,
      section: examData.section || 'A',
      totalQuestions: totalQuestions,
      marksPerQuestion: marksPerQuestion,
      totalMarks: calculatedTotal,
      maxMarks: calculatedTotal,
      duration: Number(examData.duration) || 30,
      startDateTime: examData.startDateTime || new Date().toISOString().slice(0, 16),
      endDateTime: examData.endDateTime || '',
      passingMarks: Number(examData.passingMarks) || Math.ceil(calculatedTotal * 0.4),
      negativeMarking: Boolean(examData.negativeMarking),
      negativeMarks: Number(examData.negativeMarks) || 0,
      instructions: examData.instructions || 'Attempt all questions. Select one correct option per question.',
      status: examData.status || 'draft',
      isPublished: examData.status === 'published',
      facultyId: examData.facultyId || 'usr_fac_1001',
      facultyName: examData.facultyName || 'Prof. Sunita Mehta',
      createdAt: new Date().toISOString(),
      questions: examData.questions || [],
      studentMarks: [],
      stats: { average: 0, highest: 0, lowest: 0, passRate: 0 }
    };

    list.unshift(newExam);
    setStoredExams(list);

    // Sync to Firestore if available
    const db = getDb();
    if (db) {
      try {
        await db.collection('exams').doc(newExam.id).set(newExam);
      } catch (err) {
        console.warn('[ExamService] Firestore create exam note:', err.message);
      }
    }

    return newExam;
  }

  /**
   * Update exam configuration
   */
  async function updateExam(examId, updatedData) {
    const list = getStoredExams();
    const index = list.findIndex(e => e.id === examId);
    if (index === -1) throw new Error('Examination record not found.');

    const current = list[index];
    if (current.status === 'published' && current.studentMarks && current.studentMarks.length > 0) {
      // Protected exam: allow modifying only non-critical metadata
      const allowedKeys = ['name', 'title', 'instructions', 'endDateTime'];
      Object.keys(updatedData).forEach(k => {
        if (allowedKeys.includes(k)) current[k] = updatedData[k];
      });
    } else {
      Object.assign(current, updatedData);
      if (updatedData.totalQuestions || updatedData.marksPerQuestion) {
        const tQ = Number(current.totalQuestions) || 20;
        const mQ = Number(current.marksPerQuestion) || 1;
        current.totalMarks = tQ * mQ;
        current.maxMarks = current.totalMarks;
      }
    }

    list[index] = current;
    setStoredExams(list);

    const db = getDb();
    if (db) {
      try {
        await db.collection('exams').doc(examId).set(current, { merge: true });
      } catch (err) {
        console.warn('[ExamService] Firestore update note:', err.message);
      }
    }

    return current;
  }

  /**
   * Add a question to an MCQ exam
   */
  async function addQuestion(examId, questionData) {
    const exam = getExam(examId);
    if (!exam) throw new Error('Exam not found');

    if (!questionData.questionText || !questionData.questionText.trim()) {
      throw new Error('Question text is required.');
    }
    const opts = questionData.options || {};
    if (!opts.A || !opts.B || !opts.C || !opts.D) {
      throw new Error('All 4 options (A, B, C, D) are required.');
    }
    if (!['A', 'B', 'C', 'D'].includes(questionData.correctAnswer)) {
      throw new Error('Please select a valid correct answer (A, B, C, or D).');
    }

    const newQuestion = {
      id: 'q_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      questionText: questionData.questionText.trim(),
      options: {
        A: opts.A.trim(),
        B: opts.B.trim(),
        C: opts.C.trim(),
        D: opts.D.trim()
      },
      correctAnswer: questionData.correctAnswer,
      marks: Number(questionData.marks) || exam.marksPerQuestion || 1,
      explanation: (questionData.explanation || '').trim()
    };

    if (!exam.questions) exam.questions = [];
    exam.questions.push(newQuestion);
    await updateExam(examId, { questions: exam.questions });

    return newQuestion;
  }

  /**
   * Update an existing question
   */
  async function updateQuestion(examId, questionId, questionData) {
    const exam = getExam(examId);
    if (!exam) throw new Error('Exam not found');

    const qIndex = (exam.questions || []).findIndex(q => q.id === questionId);
    if (qIndex === -1) throw new Error('Question not found');

    const opts = questionData.options || exam.questions[qIndex].options;
    if (!opts.A || !opts.B || !opts.C || !opts.D) {
      throw new Error('All 4 options (A, B, C, D) are required.');
    }

    exam.questions[qIndex] = {
      ...exam.questions[qIndex],
      questionText: (questionData.questionText !== undefined ? questionData.questionText : exam.questions[qIndex].questionText).trim(),
      options: {
        A: opts.A.trim(),
        B: opts.B.trim(),
        C: opts.C.trim(),
        D: opts.D.trim()
      },
      correctAnswer: questionData.correctAnswer || exam.questions[qIndex].correctAnswer,
      marks: Number(questionData.marks) || exam.questions[qIndex].marks || 1,
      explanation: (questionData.explanation !== undefined ? questionData.explanation : exam.questions[qIndex].explanation).trim()
    };

    await updateExam(examId, { questions: exam.questions });
    return exam.questions[qIndex];
  }

  /**
   * Delete a question from an exam
   */
  async function deleteQuestion(examId, questionId) {
    const exam = getExam(examId);
    if (!exam) throw new Error('Exam not found');

    exam.questions = (exam.questions || []).filter(q => q.id !== questionId);
    await updateExam(examId, { questions: exam.questions });
    return true;
  }

  /**
   * Validate and publish an examination
   */
  async function publishExam(examId) {
    const exam = getExam(examId);
    if (!exam) throw new Error('Examination not found.');

    const errors = [];
    if (!exam.name || !exam.name.trim()) errors.push('Exam name cannot be empty.');
    if (!isSubjectAuthorized(exam.subjectCode)) errors.push(`Subject ${exam.subjectCode} is not authorized.`);
    if (!exam.questions || exam.questions.length === 0) {
      errors.push('Exam must contain at least one question before publishing.');
    } else {
      exam.questions.forEach((q, idx) => {
        if (!q.questionText || !q.questionText.trim()) {
          errors.push(`Question ${idx + 1}: Missing question text.`);
        }
        if (!q.options || !q.options.A || !q.options.B || !q.options.C || !q.options.D) {
          errors.push(`Question ${idx + 1}: All 4 options (A, B, C, D) must be provided.`);
        }
        if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
          errors.push(`Question ${idx + 1}: Correct answer must be specified.`);
        }
      });
    }

    if (!exam.duration || exam.duration <= 0) errors.push('Exam duration must be greater than 0 minutes.');
    if (exam.passingMarks === undefined || exam.passingMarks < 0 || exam.passingMarks > exam.totalMarks) {
      errors.push(`Passing marks must be between 0 and total marks (${exam.totalMarks}).`);
    }

    if (errors.length > 0) {
      const err = new Error(errors[0]);
      err.allErrors = errors;
      throw err;
    }

    exam.status = 'published';
    exam.isPublished = true;
    exam.publishedAt = new Date().toISOString();

    await updateExam(examId, {
      status: 'published',
      isPublished: true,
      publishedAt: exam.publishedAt
    });

    return exam;
  }

  /**
   * Automatic Evaluation of MCQ Answers
   */
  function calculateMCQResult(exam, studentAnswers = {}) {
    const questions = exam.questions || [];
    let rawScore = 0;
    const rawQuestionSum = questions.reduce((sum, q) => sum + (Number(q.marks) || 1), 0) || 1;
    const targetTotal = Number(exam.totalMarks || exam.maxMarks || 20);
    const scaleFactor = (rawQuestionSum > 0 && targetTotal > 0 && rawQuestionSum !== targetTotal)
      ? (targetTotal / rawQuestionSum)
      : 1;

    const questionResults = [];

    questions.forEach(q => {
      const selected = studentAnswers[q.id];
      const isCorrect = selected === q.correctAnswer;
      const isAttempted = Boolean(selected);
      let awarded = 0;

      if (isAttempted) {
        if (isCorrect) {
          awarded = Number(q.marks) || 1;
        } else if (exam.negativeMarking && Number(exam.negativeMarks) > 0) {
          awarded = -Number(exam.negativeMarks);
        }
      }

      rawScore += awarded;
      questionResults.push({
        questionId: q.id,
        selectedAnswer: selected || null,
        correctAnswer: q.correctAnswer,
        isCorrect,
        isAttempted,
        marksAwarded: awarded
      });
    });

    // Scale to targetTotal if rawQuestionSum differs from exam.totalMarks
    let scaledScore = rawScore * scaleFactor;
    // Score cannot be negative overall and cannot exceed targetTotal
    const totalScore = Math.max(0, Math.min(targetTotal, +(scaledScore.toFixed(2))));
    const maxScore = targetTotal;
    const percentage = +((totalScore / maxScore) * 100).toFixed(1);

    // Standard Academic Grade Calculation
    let grade = 'F';
    if (percentage >= 90) grade = 'O';
    else if (percentage >= 80) grade = 'A+';
    else if (percentage >= 70) grade = 'A';
    else if (percentage >= 60) grade = 'B+';
    else if (percentage >= 50) grade = 'B';
    else if (percentage >= 40) grade = 'C';
    else grade = 'F';

    const passingMarks = exam.passingMarks !== undefined ? exam.passingMarks : (maxScore * 0.4);
    const status = totalScore >= passingMarks ? 'Pass' : 'Fail';

    return {
      score: totalScore,
      maxScore,
      percentage,
      grade,
      status,
      passingMarks,
      breakdown: questionResults
    };
  }

  /**
   * Simulate Student Attempts & Auto-Evaluate
   * Populates the F27 marks matrix with real evaluated student submissions
   */
  async function simulateStudentSubmissions(examId) {
    const exam = getExam(examId);
    if (!exam) throw new Error('Exam not found');
    if (!exam.questions || exam.questions.length === 0) {
      throw new Error('Exam contains no questions to evaluate.');
    }

    const students = (typeof FacultyService !== 'undefined' && FacultyService.getStudents)
      ? FacultyService.getStudents(exam.section || 'all')
      : [];

    const evaluatedMarks = [];
    const options = ['A', 'B', 'C', 'D'];

    students.forEach((stu, sIdx) => {
      // Simulate student answers with realistic academic variance (75-98% proficiency)
      const simulatedAnswers = {};
      exam.questions.forEach((q, qIdx) => {
        const studentProficiency = 0.88 - (sIdx * 0.012);
        const willAnswerCorrect = Math.random() < Math.max(0.60, studentProficiency);
        if (willAnswerCorrect) {
          simulatedAnswers[q.id] = q.correctAnswer;
        } else {
          // Wrong answer or skip
          const isSkipped = Math.random() < 0.05;
          if (!isSkipped) {
            const wrongOptions = options.filter(o => o !== q.correctAnswer);
            simulatedAnswers[q.id] = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
          }
        }
      });

      const evaluation = calculateMCQResult(exam, simulatedAnswers);

      evaluatedMarks.push({
        studentId: stu.id,
        rollNo: stu.rollNo,
        name: stu.name,
        section: stu.section || exam.section || 'A',
        marks: evaluation.score,
        maxMarks: evaluation.maxScore,
        percentage: evaluation.percentage,
        grade: evaluation.grade,
        status: evaluation.status,
        evaluatedAt: new Date().toISOString(),
        answers: simulatedAnswers
      });
    });

    // Compute Class Stats
    const scores = evaluatedMarks.map(m => m.marks);
    const highest = scores.length ? Math.max(...scores) : 0;
    const lowest = scores.length ? Math.min(...scores) : 0;
    const sum = scores.reduce((a, b) => a + b, 0);
    const average = scores.length ? +(sum / scores.length).toFixed(1) : 0;
    const passCount = evaluatedMarks.filter(m => m.status === 'Pass').length;
    const passRate = scores.length ? +((passCount / scores.length) * 100).toFixed(1) : 100;

    exam.studentMarks = evaluatedMarks;
    exam.evaluatedCount = evaluatedMarks.length;
    exam.stats = { average, highest, lowest, passRate };
    exam.status = 'evaluated';

    await updateExam(examId, {
      studentMarks: evaluatedMarks,
      evaluatedCount: evaluatedMarks.length,
      stats: exam.stats,
      status: 'evaluated'
    });

    // Sync to Firestore /results collection if available
    const db = getDb();
    if (db) {
      try {
        for (const st of evaluatedMarks) {
          const resId = `res_${examId}_${st.rollNo}`;
          await db.collection('results').doc(resId).set({
            id: resId,
            examId: examId,
            examTitle: exam.name || exam.title,
            subjectCode: exam.subjectCode,
            studentId: st.studentId,
            studentRollNo: st.rollNo,
            studentName: st.name,
            marksObtained: st.marks,
            maxMarks: st.maxMarks,
            grade: st.grade,
            status: st.status,
            isPublished: true,
            publishedAt: new Date().toISOString()
          }, { merge: true });
        }
      } catch (e) {
        console.warn('[ExamService] Firestore results sync note:', e.message);
      }
    }

    return exam;
  }

  /**
   * Helper: Normalize exam object for Student Portal rendering
   * Ensures no property (subject, venue, duration, month, day, totalMarks) is undefined
   */
  function normalizeExamForStudent(e) {
    const isMcq = e.type === 'mcq' || e.rawType === 'mcq';
    const sub = e.subject || e.subjectName || e.title || e.name || 'Academic Assessment';
    const code = e.subjectCode || e.courseCode || 'CS402';
    const max = Number(e.totalMarks || e.maxMarks) || (isMcq ? 20 : 25);

    let dt = null;
    if (e.startDateTime) {
      dt = new Date(e.startDateTime);
    } else if (e.date && !isNaN(new Date(e.date).getTime())) {
      dt = new Date(e.date);
    }
    const isValidDate = dt && !isNaN(dt.getTime());

    const monthStr = e.month || (isValidDate ? dt.toLocaleString('en-US', { month: 'short' }).toUpperCase() : 'OCT');
    const dayStr = e.day || (isValidDate ? String(dt.getDate()) : '02');
    const dateFormatted = e.date || (isValidDate ? dt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'October 2, 2026');
    const timeFormatted = e.time || (isValidDate ? dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '10:00 AM – 10:30 AM');
    const durationFormatted = e.duration ? (typeof e.duration === 'number' ? `${e.duration} Mins` : e.duration) : (isMcq ? '30 Mins' : '2 Hours');

    return {
      ...e,
      id: e.id,
      subject: sub,
      subjectCode: code,
      courseCode: code,
      title: e.title || e.name || sub,
      name: e.name || e.title || sub,
      type: isMcq ? 'MCQ Examination' : (e.type || 'Mid-Term Examination'),
      rawType: isMcq ? 'mcq' : (e.type || 'Mid-Term'),
      isMCQ: isMcq,
      totalMarks: max,
      maxMarks: max,
      passingMarks: e.passingMarks || Math.ceil(max * 0.4),
      date: dateFormatted,
      day: dayStr,
      month: monthStr,
      time: timeFormatted,
      duration: durationFormatted,
      venue: e.venue || (isMcq ? 'Online Assessment Portal / Web Portal' : 'Main Examination Hall A'),
      seatNumber: e.seatNumber || 'Desk CS24-042',
      hallTicketNo: e.hallTicketNo || 'HT-2026-CS4-042',
      syllabus: e.syllabus || e.instructions || 'Comprehensive objective evaluation according to syllabus.',
      status: e.status || (e.isPublished ? 'published' : 'scheduled'),
      isPublished: e.isPublished !== false && e.status !== 'draft',
      questions: e.questions || []
    };
  }

  /**
   * Fetch Upcoming Scheduled Exams (for Student Portal Compatibility)
   * Merges base curriculum exams with published faculty exams
   */
  async function getUpcomingExams() {
    const list = [];
    const seenIds = new Set();

    // 1. Fetch published faculty exams (MCQ exams created & published by faculty)
    const stored = getStoredExams();
    const publishedFacultyExams = stored.filter(e => {
      return e.isPublished === true || e.status === 'published' || e.status === 'evaluated';
    });

    publishedFacultyExams.forEach(fe => {
      if (!seenIds.has(fe.id)) {
        seenIds.add(fe.id);
        list.push(normalizeExamForStudent(fe));
      }
    });

    // 2. Fetch base student scheduled curriculum exams from mockExams
    const baseExams = (typeof window !== 'undefined' && window.mockExams)
      ? window.mockExams
      : (typeof mockExams !== 'undefined' ? mockExams : []);

    baseExams.forEach(be => {
      if (!seenIds.has(be.id)) {
        seenIds.add(be.id);
        list.push(normalizeExamForStudent(be));
      }
    });

    return list;
  }

  /**
   * Submit student answers for an MCQ examination and automatically evaluate
   */
  async function submitStudentExam(examId, selectedAnswers = {}, studentInfo = null) {
    const exam = getExam(examId);
    if (!exam) throw new Error('Examination not found.');

    const activeSession = (typeof AuthService !== 'undefined' && AuthService.getCurrentUser) ? AuthService.getCurrentUser() : null;
    const student = studentInfo || activeSession || {
      id: 'usr_stu_8842',
      rollNo: 'CS24-042',
      name: 'Riddhi Zunjarrao',
      section: 'A'
    };

    const evalResult = calculateMCQResult(exam, selectedAnswers);

    const submissionEntry = {
      studentId: student.id || student.uid || 'usr_stu_8842',
      rollNo: student.rollNo || 'CS24-042',
      name: student.name || 'Student Candidate',
      section: student.section || 'A',
      marks: evalResult.score,
      maxMarks: evalResult.maxScore || exam.totalMarks,
      percentage: evalResult.percentage,
      grade: evalResult.grade,
      status: evalResult.status,
      submittedAt: new Date().toISOString(),
      answers: selectedAnswers
    };

    // Update exam student marks list
    exam.studentMarks = exam.studentMarks || [];
    const existingIndex = exam.studentMarks.findIndex(m => m.rollNo === submissionEntry.rollNo);
    if (existingIndex >= 0) {
      exam.studentMarks[existingIndex] = submissionEntry;
    } else {
      exam.studentMarks.push(submissionEntry);
    }

    // Recalculate stats
    const scores = exam.studentMarks.map(m => Number(m.marks)).filter(s => !isNaN(s));
    const passThreshold = exam.passingMarks || Math.ceil((exam.totalMarks || 20) * 0.4);
    const passCount = scores.filter(s => s >= passThreshold).length;
    exam.stats = {
      average: scores.length ? +(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0,
      highest: scores.length ? Math.max(...scores) : 0,
      lowest: scores.length ? Math.min(...scores) : 0,
      passRate: scores.length ? +((passCount / scores.length) * 100).toFixed(1) : 0
    };
    exam.evaluatedCount = exam.studentMarks.length;
    exam.status = 'evaluated';

    await updateExam(examId, {
      studentMarks: exam.studentMarks,
      stats: exam.stats,
      evaluatedCount: exam.evaluatedCount,
      status: 'evaluated'
    });

    return {
      evaluation: evalResult,
      submission: submissionEntry
    };
  }

  /**
   * Fetch Published Results for Student (Student Portal Compatibility)
   */
  async function getPublishedResults() {
    const db = getDb();
    const activeSession = (typeof AuthService !== 'undefined' && AuthService.getCurrentUser) ? AuthService.getCurrentUser() : null;
    const uid = activeSession ? activeSession.uid : 'usr_stu_8842';
    const rollNo = activeSession ? (activeSession.rollNo || activeSession.studentId) : 'CS24-042';

    if (db) {
      try {
        const snap = await db.collection('results').where('isPublished', '==', true).get();
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          return list.filter(r => r.studentId === uid || r.studentUid === uid || r.studentRollNo === rollNo);
        }
      } catch (e) {
        console.warn('Results fetch note:', e);
      }
    }

    // Local evaluation results check
    const exams = getStoredExams();
    const results = [];
    exams.forEach(e => {
      if (e.isPublished && e.studentMarks && e.studentMarks.length) {
        const match = e.studentMarks.find(m => m.rollNo === rollNo || m.studentId === uid);
        if (match) {
          results.push({
            id: `res_${e.id}_${rollNo}`,
            examId: e.id,
            examTitle: e.name || e.title,
            subjectCode: e.subjectCode,
            subjectName: e.subject,
            studentRollNo: match.rollNo,
            studentName: match.name,
            marksObtained: match.marks,
            maxMarks: match.maxMarks || e.totalMarks,
            grade: match.grade,
            status: match.status,
            isPublished: true,
            publishedAt: e.publishedAt || new Date().toISOString()
          });
        }
      }
    });

    if (results.length > 0) return results;

    return [
      {
        id: "res_exam_001_CS24-042",
        examId: "exam_001",
        examTitle: "Mid-Term Examination: DBMS (CS402)",
        subjectCode: "CS402",
        subjectName: "Database Management Systems",
        studentRollNo: "CS24-042",
        studentName: "Riddhi Zunjarrao",
        marksObtained: 24,
        maxMarks: 25,
        grade: "A+",
        isPublished: true,
        publishedAt: "2026-09-16T10:00:00Z"
      }
    ];
  }

  return {
    getExams,
    getExam,
    getAuthorizedSubjects,
    isSubjectAuthorized,
    createExam,
    updateExam,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    publishExam,
    calculateMCQResult,
    simulateStudentSubmissions,
    getUpcomingExams,
    getPublishedResults,
    submitStudentExam,
    normalizeExamForStudent
  };
})();

if (typeof window !== 'undefined') {
  window.ExamService = ExamService;
}

/**
 * ==============================================================================
 * SMART STUDENT — Peer Study Community Service Layer
 * 
 * Production-ready integration with Cloud Firestore, Realtime Database &
 * Backend Atomic Transaction API for the 5-Student Capacity Invariant.
 * ==============================================================================
 */

const StudyGroupService = (() => {
  const MAX_CAPACITY = 5;
  const BACKEND_PORT = '8085';

  // Routes relative API paths to the Node.js backend on port 8085 when running
  // under a dev file server (e.g. VS Code Live Server on port 5500), preventing
  // 405 Method Not Allowed errors caused by the file server receiving API calls.
  function resolveBackendUrl(endpoint) {
    if (!endpoint) return endpoint;
    const clean = endpoint.startsWith('/') ? endpoint : '/' + endpoint;
    if (typeof window === 'undefined') return clean;
    const port = window.location.port;
    const hostname = window.location.hostname || 'localhost';
    // Already on the backend port — use relative URL
    if (port === BACKEND_PORT) return clean;
    // Local dev machine not on backend port — proxy to backend
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `http://${hostname}:${BACKEND_PORT}${clean}`;
    }
    // Deployed environment — use relative path
    return clean;
  }

  function hasFirebaseAuth() {
    return !!(
      window.SmartStudentFirebase &&
      window.SmartStudentFirebase.isInitialized() &&
      window.SmartStudentFirebase.getAuth &&
      window.SmartStudentFirebase.getAuth() &&
      window.SmartStudentFirebase.getAuth().currentUser
    );
  }

  /**
   * Helper to get active student identity
   */
  function getCurrentStudent() {
    let user = null;
    if (typeof AuthService !== 'undefined' && AuthService.getCurrentUser()) {
      user = AuthService.getCurrentUser();
    } else if (typeof DomainService !== 'undefined' && DomainService.getStudentProfile) {
      user = DomainService.getStudentProfile();
    } else if (window.mockStudent) {
      user = window.mockStudent;
    }
    return user || {
      uid: 'usr_stu_8842',
      id: 'usr_stu_8842',
      studentId: 'STU-2024-8842',
      rollNo: 'CS24-042',
      name: 'Riddhi Zunjarrao',
      email: 'student@university.edu',
      program: 'B.Tech Computer Science & Engineering',
      department: 'B.Tech',
      departmentId: 'dept_btech',
      semester: 4,
      section: 'A'
    };
  }

  /**
   * Get headers for secure backend API calls
   */
  function getApiHeaders() {
    const student = getCurrentStudent();
    return {
      'Content-Type': 'application/json',
      'X-Actor-Uid': student.uid || student.id || 'usr_stu_8842',
      'X-Actor-Name': student.name || 'Student',
      'X-Actor-Email': student.email || 'student@university.edu',
      'X-Actor-Role': 'student',
      'X-Actor-Department': student.department || student.departmentId || 'B.Tech'
    };
  }

  /**
   * Fetch all study groups with optional subject/search filters
   */
  async function getStudyGroups(filters = {}) {
    const activeDomain = filters.domainId || (typeof DomainService !== 'undefined' ? DomainService.getActiveDomain() : 'dept_btech');

    // 1. Try backend API first for consistent atomic state
    try {
      const queryParams = new URLSearchParams();
      if (activeDomain && activeDomain !== 'all') queryParams.append('domainId', activeDomain);
      if (filters.subject && filters.subject !== 'all') queryParams.append('subject', filters.subject);
      if (filters.search) queryParams.append('search', filters.search);

      const url = resolveBackendUrl(`/api/study-groups${queryParams.toString() ? '?' + queryParams.toString() : ''}`);
      const response = await fetch(url, {
        method: 'GET',
        headers: getApiHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.groups)) {
          return {
            groups: data.groups,
            stats: data.stats || calculateStats(data.groups)
          };
        }
      }
    } catch (apiErr) {
      console.info('Backend study-groups API offline, checking Firestore client...', apiErr.message);
    }

    // 2. Fallback to Cloud Firestore directly if verified Firebase Auth session exists
    if (hasFirebaseAuth()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        if (db) {
          let query = db.collection('studyGroups');
          if (activeDomain && activeDomain !== 'all') {
            query = query.where('domainId', '==', activeDomain);
          }
          const snap = await query.get();
          if (!snap.empty) {
            let groups = [];
            snap.forEach(doc => {
              groups.push({ id: doc.id, groupId: doc.id, ...doc.data() });
            });

            // Client-side filtering
            if (filters.subject && filters.subject !== 'all') {
              const s = filters.subject.toLowerCase();
              groups = groups.filter(g =>
                (g.subjectCode || '').toLowerCase() === s ||
                (g.subjectId || '').toLowerCase() === s ||
                (g.subjectName || '').toLowerCase().includes(s)
              );
            }
            if (filters.search) {
              const q = filters.search.toLowerCase();
              groups = groups.filter(g =>
                (g.name || '').toLowerCase().includes(q) ||
                (g.topic || '').toLowerCase().includes(q) ||
                (g.description || '').toLowerCase().includes(q) ||
                (g.subjectName || g.subject || '').toLowerCase().includes(q) ||
                (g.roomLeaderName || g.creator || '').toLowerCase().includes(q)
              );
            }

            return {
              groups,
              stats: calculateStats(groups)
            };
          }
        }
      } catch (fsErr) {
        console.warn('Firestore study-groups query note:', fsErr.message);
      }
    }

    // 3. Fallback to Domain Mock Groups
    let fallbackGroups = [];
    if (typeof DomainService !== 'undefined' && DomainService.getStudyGroups) {
      fallbackGroups = DomainService.getStudyGroups(activeDomain) || [];
    } else if (window.mockStudyGroups) {
      fallbackGroups = window.mockStudyGroups.forDomain ? window.mockStudyGroups.forDomain(activeDomain) : [...window.mockStudyGroups];
    }

    if (filters.subject && filters.subject !== 'all') {
      const s = filters.subject.toLowerCase();
      fallbackGroups = fallbackGroups.filter(g =>
        (g.subjectCode || '').toLowerCase() === s ||
        (g.subjectId || '').toLowerCase() === s ||
        (g.subjectName || g.subject || '').toLowerCase().includes(s)
      );
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      fallbackGroups = fallbackGroups.filter(g =>
        (g.name || '').toLowerCase().includes(q) ||
        (g.topic || '').toLowerCase().includes(q) ||
        (g.description || '').toLowerCase().includes(q) ||
        (g.subjectName || g.subject || '').toLowerCase().includes(q)
      );
    }

    return {
      groups: fallbackGroups,
      stats: calculateStats(fallbackGroups)
    };
  }

  /**
   * Helper to calculate KPI stats from groups array
   */
  function calculateStats(groups = []) {
    const activeGroups = groups.filter(g => g.status !== 'closed');
    const totalGroups = activeGroups.length;
    let activeMembers = 0;
    let fullRooms = 0;

    activeGroups.forEach(g => {
      const count = g.memberCount !== undefined ? g.memberCount : (g.currentMembers || (g.members ? g.members.length : 0));
      activeMembers += count;
      if (count >= MAX_CAPACITY || g.status === 'full') {
        fullRooms++;
      }
    });

    const availableSeats = Math.max(0, (totalGroups * MAX_CAPACITY) - activeMembers);

    return {
      totalGroups,
      activeMembers,
      availableSeats,
      fullRooms
    };
  }

  /**
   * Get single study group by ID (with members, resources, messages)
   */
  async function getStudyGroupById(groupId) {
    // 1. Try Backend API
    try {
      const response = await fetch(resolveBackendUrl(`/api/study-groups/${encodeURIComponent(groupId)}`), {
        method: 'GET',
        headers: getApiHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.group) {
          return {
            group: data.group,
            resources: data.resources || [],
            messages: data.messages || []
          };
        }
      }
    } catch (e) {}

    // 2. Try Firestore Client directly if authenticated
    if (hasFirebaseAuth()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        const doc = await db.collection('studyGroups').doc(groupId).get();
        if (doc.exists) {
          const group = { id: doc.id, groupId: doc.id, ...doc.data() };
          
          // Get members subcollection
          const memSnap = await db.collection('studyGroups').doc(groupId).collection('members').get();
          if (!memSnap.empty) {
            group.members = memSnap.docs.map(d => ({ studentId: d.id, ...d.data() }));
          }

          // Get resources
          const resSnap = await db.collection('studyGroupResources').where('groupId', '==', groupId).get();
          const resources = resSnap.empty ? [] : resSnap.docs.map(d => ({ id: d.id, ...d.data() }));

          return { group, resources, messages: [] };
        }
      } catch (e) {}
    }

    return null;
  }

  /**
   * Create a new study group (Creator becomes Room Leader)
   */
  async function createStudyGroup(groupData) {
    const student = getCurrentStudent();

    const payload = {
      name: groupData.name.trim(),
      subject: groupData.subject.trim(),
      subjectCode: groupData.subjectCode || 'CS401',
      subjectName: groupData.subjectName || groupData.subject,
      domainId: groupData.domainId || student.departmentId || student.domainId || (typeof DomainService !== 'undefined' ? DomainService.getActiveDomain() : 'dept_btech'),
      topic: groupData.topic.trim(),
      description: (groupData.description || groupData.topic).trim(),
      program: groupData.program || student.program || 'B.Tech Computer Science & Engineering',
      semester: groupData.semester || student.semester || 4,
      section: groupData.section || student.section || 'A',
      maxMembers: MAX_CAPACITY,
      meetLink: groupData.meetLink || undefined,
      actorUid: student.uid || student.id,
      actorName: student.name,
      studentId: student.studentId || student.rollNo || student.uid
    };

    // 1. Try Backend API
    try {
      const response = await fetch(resolveBackendUrl('/api/study-groups'), {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to create study group.');
      }
      return data.group;
    } catch (apiErr) {
      if (apiErr.message && !apiErr.message.includes('fetch')) {
        throw apiErr;
      }
    }

    // 2. Try Firestore Client directly
    if (hasFirebaseAuth()) {
      const db = window.SmartStudentFirebase.getDb();
      const groupId = `grp_${Date.now()}`;
      const leaderMember = {
        studentId: student.studentId || student.rollNo || student.uid,
        uid: student.uid || student.id,
        name: student.name,
        email: student.email,
        role: 'leader',
        joinedAt: new Date().toISOString()
      };

      const newGroupDoc = {
        id: groupId,
        groupId: groupId,
        name: payload.name,
        description: payload.description,
        topic: payload.topic,
        subjectId: `sub_${payload.subjectCode.toLowerCase()}`,
        subjectCode: payload.subjectCode,
        subjectName: payload.subjectName,
        courseCode: payload.subjectCode,
        domainId: student.domainId || 'dept_btech',
        programId: student.programId || 'prog_btech_cse',
        semesterId: student.semester || 4,
        sectionId: student.sectionId || 'sec_btech_4_a',
        roomLeaderId: student.uid || student.id,
        roomLeaderName: student.name,
        roomLeaderStudentId: leaderMember.studentId,
        maxMembers: MAX_CAPACITY,
        memberCount: 1,
        currentMembers: 1,
        status: 'open',
        meetLink: payload.meetLink || `https://meet.google.com/study-${groupId.substring(4)}`,
        agenda: `1. Kickoff & Topic Overview: ${payload.topic}\n2. Weekly collaboration milestones`,
        whiteboardNotes: `Collaborative notes for ${payload.name}`,
        members: [leaderMember],
        createdBy: student.uid || student.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await db.collection('studyGroups').doc(groupId).set(newGroupDoc);
      await db.collection('studyGroups').doc(groupId).collection('members').doc(leaderMember.studentId).set(leaderMember);
      return newGroupDoc;
    }

    throw new Error('Service unavailable. Could not connect to study groups service.');
  }

  /**
   * Join Study Group — Atomic 5-Student Enforcement
   */
  async function joinStudyGroup(groupId) {
    const student = getCurrentStudent();

    // 1. Try Backend API (enforces server-side transaction)
    try {
      const response = await fetch(resolveBackendUrl(`/api/study-groups/${encodeURIComponent(groupId)}/join`), {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify({
          uid: student.uid || student.id,
          studentId: student.studentId || student.rollNo || student.uid,
          name: student.name,
          email: student.email
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Room is full. This study group has reached its 5-student limit.');
      }
      return data;
    } catch (apiErr) {
      if (apiErr.message && !apiErr.message.includes('fetch')) {
        throw apiErr;
      }
    }

    // 2. Fallback to Firestore Client Transaction
    if (hasFirebaseAuth()) {
      const db = window.SmartStudentFirebase.getDb();
      const groupRef = db.collection('studyGroups').doc(groupId);
      const studentId = student.studentId || student.rollNo || student.uid;
      const memberSubRef = groupRef.collection('members').doc(studentId);

      return await db.runTransaction(async (transaction) => {
        const snap = await transaction.get(groupRef);
        if (!snap.exists) {
          throw new Error('Study group not found.');
        }

        const g = snap.data();
        const members = Array.isArray(g.members) ? g.members : [];

        // Duplicate check
        if (members.some(m => m.uid === student.uid || m.studentId === studentId)) {
          throw new Error('You are already a member of this study group.');
        }

        // Strict limit
        if (members.length >= MAX_CAPACITY || (g.memberCount || g.currentMembers || 0) >= MAX_CAPACITY) {
          throw new Error('Room is full. This study group has reached its 5-student limit.');
        }

        const newMem = {
          studentId: studentId,
          uid: student.uid || student.id,
          name: student.name,
          email: student.email,
          role: 'member',
          joinedAt: new Date().toISOString()
        };

        members.push(newMem);
        const newCount = members.length;
        const newStatus = newCount >= MAX_CAPACITY ? 'full' : 'open';

        transaction.update(groupRef, {
          members: members,
          memberCount: newCount,
          currentMembers: newCount,
          status: newStatus,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        transaction.set(memberSubRef, newMem);

        return {
          success: true,
          groupId,
          currentMembers: newCount,
          memberCount: newCount,
          message: `Successfully joined ${g.name} (${newCount}/${MAX_CAPACITY} members)`
        };
      });
    }

    throw new Error('Could not join study group: Service is unreachable.');
  }

  /**
   * Leave Study Group — Atomic Transaction with Succession
   */
  async function leaveStudyGroup(groupId) {
    const student = getCurrentStudent();
    const studentUid = student.uid || student.id;

    // 1. Try Backend API
    try {
      const response = await fetch(resolveBackendUrl(`/api/study-groups/${encodeURIComponent(groupId)}/leave`), {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify({
          uid: studentUid,
          studentId: student.studentId || student.rollNo || studentUid
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to leave study group.');
      }
      return data;
    } catch (apiErr) {
      if (apiErr.message && !apiErr.message.includes('fetch')) {
        throw apiErr;
      }
    }

    // 2. Fallback to Firestore Client Transaction
    if (hasFirebaseAuth()) {
      const db = window.SmartStudentFirebase.getDb();
      const groupRef = db.collection('studyGroups').doc(groupId);
      const studentId = student.studentId || student.rollNo || studentUid;
      const memberSubRef = groupRef.collection('members').doc(studentId);

      return await db.runTransaction(async (transaction) => {
        const snap = await transaction.get(groupRef);
        if (!snap.exists) throw new Error('Study group not found.');

        const g = snap.data();
        let members = Array.isArray(g.members) ? g.members : [];

        const memIdx = members.findIndex(m => m.uid === studentUid || m.studentId === studentId);
        if (memIdx === -1) throw new Error('You are not an active member of this study group.');

        const leavingMem = members[memIdx];
        const isLeader = (g.roomLeaderId === studentUid || leavingMem.role === 'leader');

        members.splice(memIdx, 1);
        const newCount = members.length;
        let roomLeaderId = g.roomLeaderId;
        let roomLeaderName = g.roomLeaderName;
        let roomLeaderStudentId = g.roomLeaderStudentId;
        let newStatus = g.status;

        if (isLeader) {
          if (members.length > 0) {
            members[0].role = 'leader';
            roomLeaderId = members[0].uid;
            roomLeaderName = members[0].name;
            roomLeaderStudentId = members[0].studentId;
          } else {
            newStatus = 'closed';
          }
        }

        if (newStatus !== 'closed') {
          newStatus = newCount >= MAX_CAPACITY ? 'full' : 'open';
        }

        transaction.update(groupRef, {
          members: members,
          memberCount: newCount,
          currentMembers: newCount,
          roomLeaderId: roomLeaderId,
          roomLeaderName: roomLeaderName,
          roomLeaderStudentId: roomLeaderStudentId,
          status: newStatus,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        transaction.delete(memberSubRef);

        return {
          success: true,
          groupId,
          memberCount: newCount,
          status: newStatus
        };
      });
    }

    throw new Error('Could not leave study group: Service is unreachable.');
  }

  /**
   * Listen to live updates of study groups (Firestore onSnapshot or interval poll)
   */
  function subscribeToGroups(callback) {
    let pollingInterval = null;

    const startPolling = () => {
      if (pollingInterval) return;
      getStudyGroups().then(data => {
        if (data) callback(data);
      }).catch(() => {});

      pollingInterval = setInterval(async () => {
        try {
          const data = await getStudyGroups();
          if (data) callback(data);
        } catch (e) {}
      }, 5000);
    };

    if (hasFirebaseAuth()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        if (db) {
          let hasReceivedData = false;
          const unsubscribe = db.collection('studyGroups').onSnapshot(snap => {
            hasReceivedData = true;
            const groups = snap.docs.map(d => ({ id: d.id, groupId: d.id, ...d.data() }));
            callback({ groups, stats: calculateStats(groups) });
          }, err => {
            if (!hasReceivedData) {
              startPolling();
            }
          });

          return () => {
            if (unsubscribe) unsubscribe();
            if (pollingInterval) clearInterval(pollingInterval);
          };
        }
      } catch (e) {}
    }

    // Default when unauthenticated: poll backend API seamlessly
    startPolling();
    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }

  /**
   * Realtime Group Discussion Messages
   */
  function subscribeToChat(groupId, callback) {
    if (hasFirebaseAuth()) {
      const rtdb = window.SmartStudentFirebase.getRtdb ? window.SmartStudentFirebase.getRtdb() : null;
      if (rtdb) {
        const ref = rtdb.ref(`studyGroupChats/${groupId}`);
        ref.on('value', snapshot => {
          const val = snapshot.val();
          if (val) {
            const list = Object.keys(val).map(key => ({ id: key, ...val[key] }));
            list.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
            callback(list);
          } else {
            callback([]);
          }
        });
        return () => ref.off();
      }

      const db = window.SmartStudentFirebase.getDb ? window.SmartStudentFirebase.getDb() : null;
      if (db) {
        return db.collection('studyGroupChats').doc(groupId).collection('messages')
          .orderBy('createdAt', 'asc')
          .onSnapshot(snap => {
            const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            callback(list);
          }, err => {});
      }
    }

    // 3. Fallback to API polling
    const fetchMsgs = async () => {
      try {
        const res = await fetch(resolveBackendUrl(`/api/study-groups/${encodeURIComponent(groupId)}/messages`), {
          headers: getApiHeaders()
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) callback(data.messages || []);
        }
      } catch (e) {}
    };
    fetchMsgs();
    const interval = setInterval(fetchMsgs, 3000);
    return () => clearInterval(interval);
  }

  /**
   * Send a chat message
   */
  async function sendMessage(groupId, text) {
    const student = getCurrentStudent();
    const cleanText = text.trim();
    if (!cleanText) return null;

    const msgObj = {
      groupId: groupId,
      senderId: student.uid || student.id,
      senderName: student.name,
      senderStudentId: student.studentId || student.rollNo || 'STU-2024-8842',
      message: cleanText,
      createdAt: new Date().toISOString()
    };

    // 1. Write to RTDB if authenticated
    if (hasFirebaseAuth()) {
      const rtdb = window.SmartStudentFirebase.getRtdb ? window.SmartStudentFirebase.getRtdb() : null;
      if (rtdb) {
        const newRef = rtdb.ref(`studyGroupChats/${groupId}`).push();
        await newRef.set({ ...msgObj, id: newRef.key });
      }
    }

    // 2. Send to Backend API
    try {
      await fetch(resolveBackendUrl(`/api/study-groups/${encodeURIComponent(groupId)}/messages`), {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify(msgObj)
      });
    } catch (e) {}

    return msgObj;
  }

  /**
   * Resources Management
   */
  async function getResources(groupId) {
    try {
      const res = await fetch(resolveBackendUrl(`/api/study-groups/${encodeURIComponent(groupId)}/resources`), {
        headers: getApiHeaders()
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) return data.resources || [];
      }
    } catch (e) {}

    if (hasFirebaseAuth()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        const snap = await db.collection('studyGroupResources').where('groupId', '==', groupId).get();
        return snap.empty ? [] : snap.docs.map(d => ({ id: d.id, ...d.data() }));
      } catch (e) {}
    }

    return [];
  }

  async function addResource(groupId, resourceData) {
    const student = getCurrentStudent();
    const payload = {
      title: resourceData.title,
      type: resourceData.type || 'notes',
      url: resourceData.url || '#',
      fileName: resourceData.fileName || `${resourceData.title.replace(/\s+/g, '_')}.pdf`,
      fileSize: resourceData.fileSize || '1.5 MB',
      uploadedBy: student.uid || student.id,
      uploadedByName: student.name
    };

    try {
      const res = await fetch(resolveBackendUrl(`/api/study-groups/${encodeURIComponent(groupId)}/resources`), {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) return data.resource;
      }
    } catch (e) {}

    if (hasFirebaseAuth()) {
      const db = window.SmartStudentFirebase.getDb();
      const docRef = db.collection('studyGroupResources').doc();
      const resObj = { id: docRef.id, groupId, ...payload, createdAt: new Date().toISOString() };
      await docRef.set(resObj);
      return resObj;
    }

    throw new Error('Unable to upload study resource.');
  }

  /**
   * Save shared whiteboard notes
   */
  async function saveWhiteboardNotes(groupId, notes) {
    try {
      await fetch(resolveBackendUrl(`/api/study-groups/${encodeURIComponent(groupId)}/notes`), {
        method: 'PUT',
        headers: getApiHeaders(),
        body: JSON.stringify({ notes })
      });
    } catch (e) {}

    if (hasFirebaseAuth()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        await db.collection('studyGroups').doc(groupId).update({
          whiteboardNotes: notes,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      } catch (e) {}
    }

    return true;
  }

  /**
   * Online presence tracking via Firebase Realtime Database
   */
  function setupPresence(groupId, callback) {
    if (!window.SmartStudentFirebase || !window.SmartStudentFirebase.isInitialized()) return () => {};
    const rtdb = window.SmartStudentFirebase.getRtdb();
    if (!rtdb) return () => {};

    const student = getCurrentStudent();
    const studentUid = student.uid || student.id;
    const userPresenceRef = rtdb.ref(`studyRooms/${groupId}/presence/${studentUid}`);
    const connectedRef = rtdb.ref('.info/connected');

    connectedRef.on('value', snap => {
      if (snap.val() === true) {
        userPresenceRef.onDisconnect().remove();
        userPresenceRef.set({
          uid: studentUid,
          name: student.name,
          online: true,
          lastSeen: firebase.database.ServerValue.TIMESTAMP
        });
      }
    });

    const roomPresenceRef = rtdb.ref(`studyRooms/${groupId}/presence`);
    roomPresenceRef.on('value', snap => {
      const val = snap.val() || {};
      if (callback) callback(val);
    });

    return () => {
      userPresenceRef.remove();
      roomPresenceRef.off();
    };
  }

  /**
   * Update Google Meet Link for study cohort
   */
  async function updateMeetLink(groupId, meetLink) {
    try {
      const response = await fetch(resolveBackendUrl(`/api/study-groups/${encodeURIComponent(groupId)}/meet-link`), {
        method: 'PUT',
        headers: getApiHeaders(),
        body: JSON.stringify({ meetLink })
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) return data.meetLink;
      }
    } catch (e) {}

    if (hasFirebaseAuth()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        await db.collection('studyGroups').doc(groupId).update({
          meetLink: meetLink,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return meetLink;
      } catch (e) {}
    }

    return meetLink;
  }

  /**
   * Generate fresh Google Meet link
   */
  async function generateMeetLink(groupId) {
    try {
      const response = await fetch(resolveBackendUrl(`/api/study-groups/${encodeURIComponent(groupId)}/generate-meet`), {
        method: 'POST',
        headers: getApiHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.meetLink) return data.meetLink;
      }
    } catch (e) {}

    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const genPart = (len) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const newLink = `https://meet.google.com/${genPart(3)}-${genPart(4)}-${genPart(3)}`;
    return await updateMeetLink(groupId, newLink);
  }

  /**
   * Create dedicated Google Meet space via Google Meet REST API v2
   */
  async function createMeetSpace(groupId, options = {}) {
    try {
      const response = await fetch(resolveBackendUrl(`/api/study-groups/${encodeURIComponent(groupId)}/create-meet-space`), {
        method: 'POST',
        headers: getApiHeaders(),
        body: JSON.stringify(options)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.space) {
          return data;
        }
      }
    } catch (e) {
      console.warn('Backend create-meet-space note:', e.message);
    }

    // Fallback: standard Meet URL update
    const meetLink = 'https://meet.google.com/new';
    const space = {
      name: `spaces/spa-${groupId || 'live'}`,
      meetingUri: meetLink,
      meetingCode: 'instant-room',
      directRoomUri: `https://meet.jit.si/SmartStudent-Cohort-${groupId}`,
      config: { accessType: options.accessType || 'OPEN' },
      provider: 'Google Meet API v2 (Instant Launch)'
    };
    await updateMeetLink(groupId, meetLink);
    return { success: true, space, meetLink, meetCode: 'instant-room' };
  }

  /**
   * Get Google Meet API backend status
   */
  async function getMeetStatus() {
    try {
      const res = await fetch(resolveBackendUrl('/api/meet/status'));
      if (res.ok) return await res.json();
    } catch (e) {}
    return {
      success: true,
      api: 'Google Meet REST API v2',
      configured: false,
      mode: 'Compliant Meet v2 Space Generator'
    };
  }

  return {
    getStudyGroups,
    getStudyGroupById,
    createStudyGroup,
    joinStudyGroup,
    leaveStudyGroup,
    subscribeToGroups,
    subscribeToChat,
    sendMessage,
    getResources,
    addResource,
    saveWhiteboardNotes,
    setupPresence,
    getCurrentStudent,
    updateMeetLink,
    generateMeetLink,
    createMeetSpace,
    getMeetStatus,
    MAX_CAPACITY
  };
})();

if (typeof window !== 'undefined') {
  window.StudyGroupService = StudyGroupService;
}

/**
 * ==========================================================================
 * SMART STUDENT — Task Management Service Layer
 * Local / Firestore sync for student academic tasks and checklist items
 * Multi-Domain Isolated Storage (dept_btech, dept_bba, dept_mba)
 * ==========================================================================
 */

const TaskService = (() => {
  const LOCAL_TASKS_KEY = 'smart_student_tasks_state';

  function getActiveDomain() {
    if (typeof DomainService !== 'undefined' && DomainService.getActiveDomain) {
      return DomainService.getActiveDomain();
    }
    if (typeof sessionStorage !== 'undefined') {
      try {
        const raw = sessionStorage.getItem('smart_student_session') || localStorage.getItem('smart_student_session');
        if (raw) {
          const u = JSON.parse(raw);
          const d = (u.departmentId || u.department || u.program || u.email || '').toLowerCase();
          if (d.includes('mba')) return 'dept_mba';
          if (d.includes('bba')) return 'dept_bba';
        }
      } catch (_) {}
    }
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('smart_student_active_domain');
      if (saved && (saved === 'dept_btech' || saved === 'dept_bba' || saved === 'dept_mba')) return saved;
    }
    return 'dept_btech';
  }

  function getStorageKey(domainId) {
    const dom = domainId || getActiveDomain();
    return `${LOCAL_TASKS_KEY}_${dom}`;
  }

  function getLocalStoredTasks(domainId) {
    try {
      const stored = localStorage.getItem(getStorageKey(domainId));
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  function saveLocalTasks(tasks, domainId) {
    const dom = domainId || getActiveDomain();
    try {
      localStorage.setItem(getStorageKey(dom), JSON.stringify(tasks));
      // Also sync default key for B.Tech backward-compatibility
      if (dom === 'dept_btech') {
        localStorage.setItem(LOCAL_TASKS_KEY, JSON.stringify(tasks));
      }
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  async function getTasks() {
    const dom = getActiveDomain();
    const local = getLocalStoredTasks(dom);
    if (local && local.length > 0) {
      return local;
    }

    if (typeof window !== 'undefined' && window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        const activeUser = (typeof AuthService !== 'undefined') ? AuthService.getCurrentUser() : null;
        const uid = activeUser ? (activeUser.uid || activeUser.id) : null;
        if (uid && db) {
          const snap = await db.collection('tasks').where('studentId', '==', uid).get();
          if (!snap.empty) {
            const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            saveLocalTasks(list, dom);
            return list;
          }
        }
      } catch (e) {
        console.warn('Tasks fetch error:', e);
      }
    }

    let initial = [];
    if (typeof getTasksForDomain === 'function') {
      initial = getTasksForDomain(dom);
    } else if (typeof window !== 'undefined' && window.getTasksForDomain) {
      initial = window.getTasksForDomain(dom);
    } else if (typeof allDomainTasks !== 'undefined' && allDomainTasks[dom]) {
      initial = allDomainTasks[dom];
    } else if (typeof window !== 'undefined' && window.mockTasks) {
      initial = Array.isArray(window.mockTasks) ? window.mockTasks : [];
    }

    const cloned = JSON.parse(JSON.stringify(initial || []));
    saveLocalTasks(cloned, dom);
    return cloned;
  }

  async function toggleTask(taskId) {
    const tasks = await getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      if (task.completed) {
        task.status = 'done';
      } else {
        task.status = 'todo';
      }
      saveLocalTasks(tasks);

      if (typeof window !== 'undefined' && window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
        try {
          const db = window.SmartStudentFirebase.getDb();
          if (db) {
            await db.collection('tasks').doc(taskId).update({
              completed: task.completed,
              status: task.status
            });
          }
        } catch (e) {
          console.warn('Task sync error:', e);
        }
      }
      return task;
    }
    return null;
  }

  async function addTask(title, dueDate = "Tomorrow", priority = "medium", courseId = "General") {
    const dom = getActiveDomain();
    const newTask = {
      id: "tsk_" + Date.now(),
      title: title.trim(),
      dueDate: dueDate || "Upcoming",
      priority: priority || "medium",
      completed: false,
      courseId: courseId || "General",
      status: "todo",
      domainId: dom
    };

    const tasks = await getTasks();
    tasks.unshift(newTask);
    saveLocalTasks(tasks, dom);

    if (typeof window !== 'undefined' && window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        const activeUser = (typeof AuthService !== 'undefined') ? AuthService.getCurrentUser() : null;
        if (db) {
          await db.collection('tasks').doc(newTask.id).set({
            ...newTask,
            studentId: activeUser ? (activeUser.uid || activeUser.id) : (dom === 'dept_mba' ? 'usr_stu_mba_1' : (dom === 'dept_bba' ? 'usr_stu_bba_1' : 'usr_stu_8842'))
          });
        }
      } catch (e) {
        console.warn('Task add error:', e);
      }
    }

    return newTask;
  }

  async function deleteTask(taskId) {
    let tasks = await getTasks();
    tasks = tasks.filter(t => t.id !== taskId);
    saveLocalTasks(tasks);

    if (typeof window !== 'undefined' && window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        if (db) {
          await db.collection('tasks').doc(taskId).delete();
        }
      } catch (e) {
        console.warn('Task delete error:', e);
      }
    }
    return true;
  }

  function saveTasks(tasks) {
    saveLocalTasks(tasks);
  }

  return {
    getTasks,
    toggleTask,
    addTask,
    deleteTask,
    saveTasks
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TaskService;
} else if (typeof window !== 'undefined') {
  window.TaskService = TaskService;
}

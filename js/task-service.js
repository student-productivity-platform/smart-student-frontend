/**
 * ==========================================================================
 * SMART STUDENT — Task Management Service Layer
 * Local / Firestore sync for student academic tasks and checklist items
 * ==========================================================================
 */

const TaskService = (() => {
  const LOCAL_TASKS_KEY = 'smart_student_tasks_state';

  function getLocalStoredTasks() {
    try {
      const stored = localStorage.getItem(LOCAL_TASKS_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  function saveLocalTasks(tasks) {
    try {
      localStorage.setItem(LOCAL_TASKS_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  async function getTasks() {
    const local = getLocalStoredTasks();
    if (local && local.length > 0) {
      return local;
    }

    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        const activeUser = AuthService.getCurrentUser();
        const uid = activeUser ? activeUser.uid : 'usr_stu_8842';
        const snap = await db.collection('tasks').where('studentId', '==', uid).get();
        if (!snap.empty) {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
          saveLocalTasks(list);
          return list;
        }
      } catch (e) {
        console.warn('Tasks fetch error:', e);
      }
    }

    const initial = window.mockTasks ? [...window.mockTasks] : [];
    saveLocalTasks(initial);
    return initial;
  }

  async function toggleTask(taskId) {
    const tasks = await getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveLocalTasks(tasks);

      if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
        try {
          const db = window.SmartStudentFirebase.getDb();
          await db.collection('tasks').doc(taskId).update({ completed: task.completed });
        } catch (e) {
          console.warn('Task sync error:', e);
        }
      }
      return task;
    }
    return null;
  }

  async function addTask(title, dueDate = "Tomorrow", priority = "medium") {
    const newTask = {
      id: "tsk_" + Date.now(),
      title: title.trim(),
      dueDate: dueDate || "Upcoming",
      priority: priority || "medium",
      completed: false
    };

    const tasks = await getTasks();
    tasks.unshift(newTask);
    saveLocalTasks(tasks);

    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        const activeUser = AuthService.getCurrentUser();
        await db.collection('tasks').doc(newTask.id).set({
          ...newTask,
          studentId: activeUser ? activeUser.uid : 'usr_stu_8842'
        });
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

    if (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized()) {
      try {
        const db = window.SmartStudentFirebase.getDb();
        await db.collection('tasks').doc(taskId).delete();
      } catch (e) {
        console.warn('Task delete error:', e);
      }
    }
    return true;
  }

  return {
    getTasks,
    toggleTask,
    addTask,
    deleteTask
  };
})();

if (typeof window !== 'undefined') {
  window.TaskService = TaskService;
}

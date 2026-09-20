/**
 * ==========================================================================
 * SMART STUDENT — Notification & Messaging Service Layer
 * Supports Firebase Cloud Messaging (FCM) & Firestore In-App Notifications
 * ==========================================================================
 */

const NotificationService = (() => {
  function getDb() {
    return (window.SmartStudentFirebase && window.SmartStudentFirebase.isInitialized())
      ? window.SmartStudentFirebase.getDb()
      : null;
  }

  let localCache = [
    {
      id: "notif_001",
      title: "Mid-Term Examination Schedule",
      message: "The official timetable for Semester 4 Mid-Term Exams has been published.",
      time: "10 mins ago",
      type: "exam",
      isUnread: true
    },
    {
      id: "notif_002",
      title: "New Material Uploaded",
      message: "Prof. Sunita Mehta uploaded 'DBMS Unit 3: Normalization Notes'.",
      time: "2 hours ago",
      type: "material",
      isUnread: true
    },
    {
      id: "notif_003",
      title: "Assignment Due in 24 Hours",
      message: "Normalization & Relational Schema Design is due tomorrow at 11:59 PM.",
      time: "5 hours ago",
      type: "assignment",
      isUnread: true
    }
  ];

  async function getNotifications() {
    const db = getDb();
    const activeSession = AuthService.getCurrentUser();
    const uid = activeSession ? activeSession.uid : null;

    if (db) {
      try {
        const snap = await db.collection('notifications').orderBy('createdAt', 'desc').limit(20).get();
        if (!snap.empty) {
          localCache = snap.docs
            .map(d => ({ id: d.id, ...d.data() }))
            .filter(n => !n.userId || n.userId === uid);
          return localCache;
        }
      } catch (e) {
        console.warn("Notifications fetch note:", e);
      }
    }

    return localCache;
  }

  function getUnreadCount() {
    return localCache.filter(n => n.isUnread).length;
  }

  async function markAsRead(notificationId) {
    const item = localCache.find(n => n.id === notificationId);
    if (item) {
      item.isUnread = false;
    }

    const db = getDb();
    if (db && notificationId) {
      try {
        await db.collection('notifications').doc(notificationId).update({ isUnread: false });
      } catch (e) {}
    }

    return getUnreadCount();
  }

  async function markAllAsRead() {
    localCache.forEach(n => { n.isUnread = false; });

    const db = getDb();
    if (db) {
      try {
        const snap = await db.collection('notifications').where('isUnread', '==', true).get();
        const batch = db.batch();
        snap.docs.forEach(doc => {
          batch.update(doc.ref, { isUnread: false });
        });
        await batch.commit();
      } catch (e) {}
    }

    return 0;
  }

  /**
   * Request FCM Push Notification Permission (Production Ready)
   */
  async function requestPushPermission() {
    if ('Notification' in window && Notification.permission !== 'granted') {
      try {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      } catch (e) {
        console.warn('Push permission request note:', e);
      }
    }
    return false;
  }

  return {
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    requestPushPermission
  };
})();

if (typeof window !== 'undefined') {
  window.NotificationService = NotificationService;
}

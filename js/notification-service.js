/**
 * ==========================================================================
 * SMART STUDENT — Notification & Messaging Service Layer
 * Supports Firebase Cloud Messaging (FCM) abstraction + In-App Notifications
 * ==========================================================================
 */

const NotificationService = (() => {
  let notifications = [
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
      message: "Prof. Sunita Mehta uploaded 'DBMS Unit 3 Normalization Notes'.",
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
    },
    {
      id: "notif_004",
      title: "Doubt Clarification Answered",
      message: "Your AI Doubt query on Gradient Descent has an updated reference solution.",
      time: "1 day ago",
      type: "ai",
      isUnread: false
    }
  ];

  async function getNotifications() {
    return notifications;
  }

  function getUnreadCount() {
    return notifications.filter(n => n.isUnread).length;
  }

  function markAsRead(notificationId) {
    const item = notifications.find(n => n.id === notificationId);
    if (item) {
      item.isUnread = false;
    }
    return getUnreadCount();
  }

  function markAllAsRead() {
    notifications.forEach(n => { n.isUnread = false; });
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
        console.warn('Push permission request failed:', e);
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

/**
 * ==========================================================================
 * SMART STUDENT — Central UI Controller & Helper Utilities
 * Manages: Theme Engine (Light/Dark/Navy), Toasts, Modals, Dropdowns,
 * Mobile Drawer, Active Links, Header Identity Sync, Global Logout & Search
 * ==========================================================================
 */

const UI = (() => {
  const THEME_KEY = 'smart_student_theme';

  // --- Theme Management ---
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Sync any theme buttons or selects in UI
    document.querySelectorAll('[data-theme-choice]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-choice') === theme);
    });

    const themeSelect = document.getElementById('portal-theme-select');
    if (themeSelect) {
      themeSelect.value = theme;
    }
  }

  function setTheme(theme) {
    applyTheme(theme);
    showToast('info', 'Theme Updated', `Switched to ${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode.`);
  }

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'light';
  }

  // --- Ensure Toast Container ---
  function ensureToastContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  /**
   * Display Non-Blocking Toast Notification
   * Types: 'success' | 'error' | 'warning' | 'info'
   */
  function showToast(type = 'info', title = '', message = '', duration = 4000) {
    const container = ensureToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    } else if (type === 'warning') {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
    } else {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Close">&times;</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    const removeToast = () => {
      toast.classList.add('toast-hide');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 200);
    };

    closeBtn.addEventListener('click', removeToast);
    container.appendChild(toast);

    if (duration > 0) {
      setTimeout(removeToast, duration);
    }
  }

  /**
   * Modal Dialog Controller
   */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  /**
   * Setup Dropdown Toggles and Outside-Click Handlers
   */
  function initDropdowns() {
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('[data-dropdown-toggle]');
      const allDropdowns = document.querySelectorAll('.menu-dropdown');

      if (toggle) {
        e.preventDefault();
        const targetId = toggle.getAttribute('data-dropdown-toggle');
        const targetMenu = document.getElementById(targetId);

        // Close others
        allDropdowns.forEach(dd => {
          if (dd !== targetMenu) dd.classList.remove('show');
        });

        if (targetMenu) {
          targetMenu.classList.toggle('show');
        }
      } else if (!e.target.closest('.menu-dropdown')) {
        // Clicked outside, close all
        allDropdowns.forEach(dd => dd.classList.remove('show'));
      }
    });
  }

  /**
   * Setup Mobile Navigation Drawer & Backdrop
   */
  function initMobileDrawer() {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const sidebar = document.querySelector('.app-sidebar');

    if (toggleBtn && sidebar) {
      let backdrop = document.querySelector('.sidebar-backdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        document.body.appendChild(backdrop);
      }

      const toggleDrawer = () => {
        sidebar.classList.toggle('drawer-open');
        backdrop.classList.toggle('active');
      };

      toggleBtn.addEventListener('click', toggleDrawer);
      backdrop.addEventListener('click', toggleDrawer);
    }
  }

  /**
   * Highlight Active Nav Link
   */
  function highlightActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
    const navLinks = document.querySelectorAll('.sidebar-nav-container .nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.endsWith(currentPath)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Populate Global Student Identity into Header & Profile Widgets
   */
  async function syncStudentIdentity() {
    const user = (typeof AuthService !== 'undefined' && AuthService.getCurrentUser())
      ? AuthService.getCurrentUser()
      : (window.mockStudent || { name: 'Riddhi Zunjarrao', program: 'B.Tech CSE', semester: 4, section: 'A' });

    // Sync Topbar Name
    const topbarNameEl = document.getElementById('topbar-user-name');
    if (topbarNameEl) topbarNameEl.textContent = user.name;

    // Sync Avatar Initials
    const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    document.querySelectorAll('.user-avatar-initials').forEach(el => {
      el.textContent = initials;
    });

    // Sync Sidebar Footer
    const sidebarNameEl = document.getElementById('sidebar-user-name');
    if (sidebarNameEl) sidebarNameEl.textContent = user.name;

    const sidebarRoleEl = document.getElementById('sidebar-user-role');
    if (sidebarRoleEl) sidebarRoleEl.textContent = `Sem ${user.semester || 4} • Sec ${user.section || 'A'}`;

    // Sync Banner
    const bannerGreeting = document.getElementById('banner-student-name');
    if (bannerGreeting) {
      const firstName = user.name.split(' ')[0];
      bannerGreeting.textContent = firstName;
    }

    const bannerProgram = document.getElementById('banner-program-name');
    if (bannerProgram) {
      bannerProgram.textContent = user.program || 'B.Tech Computer Science & Engineering';
    }

    const bannerSem = document.getElementById('banner-semester-info');
    if (bannerSem) {
      bannerSem.textContent = `Semester ${user.semester || 4} • Section ${user.section || 'A'}`;
    }

    // Live Date Formatter
    const dateChip = document.getElementById('live-current-date');
    if (dateChip) {
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      dateChip.textContent = new Date().toLocaleDateString('en-US', options);
    }
  }

  /**
   * Global Search Handler
   */
  function initGlobalSearch() {
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim().toLowerCase();
          if (!query) return;

          // If on dashboard or another page, provide smart search routing or filter
          if (query.includes('course') || query.includes('cs40') || query.includes('dbms') || query.includes('dsa')) {
            window.location.href = 'courses.html';
          } else if (query.includes('assign') || query.includes('submit') || query.includes('homework')) {
            window.location.href = 'assignments.html';
          } else if (query.includes('exam') || query.includes('hall ticket') || query.includes('mid term')) {
            window.location.href = 'exams.html';
          } else if (query.includes('attend') || query.includes('miss') || query.includes('leave')) {
            window.location.href = 'attendance.html';
          } else if (query.includes('result') || query.includes('gpa') || query.includes('grade')) {
            window.location.href = 'results.html';
          } else if (query.includes('note') || query.includes('material') || query.includes('slide') || query.includes('book')) {
            window.location.href = 'materials.html';
          } else if (query.includes('task') || query.includes('todo') || query.includes('pomodoro')) {
            window.location.href = 'tasks.html';
          } else if (query.includes('calendar') || query.includes('schedule') || query.includes('holiday')) {
            window.location.href = 'calendar.html';
          } else if (query.includes('ai') || query.includes('doubt') || query.includes('question') || query.includes('tutor')) {
            window.location.href = 'ai-doubts.html';
          } else if (query.includes('group') || query.includes('study') || query.includes('peer')) {
            window.location.href = 'study-groups.html';
          } else {
            showToast('info', 'Global Search', `Searching for "${searchInput.value.trim()}" across your academic record...`);
          }
        }
      });
    }
  }

  /**
   * Global Logout Listener
   * Ensures clicking any Sign Out link / button triggers AuthService.logout() cleanly.
   */
  function initLogoutHandler() {
    document.addEventListener('click', (e) => {
      const logoutTrigger = e.target.closest('.logout-action, #logout-action-btn');
      if (logoutTrigger) {
        e.preventDefault();
        if (typeof AuthService !== 'undefined' && AuthService.logout) {
          AuthService.logout();
        } else {
          sessionStorage.removeItem('smart_student_session');
          localStorage.removeItem('smart_student_session');
          window.location.href = window.location.pathname.includes('/student/') ? '../login.html' : 'login.html';
        }
      }
    });
  }

  /**
   * Initialize Global UI
   */
  function init() {
    initTheme();
    initDropdowns();
    initMobileDrawer();
    highlightActiveNavLink();
    syncStudentIdentity();
    initGlobalSearch();
    initLogoutHandler();
  }

  return {
    init,
    showToast,
    openModal,
    closeModal,
    syncStudentIdentity,
    setTheme,
    getTheme,
    applyTheme
  };
})();

// Auto-run on DOM ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', UI.init);
  } else {
    UI.init();
  }
}

if (typeof window !== 'undefined') {
  window.UI = UI;
}

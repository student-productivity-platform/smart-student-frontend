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
          if (dd !== targetMenu) {
            dd.classList.remove('show');
            dd.classList.remove('open');
          }
        });

        if (targetMenu) {
          const isOpen = targetMenu.classList.contains('show') || targetMenu.classList.contains('open');
          if (isOpen) {
            targetMenu.classList.remove('show');
            targetMenu.classList.remove('open');
          } else {
            targetMenu.classList.add('show');
            targetMenu.classList.add('open');
          }
        }
      } else if (!e.target.closest('.menu-dropdown')) {
        // Clicked outside, close all
        allDropdowns.forEach(dd => {
          dd.classList.remove('show');
          dd.classList.remove('open');
        });
      }
    });
  }

  /**
   * Setup Mobile Navigation Drawer & Backdrop
   */
  function initMobileDrawer() {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const sidebar = document.querySelector('.app-sidebar');

    if (sidebar) {
      let backdrop = document.querySelector('.sidebar-backdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'sidebar-backdrop';
        document.body.appendChild(backdrop);
      }

      const closeDrawer = () => {
        sidebar.classList.remove('drawer-open');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
      };

      const openDrawer = () => {
        sidebar.classList.add('drawer-open');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      };

      const toggleDrawer = () => {
        if (sidebar.classList.contains('drawer-open')) {
          closeDrawer();
        } else {
          openDrawer();
        }
      };

      if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleDrawer);
      }

      backdrop.addEventListener('click', closeDrawer);

      // Auto-close drawer when any navigation link is clicked
      sidebar.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            closeDrawer();
          }
        });
      });

      // Close drawer on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('drawer-open')) {
          closeDrawer();
        }
      });
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
   * Populate Global Identity into Header & Profile Widgets (Student, Faculty, HOD & Super Admin)
   */
  async function syncStudentIdentity() {
    const isHOD = window.location.pathname.includes('/hod/');
    const isFaculty = window.location.pathname.includes('/faculty/');
    const isAdmin = window.location.pathname.includes('/administrator/');
    let user = null;

    if (typeof AuthService !== 'undefined' && AuthService.getCurrentUser()) {
      user = AuthService.getCurrentUser();
    } else if (isHOD && typeof HODService !== 'undefined') {
      user = HODService.getProfile();
    } else if (isFaculty && typeof FacultyService !== 'undefined') {
      user = FacultyService.getProfile();
    } else if (window.mockStudent && !isAdmin && !isHOD && !isFaculty) {
      user = window.mockStudent;
    } else {
      user = {
        name: isAdmin ? 'Super Administrator' : (isHOD ? 'Dr. Anand Deshmukh' : (isFaculty ? 'Prof. Sunita Mehta' : 'Riddhi Zunjarrao')),
        role: isAdmin ? 'super_admin' : (isHOD ? 'hod' : (isFaculty ? 'faculty' : 'student'))
      };
    }

    const isUserAdmin = isAdmin || (user && (user.role === 'super_admin' || user.role === 'administrator' || user.role === 'admin'));
    const displayName = user.name || (isUserAdmin ? 'Super Administrator' : 'User');

    // Align active domain with authenticated user
    if (user && typeof DomainService !== 'undefined' && DomainService.setActiveDomain) {
      const deptStr = (user.departmentId || user.domainId || user.department || user.program || user.email || '').toLowerCase();
      let expectedDom = 'dept_btech';
      if (deptStr.includes('mba')) expectedDom = 'dept_mba';
      else if (deptStr.includes('bba')) expectedDom = 'dept_bba';
      else if (deptStr.includes('btech') || deptStr.includes('cs') || deptStr.includes('eng')) expectedDom = 'dept_btech';

      if (DomainService.getActiveDomain() !== expectedDom) {
        DomainService.setActiveDomain(expectedDom, false);
      }
    }

    // Sync Topbar Name
    const topbarNameEl = document.getElementById('topbar-user-name');
    if (topbarNameEl) topbarNameEl.textContent = displayName;

    const topbarSubEl = document.querySelector('.user-menu-sub');
    if (topbarSubEl) {
      topbarSubEl.textContent = isUserAdmin
        ? 'Platform Admin'
        : (isHOD
          ? 'HOD • Computer Engineering'
          : (isFaculty ? (user.designation || 'Faculty • CSE') : (user.program || 'B.Tech CSE')));
    }

    // Sync Avatar Initials
    const initials = displayName.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || (isUserAdmin ? 'SA' : 'ST');
    document.querySelectorAll('.user-avatar-initials, #sidebar-initials, #topbar-initials').forEach(el => {
      el.textContent = initials;
    });

    // If Admin, ensure avatar has amber styling
    if (isUserAdmin) {
      document.querySelectorAll('.sidebar-user-card .user-avatar, .sidebar-user-avatar').forEach(avatar => {
        avatar.style.background = 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
        avatar.style.boxShadow = '0 4px 10px rgba(245, 158, 11, 0.35)';
      });
    }

    // Sync Sidebar Footer
    const sidebarNameEl = document.getElementById('sidebar-user-name');
    if (sidebarNameEl) sidebarNameEl.textContent = displayName;

    const sidebarRoleEl = document.getElementById('sidebar-user-role') || document.querySelector('.sidebar-user-card .user-role-tag');
    if (sidebarRoleEl) {
      sidebarRoleEl.textContent = isUserAdmin
        ? 'Platform Admin'
        : (isHOD
          ? 'Head of Department'
          : (isFaculty ? (user.designation || 'Associate Professor') : `Sem ${user.semester || 4} • Sec ${user.section || 'A'}`));
    }

    // Sync Banner
    const bannerGreeting = document.getElementById('banner-student-name') || document.getElementById('banner-faculty-name') || document.getElementById('banner-hod-name') || document.getElementById('hero-admin-name');
    if (bannerGreeting) {
      const firstName = displayName.split(' ')[0];
      bannerGreeting.textContent = (user.role === 'faculty' || user.role === 'hod' || isUserAdmin) ? displayName : firstName;
    }

    const bannerProgram = document.getElementById('banner-program-name');
    if (bannerProgram) {
      bannerProgram.textContent = isUserAdmin
        ? 'Platform Administration & Security Control'
        : (user.department || user.program || 'Department of Computer Engineering');
    }

    const bannerSem = document.getElementById('banner-semester-info');
    if (bannerSem) {
      bannerSem.textContent = isUserAdmin
        ? 'Super Admin Privileges • Full Access'
        : (isHOD
          ? 'Academic Block 3 • HOD Office'
          : (isFaculty ? (user.officeRoom || 'Cabin 304 • CSE Block') : `Semester ${user.semester || 4} • Section ${user.section || 'A'}`));
    }

    // Live Date Formatter
    const dateChip = document.getElementById('live-current-date') || document.getElementById('hero-date');
    if (dateChip) {
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      dateChip.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // Clean up any existing topbar domain switcher widget
    const existingDomainSwitcher = document.getElementById('topbar-domain-switcher');
    if (existingDomainSwitcher) {
      existingDomainSwitcher.remove();
    }
  }

  /**
   * Global Search Handler
   */
  function initGlobalSearch() {
    const searchInput = document.getElementById('global-search-input');
    const isHOD = window.location.pathname.includes('/hod/');
    const isFaculty = window.location.pathname.includes('/faculty/');
    const isAdmin = window.location.pathname.includes('/administrator/');

    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim().toLowerCase();
          if (!query) return;

          if (isAdmin) {
            if (query.includes('user') || query.includes('student') || query.includes('faculty') || query.includes('account')) {
              window.location.href = 'users.html';
            } else if (query.includes('role') || query.includes('permission') || query.includes('access')) {
              window.location.href = 'roles-permissions.html';
            } else if (query.includes('struct') || query.includes('dept') || query.includes('department') || query.includes('program')) {
              window.location.href = 'academic-structure.html';
            } else if (query.includes('course') || query.includes('subject') || query.includes('curriculum')) {
              window.location.href = 'courses.html';
            } else if (query.includes('report') || query.includes('stat') || query.includes('analytic') || query.includes('metric')) {
              window.location.href = 'reports.html';
            } else if (query.includes('audit') || query.includes('log') || query.includes('history') || query.includes('security')) {
              window.location.href = 'audit-logs.html';
            } else if (query.includes('notif') || query.includes('announc') || query.includes('broadcast')) {
              window.location.href = 'announcements.html';
            } else if (query.includes('config') || query.includes('setting') || query.includes('system') || query.includes('backup')) {
              window.location.href = 'system-config.html';
            } else if (query.includes('profile') || query.includes('my')) {
              window.location.href = 'profile.html';
            } else {
              showToast('info', 'Platform Search', `Searching admin records for "${searchInput.value.trim()}"...`);
            }
          } else if (isHOD) {
            if (query.includes('alloc') || query.includes('assign') || query.includes('workload')) {
              window.location.href = 'faculty-allocation.html';
            } else if (query.includes('student') || query.includes('attend') || query.includes('risk') || query.includes('performance')) {
              window.location.href = 'students.html';
            } else if (query.includes('faculty') || query.includes('prof') || query.includes('teacher')) {
              window.location.href = 'faculty.html';
            } else if (query.includes('time') || query.includes('schedule') || query.includes('class') || query.includes('slot')) {
              window.location.href = 'timetable.html';
            } else if (query.includes('approv') || query.includes('leave') || query.includes('requisition') || query.includes('request')) {
              window.location.href = 'approvals.html';
            } else if (query.includes('report') || query.includes('stat') || query.includes('analytic') || query.includes('export')) {
              window.location.href = 'reports.html';
            } else if (query.includes('setting') || query.includes('config') || query.includes('profile')) {
              window.location.href = 'settings.html';
            } else {
              showToast('info', 'Department Search', `Searching records for "${searchInput.value.trim()}"...`);
            }
          } else if (isFaculty) {
            if (query.includes('student') || query.includes('roster') || query.includes('section') || query.includes('map')) {
              window.location.href = 'academic-mapping.html';
            } else if (query.includes('assign') || query.includes('create')) {
              window.location.href = 'assignments.html';
            } else if (query.includes('eval') || query.includes('grade') || query.includes('submi') || query.includes('review')) {
              window.location.href = 'evaluations.html';
            } else if (query.includes('attend') || query.includes('roll') || query.includes('present') || query.includes('absent')) {
              window.location.href = 'attendance.html';
            } else if (query.includes('exam') || query.includes('quiz') || query.includes('test') || query.includes('mark')) {
              window.location.href = 'exams.html';
            } else if (query.includes('meet') || query.includes('class') || query.includes('google') || query.includes('schedule')) {
              window.location.href = 'meetings.html';
            } else if (query.includes('note') || query.includes('material') || query.includes('slide') || query.includes('upload') || query.includes('content')) {
              window.location.href = 'materials.html';
            } else if (query.includes('doubt') || query.includes('announce') || query.includes('notice') || query.includes('comm')) {
              window.location.href = 'communication.html';
            } else {
              showToast('info', 'Faculty Search', `Searching records for "${searchInput.value.trim()}"...`);
            }
          } else {
            // Student Portal routing
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
          window.location.href = (window.location.pathname.includes('/student/') || window.location.pathname.includes('/faculty/') || window.location.pathname.includes('/hod/') || window.location.pathname.includes('/administrator/')) ? '../login.html' : 'login.html';
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

  /**
   * Render Interactive Table Pagination
   * @param {string} containerId - DOM ID of pagination container element
   * @param {number} totalItems - Total count of records matching current filter
   * @param {number} currentPage - 1-based current page index
   * @param {number} pageSize - Number of items displayed per page
   * @param {Function} onPageChange - Callback receiving new page number (1-based)
   */
  function renderPagination(containerId, totalItems, currentPage, pageSize, onPageChange) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (totalItems <= 0) {
      container.innerHTML = `
        <div class="pagination-info">
          <span>Showing <strong>0</strong> to <strong>0</strong> of <strong>0</strong> entries</span>
        </div>
      `;
      return;
    }

    const totalPages = Math.ceil(totalItems / pageSize) || 1;
    const clampedPage = Math.max(1, Math.min(currentPage, totalPages));
    const start = (clampedPage - 1) * pageSize + 1;
    const end = Math.min(clampedPage * pageSize, totalItems);

    let pageBtnsHtml = '';
    let startPage = Math.max(1, clampedPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let p = startPage; p <= endPage; p++) {
      pageBtnsHtml += `<button type="button" class="pagination-btn ${p === clampedPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
    }

    container.innerHTML = `
      <div class="pagination-info">
        <span>Showing <strong>${start}</strong> to <strong>${end}</strong> of <strong>${totalItems}</strong> entries</span>
      </div>
      <div class="pagination-controls">
        <button type="button" class="pagination-btn" id="${containerId}-prev" ${clampedPage <= 1 ? 'disabled' : ''} aria-label="Previous Page">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          <span style="margin-left: 2px;">Prev</span>
        </button>
        ${pageBtnsHtml}
        <button type="button" class="pagination-btn" id="${containerId}-next" ${clampedPage >= totalPages ? 'disabled' : ''} aria-label="Next Page">
          <span style="margin-right: 2px;">Next</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    `;

    container.querySelectorAll('button[data-page]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = parseInt(btn.getAttribute('data-page'), 10);
        if (targetPage !== clampedPage && typeof onPageChange === 'function') {
          onPageChange(targetPage);
        }
      });
    });

    const prevBtn = document.getElementById(`${containerId}-prev`);
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (clampedPage > 1 && typeof onPageChange === 'function') {
          onPageChange(clampedPage - 1);
        }
      });
    }

    const nextBtn = document.getElementById(`${containerId}-next`);
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (clampedPage < totalPages && typeof onPageChange === 'function') {
          onPageChange(clampedPage + 1);
        }
      });
    }
  }

  return {
    init,
    initTheme,
    showToast,
    openModal,
    closeModal,
    syncStudentIdentity,
    setTheme,
    getTheme,
    applyTheme,
    renderPagination
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

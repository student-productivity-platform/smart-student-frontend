# Smart Student — Frontend Portal

> **"Your academic life, organized."**

Smart Student is a centralized, production-grade academic productivity and courseware management platform for university students.

---

## 📚 Features & Student Modules

1. **Authentication & Smart Routing (`index.html`, `login.html`)**: Split-screen university login with instant demo fill profiles, credential validation, and session protection.
2. **Student Dashboard (`student/dashboard.html`)**: Comprehensive academic overview widget hub (today's schedule, deadlines, quick actions, CGPA trends, and attendance tracking).
3. **Courses & Syllabus (`student/courses.html`)**: Enrolled semester course directory, credit breakdowns, faculty details, and syllabus downloads.
4. **Assignments Tracker (`student/assignments.html`)**: Coursework submissions tracking with status filters (Pending, Submitted, Graded).
5. **Examinations Timetable (`student/exams.html`)**: Mid-term and end-term exam schedules, room/seat allocations, and hall ticket access.
6. **Attendance Analytics (`student/attendance.html`)**: Real-time subject-wise percentage calculations with minimum criteria warnings.
7. **Grades & Results (`student/results.html`)**: Semester transcripts, SGPA/CGPA breakdowns, and credit summaries.
8. **Lecture Materials (`student/materials.html`)**: Centralized repository for lecture slides, notes, and reference books.
9. **Academic Tasks & Checklist (`student/tasks.html`)**: Interactive task manager with deadline tracking and priority filters.
10. **Semester Calendar (`student/calendar.html`)**: Milestone event tracking, academic deadlines, and university holidays.
11. **AI Academic Concept Solver (`student/ai-doubts.html`)**: Multi-turn AI academic assistant with step-by-step LaTeX math derivations and code explanations.
12. **Study Groups (`student/study-groups.html`)**: Collaborative peer cohorts enforcing a strict 5-member room capacity.
13. **Student Profile (`student/profile.html`)**: Institutional student records, emergency contacts, and academic history.
14. **Settings (`student/settings.html`)**: Security preferences, theme customization, and notification management.

---

## 📁 Directory Structure

```text
frontend/
├── index.html                  # Landing & session router
├── login.html                  # Institutional login page
│
├── student/                    # Student portal view pages (13 modules)
│   ├── dashboard.html
│   ├── courses.html
│   ├── assignments.html
│   ├── exams.html
│   ├── attendance.html
│   ├── results.html
│   ├── materials.html
│   ├── tasks.html
│   ├── calendar.html
│   ├── ai-doubts.html
│   ├── study-groups.html
│   ├── profile.html
│   └── settings.html
│
├── css/                        # Design tokens and stylesheets
│   ├── main.css                # CSS variables, typography, modals, toasts
│   ├── login.css               # Login layout & animations
│   ├── dashboard.css           # Portal shell, navigation, and widgets
│   └── responsive.css          # Mobile and tablet breakpoints
│
├── js/                         # Modular client services
│   ├── firebase-config.js      # Firebase credentials & auto-fallback
│   ├── auth.js                 # Authentication logic & session persistence
│   ├── auth-guard.js           # Route protection guard
│   ├── student-service.js      # Student profile & stats service
│   ├── assignment-service.js   # Assignment management service
│   ├── course-service.js       # Course query service
│   ├── exam-service.js         # Exam schedules service
│   ├── attendance-service.js   # Attendance calculations service
│   ├── material-service.js     # Study materials access service
│   ├── task-service.js         # Academic checklist service
│   ├── notification-service.js # Notifications manager
│   ├── ai-service.js           # AI Doubt Solver client engine
│   └── ui.js                   # Toast and modal controller
│
├── data/                       # Offline & demo dataset records
│   ├── mock-student.js
│   ├── mock-schedule.js
│   ├── mock-assignments.js
│   ├── mock-exams.js
│   ├── mock-attendance.js
│   ├── mock-materials.js
│   ├── mock-tasks.js
│   ├── mock-calendar.js
│   ├── mock-announcements.js
│   ├── mock-study-groups.js
│   └── mock-doubts.js
│
└── images/                     # Graphic assets
    ├── student-study.jpg
    └── student-study.png
```

---

## 🚀 Quick Start

Serve the frontend directory with any standard static HTTP server:

```bash
# Using Node serve
npx serve .

# Or using Python
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.

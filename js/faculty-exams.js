/**
 * ==========================================================================
 * SMART STUDENT — Faculty MCQ Examination Controller (F27 Module)
 * Handles:
 * 1. "Create New Exam / Test" Assessment Type Selection Modal
 * 2. MCQ Exam Configuration (Auto Total Marks, Subject Authorization)
 * 3. Question Builder ("Create Questions" with Option Radio, Marks, Explanation)
 * 4. Question Management (Add, Edit, Delete, Reorder, Validation)
 * 5. Compact Live Exam Summary
 * 6. Student Exam Preview (Without exposing correct answers)
 * 7. Publish Validation & Status Updates
 * 8. Automatic Evaluation & Results Integration in Existing F27 Matrix Table
 * 9. Marksheet CSV Export
 * ==========================================================================
 */

(function () {
  'use strict';

  // State Management
  let currentExam = null;
  let editingQuestionId = null;
  let previewQuestionIndex = 0;
  let activeTab = 'evaluation'; // 'evaluation' | 'mcq-builder'

  document.addEventListener('DOMContentLoaded', () => {
    initMCQModule();
  });

  function initMCQModule() {
    renderAssessmentTypeModal();
    renderMCQWizardDom();
    renderStudentPreviewModal();
    setupEventListeners();
    refreshExamDropdown();
  }

  // =========================================================================
  // 1. ASSESSMENT TYPE MODAL
  // =========================================================================
  function renderAssessmentTypeModal() {
    // Check if modal already exists or replace create-exam-modal
    let modal = document.getElementById('assessment-type-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'assessment-type-modal';
      modal.className = 'modal-overlay';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-hidden', 'true');
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-dialog" style="max-width: 520px;">
        <div class="modal-header">
          <h3 class="modal-title">Create New Assessment</h3>
          <button type="button" class="toast-close" onclick="UI.closeModal('assessment-type-modal')">&times;</button>
        </div>
        <div class="modal-body" style="padding: 1.25rem 1.5rem;">
          <p style="font-size: 0.8125rem; color: #64748B; margin-bottom: 1.25rem;">
            Select the examination format to configure parameters, questions, and evaluation grading criteria.
          </p>

          <label class="assessment-type-card selected" id="type-card-mcq" onclick="FacultyExams.selectAssessmentType('mcq')">
            <input type="radio" name="assessment-type" value="mcq" checked class="type-card-radio">
            <div style="flex: 1;">
              <div class="type-card-title">
                <span>MCQ Examination</span>
                <span class="badge badge-primary" style="font-size: 0.6875rem;">Fully Functional</span>
              </div>
              <div class="type-card-desc">
                Objective multiple-choice question paper with configurable question bank, duration, automatic real-time grading, and instant result evaluation.
              </div>
            </div>
          </label>

          <label class="assessment-type-card disabled" id="type-card-descriptive" title="Descriptive grading module">
            <input type="radio" name="assessment-type" value="descriptive" disabled class="type-card-radio">
            <div style="flex: 1;">
              <div class="type-card-title">
                <span>Descriptive Examination</span>
                <span class="badge" style="font-size: 0.6875rem; background: #F1F5F9; color: #64748B;">Coming Soon</span>
              </div>
              <div class="type-card-desc">
                Subjective theoretical questions evaluated with rubric grading matrices and manual score annotations.
              </div>
            </div>
          </label>

          <label class="assessment-type-card disabled" id="type-card-mixed" title="Mixed assessment module">
            <input type="radio" name="assessment-type" value="mixed" disabled class="type-card-radio">
            <div style="flex: 1;">
              <div class="type-card-title">
                <span>Mixed Assessment</span>
                <span class="badge" style="font-size: 0.6875rem; background: #F1F5F9; color: #64748B;">Coming Soon</span>
              </div>
              <div class="type-card-desc">
                Blended assessment format containing both objective questions and subjective essay sections.
              </div>
            </div>
          </label>
        </div>
        <div class="modal-footer" style="padding: 1rem 1.5rem; display: flex; justify-content: flex-end; gap: 0.65rem;">
          <button type="button" class="btn btn-secondary" onclick="UI.closeModal('assessment-type-modal')">Cancel</button>
          <button type="button" class="btn btn-primary" id="btn-continue-assessment" onclick="FacultyExams.proceedAssessmentType()">Continue</button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 2. MCQ EXAM CREATION & BUILDER WORKSPACE DOM
  // =========================================================================
  function renderMCQWizardDom() {
    const mainContent = document.querySelector('.app-content');
    if (!mainContent) return;

    // Add Tab Navigation Bar above content
    let tabsBar = document.getElementById('exam-view-tabs');
    if (!tabsBar) {
      tabsBar = document.createElement('div');
      tabsBar.id = 'exam-view-tabs';
      tabsBar.className = 'exam-view-tabs';
      tabsBar.innerHTML = `
        <button type="button" class="exam-view-tab active" id="tab-btn-evaluation" onclick="FacultyExams.switchViewTab('evaluation')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          <span>Exam Marks Entry & Grading</span>
        </button>
        <button type="button" class="exam-view-tab" id="tab-btn-mcq" onclick="FacultyExams.switchViewTab('mcq-builder')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
          <span>MCQ Exam Creator & Question Builder</span>
          <span class="tab-badge" id="mcq-badge-count">F27 Extension</span>
        </button>
      `;
      mainContent.insertBefore(tabsBar, mainContent.firstChild);
    }

    // Container for MCQ Wizard
    let wizardContainer = document.getElementById('mcq-wizard-workspace');
    if (!wizardContainer) {
      wizardContainer = document.createElement('div');
      wizardContainer.id = 'mcq-wizard-workspace';
      wizardContainer.className = 'mcq-wizard-container';
      mainContent.insertBefore(wizardContainer, tabsBar.nextSibling);
    }

    wizardContainer.innerHTML = `
      <!-- Wizard Progress Header -->
      <div class="wizard-header-bar">
        <div>
          <div style="font-size: 1.15rem; font-weight: 800; color: #0F172A;" id="wizard-heading">
            Create MCQ Examination
          </div>
          <div style="font-size: 0.78125rem; color: #64748B;">
            University Academic Management System • Module F27
          </div>
        </div>

        <div class="wizard-step-indicator">
          <div class="step-node active" id="step-node-config">
            <span class="step-num">1</span>
            <span>Configure Exam</span>
          </div>
          <span style="color:#CBD5E1;">—</span>
          <div class="step-node" id="step-node-questions">
            <span class="step-num">2</span>
            <span>Create Questions</span>
          </div>
          <span style="color:#CBD5E1;">—</span>
          <div class="step-node" id="step-node-preview">
            <span class="step-num">3</span>
            <span>Preview & Publish</span>
          </div>
        </div>

        <button type="button" class="btn btn-secondary btn-sm" onclick="FacultyExams.switchViewTab('evaluation')" style="gap: 0.35rem;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          <span>Back to Marks Matrix</span>
        </button>
      </div>

      <!-- STEP 1: EXAM CONFIGURATION PANEL -->
      <div id="step-panel-config" class="academic-card" style="display: block;">
        <div class="card-section-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span>Exam Configuration & Academic Parameters</span>
        </div>
        <div class="card-section-sub">
          Specify examination details, authorized course allocation, timing schedules, and scoring rubrics.
        </div>

        <form id="mcq-config-form" onsubmit="FacultyExams.handleConfigSubmit(event)">
          <!-- Row 1: Exam Name -->
          <div class="form-group" style="margin-bottom: 1rem;">
            <label for="cfg-exam-name" class="form-label">Exam Name <span class="required">*</span></label>
            <input type="text" id="cfg-exam-name" class="form-input" placeholder="e.g. Semester 4 Mid-Term MCQ Examination" required>
            <div class="form-feedback" id="feedback-exam-name">Exam name is required.</div>
          </div>

          <!-- Row 2: Subject Authorization & Course Code -->
          <div class="form-grid-3" style="margin-bottom: 1rem;">
            <div class="form-group">
              <label for="cfg-subject" class="form-label">Subject (Teaching Allocation) <span class="required">*</span></label>
              <select id="cfg-subject" class="form-input" required onchange="FacultyExams.onSubjectChange()">
                <!-- Populated with authorized subjects only -->
              </select>
            </div>

            <div class="form-group">
              <label for="cfg-course-code" class="form-label">Course Code <span class="required">*</span></label>
              <input type="text" id="cfg-course-code" class="form-input" readonly style="background: #F1F5F9; color: #475569; font-weight: 700;">
            </div>

            <div class="form-group">
              <label for="cfg-program" class="form-label">Program <span class="required">*</span></label>
              <input type="text" id="cfg-program" class="form-input" value="B.Tech" required>
            </div>
          </div>

          <!-- Row 3: Semester, Section, Duration -->
          <div class="form-grid-3" style="margin-bottom: 1rem;">
            <div class="form-group">
              <label for="cfg-semester" class="form-label">Semester <span class="required">*</span></label>
              <select id="cfg-semester" class="form-input" required>
                <option value="4" selected>Semester 4</option>
                <option value="3">Semester 3</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
              </select>
            </div>

            <div class="form-group">
              <label for="cfg-section" class="form-label">Section <span class="required">*</span></label>
              <select id="cfg-section" class="form-input" required>
                <option value="A" selected>Sec A</option>
                <option value="B">Sec B</option>
                <option value="all">All Sections (A & B)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="cfg-duration" class="form-label">Duration (Minutes) <span class="required">*</span></label>
              <input type="number" id="cfg-duration" class="form-input" value="30" min="5" max="180" required>
            </div>
          </div>

          <!-- Row 4: Total Questions, Marks Per Question, Total Marks -->
          <div class="form-grid-3" style="margin-bottom: 1rem;">
            <div class="form-group">
              <label for="cfg-total-questions" class="form-label">Total Questions <span class="required">*</span></label>
              <input type="number" id="cfg-total-questions" class="form-input" value="20" min="1" max="100" required oninput="FacultyExams.calcTotalMarks()">
            </div>

            <div class="form-group">
              <label for="cfg-marks-per-q" class="form-label">Marks Per Question <span class="required">*</span></label>
              <input type="number" id="cfg-marks-per-q" class="form-input" value="1" min="1" max="10" step="0.5" required oninput="FacultyExams.calcTotalMarks()">
            </div>

            <div class="form-group">
              <label for="cfg-total-marks" class="form-label">Total Marks (Auto-Calculated) <span class="required">*</span></label>
              <input type="number" id="cfg-total-marks" class="form-input" value="20" readonly style="background: #F1F5F9; color: #1E40AF; font-weight: 800;" title="Calculated as: Total Questions × Marks Per Question">
            </div>
          </div>

          <!-- Row 5: Start Date/Time, End Date/Time, Passing Marks -->
          <div class="form-grid-3" style="margin-bottom: 1rem;">
            <div class="form-group">
              <label for="cfg-start-time" class="form-label">Start Date & Time <span class="required">*</span></label>
              <input type="datetime-local" id="cfg-start-time" class="form-input" required>
            </div>

            <div class="form-group">
              <label for="cfg-end-time" class="form-label">End Date & Time <span class="required">*</span></label>
              <input type="datetime-local" id="cfg-end-time" class="form-input" required>
            </div>

            <div class="form-group">
              <label for="cfg-passing-marks" class="form-label">Passing Marks <span class="required">*</span></label>
              <input type="number" id="cfg-passing-marks" class="form-input" value="8" min="1" max="100" required>
            </div>
          </div>

          <!-- Row 6: Negative Marking Controls -->
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 0.85rem 1rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.84375rem; font-weight: 600; color: #0F172A; user-select: none;">
              <input type="checkbox" id="cfg-enable-negative" checked onchange="FacultyExams.toggleNegativeMarking()" style="accent-color: #DC2626; width: 17px; height: 17px;">
              <span>Enable Negative Marking for Incorrect Answers</span>
            </label>

            <div style="display: flex; align-items: center; gap: 0.5rem;" id="cfg-neg-input-wrap">
              <label for="cfg-negative-marks" style="font-size: 0.8125rem; color: #64748B; font-weight: 600;">Deduction per wrong answer:</label>
              <input type="number" id="cfg-negative-marks" class="form-input" value="0.25" min="0" max="2" step="0.05" style="width: 85px; text-align: center; font-weight: 700;">
            </div>
          </div>

          <!-- Row 7: Instructions -->
          <div class="form-group" style="margin-bottom: 1.5rem;">
            <label for="cfg-instructions" class="form-label">Exam Instructions</label>
            <textarea id="cfg-instructions" class="form-input" rows="2" placeholder="e.g. Attempt all questions. Each correct answer carries 1 mark. Incorrect answers will incur 0.25 negative marks penalty.">Attempt all questions. Each correct answer carries 1 mark. Incorrect answers will incur 0.25 negative marks penalty. Do not refresh or exit the browser tab during the active assessment session.</textarea>
          </div>

          <!-- Action Footer -->
          <div style="display: flex; justify-content: flex-end; gap: 0.75rem; padding-top: 1rem; border-top: 1px solid #E2E8F0;">
            <button type="button" class="btn btn-secondary" onclick="FacultyExams.switchViewTab('evaluation')">Cancel</button>
            <button type="submit" class="btn btn-primary" style="gap: 0.4rem;">
              <span>Save Configuration & Proceed to Questions</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </form>
      </div>

      <!-- STEP 2: QUESTION BUILDER PANEL (SPLIT LAYOUT) -->
      <div id="step-panel-questions" style="display: none;">
        <div class="builder-split-layout">
          <!-- Left: Question Creator & List -->
          <div>
            <!-- Question Editor Card -->
            <div class="academic-card" style="margin-bottom: 1.25rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid #E2E8F0; padding-bottom: 0.75rem;">
                <div>
                  <h3 style="font-size: 1.1rem; font-weight: 800; color: #0F172A; margin: 0;" id="question-builder-heading">
                    Create Questions
                  </h3>
                  <div style="font-size: 0.78125rem; color: #64748B;" id="q-counter-label">
                    Question 1 of 20
                  </div>
                </div>
                <button type="button" class="btn btn-secondary btn-sm" onclick="FacultyExams.resetQuestionForm()" style="gap: 0.35rem;">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  <span>+ Add Question</span>
                </button>
              </div>

              <form id="mcq-question-form" onsubmit="FacultyExams.handleSaveQuestion(event)">
                <input type="hidden" id="q-edit-id" value="">

                <div class="form-group" style="margin-bottom: 1rem;">
                  <label for="q-text" class="form-label">Question Text <span class="required">*</span></label>
                  <textarea id="q-text" class="form-input" rows="3" placeholder="Enter question statement (e.g. What is the time complexity of Binary Search in a sorted array?)" required></textarea>
                </div>

                <div style="font-size: 0.8125rem; font-weight: 700; color: #0F172A; margin-bottom: 0.4rem;">
                  Answer Options <span style="font-weight: 400; color: #64748B;">(Select radio button of the exactly one correct answer)</span> <span class="required">*</span>
                </div>

                <div class="options-editor-grid">
                  <div class="option-input-wrap">
                    <label class="option-prefix-radio">
                      <input type="radio" name="correct-option-radio" value="A" checked>
                      <span>A.</span>
                    </label>
                    <input type="text" id="q-opt-A" class="option-text-input" placeholder="Enter option A" required>
                  </div>

                  <div class="option-input-wrap">
                    <label class="option-prefix-radio">
                      <input type="radio" name="correct-option-radio" value="B">
                      <span>B.</span>
                    </label>
                    <input type="text" id="q-opt-B" class="option-text-input" placeholder="Enter option B" required>
                  </div>

                  <div class="option-input-wrap">
                    <label class="option-prefix-radio">
                      <input type="radio" name="correct-option-radio" value="C">
                      <span>C.</span>
                    </label>
                    <input type="text" id="q-opt-C" class="option-text-input" placeholder="Enter option C" required>
                  </div>

                  <div class="option-input-wrap">
                    <label class="option-prefix-radio">
                      <input type="radio" name="correct-option-radio" value="D">
                      <span>D.</span>
                    </label>
                    <input type="text" id="q-opt-D" class="option-text-input" placeholder="Enter option D" required>
                  </div>
                </div>

                <div class="form-grid-2" style="margin-bottom: 1rem;">
                  <div class="form-group">
                    <label for="q-marks" class="form-label">Marks for this Question <span class="required">*</span></label>
                    <input type="number" id="q-marks" class="form-input" value="1" min="0.5" max="10" step="0.5" required>
                  </div>

                  <div class="form-group">
                    <label for="q-explanation" class="form-label">Explanation / Reference (Optional)</label>
                    <input type="text" id="q-explanation" class="form-input" placeholder="e.g. Binary Search halves search space at each iteration: O(log n)">
                  </div>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 0.65rem; border-top: 1px solid #F1F5F9; padding-top: 0.85rem;">
                  <button type="button" class="btn btn-secondary btn-sm" onclick="FacultyExams.resetQuestionForm()">Clear Form</button>
                  <button type="submit" class="btn btn-primary btn-sm" id="btn-save-question" style="gap: 0.4rem;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Save Question</span>
                  </button>
                </div>
              </form>
            </div>

            <!-- Saved Questions Section -->
            <div class="academic-card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h4 style="font-size: 0.9375rem; font-weight: 700; color: #0F172A; margin: 0;">
                  Configured Questions List (<span id="saved-q-count">0</span>)
                </h4>
                <div style="font-size: 0.78125rem; color: #64748B;" id="q-target-status">
                  Target: 20 Questions
                </div>
              </div>

              <div id="saved-questions-container">
                <!-- Dynamically populated questions list -->
              </div>
            </div>
          </div>

          <!-- Right: Compact Live Exam Summary Sidebar -->
          <div class="exam-summary-sidebar">
            <div class="summary-heading">
              <span>Exam Summary</span>
              <span class="badge badge-primary" id="summary-status-badge">Draft</span>
            </div>

            <div class="summary-data-list">
              <div class="summary-data-row">
                <span class="summary-label">Exam:</span>
                <span class="summary-val" id="summary-exam-name">—</span>
              </div>
              <div class="summary-data-row">
                <span class="summary-label">Subject:</span>
                <span class="summary-val" id="summary-subject">—</span>
              </div>
              <div class="summary-data-row">
                <span class="summary-label">Program & Sem:</span>
                <span class="summary-val" id="summary-prog-sem">—</span>
              </div>
              <div class="summary-data-row">
                <span class="summary-label">Section:</span>
                <span class="summary-val" id="summary-section">—</span>
              </div>
              <div class="summary-data-row">
                <span class="summary-label">Questions:</span>
                <span class="summary-val" id="summary-questions">0 / 20</span>
              </div>
              <div class="summary-data-row">
                <span class="summary-label">Total Marks:</span>
                <span class="summary-val" id="summary-total-marks" style="color: #2563EB;">20</span>
              </div>
              <div class="summary-data-row">
                <span class="summary-label">Duration:</span>
                <span class="summary-val" id="summary-duration">30 minutes</span>
              </div>
              <div class="summary-data-row">
                <span class="summary-label">Passing Marks:</span>
                <span class="summary-val" id="summary-passing-marks">8</span>
              </div>
              <div class="summary-data-row">
                <span class="summary-label">Negative Marking:</span>
                <span class="summary-val" id="summary-neg-marking">Enabled (-0.25)</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1.25rem; border-top: 1px solid #E2E8F0; padding-top: 1rem;">
              <button type="button" class="btn btn-secondary" onclick="FacultyExams.saveDraft()" style="width: 100%; justify-content: center; font-weight: 600;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                <span>Save Draft</span>
              </button>

              <button type="button" class="btn btn-secondary" onclick="FacultyExams.openPreviewModal()" style="width: 100%; justify-content: center; font-weight: 600;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <span>Preview Exam</span>
              </button>

              <button type="button" class="btn btn-primary" onclick="FacultyExams.publishExam()" id="btn-publish-mcq-exam" style="width: 100%; justify-content: center; font-weight: 700; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35);">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Publish Exam</span>
              </button>

              <button type="button" class="btn btn-link btn-sm" onclick="FacultyExams.goToStep('config')" style="color: #64748B; margin-top: 0.25rem;">
                Edit Exam Configuration
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 3. STUDENT PREVIEW MODAL DOM
  // =========================================================================
  function renderStudentPreviewModal() {
    let modal = document.getElementById('student-preview-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'student-preview-modal';
      modal.className = 'modal-overlay';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-hidden', 'true');
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-dialog preview-modal-dialog">
        <div class="modal-header" style="background: #0F172A; color: #FFFFFF; border-bottom: 1px solid #1E293B;">
          <div>
            <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: #94A3B8;">Student Examination Preview Mode</div>
            <h3 class="modal-title" id="prev-modal-title" style="color: #FFFFFF; margin: 0.2rem 0 0 0;">Semester 4 Mid-Term Examination</h3>
          </div>
          <button type="button" class="toast-close" onclick="UI.closeModal('student-preview-modal')" style="color: #FFFFFF;">&times;</button>
        </div>

        <div class="modal-body" style="padding: 1.25rem 1.5rem;">
          <!-- Exam Meta Banner -->
          <div class="preview-exam-banner">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong id="prev-sub-code" style="color: #60A5FA;">CS402 – Database Management Systems</strong>
              <span id="prev-duration-pill" style="font-size: 0.78125rem; background: rgba(255,255,255,0.12); padding: 0.2rem 0.6rem; border-radius: 6px;">Time: 30 Minutes</span>
            </div>
            <div class="preview-meta-row">
              <span id="prev-total-marks">Total Marks: 20</span>
              <span id="prev-pass-marks">Passing Marks: 8</span>
              <span id="prev-neg-text">Negative Marking: -0.25</span>
            </div>
          </div>

          <!-- Question Box (Student Perspective) -->
          <div class="preview-question-box">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span style="font-size: 0.8125rem; font-weight: 700; color: #2563EB;" id="prev-q-number">Question 1 of 20</span>
              <span style="font-size: 0.75rem; color: #64748B;" id="prev-q-marks">1 Mark</span>
            </div>

            <div class="preview-q-title" id="prev-q-text">
              What is the time complexity of Binary Search?
            </div>

            <div class="preview-options-container" id="prev-options-container">
              <!-- Rendered as student options (no correct answer revealed) -->
            </div>
          </div>

          <!-- Bottom Navigation Bar -->
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button type="button" class="btn btn-secondary btn-sm" id="prev-btn-prev" onclick="FacultyExams.navigatePreview(-1)">
              Previous Question
            </button>
            <div style="font-size: 0.8125rem; color: #64748B;" id="prev-page-counter">
              1 / 20
            </div>
            <button type="button" class="btn btn-primary btn-sm" id="prev-btn-next" onclick="FacultyExams.navigatePreview(1)">
              Next Question
            </button>
          </div>
        </div>

        <div class="modal-footer" style="padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; background: #F8FAFC;">
          <span style="font-size: 0.78125rem; color: #64748B;">
            Correct answers are securely hidden in student preview mode.
          </span>
          <button type="button" class="btn btn-secondary" onclick="UI.closeModal('student-preview-modal')">Exit Preview</button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 4. WORKFLOW CONTROLLER
  // =========================================================================
  function setupEventListeners() {
    // Intercept header "+ Create New Exam / Test" button
    const createBtn = document.querySelector('.topbar-right button');
    if (createBtn) {
      createBtn.removeAttribute('onclick');
      createBtn.addEventListener('click', () => {
        UI.openModal('assessment-type-modal');
      });
    }

    // Exam Matrix Dropdown change listener
    const dropdown = document.getElementById('selected-exam-dropdown');
    if (dropdown) {
      dropdown.addEventListener('change', () => {
        updateMatrixTitleAndEvaluation();
      });
    }
  }

  function selectAssessmentType(type) {
    document.querySelectorAll('.assessment-type-card').forEach(c => c.classList.remove('selected'));
    const target = document.getElementById(`type-card-${type}`);
    if (target) {
      target.classList.add('selected');
      const radio = target.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    }
  }

  function openCreateExamModal() {
    UI.openModal('assessment-type-modal');
  }

  function proceedAssessmentType() {
    UI.closeModal('assessment-type-modal');
    switchViewTab('mcq-builder');
    startNewMCQExam();
  }

  function switchViewTab(tab) {
    activeTab = tab;
    const evalTabBtn = document.getElementById('tab-btn-evaluation');
    const mcqTabBtn = document.getElementById('tab-btn-mcq');
    const wizardWs = document.getElementById('mcq-wizard-workspace');
    const selectorCard = document.getElementById('exam-selector-card');
    const matrixCard = document.getElementById('exam-matrix-card');
    const evalCards = document.querySelectorAll('.app-content > div:not(.exam-view-tabs):not(.mcq-wizard-container)');

    if (tab === 'mcq-builder') {
      if (evalTabBtn) evalTabBtn.classList.remove('active');
      if (mcqTabBtn) mcqTabBtn.classList.add('active');
      if (selectorCard) selectorCard.style.display = 'none';
      if (matrixCard) matrixCard.style.display = 'none';
      evalCards.forEach(c => c.style.display = 'none');
      if (wizardWs) {
        wizardWs.style.display = 'flex';
        wizardWs.classList.add('active');
      }
      if (!currentExam) startNewMCQExam();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (evalTabBtn) evalTabBtn.classList.add('active');
      if (mcqTabBtn) mcqTabBtn.classList.remove('active');
      if (selectorCard) selectorCard.style.display = 'block';
      if (matrixCard) matrixCard.style.display = 'block';
      evalCards.forEach(c => c.style.display = 'block');
      if (wizardWs) {
        wizardWs.style.display = 'none';
        wizardWs.classList.remove('active');
      }
      refreshExamDropdown();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function startNewMCQExam() {
    currentExam = null;
    editingQuestionId = null;
    populateSubjectDropdown();
    goToStep('config');

    // Default dates
    const now = new Date();
    const later = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const formatDt = d => d.toISOString().slice(0, 16);

    document.getElementById('cfg-exam-name').value = 'Semester 4 Mid-Term MCQ Examination';
    document.getElementById('cfg-program').value = 'B.Tech';
    document.getElementById('cfg-semester').value = '4';
    document.getElementById('cfg-section').value = 'A';
    document.getElementById('cfg-total-questions').value = '20';
    document.getElementById('cfg-marks-per-q').value = '1';
    document.getElementById('cfg-total-marks').value = '20';
    document.getElementById('cfg-duration').value = '30';
    document.getElementById('cfg-passing-marks').value = '8';
    document.getElementById('cfg-start-time').value = formatDt(now);
    document.getElementById('cfg-end-time').value = formatDt(later);
    document.getElementById('cfg-enable-negative').checked = true;
    document.getElementById('cfg-negative-marks').value = '0.25';
    toggleNegativeMarking();

    onSubjectChange();
  }

  function populateSubjectDropdown() {
    const select = document.getElementById('cfg-subject');
    if (!select) return;

    const subjects = ExamService.getAuthorizedSubjects();
    select.innerHTML = subjects.map(s => `
      <option value="${s.code}">${s.code} — ${s.name} (${s.department || 'Computer Engineering'})</option>
    `).join('');
  }

  function onSubjectChange() {
    const select = document.getElementById('cfg-subject');
    const codeInput = document.getElementById('cfg-course-code');
    if (select && codeInput) {
      codeInput.value = select.value;
    }
  }

  function calcTotalMarks() {
    const totalQ = Number(document.getElementById('cfg-total-questions').value) || 0;
    const marksQ = Number(document.getElementById('cfg-marks-per-q').value) || 0;
    const total = totalQ * marksQ;
    document.getElementById('cfg-total-marks').value = total;

    // Adjust passing marks default to 40%
    const passInput = document.getElementById('cfg-passing-marks');
    if (passInput) {
      passInput.value = Math.max(1, Math.ceil(total * 0.4));
    }
  }

  function toggleNegativeMarking() {
    const enabled = document.getElementById('cfg-enable-negative').checked;
    const wrap = document.getElementById('cfg-neg-input-wrap');
    const input = document.getElementById('cfg-negative-marks');
    if (enabled) {
      wrap.style.opacity = '1';
      input.disabled = false;
    } else {
      wrap.style.opacity = '0.4';
      input.disabled = true;
      input.value = '0';
    }
  }

  function goToStep(step) {
    const configPanel = document.getElementById('step-panel-config');
    const questionsPanel = document.getElementById('step-panel-questions');
    const nodeConfig = document.getElementById('step-node-config');
    const nodeQuestions = document.getElementById('step-node-questions');
    const nodePreview = document.getElementById('step-node-preview');

    if (step === 'config') {
      configPanel.style.display = 'block';
      questionsPanel.style.display = 'none';
      nodeConfig.className = 'step-node active';
      nodeQuestions.className = 'step-node';
      nodePreview.className = 'step-node';
    } else if (step === 'questions') {
      configPanel.style.display = 'none';
      questionsPanel.style.display = 'block';
      nodeConfig.className = 'step-node completed';
      nodeQuestions.className = 'step-node active';
      nodePreview.className = 'step-node';
      renderSavedQuestionsList();
      updateSummarySidebar();
    }
  }

  async function handleConfigSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('cfg-exam-name').value.trim();
    const subjectCode = document.getElementById('cfg-subject').value;
    const program = document.getElementById('cfg-program').value.trim();
    const semester = Number(document.getElementById('cfg-semester').value) || 4;
    const section = document.getElementById('cfg-section').value;
    const totalQuestions = Number(document.getElementById('cfg-total-questions').value) || 20;
    const marksPerQuestion = Number(document.getElementById('cfg-marks-per-q').value) || 1;
    const duration = Number(document.getElementById('cfg-duration').value) || 30;
    const startDateTime = document.getElementById('cfg-start-time').value;
    const endDateTime = document.getElementById('cfg-end-time').value;
    const passingMarks = Number(document.getElementById('cfg-passing-marks').value) || 8;
    const negativeMarking = document.getElementById('cfg-enable-negative').checked;
    const negativeMarks = Number(document.getElementById('cfg-negative-marks').value) || 0;
    const instructions = document.getElementById('cfg-instructions').value.trim();

    const subjectObj = ExamService.getAuthorizedSubjects().find(s => s.code === subjectCode);

    try {
      if (!currentExam) {
        currentExam = await ExamService.createExam({
          name,
          title: name,
          type: 'mcq',
          subject: subjectObj ? subjectObj.name : subjectCode,
          subjectCode,
          courseCode: subjectCode,
          program,
          semester,
          section,
          totalQuestions,
          marksPerQuestion,
          totalMarks: totalQuestions * marksPerQuestion,
          duration,
          startDateTime,
          endDateTime,
          passingMarks,
          negativeMarking,
          negativeMarks,
          instructions,
          status: 'draft',
          questions: [
            {
              id: 'q_init_1',
              questionText: 'What is the time complexity of Binary Search in a sorted array?',
              options: {
                A: 'O(n)',
                B: 'O(log n)',
                C: 'O(n²)',
                D: 'O(1)'
              },
              correctAnswer: 'B',
              marks: marksPerQuestion,
              explanation: 'Binary Search halves the search space at each step, resulting in logarithmic time complexity.'
            },
            {
              id: 'q_init_2',
              questionText: 'Which protocol operates at the Transport Layer of the OSI Reference Model?',
              options: {
                A: 'IP (Internet Protocol)',
                B: 'TCP (Transmission Control Protocol)',
                C: 'HTTP (Hypertext Transfer Protocol)',
                D: 'Ethernet'
              },
              correctAnswer: 'B',
              marks: marksPerQuestion,
              explanation: 'TCP and UDP are foundational Transport Layer protocols.'
            }
          ]
        });
      } else {
        currentExam = await ExamService.updateExam(currentExam.id, {
          name,
          title: name,
          subject: subjectObj ? subjectObj.name : subjectCode,
          subjectCode,
          courseCode: subjectCode,
          program,
          semester,
          section,
          totalQuestions,
          marksPerQuestion,
          duration,
          startDateTime,
          endDateTime,
          passingMarks,
          negativeMarking,
          negativeMarks,
          instructions
        });
      }

      UI.showToast('success', 'Configuration Saved', 'MCQ parameters saved. Proceed to Question Builder.');
      goToStep('questions');
    } catch (err) {
      UI.showToast('error', 'Configuration Error', err.message);
    }
  }

  // =========================================================================
  // 5. QUESTION BUILDER OPERATIONS
  // =========================================================================
  function renderSavedQuestionsList() {
    const container = document.getElementById('saved-questions-container');
    const countEl = document.getElementById('saved-q-count');
    const targetStatus = document.getElementById('q-target-status');
    if (!container || !currentExam) return;

    const questions = currentExam.questions || [];
    countEl.textContent = questions.length;
    targetStatus.textContent = `Target: ${currentExam.totalQuestions || 20} Questions`;

    if (questions.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; color: #64748B; font-size: 0.84375rem; border: 1.5px dashed #CBD5E1; border-radius: 8px;">
          No questions created yet. Use the question editor above to add your first MCQ.
        </div>
      `;
      return;
    }

    container.innerHTML = questions.map((q, idx) => `
      <div class="saved-question-item" data-question-id="${q.id}">
        <div class="saved-q-header">
          <div class="saved-q-text">
            <span style="color: #2563EB;">Q${idx + 1}.</span> ${escapeHtml(q.questionText)}
          </div>
          <div style="display: flex; align-items: center; gap: 0.35rem; flex-shrink: 0;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="FacultyExams.editQuestion('${q.id}')" title="Edit Question" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
              Edit
            </button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="FacultyExams.deleteQuestion('${q.id}')" title="Delete Question" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; color: #DC2626;">
              Delete
            </button>
          </div>
        </div>

        <div class="saved-q-options-grid">
          <div class="saved-opt-pill ${q.correctAnswer === 'A' ? 'is-correct' : ''}">
            <strong>A.</strong> <span>${escapeHtml(q.options.A)}</span>
          </div>
          <div class="saved-opt-pill ${q.correctAnswer === 'B' ? 'is-correct' : ''}">
            <strong>B.</strong> <span>${escapeHtml(q.options.B)}</span>
          </div>
          <div class="saved-opt-pill ${q.correctAnswer === 'C' ? 'is-correct' : ''}">
            <strong>C.</strong> <span>${escapeHtml(q.options.C)}</span>
          </div>
          <div class="saved-opt-pill ${q.correctAnswer === 'D' ? 'is-correct' : ''}">
            <strong>D.</strong> <span>${escapeHtml(q.options.D)}</span>
          </div>
        </div>

        <div class="saved-q-meta">
          <span>Marks: <strong style="color: #0F172A;">${q.marks || 1}</strong></span>
          ${q.explanation ? `<span>• Explanation: <em>${escapeHtml(q.explanation)}</em></span>` : ''}
        </div>
      </div>
    `).join('');
  }

  function updateSummarySidebar() {
    if (!currentExam) return;
    document.getElementById('summary-exam-name').textContent = currentExam.name || 'Untitled';
    document.getElementById('summary-subject').textContent = `${currentExam.subjectCode} – ${currentExam.subject}`;
    document.getElementById('summary-prog-sem').textContent = `${currentExam.program || 'B.Tech'} (Sem ${currentExam.semester || 4})`;
    document.getElementById('summary-section').textContent = `Sec ${currentExam.section || 'A'}`;
    document.getElementById('summary-questions').textContent = `${(currentExam.questions || []).length} / ${currentExam.totalQuestions || 20}`;
    document.getElementById('summary-total-marks').textContent = `${currentExam.totalMarks || 20} Marks`;
    document.getElementById('summary-duration').textContent = `${currentExam.duration || 30} minutes`;
    document.getElementById('summary-passing-marks').textContent = `${currentExam.passingMarks || 8} Marks`;
    document.getElementById('summary-neg-marking').textContent = currentExam.negativeMarking
      ? `Enabled (-${currentExam.negativeMarks || 0.25})`
      : 'Disabled (0.00)';

    const badge = document.getElementById('summary-status-badge');
    badge.textContent = currentExam.status === 'published' ? 'Published' : 'Draft';
    badge.className = `badge ${currentExam.status === 'published' ? 'badge-success' : 'badge-primary'}`;
  }

  async function handleSaveQuestion(e) {
    e.preventDefault();
    if (!currentExam) return;

    const editId = document.getElementById('q-edit-id').value;
    const text = document.getElementById('q-text').value.trim();
    const optA = document.getElementById('q-opt-A').value.trim();
    const optB = document.getElementById('q-opt-B').value.trim();
    const optC = document.getElementById('q-opt-C').value.trim();
    const optD = document.getElementById('q-opt-D').value.trim();
    const marks = Number(document.getElementById('q-marks').value) || 1;
    const explanation = document.getElementById('q-explanation').value.trim();
    const selectedRadio = document.querySelector('input[name="correct-option-radio"]:checked');
    const correctAnswer = selectedRadio ? selectedRadio.value : 'A';

    const questionData = {
      questionText: text,
      options: { A: optA, B: optB, C: optC, D: optD },
      correctAnswer,
      marks,
      explanation
    };

    try {
      if (editId) {
        await ExamService.updateQuestion(currentExam.id, editId, questionData);
        UI.showToast('info', 'Question Updated', 'Question details updated.');
      } else {
        await ExamService.addQuestion(currentExam.id, questionData);
        UI.showToast('success', 'Question Added', 'New question added to exam question bank.');
      }

      currentExam = ExamService.getExam(currentExam.id);
      resetQuestionForm();
      renderSavedQuestionsList();
      updateSummarySidebar();
    } catch (err) {
      UI.showToast('error', 'Validation Error', err.message);
    }
  }

  function editQuestion(questionId) {
    if (!currentExam) return;
    const q = (currentExam.questions || []).find(x => x.id === questionId);
    if (!q) return;

    editingQuestionId = questionId;
    document.getElementById('q-edit-id').value = q.id;
    document.getElementById('q-text').value = q.questionText;
    document.getElementById('q-opt-A').value = q.options.A || '';
    document.getElementById('q-opt-B').value = q.options.B || '';
    document.getElementById('q-opt-C').value = q.options.C || '';
    document.getElementById('q-opt-D').value = q.options.D || '';
    document.getElementById('q-marks').value = q.marks || 1;
    document.getElementById('q-explanation').value = q.explanation || '';

    const radio = document.querySelector(`input[name="correct-option-radio"][value="${q.correctAnswer}"]`);
    if (radio) radio.checked = true;

    document.getElementById('btn-save-question').innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      <span>Update Question</span>
    `;

    document.getElementById('question-builder-heading').textContent = 'Edit Question';
    document.getElementById('q-text').focus();
  }

  async function deleteQuestion(questionId) {
    if (!confirm('Are you sure you want to delete this question?')) return;
    try {
      await ExamService.deleteQuestion(currentExam.id, questionId);
      currentExam = ExamService.getExam(currentExam.id);
      renderSavedQuestionsList();
      updateSummarySidebar();
      UI.showToast('info', 'Question Deleted', 'Question removed from examination.');
    } catch (err) {
      UI.showToast('error', 'Delete Failed', err.message);
    }
  }

  function resetQuestionForm() {
    editingQuestionId = null;
    document.getElementById('mcq-question-form').reset();
    document.getElementById('q-edit-id').value = '';
    const firstRadio = document.querySelector('input[name="correct-option-radio"][value="A"]');
    if (firstRadio) firstRadio.checked = true;

    document.getElementById('btn-save-question').innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      <span>Save Question</span>
    `;
    document.getElementById('question-builder-heading').textContent = 'Create Questions';
    const nextQNum = (currentExam && currentExam.questions) ? currentExam.questions.length + 1 : 1;
    document.getElementById('q-counter-label').textContent = `Question ${nextQNum} of ${currentExam ? currentExam.totalQuestions : 20}`;
  }

  // =========================================================================
  // 6. STUDENT PREVIEW MODE
  // =========================================================================
  function openPreviewModal() {
    if (!currentExam) return;
    const questions = currentExam.questions || [];
    if (questions.length === 0) {
      UI.showToast('warning', 'No Questions', 'Add at least one question before previewing.');
      return;
    }

    previewQuestionIndex = 0;
    document.getElementById('prev-modal-title').textContent = currentExam.name || 'Examination';
    document.getElementById('prev-sub-code').textContent = `${currentExam.subjectCode} – ${currentExam.subject}`;
    document.getElementById('prev-duration-pill').textContent = `Time: ${currentExam.duration} Minutes`;
    document.getElementById('prev-total-marks').textContent = `Total Marks: ${currentExam.totalMarks}`;
    document.getElementById('prev-pass-marks').textContent = `Passing Marks: ${currentExam.passingMarks}`;
    document.getElementById('prev-neg-text').textContent = currentExam.negativeMarking
      ? `Negative Marking: -${currentExam.negativeMarks}`
      : 'No Negative Marking';

    renderCurrentPreviewQuestion();
    UI.openModal('student-preview-modal');
  }

  function renderCurrentPreviewQuestion() {
    const questions = currentExam.questions || [];
    const q = questions[previewQuestionIndex];
    if (!q) return;

    document.getElementById('prev-q-number').textContent = `Question ${previewQuestionIndex + 1} of ${questions.length}`;
    document.getElementById('prev-q-marks').textContent = `${q.marks || 1} Mark${(q.marks || 1) > 1 ? 's' : ''}`;
    document.getElementById('prev-q-text').textContent = q.questionText;
    document.getElementById('prev-page-counter').textContent = `${previewQuestionIndex + 1} / ${questions.length}`;

    // Options as student radio buttons (DO NOT reveal correct answer!)
    const optsBox = document.getElementById('prev-options-container');
    optsBox.innerHTML = `
      <label class="preview-option-item">
        <input type="radio" name="preview-opt" value="A">
        <span><strong>A.</strong> ${escapeHtml(q.options.A)}</span>
      </label>
      <label class="preview-option-item">
        <input type="radio" name="preview-opt" value="B">
        <span><strong>B.</strong> ${escapeHtml(q.options.B)}</span>
      </label>
      <label class="preview-option-item">
        <input type="radio" name="preview-opt" value="C">
        <span><strong>C.</strong> ${escapeHtml(q.options.C)}</span>
      </label>
      <label class="preview-option-item">
        <input type="radio" name="preview-opt" value="D">
        <span><strong>D.</strong> ${escapeHtml(q.options.D)}</span>
      </label>
    `;

    document.getElementById('prev-btn-prev').disabled = (previewQuestionIndex === 0);
    document.getElementById('prev-btn-next').disabled = (previewQuestionIndex === questions.length - 1);
  }

  function navigatePreview(direction) {
    const questions = currentExam.questions || [];
    previewQuestionIndex += direction;
    if (previewQuestionIndex < 0) previewQuestionIndex = 0;
    if (previewQuestionIndex >= questions.length) previewQuestionIndex = questions.length - 1;
    renderCurrentPreviewQuestion();
  }

  // =========================================================================
  // 7. SAVE DRAFT & PUBLISH
  // =========================================================================
  async function saveDraft() {
    if (!currentExam) return;
    try {
      await ExamService.updateExam(currentExam.id, { status: 'draft' });
      currentExam = ExamService.getExam(currentExam.id);
      updateSummarySidebar();
      refreshExamDropdown();
      UI.showToast('info', 'Draft Saved', `"${currentExam.name}" saved as draft.`);
    } catch (err) {
      UI.showToast('error', 'Save Failed', err.message);
    }
  }

  async function publishExam() {
    if (!currentExam) return;
    try {
      await ExamService.publishExam(currentExam.id);
      currentExam = ExamService.getExam(currentExam.id);
      updateSummarySidebar();
      refreshExamDropdown();

      UI.showToast('success', 'Exam Published', `"${currentExam.name}" is published and live for students!`);

      // Switch to Marks Evaluation view and select this exam
      switchViewTab('evaluation');
      const dropdown = document.getElementById('selected-exam-dropdown');
      if (dropdown) {
        dropdown.value = currentExam.id;
        dropdown.dispatchEvent(new Event('change'));
      }
    } catch (err) {
      UI.showToast('error', 'Cannot Publish Exam', err.message);
    }
  }

  // =========================================================================
  // 8. EVALUATION & MARKS MATRIX INTEGRATION (F27)
  // =========================================================================
  function refreshExamDropdown(selectId) {
    if (typeof window.refreshF27Matrix === 'function') {
      window.refreshF27Matrix(selectId);
      return;
    }

    const dropdown = document.getElementById('selected-exam-dropdown');
    if (!dropdown) return;

    const exams = ExamService.getExams();
    const currentVal = selectId || dropdown.value;

    dropdown.innerHTML = exams.map(e => {
      const isMcq = e.type === 'mcq';
      const typeLabel = isMcq ? '[MCQ]' : '[Standard]';
      const statusLabel = e.status === 'published' ? 'Published' : (e.status === 'evaluated' ? 'Evaluated' : 'Draft');
      return `
        <option value="${e.id}">
          ${typeLabel} ${e.name || e.title} (${e.subjectCode || e.courseCode} • Max: ${e.totalMarks || e.maxMarks || 25} • ${statusLabel})
        </option>
      `;
    }).join('');

    if (currentVal && exams.some(e => e.id === currentVal)) {
      dropdown.value = currentVal;
    }
    updateMatrixTitleAndEvaluation();
  }

  function updateMatrixTitleAndEvaluation() {
    const dropdown = document.getElementById('selected-exam-dropdown');
    if (!dropdown) return;

    const selectedId = dropdown.value;
    const exam = ExamService.getExam(selectedId);
    if (!exam) return;

    const titleEl = document.getElementById('marks-matrix-title');
    const isMcq = exam.type === 'mcq';

    if (titleEl) {
      titleEl.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        <span>${escapeHtml(exam.name || exam.title)} (${exam.subjectCode} • Max Marks: ${exam.totalMarks || exam.maxMarks || 25})</span>
        ${isMcq ? `<span class="mcq-status-badge">MCQ Assessment</span>` : ''}
      `;
    }

    // Add simulation / auto-evaluation button in table actions if MCQ
    const simBtn = document.getElementById('btn-auto-evaluate-mcq');
    if (simBtn) {
      simBtn.style.display = isMcq ? 'inline-flex' : 'none';
      simBtn.onclick = () => runMCQAutoEvaluation();
    }
  }

  async function runMCQAutoEvaluation() {
    const dropdown = document.getElementById('selected-exam-dropdown');
    const selectedId = dropdown ? dropdown.value : null;
    if (!selectedId) return;

    try {
      UI.showToast('info', 'Processing Submissions', 'Simulating student attempts and evaluating MCQ scores...');
      const updated = await ExamService.simulateStudentSubmissions(selectedId);
      UI.showToast('success', 'Auto-Evaluation Complete', `Evaluated ${updated.evaluatedCount} student submissions with automatic grading.`);

      // Trigger table reload
      if (dropdown) dropdown.dispatchEvent(new Event('change'));
    } catch (err) {
      UI.showToast('error', 'Evaluation Failed', err.message);
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Export public interface
  window.FacultyExams = {
    openCreateExamModal,
    selectAssessmentType,
    proceedAssessmentType,
    switchViewTab,
    startNewMCQExam,
    onSubjectChange,
    calcTotalMarks,
    toggleNegativeMarking,
    goToStep,
    handleConfigSubmit,
    handleSaveQuestion,
    editQuestion,
    deleteQuestion,
    resetQuestionForm,
    openPreviewModal,
    navigatePreview,
    saveDraft,
    publishExam,
    runMCQAutoEvaluation
  };
})();

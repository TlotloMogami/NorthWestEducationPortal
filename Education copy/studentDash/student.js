const studentPage = document.documentElement.getAttribute("data-page");

if (studentPage === "student-dashboard") {
  const studentNameInput = document.getElementById("student-name");
  const studentGradeSelect = document.getElementById("student-grade");
  const taskList = document.getElementById("student-task-list");
  const upcomingList = document.getElementById("upcoming-list");
  const dueMetric = document.getElementById("student-due");
  const completeMetric = document.getElementById("student-complete");
  const averageMetric = document.getElementById("student-average");
  const downloadReport = document.getElementById("download-report");
  const downloadSubmissions = document.getElementById("download-submissions");

  const getAssignments = () => JSON.parse(localStorage.getItem("assignments") || "[]");
  const getSubmissions = () => JSON.parse(localStorage.getItem("submissions") || "[]");
  const saveSubmissions = (items) => localStorage.setItem("submissions", JSON.stringify(items));

  const getProfile = () => JSON.parse(localStorage.getItem("student-profile") || "{}");
  const saveProfile = (profile) => localStorage.setItem("student-profile", JSON.stringify(profile));

  const setDefaults = () => {
    const profile = getProfile();
    if (studentNameInput && profile.name) studentNameInput.value = profile.name;
    if (studentGradeSelect && profile.grade) studentGradeSelect.value = profile.grade;
  };

  const getFilteredAssignments = () => {
    const grade = studentGradeSelect?.value || "Grade 10";
    return getAssignments().filter((task) => task.grade === grade);
  };

  const renderTasks = () => {
    if (!taskList) return;
    const assignments = getFilteredAssignments();
    const submissions = getSubmissions();
    taskList.innerHTML = "";
    if (!assignments.length) {
      taskList.innerHTML = "<p class='hint'>No tasks for your grade yet.</p>";
      return;
    }
    assignments.forEach((task) => {
      const submitted = submissions.find((sub) => sub.assignmentId === task.id);
      const statusClass = submitted ? "status-pill" : "status-pill pending";
      const statusLabel = submitted ? "Submitted" : "Pending";
      const card = document.createElement("div");
      card.className = "task-card";
      card.innerHTML = `
        <div class="task-header">
          <strong>${task.title}</strong>
          <span class="task-tag">${task.type}</span>
        </div>
        <div class="task-meta">
          <div><strong>Subject:</strong> ${task.subject}</div>
          <div><strong>Due:</strong> ${task.dueDate}</div>
          <div><strong>Points:</strong> ${task.points}</div>
        </div>
        <p class="hint">${task.instructions}</p>
        <label>
          Your Notes
          <textarea rows="3" data-notes="${task.id}" placeholder="Write a short response..."></textarea>
        </label>
        <label class="upload-field">
          Upload file
          <input type="file" data-file="${task.id}" />
        </label>
        <div class="task-actions">
          <span class="${statusClass}">${statusLabel}</span>
          <button class="btn gradient small" data-submit="${task.id}">Submit</button>
        </div>
      `;
      card.querySelector("button")?.addEventListener("click", () => handleSubmit(task.id));
      taskList.appendChild(card);
    });
  };

  const renderUpcoming = () => {
    if (!upcomingList) return;
    const assignments = getFilteredAssignments();
    const now = new Date();
    const upcoming = assignments
      .filter((task) => new Date(task.dueDate) >= now)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 4);

    upcomingList.innerHTML = "";
    if (!upcoming.length) {
      upcomingList.innerHTML = "<p class='hint'>No upcoming tasks.</p>";
      return;
    }

    upcoming.forEach((task) => {
      const item = document.createElement("div");
      item.className = "upcoming-item";
      item.innerHTML = `
        <div>
          <strong>${task.title}</strong>
          <p class="hint">${task.subject} • ${task.type}</p>
        </div>
        <span class="task-tag">${task.dueDate}</span>
      `;
      upcomingList.appendChild(item);
    });
  };

  const renderMetrics = () => {
    const assignments = getFilteredAssignments();
    const submissions = getSubmissions();
    const now = new Date();
    const dueCount = assignments.filter((task) => new Date(task.dueDate) >= now).length;
    const completed = submissions.filter((sub) => assignments.some((task) => task.id === sub.assignmentId)).length;
    const average = submissions.length
      ? Math.round(
          submissions.reduce((sum, item) => sum + (item.score || 70), 0) / submissions.length
        )
      : 0;
    if (dueMetric) dueMetric.textContent = dueCount.toString();
    if (completeMetric) completeMetric.textContent = completed.toString();
    if (averageMetric) averageMetric.textContent = `${average}%`;
  };

  const handleSubmit = (taskId) => {
    const name = studentNameInput?.value?.trim();
    const grade = studentGradeSelect?.value;
    if (!name) {
      showToast("Please enter your name before submitting.");
      return;
    }
    const notesInput = document.querySelector(`textarea[data-notes='${taskId}']`);
    const fileInput = document.querySelector(`input[data-file='${taskId}']`);
    const notes = notesInput?.value || "";
    const fileName = fileInput?.files?.[0]?.name || "No file";
    const assignments = getAssignments();
    const task = assignments.find((item) => item.id === taskId);
    if (!task) return;

    const submissions = getSubmissions();
    const existing = submissions.find((sub) => sub.assignmentId === taskId);
    if (existing) {
      existing.notes = notes;
      existing.fileName = fileName;
      existing.submittedAt = new Date().toISOString();
    } else {
      submissions.push({
        assignmentId: taskId,
        title: task.title,
        type: task.type,
        subject: task.subject,
        grade: grade,
        studentName: name,
        notes,
        fileName,
        submittedAt: new Date().toISOString(),
        score: Math.floor(60 + Math.random() * 30),
      });
    }
    saveSubmissions(submissions);
    saveProfile({ name, grade });
    renderTasks();
    renderMetrics();
    showToast("Submission saved.");
  };

  const downloadReportFile = () => {
    const profile = getProfile();
    const assignments = getFilteredAssignments();
    const submissions = getSubmissions();
    const lines = [
      `Student Report for ${profile.name || "Student"}`,
      `Grade: ${profile.grade || "N/A"}`,
      "",
      "Assignments:",
      ...assignments.map((task) => {
        const sub = submissions.find((s) => s.assignmentId === task.id);
        return `- ${task.title} (${task.type}) | Due ${task.dueDate} | ${sub ? "Submitted" : "Pending"}`;
      }),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "student-report.txt";
    link.click();
  };

  const downloadSubmissionsFile = () => {
    const submissions = getSubmissions();
    const rows = [["title", "type", "subject", "grade", "submittedAt", "score"]];
    submissions.forEach((item) => {
      rows.push([item.title, item.type, item.subject, item.grade, item.submittedAt, item.score]);
    });
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "student-submissions.csv";
    link.click();
  };

  studentNameInput?.addEventListener("change", () => {
    saveProfile({ name: studentNameInput.value, grade: studentGradeSelect?.value });
  });

  studentGradeSelect?.addEventListener("change", () => {
    saveProfile({ name: studentNameInput?.value || "", grade: studentGradeSelect?.value });
    renderTasks();
    renderUpcoming();
    renderMetrics();
  });

  downloadReport?.addEventListener("click", downloadReportFile);
  downloadSubmissions?.addEventListener("click", downloadSubmissionsFile);

  setDefaults();
  renderTasks();
  renderUpcoming();
  renderMetrics();
}

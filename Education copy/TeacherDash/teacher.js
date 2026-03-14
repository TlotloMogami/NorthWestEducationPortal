const teacherPage = document.documentElement.getAttribute("data-page");

if (teacherPage === "teacher-dashboard") {
  const form = document.getElementById("task-form");
  const taskList = document.getElementById("teacher-task-list");
  const submissionList = document.getElementById("submission-list");
  const dueMetric = document.getElementById("teacher-due");
  const pendingMetric = document.getElementById("teacher-pending");
  const exportAssignments = document.getElementById("export-assignments");
  const exportSummary = document.getElementById("export-summary");

  const getAssignments = () => JSON.parse(localStorage.getItem("assignments") || "[]");
  const getSubmissions = () => JSON.parse(localStorage.getItem("submissions") || "[]");

  const saveAssignments = (items) => localStorage.setItem("assignments", JSON.stringify(items));

  const renderAssignments = () => {
    if (!taskList) return;
    const assignments = getAssignments();
    taskList.innerHTML = "";
    if (!assignments.length) {
      taskList.innerHTML = "<p class='hint'>No tasks created yet.</p>";
      return;
    }

    assignments.forEach((task) => {
      const card = document.createElement("div");
      card.className = "task-card";
      card.innerHTML = `
        <div class="task-header">
          <strong>${task.title}</strong>
          <span class="task-tag">${task.type}</span>
        </div>
        <div class="task-meta">
          <div><strong>Subject:</strong> ${task.subject}</div>
          <div><strong>Grade:</strong> ${task.grade}</div>
          <div><strong>Class:</strong> ${task.classGroup}</div>
          <div><strong>Due:</strong> ${task.dueDate}</div>
          <div><strong>Points:</strong> ${task.points}</div>
        </div>
        <p class="hint">${task.instructions}</p>
        <div class="task-actions">
          <button class="btn ghost small" data-id="${task.id}">Remove</button>
        </div>
      `;
      card.querySelector("button")?.addEventListener("click", () => {
        const updated = getAssignments().filter((item) => item.id !== task.id);
        saveAssignments(updated);
        renderAssignments();
        renderMetrics();
      });
      taskList.appendChild(card);
    });
  };

  const renderSubmissions = () => {
    if (!submissionList) return;
    const submissions = getSubmissions();
    submissionList.innerHTML = "";
    if (!submissions.length) {
      submissionList.innerHTML = "<p class='hint'>No submissions received yet.</p>";
      return;
    }
    submissions.slice(0, 6).forEach((submission) => {
      const card = document.createElement("div");
      card.className = "task-card";
      card.innerHTML = `
        <div class="task-header">
          <strong>${submission.title}</strong>
          <span class="task-tag">${submission.type}</span>
        </div>
        <div class="task-meta">
          <div><strong>Student:</strong> ${submission.studentName}</div>
          <div><strong>Grade:</strong> ${submission.grade}</div>
          <div><strong>Submitted:</strong> ${new Date(submission.submittedAt).toLocaleDateString()}</div>
        </div>
        <p class="hint">${submission.notes || "No notes provided."}</p>
      `;
      submissionList.appendChild(card);
    });
  };

  const renderMetrics = () => {
    const assignments = getAssignments();
    const submissions = getSubmissions();
    const now = new Date();
    const dueCount = assignments.filter((task) => new Date(task.dueDate) >= now).length;
    const pending = Math.max(assignments.length - submissions.length, 0);
    if (dueMetric) dueMetric.textContent = dueCount.toString();
    if (pendingMetric) pendingMetric.textContent = pending.toString();
  };

  const exportCsv = () => {
    const assignments = getAssignments();
    const rows = [["title", "type", "subject", "grade", "classGroup", "dueDate", "points"]];
    assignments.forEach((task) => {
      rows.push([task.title, task.type, task.subject, task.grade, task.classGroup, task.dueDate, task.points]);
    });
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "teacher-assignments.csv";
    link.click();
  };

  const exportSummaryReport = () => {
    const assignments = getAssignments();
    const submissions = getSubmissions();
    const lines = [
      "Teacher Summary Report",
      `Total assignments: ${assignments.length}`,
      `Total submissions: ${submissions.length}`,
      "",
      "Assignments:",
      ...assignments.map((task) => `- ${task.title} (${task.type}) | ${task.grade} ${task.classGroup} | Due ${task.dueDate}`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "teacher-summary.txt";
    link.click();
  };

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const task = {
      id: `TASK-${Math.floor(100000 + Math.random() * 900000)}`,
      title: data.get("title"),
      type: data.get("type"),
      subject: data.get("subject"),
      grade: data.get("grade"),
      classGroup: data.get("classGroup"),
      dueDate: data.get("dueDate"),
      points: data.get("points"),
      instructions: data.get("instructions"),
      createdAt: new Date().toISOString(),
    };
    const assignments = getAssignments();
    assignments.unshift(task);
    saveAssignments(assignments);
    form.reset();
    renderAssignments();
    renderMetrics();
    showToast("Task published for students.");
  });

  exportAssignments?.addEventListener("click", exportCsv);
  exportSummary?.addEventListener("click", exportSummaryReport);

  renderAssignments();
  renderSubmissions();
  renderMetrics();
}

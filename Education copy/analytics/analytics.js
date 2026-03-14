const analyticsPage = document.documentElement.getAttribute("data-page");

if (analyticsPage === "analytics") {
  const attendanceBars = document.getElementById("attendance-bars");
  const subjectBars = document.getElementById("subject-bars");
  const assessmentBars = document.getElementById("assessment-bars");
  const gradeBody = document.getElementById("grade-subject-body");
  const yearFilter = document.getElementById("year-filter");
  const termFilter = document.getElementById("term-filter");
  const districtFilter = document.getElementById("district-filter");
  const gradeFilter = document.getElementById("grade-filter");
  const exportCsvBtn = document.getElementById("export-csv");
  const importCsvInput = document.getElementById("import-csv");
  const exportPdfBtn = document.getElementById("export-pdf");
  const aiBox = document.getElementById("ai-feedback");
  const aiRefresh = document.getElementById("ai-refresh");
  const donut = document.getElementById("assessment-donut");
  const donutTotal = document.getElementById("donut-total");
  const trendCanvas = document.getElementById("attendance-trend");
  const lastUpdated = document.getElementById("last-updated");
  const topGradeName = document.getElementById("top-grade-name");
  const topGradeScore = document.getElementById("top-grade-score");
  const supportSubject = document.getElementById("support-subject");
  const supportScore = document.getElementById("support-score");
  const attendanceRiskGrade = document.getElementById("attendance-risk-grade");
  const attendanceRiskScore = document.getElementById("attendance-risk-score");
  const chatbotToggle = document.querySelector(".chatbot-toggle");
  const chatbotPanel = document.querySelector(".chatbot-panel");
  const chatbotClose = document.querySelector(".chatbot-close");
  const chatbotForm = document.getElementById("chatbot-form");
  const chatbotText = document.getElementById("chatbot-text");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const tabs = document.querySelectorAll(".tab");
  const navLinks = document.querySelectorAll(".analytics-nav a[href^='#']");

  const baseData = {
    attendanceByGrade: [
      { grade: "Grade 1", value: 92 },
      { grade: "Grade 2", value: 90 },
      { grade: "Grade 3", value: 88 },
      { grade: "Grade 4", value: 86 },
      { grade: "Grade 5", value: 84 },
      { grade: "Grade 6", value: 82 },
      { grade: "Grade 7", value: 81 },
      { grade: "Grade 8", value: 79 },
      { grade: "Grade 9", value: 78 },
      { grade: "Grade 10", value: 76 },
      { grade: "Grade 11", value: 74 },
      { grade: "Grade 12", value: 72 },
    ],
    gradeSubject: [
      { grade: "Grade 1", Technology: 68, Biology: 64, Economics: 60, Accounting: 62 },
      { grade: "Grade 2", Technology: 69, Biology: 65, Economics: 61, Accounting: 63 },
      { grade: "Grade 3", Technology: 70, Biology: 66, Economics: 62, Accounting: 64 },
      { grade: "Grade 4", Technology: 71, Biology: 67, Economics: 63, Accounting: 65 },
      { grade: "Grade 5", Technology: 72, Biology: 68, Economics: 64, Accounting: 66 },
      { grade: "Grade 6", Technology: 73, Biology: 69, Economics: 65, Accounting: 67 },
      { grade: "Grade 7", Technology: 74, Biology: 70, Economics: 66, Accounting: 68 },
      { grade: "Grade 8", Technology: 70, Biology: 68, Economics: 72, Accounting: 75 },
      { grade: "Grade 9", Technology: 73, Biology: 70, Economics: 69, Accounting: 71 },
      { grade: "Grade 10", Technology: 76, Biology: 74, Economics: 67, Accounting: 70 },
      { grade: "Grade 11", Technology: 78, Biology: 76, Economics: 71, Accounting: 73 },
      { grade: "Grade 12", Technology: 82, Biology: 79, Economics: 74, Accounting: 77 },
    ],
  };

  const districtFactor = {
    All: 0,
    "Dr Kenneth Kaunda": 2,
    "Dr Ruth Segomotsi Mompati": -1,
    "Ngaka Modiri Molema": 1,
  };

  const termFactor = { "1": 0, "2": 1, "3": -1, "4": 2 };
  const yearFactor = { "2026": 0, "2025": -1, "2024": -2 };

  const clamp = (value, min = 55, max = 98) => Math.max(min, Math.min(max, Math.round(value)));

  const applyFactors = (value, factors) => clamp(value + factors);

  const getFilters = () => ({
    year: yearFilter?.value || "2026",
    term: termFilter?.value || "1",
    district: districtFilter?.value || "All",
    grade: gradeFilter?.value || "All",
  });

  const buildData = (filters, override) => {
    if (override && override.attendanceByGrade?.length) {
      return {
        attendanceByGrade: override.attendanceByGrade.length
          ? override.attendanceByGrade
          : baseData.attendanceByGrade,
        subjects: override.subjects.length ? override.subjects : baseData.subjects,
        assessments: override.assessments.length ? override.assessments : baseData.assessments,
        gradeSubject: override.gradeSubject.length ? override.gradeSubject : baseData.gradeSubject,
      };
    }
    const offset =
      (districtFactor[filters.district] || 0) +
      (termFactor[filters.term] || 0) +
      (yearFactor[filters.year] || 0);

    const attendanceByGrade = baseData.attendanceByGrade
      .map((item) => ({
        ...item,
        value: applyFactors(item.value, offset - (item.grade.includes("Grade 12") ? 1 : 0)),
      }))
      .filter((item) => filters.grade === "All" || item.grade === filters.grade);

    const gradeSubject = baseData.gradeSubject
      .map((row) => ({
        grade: row.grade,
        Technology: applyFactors(row.Technology, offset + 1),
        Biology: applyFactors(row.Biology, offset),
        Economics: applyFactors(row.Economics, offset - 2),
        Accounting: applyFactors(row.Accounting, offset),
      }))
      .filter((row) => filters.grade === "All" || row.grade === filters.grade);

    const subjectLabels = ["Technology", "Biology", "Economics", "Accounting"];
    const subjects = gradeSubject.length
      ? subjectLabels.map((label) => ({
          label,
          value: avg(gradeSubject.map((row) => row[label])),
        }))
      : [
          { label: "Technology", value: 0 },
          { label: "Biology", value: 0 },
          { label: "Economics", value: 0 },
          { label: "Accounting", value: 0 },
        ];

    const subjectAvg = avg(subjects);
    const assessments = [
      { label: "Assessments", value: clamp(subjectAvg + 1) },
      { label: "Assignments", value: clamp(subjectAvg + 4) },
      { label: "Homework", value: clamp(subjectAvg - 2) },
    ];

    return { attendanceByGrade, subjects, assessments, gradeSubject };
  };

  const renderBars = (container, items) => {
    if (!container) return;
    container.innerHTML = "";
    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "bar-row";
      row.style.setProperty("--value", "0%");
      row.innerHTML = `
        <div class="bar-label">${item.label || item.grade}</div>
        <div class="bar-track"><div class="bar-fill"></div></div>
        <div class="bar-value">${item.value}%</div>
      `;
      container.appendChild(row);
      requestAnimationFrame(() => {
        row.style.setProperty("--value", `${item.value}%`);
      });
    });
  };

  const avg = (items) => {
    if (!items.length) return 0;
    return Math.round(items.reduce((sum, item) => sum + item.value, 0) / items.length);
  };

  const setMetric = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = `${value}%`;
  };

  const renderDonut = (assessments) => {
    if (!donut || !donutTotal) return;
    const total = assessments.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) {
      donut.style.background = "conic-gradient(#e5e7eb 0deg 360deg)";
      donutTotal.textContent = "0%";
      return;
    }
    const segments = assessments.map((item) => Math.round((item.value / total) * 360));
    const [a, b, c] = segments;
    donut.style.background = `conic-gradient(#1b5e46 0deg ${a}deg, #f2b44b ${a}deg ${
      a + b
    }deg, #3f8c6c ${a + b}deg 360deg)`;
    donutTotal.textContent = `${avg(assessments)}%`;
  };

  const renderTrend = (attendance) => {
    if (!trendCanvas) return;
    const ctx = trendCanvas.getContext("2d");
    const rect = trendCanvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    trendCanvas.width = rect.width * dpr;
    trendCanvas.height = 180 * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    const width = rect.width;
    const height = 180;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i += 1) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    const step = attendance.length > 1 ? width / (attendance.length - 1) : 0;
    const points = attendance.map((item, index) => ({
      x: attendance.length > 1 ? step * index : width / 2,
      y: height - (item.value / 100) * height,
    }));
    ctx.strokeStyle = "#1b5e46";
    ctx.lineWidth = 3;
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
    ctx.fillStyle = "#f2b44b";
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const renderAI = (data) => {
    if (!aiBox) return;
    const attendanceAvg = avg(data.attendanceByGrade);
    const econ = data.subjects.find((item) => item.label === "Economics")?.value || 0;
    const homework = data.assessments.find((item) => item.label === "Homework")?.value || 0;
    const insights = [];

    insights.push({
      title: "Attendance Focus",
      body:
        attendanceAvg < 80
          ? "Attendance is below target. Schedule parent engagement and monitor absences weekly."
          : "Attendance is stable. Maintain current attendance incentives and weekly monitoring.",
    });

    insights.push({
      title: "Subject Intervention",
      body:
        econ < 70
          ? "Economics performance is lagging. Recommend targeted revision sessions and peer tutoring."
          : "Economics is on track. Continue with quarterly diagnostics and revision packs.",
    });

    insights.push({
      title: "Homework Completion",
      body:
        homework < 75
          ? "Homework completion is slipping. Reinforce homework check-ins and parent reminders."
          : "Homework completion is strong. Keep the weekly tracking routine.",
    });

    aiBox.innerHTML = "";
    insights.forEach((item) => {
      const card = document.createElement("div");
      card.className = "feedback-item";
      card.innerHTML = `<strong>${item.title}</strong><span>${item.body}</span>`;
      aiBox.appendChild(card);
    });
  };

  const updateInsights = (data) => {
    if (!data.attendanceByGrade.length) return;
    const topAttendance = data.attendanceByGrade.reduce((prev, curr) => (curr.value > prev.value ? curr : prev));
    if (topGradeName) topGradeName.textContent = topAttendance.grade;
    if (topGradeScore) topGradeScore.textContent = `${topAttendance.value}%`;

    if (data.gradeSubject.length) {
      const econRow = data.gradeSubject.reduce((prev, curr) =>
        curr.Economics < prev.Economics ? curr : prev
      );
      if (supportSubject) supportSubject.textContent = `Economics (${econRow.grade})`;
      if (supportScore) supportScore.textContent = `${econRow.Economics}%`;
    }

    const riskAttendance = data.attendanceByGrade.reduce((prev, curr) =>
      curr.value < prev.value ? curr : prev
    );
    if (attendanceRiskGrade) attendanceRiskGrade.textContent = riskAttendance.grade;
    if (attendanceRiskScore) attendanceRiskScore.textContent = `${riskAttendance.value}%`;
  };

  const renderAll = () => {
    const filters = getFilters();
    const custom = JSON.parse(localStorage.getItem("analytics-custom") || "null");
    const data = buildData(filters, custom);

    renderBars(attendanceBars, data.attendanceByGrade);
    renderBars(subjectBars, data.subjects);
    renderBars(assessmentBars, data.assessments);
    renderDonut(data.assessments);
    renderTrend(data.attendanceByGrade);

    setMetric("overall-attendance", avg(data.attendanceByGrade));
    setMetric("overall-assessments", data.assessments[0].value);
    setMetric("overall-assignments", data.assessments[1].value);
    setMetric("overall-homework", data.assessments[2].value);

    renderAI(data);
    updateInsights(data);

    if (lastUpdated) {
      const now = new Date();
      lastUpdated.textContent = now.toLocaleString();
    }

    if (gradeBody) {
      gradeBody.innerHTML = "";
      data.gradeSubject.forEach((row) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row.grade}</td>
          <td><span class="score-pill ${scoreClass(row.Technology)}">${row.Technology}%</span></td>
          <td><span class="score-pill ${scoreClass(row.Biology)}">${row.Biology}%</span></td>
          <td><span class="score-pill ${scoreClass(row.Economics)}">${row.Economics}%</span></td>
          <td><span class="score-pill ${scoreClass(row.Accounting)}">${row.Accounting}%</span></td>
        `;
        gradeBody.appendChild(tr);
      });
    }
  };

  const scoreClass = (value) => {
    if (value >= 75) return "score-high";
    if (value >= 60) return "score-mid";
    return "score-low";
  };

  const exportCsv = () => {
    const filters = getFilters();
    const custom = JSON.parse(localStorage.getItem("analytics-custom") || "null");
    const data = buildData(filters, custom);
    const rows = [["type", "label", "grade", "subject", "value"]];
    data.attendanceByGrade.forEach((item) => rows.push(["attendance", "", item.grade, "", item.value]));
    data.subjects.forEach((item) => rows.push(["subject", item.label, "", "", item.value]));
    data.assessments.forEach((item) => rows.push(["assessment", item.label, "", "", item.value]));
    data.gradeSubject.forEach((row) => {
      rows.push(["matrix", "", row.grade, "Technology", row.Technology]);
      rows.push(["matrix", "", row.grade, "Biology", row.Biology]);
      rows.push(["matrix", "", row.grade, "Economics", row.Economics]);
      rows.push(["matrix", "", row.grade, "Accounting", row.Accounting]);
    });
    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "hod-analytics.csv";
    link.click();
  };

  const importCsv = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      if (typeof text !== "string") return;
      const lines = text.trim().split(/\r?\n/);
      const rows = lines.slice(1).map((line) => line.split(","));
      const custom = {
        attendanceByGrade: [],
        subjects: [],
        assessments: [],
        gradeSubject: [],
      };

      rows.forEach((row) => {
        const [type, label, grade, subject, valueRaw] = row;
        const value = Number(valueRaw);
        if (Number.isNaN(value)) return;
        if (type === "attendance") {
          custom.attendanceByGrade.push({ grade, value });
        }
        if (type === "subject") {
          custom.subjects.push({ label, value });
        }
        if (type === "assessment") {
          custom.assessments.push({ label, value });
        }
        if (type === "matrix") {
          const existing = custom.gradeSubject.find((g) => g.grade === grade);
          if (existing) {
            existing[subject] = value;
          } else {
            custom.gradeSubject.push({ grade, [subject]: value });
          }
        }
      });

      custom.gradeSubject = custom.gradeSubject.map((row) => ({
        grade: row.grade,
        Technology: row.Technology || 0,
        Biology: row.Biology || 0,
        Economics: row.Economics || 0,
        Accounting: row.Accounting || 0,
      }));

      localStorage.setItem("analytics-custom", JSON.stringify(custom));
      renderAll();
      showToast("CSV imported. Dashboard updated.");
    };
    reader.readAsText(file);
  };

  const respondChat = (message) => {
    const lower = message.toLowerCase();
    if (lower.includes("attendance")) {
      return "Attendance trends are highlighted in the attendance chart. Focus on grades below 80%.";
    }
    if (lower.includes("economics")) {
      return "Economics is flagged in Grade 10. Consider targeted revision sessions.";
    }
    if (lower.includes("homework")) {
      return "Homework completion is slightly down. Reinforce weekly check-ins and parent reminders.";
    }
    if (lower.includes("report") || lower.includes("export")) {
      return "Use the Export CSV button in the toolbar to download the latest report.";
    }
    return "I can help with attendance trends, subject gaps, or generating reports. What would you like to review?";
  };

  const addChatMessage = (text, type) => {
    if (!chatbotMessages) return;
    const message = document.createElement("div");
    message.className = `chatbot-message ${type}`;
    message.textContent = text;
    chatbotMessages.appendChild(message);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  };

  exportCsvBtn?.addEventListener("click", exportCsv);
  exportPdfBtn?.addEventListener("click", () => window.print());
  importCsvInput?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importCsv(file);
  });

  [yearFilter, termFilter, districtFilter, gradeFilter].forEach((el) =>
    el?.addEventListener("change", () => {
      localStorage.removeItem("analytics-custom");
      renderAll();
    })
  );

  aiRefresh?.addEventListener("click", renderAll);

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.dataset.target;
      if (target) {
        const section = document.querySelector(target);
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  chatbotToggle?.addEventListener("click", () => chatbotPanel?.classList.toggle("open"));
  chatbotClose?.addEventListener("click", () => chatbotPanel?.classList.remove("open"));
  chatbotForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!chatbotText) return;
    const message = chatbotText.value.trim();
    if (!message) return;
    addChatMessage(message, "user");
    chatbotText.value = "";
    setTimeout(() => addChatMessage(respondChat(message), "bot"), 350);
  });

  renderAll();

  window.addEventListener("resize", () => {
    const filters = getFilters();
    const custom = JSON.parse(localStorage.getItem("analytics-custom") || "null");
    renderTrend(buildData(filters, custom).attendanceByGrade);
  });
}

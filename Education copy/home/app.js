const toast = document.createElement("div");
toast.className = "toast";
document.body.appendChild(toast);

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
};

const page = document.documentElement.getAttribute("data-page");

const translations = {
  en: {
    topbar_title: "Primary School Admissions Platform",
    language_label: "Language",
    dept_label: "education",
    dept_name: "Department of Education North West",
    nav_home: "Home",
    nav_register: "Register",
    nav_verify: "Verify",
    nav_login: "Login",
    nav_dashboard: "Dashboard",
    nav_apply: "Apply",
    nav_documents: "Documents",
    nav_status: "Status",
    nav_help: "Help",
    hero_tag: "North West Provincial Government",
    hero_title: "North West Education Department",
    hero_lead: "Promoting digital transformation for our communities through secure, paperless admissions.",
    apply_now: "Apply for School",
    login_btn: "Login",
    check_status: "Check Status",
    admissions_open: "Admissions Window",
    admissions_deadline: "8 March 2026 - 20 March 2026",
    admissions_apply: "Apply to 5 schools",
    identity_title: "Identity Verification",
    identity_desc: "Secure OTP via SMS and email.",
    vault_title: "Document Vault",
    vault_desc: "Upload required documents once.",
    mec_inline_title: "MEC of Education",
    mec_inline_desc: "Thank you for supporting continuous innovation.",
    mec_title: "MEC Statement",
    mec_heading: "A message from the MEC for Education",
    mec_message:
      "We thank the Department for continuously innovating and digitalising operations. This platform ensures every parent can apply easily and track admissions transparently.",
    mec_signoff: "MEC for Education — North West Province",
    process_title: "How the process works",
    process_step1: "Register & verify your details",
    process_step2: "Submit learner application",
    process_step3: "Upload required documents",
    process_step4: "Pay the admission fee (R50)",
    process_step5: "Track your application online",
    docs_title: "Required documents",
    doc1: "Child’s report",
    doc2: "Birth certificate",
    doc3: "Proof of address",
    doc4: "Medical certificate",
    doc5: "Both parents’ certified ID",
    help_title: "Need help?",
    help_desc: "Our helpdesk is ready to support parents and guardians.",
    faq_title: "Frequently Asked Questions",
    faq_q1: "When do applications close?",
    faq_a1: "Applications close on 20 March 2026.",
    faq_q2: "How many schools can I apply to?",
    faq_a2: "You can apply to up to five schools per learner.",
    faq_q3: "How do I pay the R50 fee?",
    faq_a3: "Pay online or request a reference pin for office payment.",
    contact_title: "Contact the Department",
    contact_desc: "North West Provincial Government | Education Department",
  },
  tn: {
    topbar_title: "Sethala sa Kamohelo ya Sekolo sa Motheo",
    language_label: "Puo",
    dept_label: "thuto",
    dept_name: "Lefapha la Thuto la Bokone Bophirima",
    nav_home: "Gae",
    nav_register: "Ikwadise",
    nav_verify: "Netefatsa",
    nav_login: "Kena",
    nav_dashboard: "Tafole",
    nav_apply: "Kopa",
    nav_documents: "Ditokomane",
    nav_status: "Boemo",
    nav_help: "Thuso",
    hero_tag: "Mmuso wa Porofense ya Bokone Bophirima",
    hero_title: "Lefapha la Thuto la Bokone Bophirima",
    hero_lead:
      "Re tlisa diphetogo tsa dijithale mo metseng ya rona ka kamohelo e e sireletsehileng e se nang pampiri.",
    apply_now: "Kopa Sekolo",
    login_btn: "Kena",
    check_status: "Lekola Boemo",
    admissions_open: "Fensetere ya Kamohelo",
    admissions_deadline: "8 Mopitlwe 2026 - 20 Mopitlwe 2026",
    admissions_apply: "Kopa dikolo di le 5",
    identity_title: "Netefatso ya Boitseanape",
    identity_desc: "OTP e e sireletsehileng ka SMS le imeile.",
    vault_title: "Polokelo ya Ditokomane",
    vault_desc: "Laisa ditokomane tsotlhe tse di tlhokegang gangwe.",
    mec_inline_title: "MEC wa Thuto",
    mec_inline_desc: "Re leboga tshehetso ya lona ya boitshimololedi jo bo tswelelang.",
    mec_title: "Polelo ya MEC",
    mec_heading: "Molaetsa go tswa kwa MEC wa Thuto",
    mec_message:
      "Re leboga Lefapha ka go tswelela pele ka boitshimololedi le go dijithalisa ditiro. Sethala seno se dira gore motsadi mongwe le mongwe a kgone go kopa le go latela kamohelo.",
    mec_signoff: "MEC wa Thuto — Porofense ya Bokone Bophirima",
    process_title: "Tsela e e dirang ka yone",
    process_step1: "Ikwadise o netefatse dintlha tsa gago",
    process_step2: "Romela kopo ya moithuti",
    process_step3: "Laisa ditokomane tse di tlhokegang",
    process_step4: "Duela madi a kamohelo (R50)",
    process_step5: "Latela kopo ya gago mo inthaneteng",
    docs_title: "Ditokomane tse di tlhokegang",
    doc1: "Pampiri ya tlaleho ya ngwana",
    doc2: "Setifikeiti sa botsalo",
    doc3: "Bosupi jwa aterese",
    doc4: "Setifikeiti sa bongaka",
    doc5: "Dikgatiso tsa ID tse di netefaditsweng tsa batsadi botlhe",
    help_title: "O tlhoka thuso?",
    help_desc: "Desk ya thuso e ikemiseditse go thusa batsadi le bagadi.",
    faq_title: "Dipotso tse di Botsiwang Kgafetsa",
    faq_q1: "Dikopo di a tswalwa leng?",
    faq_a1: "Dikopo di a tswalwa ka 20 Mopitlwe 2026.",
    faq_q2: "Nka kopa dikolo di le kae?",
    faq_a2: "O ka kopa dikolo di le tlhano mo moithuting.",
    faq_q3: "Ke duela jang madi a R50?",
    faq_a3: "Duela mo inthaneteng kgotsa kopa PIN ya tshupetso ya go duela kwa ofising.",
    contact_title: "Ikgolaganye le Lefapha",
    contact_desc: "Mmuso wa Porofense ya Bokone Bophirima | Lefapha la Thuto",
  },
  af: {
    topbar_title: "Primêre Skool Toelatingsplatform",
    language_label: "Taal",
    dept_label: "onderwys",
    dept_name: "Departement van Onderwys Noordwes",
    nav_home: "Tuis",
    nav_register: "Registreer",
    nav_verify: "Verifieer",
    nav_login: "Teken in",
    nav_dashboard: "Paneel",
    nav_apply: "Aansoek",
    nav_documents: "Dokumente",
    nav_status: "Status",
    nav_help: "Hulp",
    hero_tag: "Noordwes Provinsiale Regering",
    hero_title: "Noordwes Onderwysdepartement",
    hero_lead: "Bevorder digitale transformasie vir ons gemeenskappe met veilige, papierlose toelatings.",
    apply_now: "Doen Aansoek vir Skool",
    login_btn: "Teken in",
    check_status: "Kontroleer Status",
    admissions_open: "Toelatingsperiode",
    admissions_deadline: "8 Maart 2026 - 20 Maart 2026",
    admissions_apply: "Doen aansoek by 5 skole",
    identity_title: "Identiteitsverifikasie",
    identity_desc: "Veilige OTP via SMS en e-pos.",
    vault_title: "Dokumentkluis",
    vault_desc: "Laai vereiste dokumente eenmalig op.",
    mec_inline_title: "LUR van Onderwys",
    mec_inline_desc: "Dankie dat u voortdurende innovasie ondersteun.",
    mec_title: "LUR Verklaring",
    mec_heading: "’n Boodskap van die LUR vir Onderwys",
    mec_message:
      "Ons bedank die Departement vir voortdurende innovasie en digitalisering. Hierdie platform laat elke ouer maklik aansoek doen en toelatings deursigtig volg.",
    mec_signoff: "LUR vir Onderwys — Noordwes Provinsie",
    process_title: "Hoe die proses werk",
    process_step1: "Registreer en verifieer u besonderhede",
    process_step2: "Dien leerderaansoek in",
    process_step3: "Laai vereiste dokumente op",
    process_step4: "Betaal die toelatingsfooi (R50)",
    process_step5: "Volg u aansoek aanlyn",
    docs_title: "Vereiste dokumente",
    doc1: "Kind se verslag",
    doc2: "Geboortesertifikaat",
    doc3: "Bewys van adres",
    doc4: "Mediese sertifikaat",
    doc5: "Gesertifiseerde ID’s van albei ouers",
    help_title: "Benodig hulp?",
    help_desc: "Ons hulplyn staan gereed om ouers en voogde te help.",
    faq_title: "Gereelde Vrae",
    faq_q1: "Wanneer sluit aansoeke?",
    faq_a1: "Aansoeke sluit op 20 Maart 2026.",
    faq_q2: "Hoeveel skole kan ek kies?",
    faq_a2: "U kan tot vyf skole per leerder kies.",
    faq_q3: "Hoe betaal ek die R50-fooi?",
    faq_a3: "Betaal aanlyn of vra ’n verwysings-PIN vir betaling by die kantoor.",
    contact_title: "Kontak die Departement",
    contact_desc: "Noordwes Provinsiale Regering | Departement van Onderwys",
  },
};

const applyTranslations = (lang) => {
  const dictionary = translations[lang] || translations.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (!key) return;
    const value = dictionary[key];
    if (value) el.textContent = value;
  });
  document.documentElement.lang = lang;
};

const languageSelect = document.getElementById("language-select");
const savedLanguage = localStorage.getItem("language") || "en";
if (languageSelect) {
  languageSelect.value = savedLanguage;
  applyTranslations(savedLanguage);
  languageSelect.addEventListener("change", (event) => {
    const lang = event.target.value;
    localStorage.setItem("language", lang);
    applyTranslations(lang);
  });
} else if (document.querySelector("[data-i18n]")) {
  applyTranslations(savedLanguage);
}

const schools = [
  { district: "Dr Kenneth Kaunda", municipality: "Matlosana", name: "Abontle Primary School", type: "Primary" },
  { district: "Dr Kenneth Kaunda", municipality: "Matlosana", name: "Matlosana Senior Secondary School", type: "High" },
  { district: "Dr Kenneth Kaunda", municipality: "Matlosana", name: "Mfundo Thuto Primary School", type: "Primary" },
  { district: "Dr Kenneth Kaunda", municipality: "JB Marks", name: "Potchefstroom High School", type: "High" },
  { district: "Dr Kenneth Kaunda", municipality: "JB Marks", name: "Potchefstroom Primary School", type: "Primary" },
  { district: "Dr Kenneth Kaunda", municipality: "JB Marks", name: "Baillie Park Primary School", type: "Primary" },
  { district: "Dr Kenneth Kaunda", municipality: "Maquassi Hills", name: "Maquassi Hills English Secondary School", type: "High" },
  { district: "Dr Kenneth Kaunda", municipality: "Maquassi Hills", name: "Diphetogo Primary School", type: "Primary" },
  { district: "Dr Ruth Segomotsi Mompati", municipality: "Greater Taung", name: "Madipelesa Primary School", type: "Primary" },
  { district: "Dr Ruth Segomotsi Mompati", municipality: "Greater Taung", name: "St Paul’s High School", type: "High" },
  { district: "Dr Ruth Segomotsi Mompati", municipality: "Greater Taung", name: "St Paul’s Primary School", type: "Primary" },
  { district: "Dr Ruth Segomotsi Mompati", municipality: "Mamusa", name: "Mampho Secondary School", type: "High" },
  { district: "Dr Ruth Segomotsi Mompati", municipality: "Mamusa", name: "Mahahakgetlwa Primary School", type: "Primary" },
  { district: "Dr Ruth Segomotsi Mompati", municipality: "Kagisano-Molopo", name: "Magaabue Primary School", type: "Primary" },
  { district: "Dr Ruth Segomotsi Mompati", municipality: "Kagisano-Molopo", name: "Majeng Secondary School", type: "High" },
  { district: "Dr Ruth Segomotsi Mompati", municipality: "Lekwa-Teemane", name: "Makalaathutlwa Primary School", type: "Primary" },
  { district: "Dr Ruth Segomotsi Mompati", municipality: "Naledi", name: "Mafikeng Primary School", type: "Primary" },
  { district: "Ngaka Modiri Molema", municipality: "Mahikeng", name: "Mafikeng High School", type: "High" },
  { district: "Ngaka Modiri Molema", municipality: "Mahikeng", name: "Aaron Letsapa Primary School", type: "Primary" },
  { district: "Ngaka Modiri Molema", municipality: "Mahikeng", name: "Magokgwane Primary School", type: "Primary" },
  { district: "Ngaka Modiri Molema", municipality: "Mahikeng", name: "Mailakgang Primary School", type: "Primary" },
  { district: "Ngaka Modiri Molema", municipality: "Mahikeng", name: "Mhelo Primary School", type: "Primary" },
  { district: "Ngaka Modiri Molema", municipality: "Ditsobotla", name: "Slurry Primary School", type: "Primary" },
  { district: "Ngaka Modiri Molema", municipality: "Ditsobotla", name: "Suping Primary School", type: "Primary" },
  { district: "Ngaka Modiri Molema", municipality: "Ramotshere Moiloa", name: "Majabe Primary School", type: "Primary" },
  { district: "Ngaka Modiri Molema", municipality: "Ramotshere Moiloa", name: "Matthews Mangope High School", type: "High" },
  { district: "Ngaka Modiri Molema", municipality: "Ratlou", name: "Aflame Primary School", type: "Primary" },
  { district: "Ngaka Modiri Molema", municipality: "Ratlou", name: "Lodirile Tswaing High School", type: "High" },
  { district: "Ngaka Modiri Molema", municipality: "Tswaing", name: "Lofdal Combined School", type: "High" },
];

const enforceDigits = (input, maxLength) => {
  if (!input) return;
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, maxLength);
  });
};

if (page === "application") {
  const form = document.getElementById("application-form");
  const panels = Array.from(document.querySelectorAll(".step-panel"));
  const stepPills = Array.from(document.querySelectorAll(".step-pill"));
  const progressBar = document.getElementById("progress-bar");
  const nextBtn = document.getElementById("wizard-next");
  const prevBtn = document.getElementById("wizard-prev");
  const submitBtn = document.getElementById("wizard-submit");

  const gradeSelect = document.getElementById("grade-select");
  const districtSelect = document.getElementById("district-select");
  const municipalitySelect = document.getElementById("municipality-select");
  const schoolSelects = [
    document.getElementById("school-choice-1"),
    document.getElementById("school-choice-2"),
    document.getElementById("school-choice-3"),
  ];
  const schoolTypeHint = document.getElementById("school-type-hint");
  const gisSearch = document.getElementById("gis-search");
  const gpsInput = document.getElementById("gps-input");
  const shareLocation = document.getElementById("share-location");
  const shareLocationSchool = document.getElementById("share-location-school");
  const documentsInput = document.getElementById("documents-input");
  const documentsList = document.getElementById("documents-list");
  const pinBox = document.getElementById("pin-fields");
  const onlineFields = document.getElementById("online-fields");
  const generatePin = document.getElementById("generate-pin");
  const pinDisplay = document.getElementById("pin-display");

  let current = 0;

  const updateWizard = () => {
    panels.forEach((panel, index) => panel.classList.toggle("active", index === current));
    stepPills.forEach((pill, index) => pill.classList.toggle("active", index === current));
    if (progressBar) {
      progressBar.style.width = `${((current + 1) / panels.length) * 100}%`;
    }
    prevBtn.disabled = current === 0;
    nextBtn.style.display = current === panels.length - 1 ? "none" : "inline-flex";
    submitBtn.style.display = current === panels.length - 1 ? "inline-flex" : "none";
  };

  const validatePanel = () => {
    const inputs = panels[current].querySelectorAll("input, select");
    for (const input of inputs) {
      if (!input.checkValidity()) {
        input.reportValidity();
        showToast("Please complete all required fields before continuing.");
        return false;
      }
    }

    if (panels[current].contains(documentsInput)) {
      const files = documentsInput?.files ? Array.from(documentsInput.files) : [];
      if (files.length < 5) {
        showToast("Please upload all required documents (5 files).");
        return false;
      }
    }

    if (panels[current].querySelector("input[name='paymentMethod']")) {
      const paymentMethod = form?.querySelector("input[name='paymentMethod']:checked")?.value;
      if (paymentMethod === "online") {
        const fields = ["cardName", "cardNumber", "expiry", "cvv"];
        for (const name of fields) {
          const input = form.querySelector(`input[name='${name}']`);
          if (!input || !input.value.trim()) {
            showToast("Please complete all online payment fields.");
            return false;
          }
        }
      } else if (paymentMethod === "pin") {
        if (!pinDisplay?.textContent) {
          showToast("Please generate a reference pin for office payment.");
          return false;
        }
      }
    }

    return true;
  };

  nextBtn?.addEventListener("click", () => {
    if (!validatePanel()) return;
    if (current < panels.length - 1) {
      current += 1;
      updateWizard();
    }
  });

  prevBtn?.addEventListener("click", () => {
    if (current > 0) {
      current -= 1;
      updateWizard();
    }
  });

  stepPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const target = Number(pill.dataset.step);
      if (target <= current) {
        current = target;
        updateWizard();
      }
    });
  });

  enforceDigits(form?.querySelector("input[name='parentContact']"), 10);
  enforceDigits(form?.querySelector("input[name='parentId']"), 13);
  enforceDigits(form?.querySelector("input[name='childId']"), 13);
  enforceDigits(form?.querySelector("input[name='postal']"), 4);

  const getSchoolType = () => {
    const gradeValue = gradeSelect?.value;
    if (!gradeValue) return null;
    const grade = Number(gradeValue);
    return grade <= 7 ? "Primary" : "High";
  };

  const updateMunicipalities = () => {
    if (!districtSelect || !municipalitySelect) return;
    municipalitySelect.innerHTML = `<option value="">Select municipality</option>`;
    if (!districtSelect.value) return;
    const municipalities = [...new Set(schools.filter((s) => s.district === districtSelect.value).map((s) => s.municipality))];
    municipalities.forEach((municipality) => {
      const option = document.createElement("option");
      option.value = municipality;
      option.textContent = municipality;
      municipalitySelect.appendChild(option);
    });
  };

  const updateSchoolOptions = () => {
    const district = districtSelect?.value;
    const municipality = municipalitySelect?.value;
    const type = getSchoolType();
    const term = gisSearch?.value?.toLowerCase().trim();

    let filtered = schools;
    if (district) filtered = filtered.filter((s) => s.district === district);
    if (municipality) filtered = filtered.filter((s) => s.municipality === municipality);
    if (type) filtered = filtered.filter((s) => s.type === type);
    if (term) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.municipality.toLowerCase().includes(term) ||
          s.district.toLowerCase().includes(term)
      );
    }

    const names = [...new Set(filtered.map((s) => s.name))];
    schoolSelects.forEach((select) => {
      if (!select) return;
      select.innerHTML = `<option value="">Select school</option>`;
      if (!district || !municipality || !type) return;
      if (!names.length) {
        const option = document.createElement("option");
        option.textContent = "No schools available";
        option.value = "";
        select.appendChild(option);
        return;
      }
      names.forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        select.appendChild(option);
      });
    });

    if (schoolTypeHint) {
      schoolTypeHint.textContent = type
        ? `Showing ${type.toLowerCase()} schools for the selected grade.`
        : "Select a grade to see primary or high school options.";
    }
  };

  districtSelect?.addEventListener("change", () => {
    updateMunicipalities();
    updateSchoolOptions();
  });
  municipalitySelect?.addEventListener("change", updateSchoolOptions);
  gradeSelect?.addEventListener("change", updateSchoolOptions);
  gisSearch?.addEventListener("input", updateSchoolOptions);

  updateMunicipalities();
  updateSchoolOptions();

  const setLocation = (target) => {
    if (!navigator.geolocation) {
      showToast("Geolocation is not supported on this device.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        if (target) target.value = coords;
        showToast("Location captured.");
      },
      () => showToast("Unable to capture location.")
    );
  };

  shareLocation?.addEventListener("click", () => setLocation(gpsInput));
  shareLocationSchool?.addEventListener("click", () => setLocation(gisSearch));

  documentsInput?.addEventListener("change", (event) => {
    if (!documentsList) return;
    documentsList.innerHTML = "";
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const item = document.createElement("div");
      item.className = "upload-item";
      item.textContent = `${file.name} (${Math.round(file.size / 1024)} KB)`;
      documentsList.appendChild(item);
    });
    if (files.length) showToast("Documents added to upload list.");
  });

  const updatePaymentMode = () => {
    const method = form?.querySelector("input[name='paymentMethod']:checked")?.value;
    if (method === "pin") {
      if (pinBox) pinBox.style.display = "block";
      if (onlineFields) onlineFields.style.display = "none";
    } else {
      if (pinBox) pinBox.style.display = "none";
      if (onlineFields) onlineFields.style.display = "grid";
    }
  };

  form?.addEventListener("change", updatePaymentMode);
  updatePaymentMode();

  generatePin?.addEventListener("click", () => {
    const pin = `NW-${Math.floor(100000 + Math.random() * 900000)}`;
    if (pinDisplay) pinDisplay.textContent = `Reference Pin: ${pin}`;
    showToast("Reference pin generated.");
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validatePanel()) return;

    const data = new FormData(form);
    const submittedAt = new Date();
    const paymentMethod = form.querySelector("input[name='paymentMethod']:checked")?.value || "online";
    const paymentDate = paymentMethod === "online" ? submittedAt.toISOString() : "";

    const application = {
      id: `APP-${Math.floor(100000 + Math.random() * 900000)}`,
      child: {
        firstName: data.get("childFirstName"),
        surname: data.get("childSurname"),
        grade: data.get("childGrade"),
      },
      parent: {
        title: data.get("parentTitle"),
        firstName: data.get("parentFirstName"),
        surname: data.get("parentSurname"),
        phone: data.get("parentContact"),
      },
      address: {
        municipality: data.get("municipality"),
        postal: data.get("postal"),
      },
      school: {
        district: data.get("district"),
        municipality: data.get("municipalitySelect"),
        choices: [data.get("school1"), data.get("school2"), data.get("school3")].filter(Boolean),
      },
      status: "Submitted",
      stage: 1,
      submittedAt: submittedAt.toISOString(),
      paymentMethod,
      paidAt: paymentDate,
    };

    const stored = JSON.parse(localStorage.getItem("applications") || "[]");
    stored.unshift(application);
    localStorage.setItem("applications", JSON.stringify(stored));

    showToast("Application submitted. SMS and email confirmation sent.");
    setTimeout(() => {
      window.location.href = "applications.html";
    }, 900);
  });

  updateWizard();
}

if (page === "applications") {
  const list = document.getElementById("applications-list");
  const alertBox = document.getElementById("outstanding-alert");
  const applications = JSON.parse(localStorage.getItem("applications") || "[]");

  const formatDate = (value) => {
    if (!value) return "Not paid yet";
    const date = new Date(value);
    return date.toLocaleDateString();
  };

  if (!list) return;

  if (applications.length === 0) {
    list.innerHTML = "<p class='hint'>No applications submitted yet.</p>";
  } else {
    const hasOutstanding = applications.some((app) => app.paymentMethod === "pin" && !app.paidAt);
    if (alertBox) {
      if (hasOutstanding) {
        alertBox.classList.add("show");
        alertBox.textContent =
          "Please pay the outstanding application fee at the office using your reference pin. Your application is still in progress.";
      } else {
        alertBox.classList.remove("show");
      }
    }

    const stageLabels = ["Submitted", "Under Review", "Documents Verified", "School Allocated", "Decision"];

    applications.forEach((app) => {
      const card = document.createElement("div");
      card.className = "application-card";

      const progressPercent = Math.min((app.stage / stageLabels.length) * 100, 100);

      const schoolsHtml = app.school.choices.length
        ? app.school.choices.map((s) => `<li>${s}</li>`).join("")
        : "<li>No schools selected</li>";

      const paymentInfo =
        app.paymentMethod === "online"
          ? `Paid online on ${formatDate(app.paidAt)}`
          : app.paidAt
            ? `Office payment received on ${formatDate(app.paidAt)}`
            : "Outstanding office payment (reference pin issued)";

      card.innerHTML = `
        <div class="application-header">
          <div>
            <strong>${app.child.firstName} ${app.child.surname}</strong>
            <div class="hint">${app.id} • Grade ${app.child.grade}</div>
          </div>
          <span class="status-pill">${app.status}</span>
        </div>
        <div class="meta-grid">
          <div><strong>Submitted:</strong> ${formatDate(app.submittedAt)}</div>
          <div><strong>Payment:</strong> ${paymentInfo}</div>
          <div><strong>District:</strong> ${app.school.district || "—"}</div>
          <div><strong>Municipality:</strong> ${app.school.municipality || "—"}</div>
        </div>
        <div>
          <strong>Schools selected</strong>
          <ul class="school-list">${schoolsHtml}</ul>
        </div>
        <div class="progress-track">
          <div class="progress-line"><span style="width:${progressPercent}%"></span></div>
          <div class="hint">Stage: ${stageLabels[app.stage - 1] || app.status}</div>
        </div>
      `;

      if (app.paymentMethod === "pin" && !app.paidAt) {
        const payBtn = document.createElement("button");
        payBtn.className = "btn small";
        payBtn.type = "button";
        payBtn.textContent = "Record office payment";
        payBtn.addEventListener("click", () => {
          app.paidAt = new Date().toISOString();
          localStorage.setItem("applications", JSON.stringify(applications));
          window.location.reload();
        });
        card.appendChild(payBtn);
      }

      list.appendChild(card);
    });
  }
}

if (page === "login") {
  const form = document.getElementById("login-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Login request submitted.");
  });
}

if (page === "forgot") {
  const form = document.getElementById("forgot-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Reset instructions sent via SMS and email.");
  });
}

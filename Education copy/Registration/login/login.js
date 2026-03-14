const toast = document.createElement("div");
toast.className = "toast";
document.body.appendChild(toast);

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
};

const page = document.documentElement.getAttribute("data-page");

const isValidSaId = (value) => /^\d{13}$/.test(value.trim());
const isValidSaPhone = (value) => /^(\+27|0)[6-8]\d{8}$/.test(value.replace(/\s+/g, ""));

if (page === "application") {
  const form = document.getElementById("application-form");
  const panels = Array.from(document.querySelectorAll(".wizard-panel"));
  const steps = Array.from(document.querySelectorAll(".step"));
  const progress = document.getElementById("wizard-progress");
  const nextBtn = document.getElementById("wizard-next");
  const prevBtn = document.getElementById("wizard-prev");
  const submitBtn = document.getElementById("wizard-submit");
  const documentsInput = document.getElementById("documents-input");
  const documentsList = document.getElementById("documents-list");
  const pinBox = document.getElementById("pin-fields");
  const onlineFields = document.getElementById("online-fields");
  const generatePin = document.getElementById("generate-pin");
  const pinDisplay = document.getElementById("pin-display");
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
  let current = 0;

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
      input.value = input.value.replace(/\\D/g, "").slice(0, maxLength);
    });
  };

  const getSchoolType = () => {
    const gradeValue = gradeSelect?.value;
    if (gradeValue === "" || gradeValue === null || gradeValue === undefined) return null;
    const grade = Number(gradeValue);
    if (Number.isNaN(grade)) return null;
    return grade <= 7 ? "Primary" : "High";
  };

  const updateMunicipalities = () => {
    if (!districtSelect || !municipalitySelect) return;
    const district = districtSelect.value;
    municipalitySelect.innerHTML = `<option value=\"\">Select municipality</option>`;
    if (!district) return;
    const municipalities = [...new Set(schools.filter((s) => s.district === district).map((s) => s.municipality))];
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
    const searchTerm = gisSearch?.value?.toLowerCase().trim();

    let filtered = schools;
    if (district) {
      filtered = filtered.filter((s) => s.district === district);
    }
    if (municipality) {
      filtered = filtered.filter((s) => s.municipality === municipality);
    }
    if (type) {
      filtered = filtered.filter((s) => s.type === type);
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm) ||
          s.municipality.toLowerCase().includes(searchTerm) ||
          s.district.toLowerCase().includes(searchTerm)
      );
    }

    const names = [...new Set(filtered.map((s) => s.name))];
    schoolSelects.forEach((select) => {
      if (!select) return;
      select.innerHTML = `<option value=\"\">Select school</option>`;
      if (!district || !municipality || !type) {
        return;
      }
      if (!names.length) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "No schools available";
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
      if (!type) {
        schoolTypeHint.textContent = "Select a grade to see primary or high school options.";
      } else {
        schoolTypeHint.textContent = `Showing ${type.toLowerCase()} schools for the selected grade.`;
      }
    }
  };

  const updateWizard = () => {
    panels.forEach((panel, index) => {
      panel.classList.toggle("active", index === current);
    });
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === current);
    });
    if (progress) {
      progress.style.width = `${((current + 1) / panels.length) * 100}%`;
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

  steps.forEach((step, index) => {
    step.addEventListener("click", () => {
      if (index <= current) {
        current = index;
        updateWizard();
      }
    });
  });

  updateWizard();

  enforceDigits(form?.querySelector("input[name='parentContact']"), 10);
  enforceDigits(form?.querySelector("input[name='parentId']"), 13);
  enforceDigits(form?.querySelector("input[name='childId']"), 13);
  enforceDigits(form?.querySelector("input[name='postal']"), 4);

  gradeSelect?.addEventListener("change", updateSchoolOptions);
  districtSelect?.addEventListener("change", () => {
    updateMunicipalities();
    updateSchoolOptions();
  });
  municipalitySelect?.addEventListener("change", updateSchoolOptions);
  gisSearch?.addEventListener("input", updateSchoolOptions);

  updateMunicipalities();
  updateSchoolOptions();

  const setLocation = (target) => {
    if (!navigator.geolocation) {
      showToast("Geolocation is not supported on this device.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`;
        if (target) {
          target.value = coords;
        }
        showToast("Location captured.");
      },
      () => {
        showToast("Unable to capture location.");
      }
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
    if (files.length) {
      showToast("Documents added to upload list.");
    }
  });

  if (form) {
    const updatePaymentMode = () => {
      const method = form.querySelector("input[name='paymentMethod']:checked")?.value;
      if (method === "pin") {
        if (pinBox) pinBox.style.display = "block";
        if (onlineFields) onlineFields.style.display = "none";
      } else {
        if (pinBox) pinBox.style.display = "none";
        if (onlineFields) onlineFields.style.display = "grid";
      }
    };

    form.addEventListener("change", updatePaymentMode);
    updatePaymentMode();

    generatePin?.addEventListener("click", () => {
      const pin = `NW-${Math.floor(100000 + Math.random() * 900000)}`;
      if (pinDisplay) {
        pinDisplay.textContent = `Reference Pin: ${pin}`;
      }
      showToast("Reference pin generated.");
    });
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validatePanel()) return;
    showToast("Application submitted. SMS and email confirmation sent.");
  });
}

if (page === "verify") {
  const form = document.getElementById("verify-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const idNumber = data.get("idNumber").toString();

    if (!isValidSaId(idNumber)) {
      showToast("Enter a valid 13-digit South African ID number.");
      return;
    }

    sessionStorage.setItem("parentName", data.get("firstName"));
    sessionStorage.setItem("parentSurname", data.get("surname"));
    sessionStorage.setItem("parentId", idNumber);

    showToast("Verification successful. Continue to contact details.");
    setTimeout(() => {
      window.location.href = "contact.html";
    }, 700);
  });
}

if (page === "contact") {
  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const email = data.get("email").toString().trim();
    const confirmEmail = data.get("confirmEmail").toString().trim();
    const phone = data.get("phone").toString();
    const password = data.get("password").toString();

    if (email !== confirmEmail) {
      showToast("Emails do not match.");
      return;
    }

    if (!isValidSaPhone(phone)) {
      showToast("Enter a valid South African phone number.");
      return;
    }

    if (password.length < 8) {
      showToast("Password must be at least 8 characters.");
      return;
    }

    sessionStorage.setItem("parentEmail", email);
    sessionStorage.setItem("parentPhone", phone);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem("otp", otp);

    showToast("OTP sent to phone and email.");
    setTimeout(() => {
      window.location.href = "otp.html";
    }, 800);
  });
}

if (page === "otp") {
  const form = document.getElementById("otp-form");
  const hint = document.getElementById("otp-hint");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const otp = data.get("otp").toString().trim();
    const savedOtp = sessionStorage.getItem("otp");

    if (!savedOtp) {
      showToast("OTP expired. Please submit contact details again.");
      return;
    }

    if (otp !== savedOtp) {
      showToast("Incorrect OTP. Please try again.");
      return;
    }

    sessionStorage.setItem("otpVerified", "true");
    showToast("OTP verified. Please login.");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 700);
  });

  const savedOtp = sessionStorage.getItem("otp");
  if (hint && savedOtp) {
    hint.textContent = `Demo OTP: ${savedOtp}`;
  }
}

if (page === "login") {
  const form = document.getElementById("login-form");
  const savedEmail = sessionStorage.getItem("parentEmail");
  if (savedEmail) {
    const input = form?.querySelector("input[name='login']");
    if (input) {
      input.value = savedEmail;
    }
  }

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

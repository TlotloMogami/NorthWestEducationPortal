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

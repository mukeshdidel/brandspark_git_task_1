document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. DOM Elements
  const togglePasswordBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const submitBtn = document.getElementById("submitBtn");

  // 3. Password Visibility Toggle Functionality
  if (togglePasswordBtn && passwordInput && eyeIcon) {
    togglePasswordBtn.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";

      // Update icon dynamically
      eyeIcon.setAttribute("data-lucide", isPassword ? "eye-off" : "eye");
      lucide.createIcons();
    });
  }

  // 4. Form Validation & Submission Handler
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate Email
      if (!emailRegex.test(emailInput.value.trim())) {
        emailError.classList.remove("hidden");
        emailInput.classList.add("border-rose-500", "focus:border-rose-500");
        isValid = false;
      } else {
        emailError.classList.add("hidden");
        emailInput.classList.remove("border-rose-500", "focus:border-rose-500");
      }

      // Validate Password Length
      if (passwordInput.value.trim().length < 6) {
        passwordError.classList.remove("hidden");
        passwordInput.classList.add("border-rose-500", "focus:border-rose-500");
        isValid = false;
      } else {
        passwordError.classList.add("hidden");
        passwordInput.classList.remove(
          "border-rose-500",
          "focus:border-rose-500",
        );
      }

      // Simulate API Processing State
      if (isValid) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Signing in...</span>
        `;

        setTimeout(() => {
          alert("Sign in successful!");
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Sign In</span><i data-lucide="arrow-right" class="w-4 h-4"></i>`;
          lucide.createIcons();
        }, 1500);
      }
    });
  }
});

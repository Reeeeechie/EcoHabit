document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  
  // Grab inputs and error elements
  const usernameInput = document.getElementById('usernameInput');
  const passwordInput = document.getElementById('passwordInput');
  const usernameError = document.getElementById('usernameError');
  const passwordError = document.getElementById('passwordError');
  
  // --- Clear errors when the user clicks/focuses on the input ---
  const clearErrorOnFocus = (inputElement, errorElement) => {
    inputElement.addEventListener('focus', () => {
      inputElement.classList.remove('error-border');
      errorElement.classList.remove('show');
    });
  };

  // Apply the clear function to both inputs
  clearErrorOnFocus(usernameInput, usernameError);
  clearErrorOnFocus(passwordInput, passwordError);
  // -------------------------------------------------------------------

  loginForm.addEventListener('submit', function(event) {
    // Stop the form from submitting normally
    event.preventDefault(); 
    
    let isValid = true;
    
    // Reset error states on each click of the submit button
    usernameError.classList.remove('show');
    passwordError.classList.remove('show');
    usernameInput.classList.remove('error-border');
    passwordInput.classList.remove('error-border');
    
    // Validate Username
    if (usernameInput.value.trim() === '') {
      usernameError.classList.add('show');
      usernameInput.classList.add('error-border');
      isValid = false;
    }
    
    // Validate Password
    if (passwordInput.value.trim() === '') {
      passwordError.classList.add('show');
      passwordInput.classList.add('error-border');
      isValid = false;
    }
    
    // If both are filled, proceed to dashboard
    if (isValid) {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'dashboard.html';
    }
  });
});
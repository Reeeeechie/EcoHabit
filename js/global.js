document.addEventListener('DOMContentLoaded', () => {
  // --- LOGIN LOGIC ---
  // 1. Check login status from localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  // 2. Target the navigation bar and the login button
  const nav = document.querySelector('nav');
  const loginBtn = document.querySelector('.btn-login');

  if (isLoggedIn && nav && loginBtn) {
    // Hide the default login button
    loginBtn.style.display = 'none';

    // Create a container for the profile section
    const profileContainer = document.createElement('div');
    profileContainer.className = 'nav-profile-container';

    // Create a simple logout button (for testing/UX purposes)
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'btn-logout';
    logoutBtn.textContent = 'Logout';
    logoutBtn.onclick = () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      window.location.reload(); // Reload to show the Login button again
    };

    // Create the profile picture (using a placeholder avatar API based on your brand colors)
    const profilePic = document.createElement('img');
    const username = localStorage.getItem('username');
    profilePic.src = `https://ui-avatars.com/api/?name=${username}&background=2d5a40&color=fff`; 
    profilePic.alt = 'Profile';
    profilePic.className = 'nav-profile';

    // Assemble the elements
    profileContainer.appendChild(logoutBtn);
    profileContainer.appendChild(profilePic);

    // Append to the navigation bar
    nav.appendChild(profileContainer);
  }
});
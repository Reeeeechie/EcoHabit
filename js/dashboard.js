document.addEventListener('DOMContentLoaded', () => {
  // Check login status from localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  const loggedOutView = document.getElementById('loggedOutView');
  const loggedInView = document.getElementById('loggedInView');

  // If the elements exist on the page, toggle their visibility
  if (loggedOutView && loggedInView) {
    if (isLoggedIn) {
      loggedOutView.style.display = 'none';
      loggedInView.style.display = 'block';
    } else {
      loggedOutView.style.display = 'block';
      loggedInView.style.display = 'none';
    }
  }
});
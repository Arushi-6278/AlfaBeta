document.addEventListener('DOMContentLoaded', () => {
  const adminLoginForm = document.getElementById('adminLoginForm');
  const employeeLoginForm = document.getElementById('employeeLoginForm');

  if (adminLoginForm) {
      adminLoginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          // Perform validation if needed
          window.location.href = 'admin-dashboard.html';
      });
  }

  if (employeeLoginForm) {
      employeeLoginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          // Perform validation if needed
          window.location.href = 'employee-dashboard.html';
      });
  }
});

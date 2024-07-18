document.addEventListener('DOMContentLoaded', function() {
    const isAdminLogin = window.location.pathname.includes('admin-login');
    const form = document.getElementById(isAdminLogin ? 'adminLoginForm' : 'employeeLoginForm');
    const usernameInput = document.getElementById(isAdminLogin ? 'adminLoginUsername' : 'employeeLoginUsername');
    const passwordInput = document.getElementById(isAdminLogin ? 'adminLoginPassword' : 'employeeLoginPassword');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;

        const storedUsername = localStorage.getItem(isAdminLogin ? 'adminUsername' : 'employeeUsername');
        const storedPassword = localStorage.getItem(isAdminLogin ? 'adminPassword' : 'employeePassword');

        if (username === storedUsername && password === storedPassword) {
            alert('Login successful!');
            window.location.href = 'courses.html';
        } else {
            errorMessage.style.display = 'block';
        }
    });
});

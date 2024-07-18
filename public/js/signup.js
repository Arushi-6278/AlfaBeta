document.addEventListener('DOMContentLoaded', function() {
    const isAdminSignup = window.location.pathname.includes('admin-signup');
    const form = document.getElementById(isAdminSignup ? 'adminSignupForm' : 'employeeSignupForm');
    const usernameInput = document.getElementById(isAdminSignup ? 'adminSignupUsername' : 'employeeSignupUsername');
    const passwordInput = document.getElementById(isAdminSignup ? 'adminSignupPassword' : 'employeeSignupPassword');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const loginLink = document.getElementById('login-link');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;

        const storedUsername = localStorage.getItem(isAdminSignup ? 'adminUsername' : 'employeeUsername');
        if (storedUsername) {
            errorMessage.style.display = 'block';
            loginLink.style.display = 'block';
        } else {
            localStorage.setItem(isAdminSignup ? 'adminUsername' : 'employeeUsername', username);
            localStorage.setItem(isAdminSignup ? 'adminPassword' : 'employeePassword', password);
            successMessage.style.display = 'block';
            setTimeout(() => {
                window.location.href = isAdminSignup ? 'admin-login.html' : 'employee-login.html';
            }, 2000);
        }

        // Prevent forward navigation after signup
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
            history.go(1);
        };
    });
});

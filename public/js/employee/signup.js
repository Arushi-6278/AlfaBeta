document.getElementById('employeeSignupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('employeeSignupName').value;
    const username = document.getElementById('employeeSignupUsername').value;
    const password = document.getElementById('employeeSignupPassword').value;

    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password)) {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').textContent = 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special symbol.';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/employee/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store user data in local storage
            localStorage.setItem('employeeName', name);
            localStorage.setItem('assignedCourses', JSON.stringify([
                { title: 'Web Development 101', category: 'web-dev', description: 'Learn the basics of web development.', link: 'web-dev-101.html' },
                { title: 'Advanced Java', category: 'java', description: 'Master Java programming with advanced techniques.', link: 'advanced-java.html' }
            ]));

            document.getElementById('success-message').style.display = 'block';
            document.getElementById('success-message').textContent = data.message;

            // Redirect to login page after a short delay
            setTimeout(() => {
                window.location.href = 'employee-login.html';
            }, 2000);
        } else {
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('error-message').textContent = data.message;
        }
    } catch (error) {
        console.error('Error during signup:', error);
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').textContent = 'An error occurred during signup. Please try again.';
    }
});

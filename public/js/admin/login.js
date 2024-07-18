// js/admin/login.js

document.getElementById('adminLoginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById('adminLoginUsername').value;
    const password = document.getElementById('adminLoginPassword').value;

    try {
        const response = await fetch('http://localhost:5000/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json(); // Parse the JSON response

        if (response.ok) {
            // Redirect to courses.html if login is successful
            window.location.href = 'courses.html';
        } else {
            // Show error message if login fails
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('error-message').textContent = data.message;
        }
    } catch (error) {
        console.error('Error during login:', error);
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
    }
});





// Prevent back navigation from login page
history.pushState(null, null, location.href);
window.addEventListener('popstate', function() {
    history.pushState(null, null, location.href);
});

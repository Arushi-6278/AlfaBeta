document.getElementById('adminLoginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('adminLoginUsername').value;
    const password = document.getElementById('adminLoginPassword').value;

    const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message);
        // Redirect to courses.html
        window.location.href = 'courses.html';
    } else {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').textContent = data.message;
    }
});

// Prevent back navigation from login page
history.pushState(null, null, location.href);
window.addEventListener('popstate', function() {
    history.pushState(null, null, location.href);
});

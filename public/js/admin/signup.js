document.getElementById('adminSignupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('adminSignupUsername').value;
    const password = document.getElementById('adminSignupPassword').value;

    const response = await fetch('http://localhost:5000/api/admin/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('success-message').style.display = 'block';
        document.getElementById('success-message').textContent = data.message;
        setTimeout(() => {
            window.location.href = 'admin-login.html';
        }, 2000); // Redirect to login after 2 seconds
    } else {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').textContent = data.message;
    }
});

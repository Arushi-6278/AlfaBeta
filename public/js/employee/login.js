document.getElementById('employeeLoginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('employeeLoginUsername').value;
    const password = document.getElementById('employeeLoginPassword').value;

    try {
        const response = await fetch('http://localhost:5000/api/employee/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = 'courses-emp.html';  // Ensure this is the correct URL
        } else {
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('error-message').textContent = data.message;
        }
    } catch (error) {
        console.error('Error during login:', error);
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').textContent = 'An error occurred during login. Please try again.';
    }
});

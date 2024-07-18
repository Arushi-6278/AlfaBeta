const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Route for admin login page
app.get('/admin-login', (req, res) => {
  res.sendFile(__dirname + '/public/admin-login.html');
});

// Route for employee login page
app.get('/employee-login', (req, res) => {
  res.sendFile(__dirname + '/public/employee-login.html');
});

// Admin login endpoint
app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  // Admin login logic
  if (username === 'admin' && password === 'admin123') {
    res.send('Admin login successful');
  } else {
    res.status(401).send('Admin login failed');
  }
});

// Employee login endpoint
app.post('/employee-login', (req, res) => {
  const { username, password } = req.body;
  // Employee login logic
  if (username === 'employee' && password === 'employee123') {
    res.send('Employee login successful');
  } else {
    res.status(401).send('Employee login failed');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

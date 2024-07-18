const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/training-system', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Admin schema and model
const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

const Admin = mongoose.model('Admin', adminSchema);

// Employee schema and model
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

// Password validation function
const validatePassword = (password) => {
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordCriteria.test(password);
};

// Routes
app.post('/api/admin/signup', async (req, res) => {
    const { username, password } = req.body;

    // Password validation
    if (!validatePassword(password)) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special symbol.' });
    }

    try {
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'An admin account already exists. Please log in.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            username,
            password: hashedPassword
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Sign up successful!' });
    } catch (error) {
        console.error('Error during admin signup:', error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);
        
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

app.post('/api/employee/signup', async (req, res) => {
    const { name, username, password } = req.body;

    // Password validation
    if (!validatePassword(password)) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special symbol.' });
    }

    try {
        const existingEmployee = await Employee.findOne({ username });
        if (existingEmployee) {
            return res.status(400).json({ message: 'An employee account already exists. Please log in.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = new Employee({
            name,
            username,
            password: hashedPassword
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Sign up successful!' });
    } catch (error) {
        console.error('Error during employee signup:', error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

app.post('/api/employee/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const employee = await Employee.findOne({ username });

        if (!employee) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        const passwordMatch = await bcrypt.compare(password, employee.password);
        
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error('Error during employee login:', error);
        res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

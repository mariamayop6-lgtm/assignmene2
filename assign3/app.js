
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

//
const filePath = path.join(__dirname, 'users.json');

// 
const readUsers = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (error) {
        return [];
    }
};

// 
const writeUsers = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// 
app.post('/user', (req, res) => {
    const { name, age, email } = req.body;
    const users = readUsers();

    const userExists = users.some(u => u.email === email);
    if (userExists) {
        return res.status(400).json({ "message": "Email already exists." });
    }

    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUser = { id: newId, name, age, email };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ "message": "User added successfully." });
});

// 
app.patch('/user/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    const users = readUsers();

    const userIndex = users.findIndex(u => u.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ "message": "User ID not found." });
    }

    if (name) users[userIndex].name = name;
    if (age) users[userIndex].age = age;
    if (email) users[userIndex].email = email;

    writeUsers(users);

    res.json({ "message": "User age updated successfully." });
});

// 
app.delete('/user/:id', (req, res) => {
    const id = req.params.id || req.body.id;
    const users = readUsers();

    const userIndex = users.findIndex(u => u.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ "message": "User ID not found." });
    }

    users.splice(userIndex, 1);
    writeUsers(users);

    res.json({ "message": "User deleted successfully." });
});

// 
app.get('/user/byName', (req, res) => {
    const { name } = req.query;
    const users = readUsers();

    const user = users.find(u => u.name.toLowerCase() === name?.toLowerCase());

    if (!user) {
        return res.status(404).json({ "message": "User name not found." });
    }

    res.json(user);
});

// 
app.get('/user', (req, res) => {
    const users = readUsers();
    res.json(users);
});

// 
app.get('/user/filter', (req, res) => {
    const { minAge } = req.query;
    const users = readUsers();

    const filteredUsers = users.filter(u => u.age >= parseInt(minAge));

    if (filteredUsers.length === 0) {
        return res.status(404).json({ "message": "No users found." });
    }

    res.json(filteredUsers);
});

// 
app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const users = readUsers();

    const user = users.find(u => u.id === parseInt(id));

    if (!user) {
        return res.status(404).json({ "message": "User Not Found." });
    }

    res.json(user);
});

//
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
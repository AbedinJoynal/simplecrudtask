const express = require('express');
const app = express();
const port = 3000;

const users = [
    { username: 'abc', password: 'abc898' },
    { username: 'xyz', password: 'xyz420' },
];

app.use(express.json());
//CRUD
app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:username', (req, res) => {
    const user = users.find((u) => u.username === req.params.username);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/users/:username', (req, res) => {
    const updatedUser = req.body;
    const index = users.findIndex((u) => u.username === req.params.username);
    if (index !== -1) {
        users[index] = updatedUser;
        res.json(updatedUser);
    } else {
        res.status(404).send('User not found');
    }
});

app.delete('/users/:username', (req, res) => {
    const index = users.findIndex((u) => u.username === req.params.username);
    if (index !== -1) {
        users.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('User not found');
    }
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

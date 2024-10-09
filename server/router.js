const express = require('express');
const pool = require('./db');
const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
});

// Get a single user
router.get('/users/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
});

// Create a new user
router.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.status(201).json({ id: result.insertId, name, email });
});

// Update a user
router.put('/users/:id', async (req, res) => {
    const { name, email } = req.body;
    await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, req.params.id]);
    res.sendStatus(204);
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
    await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.sendStatus(204);
});

module.exports = router;

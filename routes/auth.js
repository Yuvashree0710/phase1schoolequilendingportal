const express = require('express');
const db = require('../db');
const router = express.Router();

// Signup
router.post('/signup', (req, res) => {
  const { username, password, role } = req.body;
  db.run(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, password, role],
    function (err) {
      if (err) return res.status(400).json({ error: 'User exists' });
      res.json({ id: this.lastID, username, role, token: 'fake-jwt-token' });
    }
  );
});

// Login (simulated)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, user) => {
      if (user) {
        res.json({ id: user.id, username: user.username, role: user.role, token: 'fake-jwt-token' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  );
});

module.exports = router;


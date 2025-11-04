const express = require('express');
const db = require('../db');
const router = express.Router();

// List all equipment
router.get('/', (req, res) => {
  db.all('SELECT * FROM equipment', [], (err, rows) => {
    res.json(rows);
  });
});

// Add equipment (admin only)
router.post('/', (req, res) => {
  const { name, category, condition, quantity } = req.body;
  db.run(
    'INSERT INTO equipment (name, category, condition, quantity, available) VALUES (?, ?, ?, ?, ?)',
    [name, category, condition, quantity, quantity],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID, name, category, condition, quantity, available: quantity });
    }
  );
});

// Edit equipment
router.put('/:id', (req, res) => {
  const { name, category, condition, quantity } = req.body;
  db.run(
    'UPDATE equipment SET name=?, category=?, condition=?, quantity=?, available=? WHERE id=?',
    [name, category, condition, quantity, quantity, req.params.id],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// Delete equipment
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM equipment WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;

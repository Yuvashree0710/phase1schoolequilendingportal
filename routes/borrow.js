const express = require('express');
const db = require('../db');
const router = express.Router();

// Request to borrow equipment
router.post('/', (req, res) => {
  const { user_id, equipment_id } = req.body;
  db.get('SELECT available FROM equipment WHERE id=?', [equipment_id], (err, eq) => {
    if (!eq || eq.available < 1) return res.status(400).json({ error: 'Not available' });
    db.run(
      'INSERT INTO borrow_requests (user_id, equipment_id, status) VALUES (?, ?, ?)',
      [user_id, equipment_id, 'pending'],
      function (err) {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ id: this.lastID, status: 'pending' });
      }
    );
  });
});

// Approve or reject request (admin/staff)
router.post('/:id/approve', (req, res) => {
  const { approve } = req.body;
  db.get('SELECT equipment_id FROM borrow_requests WHERE id=?', [req.params.id], (err, reqRow) => {
    if (!reqRow) return res.status(404).json({ error: 'Request not found' });
    if (approve) {
      db.run('UPDATE equipment SET available = available - 1 WHERE id=?', [reqRow.equipment_id]);
      db.run('UPDATE borrow_requests SET status=? WHERE id=?', ['approved', req.params.id]);
      res.json({ status: 'approved' });
    } else {
      db.run('UPDATE borrow_requests SET status=? WHERE id=?', ['rejected', req.params.id]);
      res.json({ status: 'rejected' });
    }
  });
});

// Mark as returned
router.post('/:id/return', (req, res) => {
  db.get('SELECT equipment_id FROM borrow_requests WHERE id=?', [req.params.id], (err, reqRow) => {
    if (!reqRow) return res.status(404).json({ error: 'Request not found' });
    db.run('UPDATE equipment SET available = available + 1 WHERE id=?', [reqRow.equipment_id]);
    db.run('UPDATE borrow_requests SET status=? WHERE id=?', ['returned', req.params.id]);
    res.json({ status: 'returned' });
  });
});

// List all borrow requests
router.get('/', (req, res) => {
  db.all('SELECT * FROM borrow_requests', [], (err, rows) => {
    res.json(rows);
  });
});

module.exports = router;

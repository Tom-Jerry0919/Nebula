const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('ecommerce.db');

app.use(cors());
app.use(bodyParser.json());

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT,
  message TEXT
)`);

// Endpoint to receive contact form data
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  db.run(
    'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
// ...existing code...
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});
// ...existing code...
app.get('/api/contacts', (req, res) => {
  db.all('SELECT * FROM contacts', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
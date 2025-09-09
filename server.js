const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

/* Routes */
app.get('/api/categories', (req, res) => {
  const rows = db.prepare('SELECT * FROM categories').all();
  res.json(rows);
});

app.get('/api/items', (req, res) => {
  const { category } = req.query;
  let rows;
  if (category) {
    const cat = db.prepare('SELECT id FROM categories WHERE name = ?').get(category);
    if (cat) {
      rows = db.prepare('SELECT items.*, categories.name as category FROM items JOIN categories ON items.category_id = categories.id WHERE category_id = ?').all(cat.id);
    } else {
      rows = db.prepare('SELECT items.*, categories.name as category FROM items JOIN categories ON items.category_id = categories.id WHERE categories.name = ?').all(category);
    }
  } else {
    rows = db.prepare('SELECT items.*, categories.name as category FROM items JOIN categories ON items.category_id = categories.id').all();
  }
  res.json(rows);
});

app.post('/api/items', (req, res) => {
  const { name, category_id, stock = 0, desired_stock = 10, unit = 'pcs', note = '' } = req.body;
  const info = db.prepare('INSERT INTO items (name, category_id, stock, desired_stock, unit, note) VALUES (?,?,?,?,?,?)').run(name, category_id, stock, desired_stock, unit, note);
  const newItem = db.prepare('SELECT items.*, categories.name as category FROM items JOIN categories ON items.category_id = categories.id WHERE items.id = ?').get(info.lastInsertRowid);
  res.json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const { stock, desired_stock, name, unit, note } = req.body;
  const stmt = db.prepare('UPDATE items SET stock = COALESCE(?, stock), desired_stock = COALESCE(?, desired_stock), name = COALESCE(?, name), unit = COALESCE(?, unit), note = COALESCE(?, note) WHERE id = ?');
  stmt.run(stock, desired_stock, name, unit, note, id);
  const updated = db.prepare('SELECT items.*, categories.name as category FROM items JOIN categories ON items.category_id = categories.id WHERE items.id = ?').get(id);
  res.json(updated);
});

/* Purchase list: items where stock < desired_stock */
app.get('/api/purchase-list', (req, res) => {
  const rows = db.prepare('SELECT items.id, items.name, items.unit, items.stock, items.desired_stock, (items.desired_stock - items.stock) as needed_qty, categories.name as category FROM items JOIN categories ON items.category_id = categories.id WHERE items.stock < items.desired_stock ORDER BY categories.id').all();
  // Group by category
  const summary = {};
  for (const r of rows) {
    if (!summary[r.category]) summary[r.category] = [];
    summary[r.category].push(r);
  }
  // also totals
  const totals = rows.reduce((acc, r) => {
    acc.total_items = acc.total_items + 1;
    acc.total_needed_qty = acc.total_needed_qty + (r.needed_qty || 0);
    return acc;
  }, { total_items: 0, total_needed_qty: 0 });
  res.json({ list: summary, totals });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbFile = path.join(__dirname, 'data', 'inventory.sqlite');
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// if DB doesn't exist, seed from seed.sql
const needSeed = !fs.existsSync(dbFile);
const db = new Database(dbFile);

if (needSeed) {
  const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
  db.exec(seed);
}

module.exports = db;

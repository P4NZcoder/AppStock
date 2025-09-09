PRAGMA foreign_keys = ON;

CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL
);

CREATE TABLE items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category_id INTEGER,
  stock INTEGER DEFAULT 0,
  desired_stock INTEGER DEFAULT 10,
  unit TEXT DEFAULT 'pcs',
  note TEXT,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO categories (name) VALUES ('ของสด'), ('ผัก'), ('อื่นๆ');

INSERT INTO items (name, category_id, stock, desired_stock, unit, note) VALUES
('หมูสามชั้น', 1, 5, 20, 'kg', 'ติดมันกลางๆ'),
('หมูสไลซ์', 1, 12, 20, 'kg', ''),
('กุ้ง', 1, 2, 10, 'kg', ''),
('ผักกาดหอม', 2, 6, 10, 'หัว', ''),
('ผักบุ้ง', 2, 8, 10, 'มัด', ''),
('เต้าหู้', 3, 20, 30, 'กล่อง', ''),
('บะหมี่', 3, 15, 20, 'ห่อ', '');

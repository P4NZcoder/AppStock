# Mukata Inventory (sample)

Full-stack app:
- Frontend: React (Vite)
- Backend: Node + Express + SQLite

Quickstart (local)
1. Unzip the archive and cd into mukata-inventory
2. Install server:
   cd server
   npm install
3. Install client:
   cd ../client
   npm install

4. Start both (in two terminals):
   # server
   cd server
   npm run dev
   # client
   cd client
   npm run dev

Server default: http://localhost:4000
Client default: http://localhost:5173

API
GET /api/categories
GET /api/items
GET /api/items?category=Vegetables
PUT /api/items/:id  (body: { stock, desired_stock })
GET /api/purchase-list  (items where stock < desired_stock) -> returns needed_qty and grouped summary

Notes:
- The server will create an SQLite DB (server/data/inventory.sqlite) on first run seeded with sample data.
- If you want a single-terminal run, use tools like pm2 or concurrently, or run via Docker (not included).

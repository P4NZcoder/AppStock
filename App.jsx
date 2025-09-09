import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import CategoryCard from './components/CategoryCard';
import ItemRow from './components/ItemRow';
import PurchaseSummary from './components/PurchaseSummary';

const API = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export default function App(){
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [filterCat, setFilterCat] = useState(null);
  const [purchase, setPurchase] = useState(null);

  useEffect(()=> { fetchAll(); }, []);

  async function fetchAll(){
    const c = await axios.get(`${API}/api/categories`);
    setCategories(c.data);
    const it = await axios.get(`${API}/api/items`);
    setItems(it.data);
  }

  async function refreshPurchase(){
    const res = await axios.get(`${API}/api/purchase-list`);
    setPurchase(res.data);
  }

  async function updateStock(id, delta){
    const item = items.find(i=>i.id===id);
    if(!item) return;
    const newStock = Math.max(0, (item.stock || 0) + delta);
    await axios.put(`${API}/api/items/${id}`, { stock: newStock });
    const it = await axios.get(`${API}/api/items`);
    setItems(it.data);
  }

  const filtered = filterCat ? items.filter(i => i.category === filterCat) : items;

  return (
    <div className="app">
      <Header />
      <main className="container">
        <section className="top-row">
          <div className="banner">
            <div className="banner-left">
              <h2>เช็คสต๊อกร้านหมูกระทะ</h2>
              <p className="muted">สรุปของต้องสั่ง — แยกหมวด ของสด / ผัก / อื่นๆ</p>
            </div>
            <div>
              <button className="btn primary" onClick={refreshPurchase}>Generate purchase list</button>
            </div>
          </div>
        </section>

        <section className="categories">
          <h3>หมวดหมู่</h3>
          <div className="cat-list">
            <CategoryCard
              name="ทั้งหมด"
              active={!filterCat}
              onClick={()=>setFilterCat(null)}
            />
            {categories.map(c => (
              <CategoryCard key={c.id} name={c.name} active={filterCat===c.name} onClick={()=>setFilterCat(c.name)} />
            ))}
          </div>
        </section>

        <section className="items">
          <h3>รายการสินค้า {filterCat ? `— ${filterCat}` : ''}</h3>
          <div className="item-list">
            {filtered.map(i => <ItemRow key={i.id} item={i} onUpdate={updateStock} />)}
            {filtered.length === 0 && <p className="muted">ไม่มีรายการ</p>}
          </div>
        </section>

        {purchase && (
          <section>
            <h3>Purchase Summary</h3>
            <PurchaseSummary data={purchase} />
          </section>
        )}
      </main>
    </div>
  );
}

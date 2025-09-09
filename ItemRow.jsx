import React from 'react';

export default function ItemRow({ item, onUpdate }){
  const low = item.stock < item.desired_stock;
  return (
    <div className={`item-row ${low ? 'low' : ''}`}>
      <div className="item-left">
        <div className="item-name">{item.name}</div>
        <div className="muted small">{item.category} • {item.unit}</div>
      </div>
      <div className="item-right">
        <div className="stock">
          <button className="small" onClick={()=>onUpdate(item.id, -1)}>-</button>
          <div className="stock-count">{item.stock}</div>
          <button className="small" onClick={()=>onUpdate(item.id, +1)}>+</button>
        </div>
        <div className="muted tiny">target {item.desired_stock}</div>
      </div>
    </div>
  );
}

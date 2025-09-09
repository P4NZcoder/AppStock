import React from 'react';

export default function CategoryCard({ name, active, onClick }){
  return (
    <div className={`category-card ${active ? 'active' : ''}`} onClick={onClick}>
      <div className="cat-icon">🍽️</div>
      <div className="cat-name">{name}</div>
    </div>
  );
}

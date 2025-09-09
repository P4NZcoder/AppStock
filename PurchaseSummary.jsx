import React from 'react';

export default function PurchaseSummary({ data }){
  const { list, totals } = data;
  return (
    <div className="purchase-summary">
      <div className="summary-top">
        <div>Total items to buy: <strong>{totals.total_items}</strong></div>
        <div>Total qty needed: <strong>{totals.total_needed_qty}</strong></div>
        <button className="btn">Download CSV</button>
      </div>
      <div className="summary-list">
        {Object.keys(list).map(cat => (
          <div key={cat} className="summary-cat">
            <h4>{cat}</h4>
            <ul>
              {list[cat].map(row => (
                <li key={row.id}>{row.name} — need: {row.needed_qty} {row.unit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

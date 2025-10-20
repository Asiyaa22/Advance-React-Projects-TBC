import React, { useMemo } from 'react';

export default function Analytics({ products = [] }) {
  const stats = useMemo(() => {
    const total = products.reduce((s, p) => s + p.price, 0);
    const avg = products.length ? +(total / products.length).toFixed(2) : 0;
    const top = products.slice().sort((a, b) => b.rating - a.rating).slice(0, 7);
    return { avg, top };
  }, [products]);

  return (
    <div className="analytics">
      <h3>Lightweight Analytics</h3>
      <p>Average price (sample): ₹{stats.avg}</p>
      <ol>
        {stats.top.map((p) => (
          <li key={p.id}>
            {p.name} — ₹{p.price} — {p.rating}★
          </li>
        ))}
      </ol>
    </div>
  );
}

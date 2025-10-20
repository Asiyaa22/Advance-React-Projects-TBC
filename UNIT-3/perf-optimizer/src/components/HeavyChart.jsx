import React, { useMemo } from 'react';

// Simulated "heavy" component — expensive computation but memoized
export default function HeavyChart({ product }) {
  // compute a fake series based on price — expensive but memoized
  const data = useMemo(() => {
    const arr = [];
    let val = product.price;
    // simulate heavy loop
    for (let i = 0; i < 50000; i++) {
      val = val + Math.sin(i / 1000) * (Math.random() * 0.5);
      if (i % 5000 === 0) arr.push(+val.toFixed(2));
    }
    return arr;
  }, [product.price]);

  return (
    <div className="chart">
      <div className="chart-row">
        {data.map((v, i) => (
          <div className="chart-bar" key={i} style={{ height: Math.max(6, Math.abs(v % 60)) }} />
        ))}
      </div>
      <div className="chart-caption">Simulated points: {data.length}</div>
    </div>
  );
}

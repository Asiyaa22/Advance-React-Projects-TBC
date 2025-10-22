// generateData.js
export function generateProducts(count = 10000) {
  return Array.from({ length: count }).map((_, i) => {
    const id = `prod-${i + 1}`;
    return {
      id,
      name: `Product ${i + 1}`,
      description:
        'High-quality item with nice features. Great for demos and performance testing.',
      price: +(10 + Math.random() * 990).toFixed(2),
      rating: +(1 + Math.random() * 4).toFixed(1),
    };
  });
}

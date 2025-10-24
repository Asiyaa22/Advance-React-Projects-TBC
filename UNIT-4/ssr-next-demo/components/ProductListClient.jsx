export default function ProductListClient({ products }) {
  if (!products || products.length === 0) return <p>No products found.</p>;
  return (
    <div className="grid">
      {products.map((p) => (
        <article key={p.id} className="product-card">
          <h3>{p.name}</h3>
          <p className="price">${p.price.toFixed(2)}</p>
          <p className="rating">⭐ {p.rating.toFixed(1)}</p>
          <p className="stamp">stamp: {p.serverStamp}</p>
          <button className="btn">Add to Cart</button>
        </article>
      ))}
    </div>
  );
}

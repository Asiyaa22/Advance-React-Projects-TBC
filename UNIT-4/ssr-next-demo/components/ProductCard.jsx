export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <h3>{product.name}</h3>
      <p className="price">${product.price.toFixed(2)}</p>
      <p className="rating">⭐ {product.rating.toFixed(1)}</p>

      {/* render the preformatted text exactly as received from server */}
      <p className="stamp">stamp: <code>{product.serverStampFormatted}</code></p>

      <button className="btn">Add to Cart</button>
    </article>
  );
}

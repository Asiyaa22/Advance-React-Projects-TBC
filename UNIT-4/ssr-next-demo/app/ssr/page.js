import ProductCard from "@/components/ProductCard";
import ServerTime from "@/components/ServerTime"; // 👈 add this

async function getProducts() {
  const base_url = process.env.URL
  const res = await fetch(`${base_url}/api/products`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products (SSR)");
  return res.json();
}

export const metadata = {
  title: "SSR Products | SSR Next Demo",
  description: "Products rendered on the server each request.",
};

export default async function SSRPage() {
  const products = await getProducts();

  return (
    <section>
      <h1>SSR Products</h1>
      <p className="muted">
        This page is rendered on the <strong>server</strong> on each request. Refresh to see updated
        data from the API.
      </p>

      {/* ✅ Client-only time display */}
      <ServerTime />

      <div className="grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

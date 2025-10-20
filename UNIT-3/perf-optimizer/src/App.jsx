import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Suspense,
  lazy,
} from 'react';
import { generateProducts } from './utils/generateData';
import ProductList from './components/ProductList';

const ProductDetails = lazy(() => import('./components/ProductDetails'));
// We'll show explicit dynamic import() (code-splitting on user action) for Analytics
// Analytics component is in ./components/Analytics

export default function App() {
  // generate a large dataset once
  const [products, setProducts] = useState(() => generateProducts(10000));
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [AnalyticsComp, setAnalyticsComp] = useState(null);

  // ------------- Simulate real-time updates -------------
  useEffect(() => {
    const t = setInterval(() => {
      // update price of a random product (immutably, but only that one item)
      setProducts((prev) => {
        // copy array shallowly
        const next = prev.slice();
        const idx = Math.floor(Math.random() * next.length);
        const p = next[idx];
        const newPrice = +(p.price * (0.98 + Math.random() * 0.04)).toFixed(2);

        // only change one item (preserve other object identities)
        if (newPrice === p.price) return prev;
        next[idx] = { ...p, price: newPrice };
        return next;
      });
    }, 2000); // every 2 seconds
    return () => clearInterval(t);
  }, []);

  // ------------- stable callbacks -------------
  const openProduct = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  const closeProduct = useCallback(() => setSelectedProduct(null), []);

  // ------------- Filtering & sorting (useMemo to avoid recompute) -------------
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let result = term
      ? products.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        )
      : products;

    if (sortBy === 'price-asc') result = result.slice().sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result = result.slice().sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result = result.slice().sort((a, b) => b.rating - a.rating);

    return result;
  }, [products, search, sortBy]);

  // expensive aggregated metric (memoized)
  const averagePrice = useMemo(() => {
    const total = filtered.reduce((s, p) => s + p.price, 0);
    return filtered.length ? +(total / filtered.length).toFixed(2) : 0;
  }, [filtered]);

  // ------------- Explicit dynamic import() to show code-splitting on demand -------------
  const loadAnalytics = useCallback(async () => {
    // dynamic import: this chunk isn't downloaded until the user clicks
    const module = await import('./components/Analytics');
    // set component type so we can render it
    setAnalyticsComp(() => module.default);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>PerfShop — Real-time Product Explorer</h1>
        <p className="tag">Demo: useMemo • useCallback • React.memo • lazy • Suspense • react-window</p>
        <div className="controls">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="search"
          />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="select">
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top rated</option>
          </select>

          <button className="btn" onClick={loadAnalytics}>
            Load Analytics (dynamic import)
          </button>

          <div className="stat">Avg price: ₹{averagePrice}</div>
          <div className="stat">Visible items: {filtered.length.toLocaleString()}</div>
        </div>
      </header>

      <main className="main">
        <section className="list-area">
          <ProductList items={filtered} onOpen={openProduct} />
        </section>

        <aside className="sidebar">
          <h3>Quick tips</h3>
          <ul>
            <li>Open a product to load a lazy chart module (React.lazy + Suspense)</li>
            <li>Console logs in each item show which items re-render</li>
            <li>Virtualization keeps memory & DOM small</li>
          </ul>

          {AnalyticsComp ? (
            <div className="analytics-wrap">
              <AnalyticsComp products={filtered.slice(0, 500)} />
            </div>
          ) : (
            <div className="analytics-placeholder">Analytics not loaded</div>
          )}
        </aside>
      </main>

      {/* lazy-loaded product details modal */}
      <Suspense fallback={null}>
        {selectedProduct && (
          <ProductDetails product={selectedProduct} onClose={closeProduct} />
        )}
      </Suspense>
    </div>
  );
}

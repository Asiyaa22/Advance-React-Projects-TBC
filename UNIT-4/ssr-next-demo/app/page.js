export default function HomePage() {
  return (
    <section className="hero">
      <h1>Server-Side Rendering (SSR)</h1>
      

      <div className="cards">
        <a className="card" href="/ssr">
          <h3>SSR Page</h3>
          <p>Data fetched on the server on every request.</p>
        </a>
        <a className="card" href="/csr">
          <h3>CSR Page</h3>
          <p>Data fetched in the browser after the page loads.</p>
        </a>
      </div>
    </section>
  );
}

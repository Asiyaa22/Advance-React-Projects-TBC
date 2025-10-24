import "./globals.css";

export const metadata = {
  title: "SSR Next Demo",
  description: "Learn SSR vs CSR in Next.js (App Router)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="brand">
            <img src="/logo.svg" alt="Logo" width="28" height="28" />
            <span>SSR Next Demo</span>
          </div>
          <nav>
            <a href="/">Home</a>
            <a href="/ssr">SSR Page</a>
            <a href="/csr">CSR Page</a>
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">© {new Date().getFullYear()} SSR Demo</footer>
      </body>
    </html>
  );
}

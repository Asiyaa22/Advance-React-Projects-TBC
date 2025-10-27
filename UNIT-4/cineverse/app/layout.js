import "./globals.css";
// import logo from "../public/logo.svg";

export const metadata = {
  title: "CineVerse",
  description: "CineVerse — Movie Explorer with SSR + CSR (Next.js)",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="brand">
            <img src="/logo.svg" alt="CineVerse"  width="420" height="150" />
            <span>CineVerse</span>
          </div>
          <nav>
            <a href="/">Home</a>
            <a href="/search">Search</a>
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">© {new Date().getFullYear()} CineVerse</footer>
      </body>
    </html>
  );
}
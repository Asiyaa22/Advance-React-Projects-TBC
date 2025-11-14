import MovieList from "@/components/MovieList";

const base_url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function getMovies() {
  // server-side absolute fetch (works in dev)
  const res = await fetch(`${base_url}/api/movies`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch movies");
  return res.json();
}


export default async function Home() {
  const movies = await getMovies();
  return (
    <section>
      <h1>Trending Movies</h1>
      <p className="muted">Server-rendered trending movies for SEO & fast first paint.</p>
      <MovieList movies={movies} />
    </section>
  );
}
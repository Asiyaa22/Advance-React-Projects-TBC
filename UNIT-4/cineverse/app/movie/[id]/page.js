import MovieCard from "@/components/MovieCard";
export const dynamic = "force-dynamic";


async function getMovie(id) {
  // Guard: if no id, don't call API
  if (!id) return null;
  const base_url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${base_url}/api/movies?id=${encodeURIComponent(id)}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch movie");
  const data = await res.json();
  return data[0] ?? null;
}

/**
 * NOTE:
 * In some Next.js versions `params` can be a Promise — so we await it before using.
 * This avoids the error: "params is a Promise and must be unwrapped with await".
 */
export async function generateMetadata({ params }) {
  // await params in case it's a Promise
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  if (!id) {
    return { title: "CineVerse", description: "Movie details" };
  }

  const movie = await getMovie(id);
  return {
    title: movie ? `${movie.title} | CineVerse` : "CineVerse",
    description: movie ? movie.description.slice(0, 150) : "Movie details",
  };
}

export default async function MoviePage({ params }) {
  // unwrap params before use
  const resolvedParams = await params;
  const id = resolvedParams?.id;

  if (!id) return <p>Invalid movie id.</p>;

  const movie = await getMovie(id);

  if (!movie) return <p>Movie not found.</p>;

  // fallback poster if file missing
  const poster = movie.poster || "/posters/aurora.jpg";

  return (
    <section>
      <h1>{movie.title}</h1>
      <p className="muted">
        {movie.genre} • {movie.year} • ⭐ {movie.rating}
      </p>

      <div style={{ marginTop: 12 }}>
        {/* pass poster fallback into MovieCard (MovieCard uses movie.poster) */}
        <MovieCard movie={{ ...movie, poster }} detail />
      </div>
    </section>
  );
}

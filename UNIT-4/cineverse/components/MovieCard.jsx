import Link from "next/link";


export default function MovieCard({ movie, detail }) {
    return (
        <article className="movie-card">
            <Link href={`/movie/${movie.id}`}>
                <img className="movie-poster" src="/posters/aurora.svg" alt={movie.title} />
            </Link>


            <div className="movie-meta">
                <div>
                    <div className="title">{movie.title}</div>
                    <div className="muted">{movie.genre} • {movie.year}</div>
                </div>
                <div className="rating">⭐ {movie.rating}</div>
            </div>


            {detail && (
                <div style={{ marginTop: 12 }}>
                    <p className="muted">{movie.description}</p>
                    <p className="muted" style={{ marginTop: 8 }}>Stamp: <code>{movie.serverStampFormatted}</code></p>
                </div>
            )}
        </article>
    );
}
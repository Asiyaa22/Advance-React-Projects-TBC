import MovieCard from "./MovieCard";


export default function MovieList({ movies }) {
    if (!movies || movies.length === 0) return <p className="muted">No movies found.</p>;
    return (
        <div className="grid">
            {movies.map((m) => (
                <MovieCard key={m.id} movie={m} />
            ))}
        </div>
    );
}
"use client";


import { useEffect, useState } from "react";
import MovieList from "@/components/MovieList";
import SearchBar from "@/components/SearchBar";
import FilterDropdown from "@/components/FilterDropdown";


export default function SearchPage() {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [genre, setGenre] = useState("All");
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const base_url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        let active = true;
        (async () => {
            try {
                const res = await fetch(`${base_url}/api/movies`);
                const data = await res.json();
                if (active) setMovies(data);
            } finally {
                if (active) setLoading(false);
            }
        })();
        return () => (active = false);
    }, []);


    const filtered = movies.filter((m) => {
        const matchesQuery = m.title.toLowerCase().includes(query.toLowerCase());
        const matchesGenre = genre === "All" || m.genre === genre;
        return matchesQuery && matchesGenre;
    });


    return (
        <section>
            <h1>Search Movies</h1>
            <p className="muted">Client-side filtering and search (fast interactivity).</p>


            <div className="search-bar">
                <SearchBar value={query} onChange={(v) => setQuery(v)} />
                <FilterDropdown movies={movies} value={genre} onChange={setGenre} />
            </div>


            {loading ? <p className="muted">Loading…</p> : <MovieList movies={filtered} />}
        </section>
    );
}
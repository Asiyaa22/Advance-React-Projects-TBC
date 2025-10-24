export async function GET(req) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");


    const movies = [
        { id: "1", title: "Aurora: Dawn of Stars", genre: "Sci-Fi", rating: 8.2, year: 2024, poster: "/posters/aurora.jpg", description: "A space opera about discovery and the human spirit." },
        { id: "2", title: "Midnight City", genre: "Drama", rating: 7.4, year: 2023, poster: "/posters/midnight.jpg", description: "Intertwined lives in a neon-lit city." },
        { id: "3", title: "Echoes", genre: "Horror", rating: 6.9, year: 2022, poster: "/posters/echoes.jpg", description: "A haunting story about memory and grief." },
        { id: "4", title: "Gold Rush Heist", genre: "Action", rating: 7.9, year: 2025, poster: "/posters/heist.jpg", description: "A slick heist movie with high stakes and heart." },
        { id: "5", title: "Sunset Strings", genre: "Romance", rating: 7.1, year: 2021, poster: "/posters/sunset.jpg", description: "Two musicians find love and purpose." },
    ];


    if (id) {
        return Response.json(movies.filter((m) => m.id === id));
    }


    // add a server-side timestamp (formatted) to avoid hydration mismatch
    const formatted = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });


    const payload = movies.map((m) => ({ ...m, serverStampFormatted: formatted }));
    return Response.json(payload);
}
export default function FilterDropdown({ movies = [], value, onChange }) {
    const genres = ["All", ...Array.from(new Set(movies.map((m) => m.genre)))];
    return (
        <select className="filter" value={value} onChange={(e) => onChange(e.target.value)}>
            {genres.map((g) => (
                <option key={g} value={g}>{g}</option>
            ))}
        </select>
    );
}
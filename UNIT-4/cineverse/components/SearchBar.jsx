export default function SearchBar({ value, onChange }) {
    return (
        <input
            className="input"
            placeholder="Search by title..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
// src/components/PollList.jsx
import PollCard from "./PollCard";

export default function PollList({ polls, onVote }) {
  // Defensive: ensure polls is an array
  if (!Array.isArray(polls)) {
    // you can render a loading placeholder or an error message depending on your app state
    return <div>Loading polls...</div>;
  }

  if (polls.length === 0) return <div>No polls yet</div>;

  return (
    <section>
      {polls.map(p => (
        <PollCard key={p.id} poll={p} onVote={onVote} />
      ))}
    </section>
  );
}

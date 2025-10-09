export default function PollCard({ poll, onVote }) {
  return (
    <article aria-label={`poll-${poll.id}`}>
      <h3>{poll.question}</h3>
      <ul>
        {poll.options.map(opt => (
          <li key={opt.id}>
            <button aria-label={`vote-${poll.id}-${opt.id}`} onClick={() => onVote(poll.id, opt.id)}>
              {opt.text} — <strong>{opt.votes}</strong>
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}

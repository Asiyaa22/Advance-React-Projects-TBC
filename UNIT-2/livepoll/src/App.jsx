import React from "react";
import { usePolls } from "./hooks/usePolls";
import NewPollForm from "./components/NewPollForm";
import PollList from "./components/PollList";

export default function App() {
  const { polls, status, addPoll, castVote } = usePolls();

  return (
    <div>
      <h1>LivePoll</h1>
      <NewPollForm onCreate={addPoll} />
      {status === "loading" && <div role="status">Loading polls...</div>}
      {status === "error" && <div role="alert">Failed loading polls</div>}
      {status === "success" && <PollList polls={polls} onVote={castVote} />}
    </div>
  );
}

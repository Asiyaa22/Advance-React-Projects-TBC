import { useState } from "react";

export default function NewPollForm({ onCreate }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addOption = () => setOptions(prev => [...prev, ""]);
  const updateOption = (idx, val) => setOptions(prev => prev.map((o, i) => i === idx ? val : o));
  const removeOption = (idx) => setOptions(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const trimmedOptions = options.map(o => o.trim()).filter(Boolean);
    if (!question.trim() || trimmedOptions.length < 2) {
      setError("Enter a question and at least two options.");
      return;
    }
    setLoading(true);
    try {
      await onCreate({ question: question.trim(), options: trimmedOptions });
      setQuestion("");
      setOptions(["", ""]);
    } catch (err) {
      setError("Failed to create poll.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="new-poll-form">
      <div>
        <label htmlFor="question">Question</label><br />
        <input id="question" value={question} onChange={e => setQuestion(e.target.value)} />
      </div>

      <div>
        <label>Options</label>
        {options.map((opt, i) => (
          <div key={i}>
            <input aria-label={`option-${i}`} value={opt} onChange={e => updateOption(i, e.target.value)} />
            {options.length > 2 && (
              <button type="button" aria-label={`remove-${i}`} onClick={() => removeOption(i)}>Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addOption}>Add option</button>
      </div>

      {error && <div role="alert">{error}</div>}

      <div>
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Poll"}</button>
      </div>
    </form>
  );
}

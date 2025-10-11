// src/hooks/usePolls.js
import { useEffect, useState, useRef } from "react";
import * as api from "../api/pollsApi";
import * as socket from "../socket/socketClient";

function asArray(x) {
  if (Array.isArray(x)) return x;
  // helpful debug: log unexpected shapes once (only in dev)
  if (import.meta.env.DEV) {
    // avoid spamming console
    console.warn("usePolls: normalizing non-array state to array:", x);
  }
  // if it's an object with a polls property, return that
  if (x && typeof x === "object" && Array.isArray(x.polls)) return x.polls;
  // fallback: return empty array
  return [];
}

export function usePolls() {
  const [polls, setPolls] = useState([]);
  const [status, setStatus] = useState("idle"); // idle|loading|success|error
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setStatus("loading");

    api.fetchPolls()
      .then(data => {
        // normalize shape: accept either an array or { polls: [...] }
        const normalized = Array.isArray(data) ? data : (data && data.polls) ? data.polls : [];
        if (mounted.current) {
          setPolls(normalized);
          setStatus("success");
        }
      })
      .catch(() => {
        if (mounted.current) setStatus("error");
      });

    // listen to real-time updates
    const unsubscribe = socket.on("poll:update", (updatedPoll) => {
      setPolls(prev => {
        const list = asArray(prev);
        return list.map(p => p.id === updatedPoll.id ? updatedPoll : p);
      });
    });

    return () => {
      mounted.current = false;
      try { unsubscribe(); } catch (e) {}
    };
  }, []);

  const addPoll = async (payload) => {
    const created = await api.createPoll(payload);
    setPolls(prev => {
      const list = asArray(prev);
      return [created, ...list];
    });
    return created;
  };

  const castVote = async (pollId, optionId) => {
    // optimistic update (defensive)
    setPolls(prev => {
      const list = asArray(prev);
      return list.map(p => p.id === pollId ? {
        ...p,
        options: p.options.map(o => o.id === optionId ? { ...o, votes: o.votes + 1 } : o)
      } : p);
    });

    try {
      const updated = await api.vote(pollId, optionId);
      setPolls(prev => {
        const list = asArray(prev);
        return list.map(p => p.id === updated.id ? updated : p);
      });
    } catch (err) {
      // revert by refetching on error (defensive)
      try {
        const fresh = await api.fetchPolls();
        const normalized = Array.isArray(fresh) ? fresh : (fresh && fresh.polls) ? fresh.polls : [];
        setPolls(normalized);
      } catch {
        // ignore - keep previous state if refetch also fails
      }
      throw err;
    }
  };

  return { polls, status, addPoll, castVote };
}

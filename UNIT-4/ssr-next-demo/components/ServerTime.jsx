"use client";

import { useEffect, useState } from "react";

export default function ServerTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const now = new Date();
    setTime(now.toLocaleString());
  }, []);

  return (
    <div className="info">
      <span>Server Time:</span> <code>{time || "Loading..."}</code>
    </div>
  );
}

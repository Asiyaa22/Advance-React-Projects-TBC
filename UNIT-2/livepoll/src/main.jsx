import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// Start MSW worker in dev so the app runs without a real backend
if (import.meta.env.DEV) {
  // dynamic import so worker is only loaded in dev
  import("./mocks/browser").then(({ worker }) => {
    worker.start({ onUnhandledRequest: "bypass" });
  });
}

createRoot(document.getElementById("root")).render(<App />);

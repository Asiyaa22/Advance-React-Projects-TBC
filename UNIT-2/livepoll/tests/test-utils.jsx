// tests/test-utils.jsx
import React from "react";
import { render } from "@testing-library/react";

export * from "@testing-library/react";

/**
 * customRender: simple wrapper for render.
 * Expand this to include Providers (Router, Context, etc.) if needed.
 */
export function customRender(ui, options) {
  return render(ui, { wrapper: ({ children }) => children, ...options });
}

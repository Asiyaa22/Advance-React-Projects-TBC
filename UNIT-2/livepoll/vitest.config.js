// vitest.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: "./tests/setupTests.js",
    globals: true,
    testTimeout: 10000, // 10 seconds per test default (adjust if needed)
    coverage: {
      provider: "istanbul"
    }
  }
});

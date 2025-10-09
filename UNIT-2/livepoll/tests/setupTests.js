// tests/setupTests.js
import React from "react";
// expose React as a global to satisfy JSX transforms that call React.createElement
global.React = React;

import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server";

// Start MSW before tests, reset handlers after each test, and close after all tests
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

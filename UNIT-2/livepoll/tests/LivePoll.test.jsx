// tests/LivePoll.test.jsx
import React from "react";
import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { customRender, screen, waitFor, cleanup } from "./test-utils";

// Mock the socket client BEFORE importing app so the app uses the mock
vi.mock("../src/socket/socketClient", () => {
  const handlers = {};
  return {
    on: (event, cb) => {
      handlers[event] ||= [];
      handlers[event].push(cb);
      return () => { handlers[event] = handlers[event].filter(f => f !== cb); };
    },
    emit: () => {},
    // test helper to simulate server-sent events
    __testUtils: {
      emitToTests: (event, payload) => {
        (handlers[event] || []).forEach(cb => cb(payload));
      }
    }
  };
});

let App;
let emitToTests;

beforeAll(async () => {
  // import after mocking socketClient so module uses the mock
  const mod = await import("../src/App");
  App = mod.default;
  const socketMock = await import("../src/socket/socketClient");
  emitToTests = socketMock.__testUtils.emitToTests;
});

beforeEach(() => {
  cleanup();
});

describe("LivePoll app", () => {
  it("loads and displays polls from API", async () => {
    customRender(<App />);
    // initial loading indicator
    expect(screen.getByRole("status")).toHaveTextContent("Loading polls...");
    // wait for initial poll from MSW
    const poll = await screen.findByText("Best color?");
    expect(poll).toBeInTheDocument();
  });

  it("lets user create a poll and shows it", async () => {
    customRender(<App />);
    // ensure initial data loaded
    await screen.findByText("Best color?");

    const user = userEvent.setup();

    const questionInput = screen.getByLabelText(/Question/i);
    const option0 = screen.getByLabelText("option-0");
    const option1 = screen.getByLabelText("option-1");

    // clear + type (await to ensure act())
    await user.clear(questionInput);
    await user.type(questionInput, "Favorite fruit?");
    await user.clear(option0);
    await user.type(option0, "Apple");
    await user.clear(option1);
    await user.type(option1, "Banana");

    // submit
    await user.click(screen.getByRole("button", { name: /Create Poll/i }));

    // wait for the created poll to appear (increased timeout)
    const newPoll = await screen.findByText("Favorite fruit?", {}, { timeout: 8000 });
    expect(newPoll).toBeInTheDocument();
  });

  it("lets user vote and updates counts (optimistic + final)", async () => {
    customRender(<App />);
    await screen.findByText("Best color?");

    const user = userEvent.setup();

    // find the Blue button by its aria-label
    const blueBtn = screen.getByLabelText("vote-p1-o2");
    expect(blueBtn).toHaveTextContent("Blue — 3");

    // click (await to ensure act())
    await user.click(blueBtn);

    // optimistic update should reflect immediately
    expect(blueBtn).toHaveTextContent("Blue — 4");

    // server (MSW) also increments; wait for stable final state
    await waitFor(() => expect(blueBtn).toHaveTextContent("Blue — 4"), { timeout: 5000 });
  });

  it("updates UI when real-time poll:update event is received", async () => {
    customRender(<App />);
    await screen.findByText("Best color?");

    const updated = {
      id: "p1",
      question: "Best color?",
      options: [
        { id: "o1", text: "Red", votes: 5 },
        { id: "o2", text: "Blue", votes: 7 }
      ]
    };

    // emit and wait for UI to reflect change
    emitToTests("poll:update", updated);

    await waitFor(() => {
      expect(screen.getByText(/Red —/)).toHaveTextContent("Red — 5");
      expect(screen.getByText(/Blue —/)).toHaveTextContent("Blue — 7");
    }, { timeout: 3000 });
  });

  it("shows validation errors when creating invalid poll", async () => {
    customRender(<App />);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Create Poll/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Enter a question and at least two options.");
  });
});

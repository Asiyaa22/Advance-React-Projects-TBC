import { rest } from "msw";

let polls = [
  {
    id: "p1",
    question: "Best color?",
    options: [
      { id: "o1", text: "Red", votes: 2 },
      { id: "o2", text: "Blue", votes: 3 }
    ]
  }
];

export const handlers = [
  rest.get("/api/polls", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(polls));
  }),

  rest.post("/api/polls", async (req, res, ctx) => {
    const body = await req.json();
    const newPoll = {
      id: `p${Date.now()}`,
      question: body.question,
      options: body.options.map((text, i) => ({ id: `o${Date.now()}${i}`, text, votes: 0 }))
    };
    polls = [newPoll, ...polls];
    return res(ctx.status(201), ctx.json(newPoll));
  }),

  rest.post("/api/polls/:pollId/vote", async (req, res, ctx) => {
    const { pollId } = req.params;
    const { optionId } = await req.json();
    polls = polls.map(p => p.id === pollId ? {
      ...p,
      options: p.options.map(o => o.id === optionId ? { ...o, votes: o.votes + 1 } : o)
    } : p);
    const updated = polls.find(p => p.id === pollId);
    return res(ctx.status(200), ctx.json(updated));
  })
];

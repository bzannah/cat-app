import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Fact } from "./Fact";
import { BrowserRouter } from "react-router-dom";

const server = setupServer(
  rest.get("*", (req, res, ctx) => {
    return res(
      ctx.json({
        fact: "Statistics indicate that animal lovers in recent years have shown a preference for cats over dogs!",
        length: 98,
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("fact is loading in", async () => {
  render(<Fact />);

  expect(screen.getByTestId("fact-loading")).toBeInTheDocument();
});

test("fact is loaded in", async () => {
  render(
    <BrowserRouter>
      <Fact />
    </BrowserRouter>
  );

  await waitFor(() =>
    expect(screen.getByTestId("fact-success")).toBeInTheDocument()
  );
});

test("handles server error", async () => {
  server.use(
    rest.get("*", (req, res, ctx) => {
      return res.networkError("Some strange things happening");
    })
  );

  render(
    <BrowserRouter>
      <Fact />
    </BrowserRouter>
  );

  await waitFor(() =>
    expect(screen.getByTestId("fact-error")).toBeInTheDocument()
  );
});

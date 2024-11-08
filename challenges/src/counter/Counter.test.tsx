import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Counter from "./Counter";
import "@testing-library/jest-dom/vitest";

describe("Counter", () => {

  afterEach(cleanup);

  it("should start at 0", () => {
    render(<Counter />);

    expect(screen.getByTestId("output")).toHaveTextContent("0");
  });

  it("should increment", async () => {
    render(<Counter />);

    await userEvent.click(screen.getByTestId("increment"));

    expect(screen.getByTestId("output")).toHaveTextContent("1");
  });

  it("should decrement", async () => {
    render(<Counter />);

    await userEvent.click(screen.getByTestId("decrement"));

    expect(screen.getByTestId("output")).toHaveTextContent("-1");
  });

  it("should increment and decrement", async () => {
    render(<Counter />);

    await userEvent.click(screen.getByTestId("increment"));
    await userEvent.click(screen.getByTestId("increment"));
    await userEvent.click(screen.getByTestId("increment"));
    await userEvent.click(screen.getByTestId("decrement"));

    expect(screen.getByTestId("output")).toHaveTextContent("2");
  });
});

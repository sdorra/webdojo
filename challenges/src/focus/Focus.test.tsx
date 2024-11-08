import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Focus from "./Focus";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

describe("Focus", () => {

  afterEach(cleanup);

  it("should start without focus", async () => {
    render(<Focus />);

    expect(screen.getByRole("textbox")).not.toHaveFocus();
  });

  it("should gain focus after click", async () => {
    render(<Focus />);

    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("textbox")).toHaveFocus();
  });

});

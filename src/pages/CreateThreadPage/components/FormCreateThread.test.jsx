// * Test Scenario:
//   - The user can type the title correctly.
//   - The user can type the category correctly.
//   - The user can type the body correctly.
//   - The user can submit the form correctly.

import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";

import FormCreateThread from "./FormCreateThread";

expect.extend(matchers);

describe("FormCreateThread components", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle title typing correctly", async () => {
    render(<FormCreateThread />);

    const titleInput = screen.getByLabelText("Judul");

    await userEvent.type(titleInput, "Hello World");

    expect(titleInput).toHaveValue("Hello World");
  });

  it("should handle category typing correctly", async () => {
    render(<FormCreateThread />);

    const categoryInput = screen.getByLabelText("Kategori");

    await userEvent.type(categoryInput, "Programming");

    expect(categoryInput).toHaveValue("Programming");
  });

  it("should handle body typing correctly", async () => {
    render(<FormCreateThread />);

    const bodyInput = screen.getByLabelText("Isi");

    await userEvent.type(bodyInput, "Hello World");

    expect(bodyInput).toHaveValue("Hello World");
  });

  it("should call handlePostThread function when form is submitted", async () => {
    const mockPostThread = vi.fn();
    render(<FormCreateThread handlePostThread={mockPostThread} />);

    const titleInput = screen.getByLabelText("Judul");
    const categoryInput = screen.getByLabelText("Kategori");
    const bodyInput = screen.getByLabelText("Isi");

    await userEvent.type(titleInput, "Hello World");
    await userEvent.type(categoryInput, "Programming");
    await userEvent.type(bodyInput, "Hello World");

    const submitButton = screen.getByRole("button", { name: "Buat thread" });

    userEvent.click(submitButton);

    await vi.waitFor(() => {
      expect(mockPostThread).toHaveBeenCalledWith({
        title: "Hello World",
        category: "Programming",
        body: "Hello World",
      });
    });
  });
});

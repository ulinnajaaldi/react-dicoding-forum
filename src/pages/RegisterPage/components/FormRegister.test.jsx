// * Testing Scenario
//   - should handle name typing correctly
//   - should handle email typing correctly
//   - should handle password typing correctly
//   - should call handleRegister function when form is submitted

import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";

import FormRegister from "./FormRegister";

expect.extend(matchers);

describe("FormRegister components", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle name typing correctly", async () => {
    render(<FormRegister />);

    const nameInput = screen.getByLabelText("Nama");

    await userEvent.type(nameInput, "John Doe");

    expect(nameInput).toHaveValue("John Doe");
  });

  it("should handle email typing correctly", async () => {
    render(<FormRegister />);

    const emailInput = screen.getByLabelText("Email");

    await userEvent.type(emailInput, "test@gmail.com");

    expect(emailInput).toHaveValue("test@gmail.com");
  });

  it("should handle password typing correctly", async () => {
    render(<FormRegister />);

    const passwordInput = screen.getByLabelText("Password");

    await userEvent.type(passwordInput, "123456");

    expect(passwordInput).toHaveValue("123456");
  });

  it("should call handleRegister function when form is submitted", async () => {
    const mockRegister = vi.fn();
    render(<FormRegister handleRegister={mockRegister} />);

    const nameInput = screen.getByLabelText("Nama");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "tets@gmail.com");
    await userEvent.type(passwordInput, "123456");

    const registerButton = screen.getByRole("button", { name: "Buat Akun" });

    await userEvent.click(registerButton);

    expect(mockRegister).toHaveBeenCalledWith({
      name: "John Doe",
      email: "tets@gmail.com",
      password: "123456",
    });
  });
});

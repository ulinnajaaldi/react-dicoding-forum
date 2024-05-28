// * Testing Scenario:
//   - Test if the email input is working correctly
//   - Test if the password input is working correctly
//   - Test if the handleLogin function is called when the form is submitted

import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";

import FormLogin from "./FormLogin";

expect.extend(matchers);

describe("FormLogin components", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle email typing correctly", async () => {
    render(<FormLogin />);

    const emailInput = screen.getByLabelText("Email");

    await userEvent.type(emailInput, "test@gmail.com");

    expect(emailInput).toHaveValue("test@gmail.com");
  });

  it("should handle password typing correctly", async () => {
    render(<FormLogin />);

    const passwordInput = screen.getByLabelText("Password");

    await userEvent.type(passwordInput, "123456");

    expect(passwordInput).toHaveValue("123456");
  });

  it("should call handleLogin function when form is submitted", async () => {
    const mockLogin = vi.fn();
    render(<FormLogin handleLogin={mockLogin} />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    await userEvent.type(emailInput, "test@gmail.com");
    await userEvent.type(passwordInput, "123456");

    const loginButton = screen.getByRole("button", { name: "Login" });
    await userEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@gmail.com",
      password: "123456",
    });
  });
});

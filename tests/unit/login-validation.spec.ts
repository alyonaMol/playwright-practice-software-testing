import { test, expect } from "@playwright/test";
import { validateLoginForm } from "../../utils/login-validation";

test.describe("Login form validation", () => {
  test("should return an error when email is empty", () => {
    const result = validateLoginForm({
      email: "",
      password: "Password123",
    });

    expect(result).toEqual(["Email is required"]);
  });

  test("should return an error when password is shorter than 8 characters", () => {
    const result = validateLoginForm({
      email: "test@mail.com",
      password: "123",
    });

    expect(result).toEqual(["Password must contain at least 8 characters"]);
  });

  test("should return an error when password contains only spaces", () => {
    const result = validateLoginForm({
      email: "test@mail.com",
      password: "        ",
    });

    expect(result).toEqual(["Password is required"]);
  });

  test("should return an empty array when all data is valid", () => {
    const result = validateLoginForm({
      email: "test@mail.com",
      password: "Password123",
    });

    expect(result).toEqual([]);
  });
  test("should accept a password with exactly 8 characters", () => {
    const result = validateLoginForm({
      email: "test@mail.com",
      password: "12345678",
    });

    expect(result).toEqual([]);
  });

  test("should return an error when password and email are empty", () => {
    const result = validateLoginForm({
      email: "",
      password: "",
    });

    expect(result).toEqual(["Email is required", "Password is required"]);
  });

  test("should return an error when email contains only spaces", () => {
    const result = validateLoginForm({
      email: " ",
      password: "Password123",
    });

    expect(result).toEqual(["Email is required"]);
  });

  test("should accept email with leading and trailing spaces", () => {
    const result = validateLoginForm({
      email: "  test@mail.com  ",
      password: "Password123",
    });

    expect(result).toEqual([]);
  });

  test("should return password error when email contains surrounding spaces", () => {
    const result = validateLoginForm({
      email: "  test@mail.com  ",
      password: "1234567",
    });

    expect(result).toEqual(["Password must contain at least 8 characters"]);
  });

  test("should return email and password errors when email contains only spaces and password is too short", () => {
    const result = validateLoginForm({
      email: "  ",
      password: "123",
    });

    expect(result).toEqual([
      "Email is required",
      "Password must contain at least 8 characters",
    ]);
  });
});

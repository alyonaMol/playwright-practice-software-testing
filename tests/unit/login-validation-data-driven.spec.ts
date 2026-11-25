import { test, expect } from "@playwright/test";
import { validateLoginForm } from "../../utils/login-validation";

type PasswordTestCase = {
  testName: string;
  password: string;
  expected: string[];
};

const passwordTestCases: PasswordTestCase[] = [
  {
    testName: "empty password",
    password: "",
    expected: ["Password is required"],
  },
  {
    testName: "password with 3 characters",
    password: "123",
    expected: ["Password must contain at least 8 characters"],
  },
  {
    testName: "password with 7 characters",
    password: "1234567",
    expected: ["Password must contain at least 8 characters"],
  },
  {
    testName: "password with exactly 8 characters",
    password: "12345678",
    expected: [],
  },
  {
    testName: "valid password",
    password: "Password123",
    expected: [],
  },
];
for (const testCase of passwordTestCases) {
  test(`should handle ${testCase.testName}`, () => {
    const result = validateLoginForm({
      email: "test@mail.com",
      password: testCase.password,
    });

    expect(result).toEqual(testCase.expected);
  });
}

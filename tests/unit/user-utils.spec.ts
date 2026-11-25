import { test, expect } from "@playwright/test";
import {
  getActiveCustomerEmails,
  createUser,
  getUserEmail,
  getUserEmailOrFail,
} from "../../utils/user-utils";
import type { User } from "../../types/user.types";

test.describe("getActiveCustomerEmails", () => {
  const testCases: {
    user: User;
    expected: string[];
  }[] = [
    {
      user: {
        firstName: "John",
        lastName: "Brown",
        email: "admin@mail.com",
        password: "Admin12345",
        role: "admin",
        isActive: true,
      },
      expected: [],
    },
    {
      user: {
        firstName: "Janice",
        lastName: "Dorsett",
        email: "manager@mail.com",
        password: "Manager12345",
        role: "manager",
        isActive: true,
      },
      expected: [],
    },
    {
      user: {
        firstName: "Anna",
        lastName: "Smith",
        email: "anna@mail.com",
        password: "Password123",
        role: "customer",
        isActive: true,
      },
      expected: ["anna@mail.com"],
    },
    {
      user: {
        firstName: "Kate",
        lastName: "Wilson",
        email: "kate@mail.com",
        password: "Password123",
        role: "customer",
        isActive: false,
      },
      expected: [],
    },
  ];

  for (const testCase of testCases) {
    test(`should return expected result for ${testCase.user.role}, active: ${testCase.user.isActive}`, () => {
      const result = getActiveCustomerEmails([testCase.user]);

      expect(result).toEqual(testCase.expected);
    });
  }

  test("should return an empty array when no users are provided", () => {
    const result = getActiveCustomerEmails([]);

    expect(result).toEqual([]);
  });
});

test.describe("createUser", () => {
  const testCases: {
    email: string;
    role: User["role"];
    isActive: boolean;
    expected: User;
  }[] = [
    {
      email: "admin@mail.com",
      role: "admin",
      isActive: true,
      expected: {
        firstName: "Test",
        lastName: "User",
        email: "admin@mail.com",
        password: "Password123",
        role: "admin",
        isActive: true,
      },
    },

    {
      email: "customer@mail.com",
      role: "customer",
      isActive: false,
      expected: {
        firstName: "Test",
        lastName: "User",
        email: "customer@mail.com",
        password: "Password123",
        role: "customer",
        isActive: false,
      },
    },
    {
      email: "manager@mail.com",
      role: "manager",
      isActive: true,
      expected: {
        firstName: "Test",
        lastName: "User",
        email: "manager@mail.com",
        password: "Password123",
        role: "manager",
        isActive: true,
      },
    },
  ];

  for (const testCase of testCases) {
    test(`should create ${testCase.role} with correct data`, () => {
      const result = createUser(
        testCase.email,
        testCase.role,
        testCase.isActive,
      );

      expect(result).toEqual(testCase.expected);
    });
  }
});
test("should return user email asynchronously", async () => {
  const user = createUser("test@example.com", "customer", true);
  const email = await getUserEmail(user);
  expect(email).toEqual("test@example.com");
});
test("should return email with await", async () => {
  const user = createUser("test@example.com", "customer", true);
  const email = await getUserEmail(user);
  expect(email).toEqual("test@example.com");
});
test("should return Promise without await", () => {
  const user = createUser("test@example.com", "customer", true);
  const emailPromise = getUserEmail(user);
  expect(emailPromise).toBeInstanceOf(Promise);
});
test("should return emails for multiple users using Promise.all", async () => {
  const users: User[] = [
    createUser("anna@mail.com", "customer", true),
    createUser("john@mail.com", "manager", true),
    createUser("kate@mail.com", "customer", false),
  ];

  const emailPromises = users.map((user) => getUserEmail(user));
  const emails = await Promise.all(emailPromises);

  expect(emails).toEqual(["anna@mail.com", "john@mail.com", "kate@mail.com"]);
});

test("should return email if shouldFail: false", async () => {
  const user = createUser("test@example.com", "customer", true);
  const email = await getUserEmailOrFail(user, false);
  expect(email).toEqual("test@example.com");
});

test("should throw error if shouldFail: true", async () => {
  const user = createUser("test@example.com", "customer", true);
  let errorCaught = false;
  try {
    await getUserEmailOrFail(user, true);
  } catch (error) {
    errorCaught = true;
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe("Failed to get user email");
  }
  expect(errorCaught).toBe(true);
});

test("should return email if shouldFail is false", async () => {
  const user = createUser("test@example.com", "customer", true);

  const email = await getUserEmailOrFail(user, false);

  expect(email).toBe("test@example.com");
});

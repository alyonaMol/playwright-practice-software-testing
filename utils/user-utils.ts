import type { User } from "../types/user.types";

export function getActiveCustomerEmails(users: User[]): string[] {
  return users
    .filter((user) => user.role === "customer" && user.isActive)
    .map((user) => user.email);
}
export function createUser(
  email: string,
  role: User["role"],
  isActive: boolean,
): User {
  return {
    firstName: "Test",
    lastName: "User",
    email,
    password: "Password123",
    role,
    isActive,
  };
}

export async function getUserEmail(user: User): Promise<string> {
  return user.email;
}

export async function getUserEmailOrFail(
  user: User,
  shouldFail: boolean,
): Promise<string> {
  if (shouldFail) {
    throw new Error("Failed to get user email");
  }

  return user.email;
}

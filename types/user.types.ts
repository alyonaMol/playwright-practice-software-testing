type UserRole = "admin" | "manager" | "customer";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}

const customer: User = {
  firstName: "Anna",
  lastName: "Smith",
  email: "anna@mail.com",
  password: "Password123",
  role: "customer",
  isActive: true,
};

const admin: User = {
  firstName: "John",
  lastName: "Brown",
  email: "admin@mail.com",
  password: "Admin12345",
  role: "admin",
  isActive: true,
};

const inactiveUser: User = {
  firstName: "Kate",
  lastName: "Wilson",
  email: "kate@mail.com",
  password: "Password123",
  role: "manager",
  isActive: false,
};

const users: User[] = [customer, admin, inactiveUser];

const result1 = users.find((user) => {
  return user.role === "admin";
});
if (result1 !== undefined) {
  console.log(result1.email);
} else {
  console.log("No admin user found");
}

const result5 = users
  .filter((user) => user.role === "customer" && user.isActive === true)
  .map((user) => user.email);
console.log(result5);

const result2 = users.filter((user) => {
  return user.isActive === true;
});

const result3 = users.map((user) => {
  return user.email;
});

const result4 = users.length;

export interface LoginForm {
  email: string;
  password: string;
}

export function validateLoginForm(form: LoginForm): string[] {
  const errors: string[] = [];

  const email = form.email.trim();
  const password = form.password.trim();

  if (email === "") {
    errors.push("Email is required");
  }

  if (password === "") {
    errors.push("Password is required");
  } else if (password.length < 8) {
    errors.push("Password must contain at least 8 characters");
  }

  return errors;
}

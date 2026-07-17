# Playwright Practice Software Testing

An automated testing framework for the **Toolshop** educational platform, built from scratch using **Playwright** and **TypeScript**. This project demonstrates the implementation of test automation best practices, architectural design patterns, and CI/CD integration.

---

## 📌 Project Overview & Objectives

**Practice Software Testing (Toolshop)** is a fully functional, modern e-commerce platform (an online tool store) specifically designed to showcase and practice complex real-world testing scenarios.

**The primary goals of this project are:**
* To gain hands-on experience with production-like business workflows (End-to-End, integration testing).
* To build a stable, scalable, and maintainable test automation framework from scratch.
* To implement a **hybrid testing approach** (combining UI and API interactions) to drastically optimize test execution time.
* To demonstrate proficiency in a modern automation tech stack for a QA Automation Engineer role.

---

## 💻 Tech Stack

* **Core Framework:** Playwright (Latest version)
* **Language:** TypeScript
* **Design Patterns:** Page Object Model (POM), Custom Fixtures (Page Factory)
* **CI/CD:** GitHub Actions (Automated test execution on every push or pull request)
* **Reporting:** Playwright HTML Report / Allure Report
* **AI Tooling:** ChatGPT / GitHub Copilot (Leveraged for static code analysis, locator optimization, and realistic test data generation)

---

## 🌐 System Under Test (SUT)

* **Target Application (UI):** [https://practicesoftwaretesting.com/](https://practicesoftwaretesting.com/)
* **API Documentation:** Available directly via the platform's endpoints (Swagger/API contracts for managing users, carts, and checkout processes).

---

## 📂 Project Structure

The framework follows a modular architecture to ensure clean separation of concerns and high maintainability:

```text
playwright-toolshop-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml       # CI/CD pipeline configuration (GitHub Actions)
├── src/
│   ├── pages/                   # Page Object Model (POM) classes
│   │   ├── base.page.ts         # Base page containing shared methods and assertions
│   │   ├── home.page.ts         # Homepage, filters, and product catalog
│   │   ├── login.page.ts        # Authentication and registration page
│   │   └── checkout.page.ts     # Shopping cart and checkout workflows
│   ├── fixtures/                # Custom Playwright fixtures for Page Factory
│   │   └── page-factory.ts
│   └── data/                    # Static test artifacts and environment data
│       └── test-data.json
├── tests/                       # Test suites (Specs)
│   ├── auth.spec.ts             # Sign-in and registration scenarios
│   ├── shopping-cart.spec.ts    # E2E shopping cart and checkout flows
│   └── api/                     # Pure API or backend integration tests
│       └── api-products.spec.ts
├── playwright.config.ts         # Global framework configurations (parallelization, viewports, browsers)
├── package.json                 # Project dependencies and custom npm scripts
└── README.md                    # Project documentation
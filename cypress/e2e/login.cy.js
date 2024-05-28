// *Testing Scenario:
// - should display login page correctly
// - should display toast when account not found
// - should display name in navbar correctly

describe("login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/login");
  });

  it("should display login page correctly", () => {
    cy.get('input[placeholder="m@example.com"]').should("be.visible");
    cy.get('input[type="password"]').should("be.visible");
    cy.get("button").contains("Login").should("be.visible");
  });

  it("should display toast when account not found", () => {
    cy.get('input[placeholder="m@example.com"]').type("awikwik@gmail.com");
    cy.get('input[type="password"]').type("123456");

    cy.get("button").contains("Login").click();

    cy.get('section[aria-label="Notifications alt+T"]', {
      timeout: 10000,
    }).should("have.text", "email or password is wrong");
  });

  it("should display name in navbar correctly", () => {
    cy.get('input[placeholder="m@example.com"]').type("masse@gmail.com");
    cy.get('input[type="password"]').type("masse@gmail.com");

    cy.get("button").contains("Login").click();

    cy.get("nav div button p", { timeout: 10000 }).should(
      "have.text",
      "Masseh",
    );
  });
});

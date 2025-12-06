describe("Login Page Test", () => {
  it("should load the login page", () => {
    cy.visit("https://my-nutrition-tracker.vercel.app/login");

    cy.contains("Welcome Back").should("exist");
    cy.contains("Welcome Back").scrollIntoView().should("be.visible");

    cy.get("button.auth-btn")
      .scrollIntoView()
      .should("exist")
      .should("be.visible");
  });
});

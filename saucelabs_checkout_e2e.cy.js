describe("e2e Checkout flow for Saucedemo website", () => {
  const username = Cypress.config("username");
  const password = Cypress.config("password");

  it("Saucedemo websote core checkout flow by randomly adding 3 products from top", () => {
    cy.visit("/v1/index.html")
      .get("#user-name")
      .type(username)
      .get("#password")
      .type(password)
      .get("#login-button")
      .click()
      .get(".product_label")
      .should("exist");

    //checkout flow
    cy.get("div.pricebar > button")
      .should("be.visible")
      .each((button, index) => {
        if (index < 3) {
          cy.wrap(button).click();
        }
      });
    cy.get(".shopping_cart_link").click();

    //complete necessary details of the recipient
    cy.get(".btn_action").click();
    cy.get('[data-test="firstName"]').type("lean");
    cy.get('[data-test="lastName"]').type("technologies");
    cy.get('[data-test="postalCode"]').type("546578");
    cy.get(".btn_primary").click();
    cy.get(".btn_action").should("exist");
    cy.get(".btn_action").click();
    cy.get(".complete-text").should(
      "have.text",
      "Your order has been dispatched, and will arrive just as fast as the pony can get\n                there!\n            "
    );
  });
});

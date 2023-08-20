describe("template spec", () => {
  it("Signs in and create a post", () => {
    // Go to site then click Sign In
    cy.visit("http://localhost:3000/");
    cy.contains("Sign In").click();
    cy.url().should("include", "/signin");

    // Login with email and password
    cy.get('[id="email"]').type(Cypress.env("TEST_USER_EMAIL"));
    cy.get('[id="password"]').type(Cypress.env("TEST_USER_PASSWORD"));
    cy.get('[id="loginWithEmailAndPasswordButton"]').click();

    // Go to the Create page
    cy.get('[id="menuButton"]').click();

    cy.contains("Create Post").click();
    cy.url().should("include", `/create`);

    // Enter the create post fields and click submit
    cy.get(`[id="title"]`).type("The 2nd Cypress Workout!");
    cy.get(`[id="shortDescription"]`).type("Creating this workout via cypress");
    cy.get(`[id="longDescription"]`).type(
      "1. Do\n2. Something\n3. Another workout more\n4. 500 pushups"
    );
    cy.get(`[id="videoSource"]`).type(
      "https://www.youtube.com/watch?v=BQqzfHQkREo"
    );
    cy.contains("Submit").click();
  });

  it("Signs up", () => {
    // Go to site then click Sign In
    cy.visit("http://localhost:3000/signup");

    // Login with email and password
    const date = new Date();
    const dateId = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;
    cy.get('[id="email"]').type(
      `${Cypress.env("TEST_USER_EMAIL_START")}+${dateId}${Cypress.env(
        "TEST_USER_EMAIL_END"
      )}`
    );
    cy.get('[id="password"]').type(Cypress.env("TEST_USER_PASSWORD"));
    cy.get('[id="confirmPassword"]').type(Cypress.env("TEST_USER_PASSWORD"));
    cy.get('[id="signUpButton"]').click();

    cy.contains("you are logged in.");
  });

  it("Tries to sign into an account that does't exist and gets an error message", () => {
    cy.visit("http://localhost:3000/signin");

    // Login with email and password for an account that doesn't exist
    cy.get('[id="email"]').type(Cypress.env("TEST_NOT_A_USER"));
    cy.get('[id="password"]').type("anything you want");
    cy.get('[id="loginWithEmailAndPasswordButton"]').click();
    cy.contains("An unexpected error occurred.");
  });
});

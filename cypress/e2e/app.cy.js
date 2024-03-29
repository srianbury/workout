describe("template spec", () => {
  it("Signs in, create a post, and edits it", () => {
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
    const title = "The 2nd Cypress Workout!";
    cy.get(`[id="title"]`).type(title);
    cy.get(`[id="shortDescription"]`).type("Creating this workout via cypress");
    cy.get(`[id="longDescription"]`).type(
      "1. Do\n2. Something\n3. Another workout more\n4. 500 pushups"
    );
    cy.get(`[id="videoSource"]`).type(
      "https://www.youtube.com/watch?v=muxy-ByHmpA&list=PLbcFFX__Cz6MJgBc-0gk-IHg_x1nkOieI&index=5"
    );
    cy.contains("Submit").click();

    // Should be redirected to the new post after it's created
    cy.url().should("include", `/p/`);
    cy.contains(title);

    // Click on the 3 Vertical dot edit menu
    cy.get(`[id="edit-post-menu-icon-button"]`).click();

    // Select Edit from the menu
    cy.get(`[id="edit-post-option-edit"]`).click();

    // Should be redirected to the "edit post" page
    cy.url().should("include", `/edit/`);
    const newTitle = "I updated the title!";
    cy.get(`[id="title"]`).clear().type(newTitle);
    cy.contains("Update").click();

    // Should be redirected back to the post after it's been updated and it should have the new title
    cy.url().should("include", `/p/`);
    cy.contains(newTitle);
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

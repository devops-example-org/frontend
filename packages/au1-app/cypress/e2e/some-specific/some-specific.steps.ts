import { Given, When, Then, Then as And } from "@badeball/cypress-cucumber-preprocessor";

When('I enter the text David into textbox', () => {
  cy.get('[data-testid="name-input"]').type('David');
});

Then('I see text David below', () => {
  cy.get('hello-world').contains('David').should('exist');
});

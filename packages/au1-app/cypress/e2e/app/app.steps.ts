import { Given, When, Then, Then as And } from "@badeball/cypress-cucumber-preprocessor";

Then('I see the Application top-bar', () => {
  cy.get('[data-testid="top-bar"]').should('exist');
});

Then('I see text KPMG on the top-bar', () => {
  cy.contains('KPMG').should('have.text');
});

import { Given, When } from "@badeball/cypress-cucumber-preprocessor";

const given = Given;
const when = When;

before(() => {
  cy.viewport('macbook-16');
})


Given('A webbrowser is on application home page', () => {
  cy.visit('http://localhost:8080'); //DevSkim: ignore DS137138 
});

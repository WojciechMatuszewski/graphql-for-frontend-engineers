/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    goToExercise(heading: string | RegExp): Chainable;
    goToFinal(): Chainable;
  }
}

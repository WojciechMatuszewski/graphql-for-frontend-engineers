/// <reference path="../support/index.d.ts" />

const EXERCISES = [
  "Setting up Apollo Client",
  "Queries",
  "Mutations",
  "Type Generation",
  "Interacting with the cache (basics)",
  "Authorization"
];

describe("Workshop exercises work correctly", () => {
  it("01", () => {
    cy.goToExercise(EXERCISES[0]).goToFinal();

    cy.contains("Application").should("be.visible");
  });

  it("02", () => {
    cy.goToExercise(EXERCISES[1]).goToFinal();

    cy.get("[data-cy=chat-message]").should("have.length.greaterThan", 2);
  });

  it("03", () => {
    cy.goToExercise(EXERCISES[2]).goToFinal();

    cy.contains("Edit profile").click();

    cy.contains("div", /first name/i)
      .parent()
      .find("input")
      .clear()
      .type("Wojtek");
    cy.contains(/submit/i).click();

    cy.contains(/user information/i);
    cy.contains("Wojtek");
  });

  it("04", () => {
    cy.goToExercise(EXERCISES[3]).goToFinal();
    cy.get("[data-cy=chat-message]").should("have.length.greaterThan", 2);
  });

  it("05", () => {
    cy.goToExercise(EXERCISES[4]).goToFinal();
    cy.contains("Open final on isolated page").click();
    cy.get("input").type("msg1 {enter}");

    cy.get('[data-cy="chat-message"]').contains("msg1");

    cy.get("input").type("msg2");
    cy.contains(/submit/i).click();

    cy.get('[data-cy="chat-message"]').contains("msg2");
  });

  it("06", () => {
    cy.goToExercise(EXERCISES[5]).goToFinal();

    cy.contains("Edit profile").click();

    cy.contains("div", /first name/i)
      .parent()
      .find("input")
      .clear()
      .type("Wojtek");
    cy.contains(/submit/i).click();

    cy.contains(/user information/i);
    cy.contains("Wojtek");
  });
});

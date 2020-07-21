/// <reference path="../support/index.d.ts" />

const EXERCISES = [
  "Setting up Apollo Client",
  "Queries",
  "Mutations",
  "Authorization",
  "Type Generation",
  "Interacting with cache"
];

describe("it works", () => {
  it("first", () => {
    cy.goToExercise(EXERCISES[0]).goToFinal();

    cy.contains("Application").should("be.visible");
  });

  it("second", () => {
    cy.goToExercise(EXERCISES[1]).goToFinal();

    cy.get("[data-cy=chat-message]").should("have.length.greaterThan", 2);
  });

  it("third", () => {
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

  it("fourth", () => {
    cy.goToExercise(EXERCISES[3]).goToFinal();

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

  it("fifth", () => {
    cy.goToExercise(EXERCISES[4]).goToFinal();
    cy.get("[data-cy=chat-message]").should("have.length.greaterThan", 2);
  });

  it("sixth", () => {
    cy.goToExercise(EXERCISES[5]).goToFinal();
    cy.contains("Open final on isolated page").click();
    cy.get("input").type("msg1 {enter}");

    cy.get('[data-cy="chat-message"]').contains("msg1");

    cy.get("input").type("msg2");
    cy.contains(/submit/i).click();

    cy.get('[data-cy="chat-message"]').contains("msg2");
  });
});

export {};

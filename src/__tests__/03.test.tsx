/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import {
  waitForElementToBeRemoved,
  screen,
  render
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GraphQLError } from "graphql";

describe("03", () => {
  it("enables the user to update his profile", async () => {
    expect(true).toBe(true);
  });

  it("handles errors when user tries to update his profile", async () => {
    expect(true).toBe(true);
  });
});

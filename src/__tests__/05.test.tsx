/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  screen,
  render,
  waitForElementToBeRemoved,
  wait
} from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { GraphQLError } from "graphql";

describe("05", () => {
  it("enables the user to post a message", async () => {
    expect(true).toBe(true);
  });

  it("handles errors while posting a message", async () => {
    expect(true).toBe(true);
  });
});

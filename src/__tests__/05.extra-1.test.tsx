import React from "react";
import { App } from "../final/05.extra-1";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitForElement
} from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import {
  EXERCISE5_EXTRA1_MESSAGE_MUTATION,
  EXERCISE5_EXTRA1_MESSAGES_QUERY
} from "../final/05.extra-1";
import { GraphQLError } from "graphql";

const MESSAGES_QUERY_MOCK: MockedResponse = {
  request: {
    query: EXERCISE5_EXTRA1_MESSAGES_QUERY
  },
  result: {
    data: {
      messages: [
        { id: "1", content: "First Message" },
        { id: "2", content: "Second Message" }
      ]
    }
  }
};

const SUCCESSFUL_MUTATION_MOCK: MockedResponse = {
  request: {
    query: EXERCISE5_EXTRA1_MESSAGE_MUTATION,
    variables: { input: { content: "Third Message" } }
  },
  result: {
    data: {
      message: {
        id: "3",
        content: "Third Message"
      }
    }
  }
};

const ERROR_MUTATION_MOCK: MockedResponse = {
  request: {
    query: EXERCISE5_EXTRA1_MESSAGE_MUTATION,
    variables: { input: { content: "Third Message" } }
  },
  result: {
    errors: [new GraphQLError("boom")]
  }
};

describe("05.extra-1 tests", () => {
  it("happy path", async () => {
    render(
      <MockedProvider
        mocks={[MESSAGES_QUERY_MOCK, SUCCESSFUL_MUTATION_MOCK]}
        addTypename={false}
      >
        <App />
      </MockedProvider>
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.getByText(/first message/i)).toBeInTheDocument();
    expect(screen.getByText(/second message/i)).toBeInTheDocument();

    await userEvent.type(screen.getByRole("textbox"), "Third Message");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/third message/i)).toBeInTheDocument();
  });

  it("sad path", async () => {
    render(
      <MockedProvider
        mocks={[MESSAGES_QUERY_MOCK, ERROR_MUTATION_MOCK]}
        addTypename={false}
      >
        <App />
      </MockedProvider>
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.getByText(/first message/i)).toBeInTheDocument();
    expect(screen.getByText(/second message/i)).toBeInTheDocument();

    await userEvent.type(screen.getByRole("textbox"), "Third Message");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByText(/could not send/i)).toBeInTheDocument();
  });
});

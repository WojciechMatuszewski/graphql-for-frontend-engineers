import React from "react";
import { App } from "../final/05.extra-1";
import userEvent from "@testing-library/user-event";
import { render, screen, wait } from "@testing-library/react";
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
        { id: "1", content: "Message1" },
        { id: "2", content: "Message2" }
      ]
    }
  }
};

const TEST_MESSAGE = "test message";
const SUCCESSFUL_MUTATION_MOCK: MockedResponse = {
  request: {
    query: EXERCISE5_EXTRA1_MESSAGE_MUTATION,
    variables: { input: { content: TEST_MESSAGE } }
  },
  result: {
    data: {
      message: {
        id: "3",
        content: TEST_MESSAGE
      }
    }
  }
};

const ERROR_MUTATION_MOCK: MockedResponse = {
  request: {
    query: EXERCISE5_EXTRA1_MESSAGE_MUTATION
  },
  result: {
    errors: [new GraphQLError("boom")]
  }
};

describe("06.extra-1 tests", () => {
  it("happy path", async () => {
    render(
      <MockedProvider
        mocks={[MESSAGES_QUERY_MOCK, SUCCESSFUL_MUTATION_MOCK]}
        addTypename={false}
      >
        <App />
      </MockedProvider>
    );

    await wait(() => expect(screen.getByText(/message1/i)).toBeInTheDocument());
    expect(screen.getByText(/message2/i)).toBeInTheDocument();

    await userEvent.type(screen.getByRole("textbox"), `${TEST_MESSAGE}`);
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await wait(() =>
      expect(screen.getByText(TEST_MESSAGE)).toBeInTheDocument()
    );
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

    await wait(() => expect(screen.getByText(/message1/i)).toBeInTheDocument());
    expect(screen.getByText(/message2/i)).toBeInTheDocument();

    await userEvent.type(screen.getByRole("textbox"), `${TEST_MESSAGE}`);
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await wait(() =>
      expect(screen.getByText(/could not send/i)).toBeInTheDocument()
    );
  });
});

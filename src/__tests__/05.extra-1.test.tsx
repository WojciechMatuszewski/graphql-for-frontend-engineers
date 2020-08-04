import React from "react";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  wait,
  waitForElementToBeRemoved
} from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import {
  App,
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
        // __typename is only needed because we are using `cache.modify`
        { id: "1", content: "First Message", __typename: "Message" },
        { id: "2", content: "Second Message", __typename: "Message" }
      ]
    }
  }
};

const TEST_MESSAGE = "Third message";
const SUCCESSFUL_MUTATION_MOCK: MockedResponse = {
  request: {
    query: EXERCISE5_EXTRA1_MESSAGE_MUTATION,
    variables: { input: { content: TEST_MESSAGE } }
  },
  result: {
    data: {
      message: {
        // __typename is only needed because we are using `cache.modify`
        __typename: "Message",
        id: "3",
        content: TEST_MESSAGE
      }
    }
  }
};
const ERROR_MUTATION_MOCK: MockedResponse = {
  request: {
    query: EXERCISE5_EXTRA1_MESSAGE_MUTATION,
    variables: { input: { content: TEST_MESSAGE } }
  },
  result: {
    errors: [new GraphQLError("boom")]
  }
};

describe("05", () => {
  it("enables the user to post a message", async () => {
    render(
      <MockedProvider mocks={[MESSAGES_QUERY_MOCK, SUCCESSFUL_MUTATION_MOCK]}>
        <App />
      </MockedProvider>
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.getByText(/first message/i)).toBeInTheDocument();
    expect(screen.getByText(/second message/i)).toBeInTheDocument();

    await userEvent.type(screen.getByRole("textbox"), TEST_MESSAGE);
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await wait(() => expect(screen.getAllByRole("listitem")).toHaveLength(3));
    expect(screen.getByText(TEST_MESSAGE)).toBeInTheDocument();
  });

  it("handles errors while posting a message", async () => {
    render(
      <MockedProvider mocks={[MESSAGES_QUERY_MOCK, ERROR_MUTATION_MOCK]}>
        <App />
      </MockedProvider>
    );

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

    expect(screen.getByText(/first message/i)).toBeInTheDocument();
    expect(screen.getByText(/second message/i)).toBeInTheDocument();

    await userEvent.type(screen.getByRole("textbox"), TEST_MESSAGE);
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      await screen.findByText(/could not send the message/i)
    ).toBeInTheDocument();
  });
});

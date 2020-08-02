import React from "react";
import { App, EXERCISE2_EXTRA_3_MESSAGES_QUERY } from "../final/02.extra-3";
import { render, screen } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

const QueryMockedResponse: MockedResponse = {
  request: {
    query: EXERCISE2_EXTRA_3_MESSAGES_QUERY,
    variables: {
      limit: 2
    }
  },
  result: {
    data: {
      messages: [
        { id: "1", content: "first mock message" },
        { id: "2", content: "second mock message" }
      ]
    }
  }
};

describe("02.extra-1 simple test", () => {
  it("fetches and displays the data", async () => {
    render(
      <MockedProvider mocks={[QueryMockedResponse]} addTypename={false}>
        <App limit={2} />
      </MockedProvider>
    );

    expect(await screen.findByText(/first mock message/i)).toBeInTheDocument();
    expect(screen.queryByText(/second mock message/i)).toBeInTheDocument();
  });
});

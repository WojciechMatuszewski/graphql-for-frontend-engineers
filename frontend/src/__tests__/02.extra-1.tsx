import React from "react";
import { MockedResponse } from "@apollo/client/testing";
import { App, EXERCISE2_EXTRA_1_MESSAGES_QUERY } from "../final/02.extra-1";
import { render, screen, wait } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

const QueryMockedResponse: MockedResponse = {
  request: {
    query: EXERCISE2_EXTRA_1_MESSAGES_QUERY
  },
  result: {
    data: {
      messages: [
        { id: "1", content: "first mock message", createdAt: "" },
        { id: "2", content: "second mock message", createdAt: "" }
      ]
    }
  }
};

describe("02.extra-1 simple test", () => {
  it("fetches and displays the data", async () => {
    render(
      <MockedProvider mocks={[QueryMockedResponse]} addTypename={false}>
        <App />
      </MockedProvider>
    );

    await wait(() =>
      expect(screen.queryByText(/first mock message/i)).toBeInTheDocument()
    );
    expect(screen.queryByText(/second mock message/i)).toBeInTheDocument();
  });
});

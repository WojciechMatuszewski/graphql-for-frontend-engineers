import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render, screen, wait } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import {
  App,
  EXERCISE3_EXTRA1_USER_MUTATION,
  EXERCISE3_EXTRA1_USER_QUERY
} from "../final/03.extra-1";

const MOCKED_QUERY_RESPONSE: MockedResponse = {
  request: {
    query: EXERCISE3_EXTRA1_USER_QUERY,
    variables: {}
  },
  result: {
    data: {
      user: {
        __typename: "User",
        id: "1",
        firstName: "Wojciech",
        lastName: "Matuszewski",
        hobbies: ["writing code"]
      }
    }
  }
};

const MOCKED_MUTATION_RESPONSE: MockedResponse = {
  request: {
    query: EXERCISE3_EXTRA1_USER_MUTATION,
    variables: {
      input: {
        firstName: "Mateusz",
        lastName: "Matuszewski",
        hobbies: ["writing code"]
      }
    }
  },
  result: {
    data: {
      updateUser: {
        __typename: "User",
        id: "1",
        firstName: "Mateusz",
        lastName: "Matuszewski",
        hobbies: ["writing code"]
      }
    }
  }
};

describe("03.extra-1 test", () => {
  it("enables user to change the user information", async () => {
    render(
      <MockedProvider mocks={[MOCKED_QUERY_RESPONSE, MOCKED_MUTATION_RESPONSE]}>
        <App />
      </MockedProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await wait(() => expect(screen.getByText(/wojciech/i)).toBeInTheDocument());

    userEvent.click(screen.getByText(/edit/i));

    userEvent.type(screen.getByLabelText(/first name/i), "Mateusz");
    userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await wait(() =>
      expect(screen.queryByTestId("userProfileForm")).not.toBeInTheDocument()
    );

    expect(screen.getByText(/mateusz/i)).toBeInTheDocument();
  });
});

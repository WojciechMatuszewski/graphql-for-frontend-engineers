/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApolloLink,
  execute,
  gql,
  Operation,
  Observable
} from "@apollo/client";
import { getMockAuthorizationToken } from "../apollo/Provider";
import { tokenLink } from "../exercise/06";
import { wait } from "@testing-library/react";

describe("06", () => {
  it("assigns correct value to the `Authorization` header", async () => {});

  it("forwards any existing headers", async () => {});
});

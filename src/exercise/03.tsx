/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { User, UserProfile } from "../ui/User";

// Your user profile `query`. Consult `GraphQL playground` if you are not sure.
// export const EXERCISE3_USER_QUERY = gql``;

// Your user profile mutation. Consult `GraphQL playground` if you are not sure.
// export const EXERCISE3_USER_MUTATION = gql``;

function App() {
  /*
   * Use both `useQuery` and `useMutation` hooks here.
   *
   * const {} = useQuery(QUERY_VARIABLE_NAME)
   * const [] = useMutation(MUTATION_VARIABLE_NAME)
   *
   * */

  // Use `UserProfile` component to render the UI.

  return null;
}

// Do not change the `Usage` component.
function Usage() {
  return (
    <ApolloClientSimpleProvider>
      <App />
    </ApolloClientSimpleProvider>
  );
}
export { App as Exercise3 };
export default Usage;

import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
/*
 * You will need these `Apollo Client` related things.
 * import { gql, useMutation, useQuery } from "@apollo/client";
 *
 * And these, specific to this exercise.
 * import { UserProfile } from "../ui/User";
 *
 * */

/*
 * Create variables for the `query` and `mutation` operations. Remember about meaningful names.
 *
 * const QUERY_VARIABLE_NAME = gql``
 * const MUTATION_VARIABLE_NAME = gql``
 * */

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

export default Usage;

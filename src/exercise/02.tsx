import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
/*
 * You will need these `Apollo Client` related things.
 * import { gql, useQuery } from "@apollo/client"
 *
 * And these, specific to this exercise.
 * import { ChatMessagesList } from "../ui/Chat"
 *
 * */

/*
 * Create variable which holds the `query` operation.
 * Remember to make sure it has a meaningful name. Make sure to also name the operation name itself.
 *
 * const SOME_MEANINGFUL_NAME_QUERY = gql`
 *  query SOME_MEANINGFUL_OPERATION_NAME {}
 * `
 * */

function App() {
  /*
   * Use `useQuery` hook to get the results.
   * Results should be passed in to `ChatMessagesList` component.
   *
   * */

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

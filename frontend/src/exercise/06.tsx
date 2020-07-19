import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
/*
 * You will be using `Chat` component in this exercise
 * import { Chat } from "../ui/Chat";
 *
 * You will also need apolloClient for cache updates.
 * import { gql, useApolloClient } from "@apollo/client";
 * */

// define your query and mutation operations here

/*
 * const EXERCISE6_MESSAGES_QUERY =
 *
 * const EXERCISE6_MESSAGE_MUTATION =
 * */

function App() {
  /*
   * Import generated hooks so that you can perform the mutation and also pull in the messages.
   *
   * Get the `apolloClient` using the `useApolloClient` hook.
   * */

  /*
   * Define `handleOnMessage` function so that you can react when you post a message.
   * This function has to be async since inside it we will be performing mutations.
   *
   * async function handleOnMessage(message: string) {
   *
   * Perform the mutation here.
   *
   * Read and Write EXERCISE6_MESSAGES_QUERY using the `apolloClient`. Update the cache.
   * }
   * */

  return null;
}

function Usage() {
  return (
    <ApolloClientSimpleProvider>
      <App />
    </ApolloClientSimpleProvider>
  );
}

export default Usage;

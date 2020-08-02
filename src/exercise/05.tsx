import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
/*
 * You will need these `Apollo Client` related things.
 * import { gql } from "@apollo/client";
 *
 * And these, specific to this exercise.
 * import { Chat } from "../ui/Chat";
 *
 * */

/* Define your operations.
 *
 * const EXERCISE5_MESSAGES_QUERY =
 *
 * const EXERCISE5_MESSAGE_MUTATION =
 *
 * */

function App() {
  // Import generated hooks so that you can perform the mutation and pull in the messages.

  /*
   * Define `handleOnMessage` function so that you can react when you post a message.
   * This function has to be async since inside it we will be performing mutations.
   *
   * async function handleOnMessage(message: string) {
   *
   *  1. Perform the mutation.
   *
   *  2. Update `update` function to interact with the cache.
   *
   *}
   * */

  // Use `Chat` component to render the UI.
  return null;
}

// Do not make changes to the `Usage` component.
function Usage() {
  return (
    <ApolloClientSimpleProvider>
      <App />
    </ApolloClientSimpleProvider>
  );
}

export default Usage;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { gql } from "@apollo/client";
import { Chat } from "../ui/Chat";

// Define your operations.
export const EXERCISE5_MESSAGES_QUERY = gql``;

export const EXERCISE5_MESSAGE_MUTATION = gql``;

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
   *  2. Use `update` function to interact with the cache.
   *
   *}
   * */

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

export { App };
export default Usage;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { ChatMessagesList, Message } from "../ui/Chat";

// Define the query operation
// export const EXERCISE2_MESSAGES_QUERY = gql``;

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

export { App as Exercise2 };
export default Usage;

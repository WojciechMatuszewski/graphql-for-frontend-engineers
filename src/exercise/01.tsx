/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  ApolloClient,
  ApolloProvider as ApolloClientProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import { getBackendGraphQLURI } from "../apollo/Provider";

// Initialize the client here. Remember to create the `cache` and `httpLink`.
const httpLink = undefined;
const cache = undefined;

const client = undefined;

function App() {
  // Render `ApolloProvider` with whatever children you like.
  return null;
}

// Do not change the `Usage` component.
function Usage() {
  return <App />;
}

export default Usage;

import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";

function getBackendURI() {
  return "http://localhost:4000/graphql";
}

type Props = {
  children: React.ReactNode;
};

const httpLink = new HttpLink({ uri: getBackendURI() });
const cache = new InMemoryCache();

const client = new ApolloClient({ link: httpLink, cache: cache });

// simple as in does not contain any additional links
function ApolloClientSimpleProvider({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export { ApolloClientSimpleProvider, getBackendURI };

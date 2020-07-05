import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  NormalizedCacheObject
} from "@apollo/client";

function getBackendURI() {
  return "http://localhost:4000/graphql";
}

function getMockAuthorizationToken() {
  return "secret";
}

type Props = {
  children: React.ReactNode;
};

const httpLink = new HttpLink({
  uri: getBackendURI(),
  headers: {
    Authorization: getMockAuthorizationToken()
  }
});
const cache = new InMemoryCache();

const simpleClient = new ApolloClient({ link: httpLink, cache: cache });

// simple as in does not contain any additional links
function ApolloClientSimpleProvider({ children }: Props) {
  return <ApolloProvider client={simpleClient}>{children}</ApolloProvider>;
}

type AuthorizationProviderProps = {
  client: ApolloClient<NormalizedCacheObject>;
  children: React.ReactNode;
};

function ApolloClientAuthorizationProvider({
  children,
  client
}: AuthorizationProviderProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export {
  ApolloClientSimpleProvider,
  getBackendURI,
  getMockAuthorizationToken,
  ApolloClientAuthorizationProvider
};

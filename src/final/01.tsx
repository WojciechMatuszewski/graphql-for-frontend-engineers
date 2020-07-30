import React from "react";

// import all the dependencies here
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import {
  getBackendGraphQLURI,
  getMockAuthorizationToken
} from "../apollo/Provider";

// create necessary constructs
const httpLink = new HttpLink({
  uri: getBackendGraphQLURI(),
  headers: {
    Authorization: getMockAuthorizationToken()
  }
});
const cache = new InMemoryCache();

const client = new ApolloClient({ link: httpLink, cache });

function App() {
  return (
    <ApolloProvider client={client}>
      <div>Application</div>
    </ApolloProvider>
  );
}

// Do not change usage.
function Usage() {
  return <App />;
}

export default Usage;

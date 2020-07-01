import React from "react";

// import all the dependencies here
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import { getBackendURI } from "../utils/backend";

// create necessary constructs
const httpLink = new HttpLink({ uri: getBackendURI() });
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

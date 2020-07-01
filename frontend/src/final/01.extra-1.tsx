import React from "react";
// 💯 Provider component

// usually everything that has to do with setting up Apollo would go to a separate file.
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client";
import { getBackendURI } from "../utils/backend";

const httpLink = new HttpLink({ uri: getBackendURI() });
const cache = new InMemoryCache();

const client = new ApolloClient({ link: httpLink, cache });

type Props = {
  children: React.ReactNode;
};

function ApolloClientProvider({ children }: Props) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

function App() {
  return (
    <ApolloClientProvider>
      <div>Application</div>
    </ApolloClientProvider>
  );
}

// Do not change usage.
function Usage() {
  return <App />;
}

export default Usage;

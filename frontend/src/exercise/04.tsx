import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";

function App() {
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

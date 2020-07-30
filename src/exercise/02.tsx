import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";

// import { ChatMessagesList } from "../ui/Chat";
// import { gql, useQuery } from "@apollo/client";

/* Create a query with meaningful name. We will need it later on.
/ Also, do not forget to name the query operation itself. */

// const SOME_MEANINGFUL_NAME_QUERY = gql``

function App() {
  /* use `useQuery` and get the results to `ChatMessagesList` component
     const {} = useQuery(SOME_MEANINGFUL_NAME_QUERY)*/

  return null;
}

// Do not change the usage.
function Usage() {
  return (
    <ApolloClientSimpleProvider>
      <App />
    </ApolloClientSimpleProvider>
  );
}

export default Usage;

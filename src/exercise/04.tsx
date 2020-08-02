import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { gql, useQuery } from "@apollo/client";
import { ChatMessagesList } from "../ui/Chat";

const EXERCISE4_MESSAGES_QUERY = gql`
  # query name has a huge impact on the generated operation name.
  query Exercise4Messages {
    messages {
      id
      content
      createdAt
    }
  }
`;

function App() {
  // replace this `useQuery` with generated one
  const { data, loading, error } = useQuery(EXERCISE4_MESSAGES_QUERY);

  if (error) return <p>Error ...</p>;

  if (loading || !data) return <p>Loading ...</p>;

  return <ChatMessagesList loading={loading} messages={data.messages} />;
}

// Do not change the `Usage` component.
function Usage() {
  return (
    <ApolloClientSimpleProvider>
      <App />
    </ApolloClientSimpleProvider>
  );
}

export default Usage;

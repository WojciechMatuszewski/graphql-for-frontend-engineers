import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { gql, useQuery } from "@apollo/client";
import { ChatMessagesList } from "../ui/Chat";

const EXERCISE5_MESSAGES_QUERY = gql`
  # query name has a huge impact on the generated operation name.
  query Exercise5Messages {
    messages {
      id
      content
      createdAt
    }
  }
`;

function App() {
  // replace this `useQuery` with generated one
  const { data, loading, error } = useQuery(EXERCISE5_MESSAGES_QUERY);

  if (error) return <p>Error ...</p>;

  if (loading || !data) return <p>Loading ...</p>;

  return <ChatMessagesList loading={loading} messages={data.messages} />;
}

function Usage() {
  return (
    <ApolloClientSimpleProvider>
      <App />
    </ApolloClientSimpleProvider>
  );
}

export default Usage;

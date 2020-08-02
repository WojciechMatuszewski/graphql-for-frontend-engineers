import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { ChatMessagesList, Message } from "../ui/Chat";
import { gql, useQuery } from "@apollo/client";

const EXERCISE2_MESSAGES_QUERY = gql`
  query Exercise2Messages {
    messages {
      id
      content
    }
  }
`;

function App() {
  const { loading, data, error } = useQuery<{ messages: Message[] }>(
    EXERCISE2_MESSAGES_QUERY
  );

  if (error) return <p>Error</p>;
  if (loading || !data) return <p>Loading...</p>;

  return <ChatMessagesList messages={data.messages} />;
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

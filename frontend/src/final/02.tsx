import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { ChatMessagesList } from "../ui/Chat";
import { gql, useQuery } from "@apollo/client";

const EXERCISE2_MESSAGES_QUERY = gql`
  query Exercise2Messages {
    messages {
      id
      content
      createdAt
    }
  }
`;

function App() {
  const { loading, data } = useQuery(EXERCISE2_MESSAGES_QUERY);

  const messages = data?.messages || [];

  return <ChatMessagesList messages={messages} loading={loading} />;
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

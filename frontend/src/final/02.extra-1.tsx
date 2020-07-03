import React from "react";
// 💯 Tests.
// Look into `__tests__/02.extra-1`

import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { ChatMessagesList } from "../ui/Chat";
import { gql, useQuery } from "@apollo/client";

export const EXERCISE2_EXTRA_1_MESSAGES_QUERY = gql`
  query Exercise2Messages {
    messages {
      id
      content
      createdAt
    }
  }
`;

function App() {
  const { loading, data } = useQuery(EXERCISE2_EXTRA_1_MESSAGES_QUERY);

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

export { App };

export default Usage;

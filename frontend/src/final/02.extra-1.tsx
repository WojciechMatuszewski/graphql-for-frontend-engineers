import React from "react";
// 💯 Tests.
// Look into `__tests__/02.extra-1`

import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { ChatMessagesList, Message } from "../ui/Chat";
import { gql, useQuery } from "@apollo/client";

export const EXERCISE2_EXTRA_1_MESSAGES_QUERY = gql`
  query Exercise2Messages {
    messages {
      id
      content
    }
  }
`;

function App() {
  const { loading, data, error } = useQuery<{ messages: Message[] }>(
    EXERCISE2_EXTRA_1_MESSAGES_QUERY
  );

  if (error) return <p>error</p>;
  if (loading || !data?.messages) return <p>Loading..</p>;

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

export { App };

export default Usage;

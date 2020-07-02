import React from "react";
// 💯 Tests for the Query with a parameter.

import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { ChatMessagesList } from "../ui/Chat";
import { gql, useQuery } from "@apollo/client";

export const EXERCISE2_EXTRA_3_MESSAGES_QUERY = gql`
  query Exercise2Extra3Messages($limit: Int!) {
    messages(limit: $limit) {
      id
      content
      createdAt
    }
  }
`;

type Props = {
  limit?: number;
};

function App({ limit = 1 }: Props) {
  const { loading, data } = useQuery(EXERCISE2_EXTRA_3_MESSAGES_QUERY, {
    variables: { limit }
  });

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

// only change is here \/
export { App };

export default Usage;

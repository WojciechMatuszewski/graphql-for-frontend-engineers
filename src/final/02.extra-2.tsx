import React from "react";
// 💯 Query with parameter.

import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { ChatMessagesList, Message } from "../ui/Chat";
import { gql, useQuery } from "@apollo/client";

export const EXERCISE2_EXTRA_2_MESSAGES_QUERY = gql`
  query Exercise2Extra2Messages($limit: Int!) {
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

function App({ limit }: Props) {
  const { loading, data, error } = useQuery<{ messages: Message[] }>(
    EXERCISE2_EXTRA_2_MESSAGES_QUERY,
    {
      variables: { limit }
    }
  );

  if (error) return <p>Error</p>;
  if (loading || !data) return <p>Loading...</p>;

  return <ChatMessagesList messages={data.messages} loading={loading} />;
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

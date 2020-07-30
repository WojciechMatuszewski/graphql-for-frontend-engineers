import React from "react";
// 💯 Tests for the Query with a parameter.

import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { ChatMessagesList, Message } from "../ui/Chat";
import { gql, useQuery } from "@apollo/client";

export const EXERCISE2_EXTRA_3_MESSAGES_QUERY = gql`
  query Exercise2Extra3Messages($limit: Int) {
    messages(limit: $limit) {
      id
      content
    }
  }
`;

type Props = {
  limit?: number;
};

function App({ limit }: Props) {
  const { loading, data, error } = useQuery<{ messages: Message[] }>(
    EXERCISE2_EXTRA_3_MESSAGES_QUERY,
    {
      variables: { limit }
    }
  );

  if (error) return <p>error</p>;
  if (loading || !data?.messages) return <p>Loading..</p>;

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

// only change is here \/
export { App };

export default Usage;

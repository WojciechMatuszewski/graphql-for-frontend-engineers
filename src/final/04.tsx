import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { gql } from "@apollo/client";
import { useExercise4FinalMessagesQuery } from "./codegen/generated";
import { ChatMessagesList } from "../ui/Chat";

// eslint-disable-next-line
const EXERCISE4_FINAL_MESSAGES_QUERY = gql`
  query Exercise4FinalMessages {
    messages {
      id
      content
      createdAt
    }
  }
`;

function App() {
  const { data, loading, error } = useExercise4FinalMessagesQuery();

  if (error) return <p>error...</p>;

  if (loading || !data || !data.messages) return <p>loading ...</p>;

  return <ChatMessagesList messages={data.messages} loading={loading} />;
}

function Usage() {
  return (
    <ApolloClientSimpleProvider>
      <App />
    </ApolloClientSimpleProvider>
  );
}

export default Usage;

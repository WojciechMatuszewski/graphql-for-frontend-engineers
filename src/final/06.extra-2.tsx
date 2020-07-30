import { gql } from "@apollo/client";
// 💯 Using the `update` property.
import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { Chat } from "../ui/Chat";
import {
  useExercise6Extra2MessageMutation,
  useExercise6Extra2MessagesQuery
} from "./codegen/generated";

const EXERCISE6_EXTRA2_MESSAGES_QUERY = gql`
  query Exercise6Extra2Messages {
    messages(limit: 10) {
      content
      id
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EXERCISE6_EXTRA2_MESSAGE_MUTATION = gql`
  mutation Exercise6Extra2Message($input: MessageInput!) {
    message(input: $input) {
      content
      id
    }
  }
`;

function App() {
  const {
    data: messagesData,
    loading: loadingMessages,
    error: messagesError
  } = useExercise6Extra2MessagesQuery();

  const [
    saveMessage,
    { loading: addingMessage, error: addingMessageError }
  ] = useExercise6Extra2MessageMutation();

  async function handleOnMessage(message: string) {
    try {
      await saveMessage({
        variables: { input: { content: message } },
        refetchQueries: [
          { query: EXERCISE6_EXTRA2_MESSAGES_QUERY, variables: { limit: 10 } }
        ],
        // mutation is not considered done until the query itself is refetched.
        awaitRefetchQueries: true
      });
    } catch {}
  }

  if (messagesError) return <p>error...</p>;

  if (addingMessageError) return <p>could not send, refresh the page!</p>;

  if (loadingMessages || !messagesData) return <p>loading ...</p>;

  return (
    <Chat
      messages={messagesData.messages}
      loading={addingMessage}
      onMessage={handleOnMessage}
    />
  );
}

function Usage() {
  return (
    <ApolloClientSimpleProvider>
      <App />
    </ApolloClientSimpleProvider>
  );
}

export default Usage;

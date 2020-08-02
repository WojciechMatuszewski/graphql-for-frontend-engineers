import { gql } from "@apollo/client";
// 💯 Tests for the happy and sad path.
import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { Chat } from "../ui/Chat";
import {
  useExercise5Extra1MessageMutation,
  useExercise5Extra1MessagesQuery
} from "./codegen/generated";

// This query definition is used within tests.
export const EXERCISE5_EXTRA1_MESSAGES_QUERY = gql`
  query Exercise5Extra1Messages {
    messages(limit: 10) {
      content
      id
    }
  }
`;

// This mutation definition is used within the tests.
export const EXERCISE5_EXTRA1_MESSAGE_MUTATION = gql`
  mutation Exercise5Extra1Message($input: MessageInput!) {
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
    error: gettingMessagesError
  } = useExercise5Extra1MessagesQuery();

  const [
    saveMessage,
    { loading: addingMessage, error: addingMessageError }
  ] = useExercise5Extra1MessageMutation();

  async function handleOnMessage(message: string) {
    try {
      await saveMessage({
        variables: { input: { content: message } },
        update: (cache, { data }) => {
          if (!data) return;

          const newMessageCacheId = cache.identify(data.message);
          if (!newMessageCacheId) return;

          cache.modify({
            fields: {
              messages: (existingRefs = [], { toReference }) => {
                return [...existingRefs, toReference(newMessageCacheId)];
              }
            }
          });
        }
      });
    } catch {}
  }

  if (gettingMessagesError) return <p>Could not fetch the messages</p>;
  if (addingMessageError) return <p>Could not send the message</p>;

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

export { App };
export default Usage;

import { gql, useApolloClient } from "@apollo/client";
// 💯 Tests for the happy and sad path.
import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { Chat } from "../ui/Chat";
import {
  Exercise6Extra1MessageMutation,
  Exercise6Extra1MessagesQuery,
  useExercise6Extra1MessageMutation,
  useExercise6Extra1MessagesQuery
} from "./codegen/generated";

// This query definition is used within tests.
export const EXERCISE6_EXTRA1_MESSAGES_QUERY = gql`
  query Exercise6Extra1Messages {
    messages(limit: 10) {
      content
      id
    }
  }
`;

// This mutation definition is used within the tests.
export const EXERCISE6_EXTRA1_MESSAGE_MUTATION = gql`
  mutation Exercise6Extra1Message($input: MessageInput!) {
    message(input: $input) {
      content
      id
    }
  }
`;

function App() {
  const apolloClient = useApolloClient();

  const {
    data: messagesData,
    loading: loadingMessages,
    error: messagesError
  } = useExercise6Extra1MessagesQuery();

  const [
    saveMessage,
    { loading: addingMessage, error: addingMessageError }
  ] = useExercise6Extra1MessageMutation();

  async function handleOnMessage(message: string) {
    try {
      const mutationResult = await saveMessage({
        variables: { input: { content: message } }
      });

      if (!mutationResult || !mutationResult.data) return;
      updateCache(mutationResult.data);
    } catch {}
  }

  function updateCache(mutationPayload: Exercise6Extra1MessageMutation) {
    const dataFromCache = apolloClient.readQuery<Exercise6Extra1MessagesQuery>({
      query: EXERCISE6_EXTRA1_MESSAGES_QUERY
    });

    if (!dataFromCache) return;

    apolloClient.writeQuery<Exercise6Extra1MessagesQuery>({
      query: EXERCISE6_EXTRA1_MESSAGES_QUERY,
      data: {
        messages: [...dataFromCache.messages, mutationPayload.message]
      }
    });
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

export { App };
export default Usage;

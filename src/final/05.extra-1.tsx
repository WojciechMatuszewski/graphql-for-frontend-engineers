import { gql, useApolloClient } from "@apollo/client";
// 💯 Tests for the happy and sad path.
import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { Chat } from "../ui/Chat";
import {
  Exercise5Extra1MessageMutation,
  Exercise5Extra1MessagesQuery,
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
  const apolloClient = useApolloClient();

  const {
    data: messagesData,
    loading: loadingMessages,
    error: messagesError
  } = useExercise5Extra1MessagesQuery();

  const [
    saveMessage,
    { loading: addingMessage, error: addingMessageError }
  ] = useExercise5Extra1MessageMutation();

  async function handleOnMessage(message: string) {
    try {
      const mutationResult = await saveMessage({
        variables: { input: { content: message } }
      });

      if (!mutationResult || !mutationResult.data) return;
      updateCache(mutationResult.data);
    } catch {}
  }

  function updateCache(mutationPayload: Exercise5Extra1MessageMutation) {
    const dataFromCache = apolloClient.readQuery<Exercise5Extra1MessagesQuery>({
      query: EXERCISE5_EXTRA1_MESSAGES_QUERY
    });

    if (!dataFromCache) return;

    apolloClient.writeQuery<Exercise5Extra1MessagesQuery>({
      query: EXERCISE5_EXTRA1_MESSAGES_QUERY,
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

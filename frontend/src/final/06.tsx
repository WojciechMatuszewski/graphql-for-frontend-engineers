import { gql, useApolloClient } from "@apollo/client";
import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { Chat } from "../ui/Chat";
import {
  Exercise6FinalMessageMutation,
  Exercise6FinalMessagesQuery,
  useExercise6FinalMessageMutation,
  useExercise6FinalMessagesQuery
} from "./codegen/generated";

const EXERCISE6_FINAL_MESSAGES_QUERY = gql`
  query Exercise6FinalMessages {
    messages(limit: 10) {
      content
      id
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EXERCISE6_FINAL_MESSAGE_MUTATION = gql`
  mutation Exercise6FinalMessage($input: MessageInput!) {
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
  } = useExercise6FinalMessagesQuery();

  const [
    saveMessage,
    { loading: addingMessage }
  ] = useExercise6FinalMessageMutation();

  async function handleOnMessage(message: string) {
    try {
      const mutationResult = await saveMessage({
        variables: { input: { content: message } }
      });

      if (!mutationResult || !mutationResult.data) return;
      updateCache(mutationResult.data);
    } catch {}
  }

  function updateCache(mutationPayload: Exercise6FinalMessageMutation) {
    const dataFromCache = apolloClient.readQuery<Exercise6FinalMessagesQuery>({
      query: EXERCISE6_FINAL_MESSAGES_QUERY
    });

    if (!dataFromCache) return;

    apolloClient.writeQuery<Exercise6FinalMessagesQuery>({
      query: EXERCISE6_FINAL_MESSAGES_QUERY,
      data: {
        messages: [...dataFromCache.messages, mutationPayload.message]
      }
    });
  }

  if (messagesError) return <p>error...</p>;

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

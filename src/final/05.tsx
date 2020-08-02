import { gql, useApolloClient } from "@apollo/client";
import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { Chat } from "../ui/Chat";
import {
  Exercise5FinalMessageMutation,
  Exercise5FinalMessagesQuery,
  useExercise5FinalMessageMutation,
  useExercise5FinalMessagesQuery
} from "./codegen/generated";

const EXERCISE5_FINAL_MESSAGES_QUERY = gql`
  query Exercise5FinalMessages {
    messages(limit: 10) {
      content
      id
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EXERCISE5_FINAL_MESSAGE_MUTATION = gql`
  mutation Exercise5FinalMessage($input: MessageInput!) {
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
    error: gettingMessagesError
  } = useExercise5FinalMessagesQuery();

  const [
    saveMessage,
    { loading: addingMessageLoading, error: addingMessageError }
  ] = useExercise5FinalMessageMutation();

  async function handleOnMessage(message: string) {
    try {
      const mutationResult = await saveMessage({
        variables: { input: { content: message } }
      });

      if (!mutationResult || !mutationResult.data) return;
      updateCache(mutationResult.data);
    } catch {}
  }

  function updateCache(mutationPayload: Exercise5FinalMessageMutation) {
    const dataFromCache = apolloClient.readQuery<Exercise5FinalMessagesQuery>({
      query: EXERCISE5_FINAL_MESSAGES_QUERY
    });

    if (!dataFromCache) return;

    apolloClient.writeQuery<Exercise5FinalMessagesQuery>({
      query: EXERCISE5_FINAL_MESSAGES_QUERY,
      data: {
        messages: [...dataFromCache.messages, mutationPayload.message]
      }
    });
  }

  if (gettingMessagesError) return <p>Could not fetch the messages</p>;
  if (addingMessageError) return <p>Could not send the message</p>;

  if (loadingMessages || !messagesData) return <p>loading ...</p>;

  return (
    <Chat
      messages={messagesData.messages}
      loading={addingMessageLoading}
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

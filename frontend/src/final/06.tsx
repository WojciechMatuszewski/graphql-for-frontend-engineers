import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { Chat } from "../ui/Chat";

const EXERCISE6_FINAL_MESSAGES_QUERY = gql`
  query Exercise6FinalMessages {
    messages(limit: 10) {
      content
      id
    }
  }
`;

const EXERCISE6_FINAL_MESSAGE_MUTATION = gql`
  mutation Exercise6FinalMessage($input: MessageInput!) {
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
  } = useQuery(EXERCISE6_FINAL_MESSAGES_QUERY);
  console.log(messagesData);
  const [saveMessage, { loading: addingMessage }] = useMutation(
    EXERCISE6_FINAL_MESSAGE_MUTATION
  );

  async function handleOnMessage(message: string) {
    await saveMessage({
      variables: { input: { content: message } },
      update: (cache, { data }) => {
        if (!data) return;
        const { message } = data;
        const currentInCache = cache.readQuery({
          query: EXERCISE6_FINAL_MESSAGES_QUERY
        }) as any;
        if (!currentInCache) return;

        cache.writeQuery({
          query: EXERCISE6_FINAL_MESSAGES_QUERY,
          data: {
            messages: [...currentInCache.messages, message]
          }
        });
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

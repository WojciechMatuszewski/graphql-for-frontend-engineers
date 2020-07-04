import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { ChatMessagesList, Message } from "../ui/Chat";
import { gql, useQuery } from "@apollo/client";

const EXERCISE2_MESSAGES_QUERY = gql`
    query Exercise2Messages {
        messages {
            id
            content
            createdAt
        }
    }
`;

function App() {
    const { loading, data, error } = useQuery<{ messages: Message[] }>(
        EXERCISE2_MESSAGES_QUERY
    );

    if (loading || !data) return <p>Loading..</p>;

    if (error) return <p>error</p>;

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

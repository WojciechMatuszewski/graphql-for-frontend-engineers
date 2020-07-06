import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { gql } from "@apollo/client";

const EXERCISE5_FINAL_MESSAGES_QUERY = gql`
    query Exercise5FinalMessages {
        messages {
            id
            message
            createdAt
        }
    }
`;

function App() {
    return null;
}

function Usage() {
    return (
        <ApolloClientSimpleProvider>
            <App />
        </ApolloClientSimpleProvider>
    );
}

export default Usage;

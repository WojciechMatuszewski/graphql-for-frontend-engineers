import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { gql, useMutation, useQuery } from "@apollo/client";
import { UserProfile, User } from "../ui/User";

const EXERCISE3_FINAL_USER_QUERY = gql`
    query Exercise3FinalUser {
        user {
            firstName
            lastName
            id
            hobbies
        }
    }
`;

const EXERCISE3_FINAL_USER_MUTATION = gql`
    mutation Exercise3FinalUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            firstName
            lastName
            id
            hobbies
        }
    }
`;

function App() {
    const { loading, data, error: loadingError } = useQuery<{
        user: User;
    }>(EXERCISE3_FINAL_USER_QUERY);
    const [
        mutate,
        { loading: onEditLoading, error: updatingError }
    ] = useMutation(EXERCISE3_FINAL_USER_MUTATION);

    async function handleOnEdit(user: any) {
        await mutate({ variables: { input: user } });
    }

    if (loading || !data) return null;

    if (loadingError || updatingError) return <p>Error</p>;

    return (
        <UserProfile
            user={data.user}
            onEditLoading={onEditLoading}
            onEdit={handleOnEdit}
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

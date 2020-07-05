import React from "react";
import {
    getBackendURI,
    ApolloClientAuthorizationProvider
} from "../apollo/Provider";
import {
    HttpLink,
    ApolloClient,
    InMemoryCache,
    gql,
    useQuery,
    useMutation
} from "@apollo/client";
import { UserProfile, User } from "../ui/User";

const httpLink = new HttpLink({
    uri: getBackendURI(),
    headers: { Authorization: "secret" }
});

const cache = new InMemoryCache();
const client = new ApolloClient({ cache, link: httpLink });

const EXERCISE4_FINAL_USER_QUERY = gql`
    query Exercise4User {
        user {
            id
            firstName
            hobbies
            lastName
        }
    }
`;

const EXERCISE4_FINAL_USER_MUTATION = gql`
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
    const { data, loading: queryLoading, error: queryErorr } = useQuery<{
        user: User;
    }>(EXERCISE4_FINAL_USER_QUERY);

    const [
        mutate,
        { loading: onEditLoading, error: updatingError }
    ] = useMutation(EXERCISE4_FINAL_USER_MUTATION);

    async function handleOnEdit(user: any) {
        await mutate({ variables: { input: user } });
    }

    if (queryErorr) return <p> error ...</p>;

    if (queryLoading || !data) return <p>loading...</p>;

    return (
        <UserProfile
            user={data.user}
            onEditLoading={false}
            onEdit={handleOnEdit}
        />
    );
}

function Usage() {
    return (
        <ApolloClientAuthorizationProvider client={client}>
            <App />
        </ApolloClientAuthorizationProvider>
    );
}

export default Usage;

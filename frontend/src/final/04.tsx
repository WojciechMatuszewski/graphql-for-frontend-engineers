import React from "react";
import {
  getBackendGraphQLURI,
  ApolloClientAuthorizationProvider,
  getMockAuthorizationToken
} from "../apollo/Provider";
import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  gql,
  useQuery,
  useMutation,
  ApolloLink
} from "@apollo/client";
import { UserProfile, User } from "../ui/User";

const httpLink = new HttpLink({
  uri: getBackendGraphQLURI()
});

const authMiddlewareLink = new ApolloLink((operation, forward) => {
  const prevHeaders = operation.getContext().headers || {};
  operation.setContext({
    headers: {
      ...prevHeaders,
      Authorization: getMockAuthorizationToken()
    }
  });
  return forward(operation);
});

const cache = new InMemoryCache();
const combinedLinks = ApolloLink.from([authMiddlewareLink, httpLink]);
const client = new ApolloClient({ cache, link: combinedLinks });

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
  const { data, loading: queryLoading, error: queryError } = useQuery<{
    user: User;
  }>(EXERCISE4_FINAL_USER_QUERY);

  const [
    mutate,
    { loading: onEditLoading, error: updatingError }
  ] = useMutation(EXERCISE4_FINAL_USER_MUTATION);

  async function handleOnEdit(user: any) {
    await mutate({ variables: { input: user } });
  }

  if (queryError || updatingError) return <p> error ...</p>;

  if (queryLoading || !data) return <p>loading...</p>;

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
    <ApolloClientAuthorizationProvider client={client}>
      <App />
    </ApolloClientAuthorizationProvider>
  );
}

export default Usage;

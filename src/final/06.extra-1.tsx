import React from "react";
// 💯 Tests for the link
import {
  getBackendGraphQLURI,
  getMockAuthorizationToken
} from "../apollo/Provider";
import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  gql,
  useQuery,
  useMutation,
  ApolloLink,
  ApolloProvider
} from "@apollo/client";
import { UserProfile, User } from "../ui/User";

const httpLink = new HttpLink({
  uri: getBackendGraphQLURI()
});

// our newly created link is now exported.
export const authMiddlewareLink = new ApolloLink((operation, forward) => {
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

function App() {
  return (
    <ApolloProvider client={client}>
      <UserProfileStuff />
    </ApolloProvider>
  );
}

// ------ implementation details \/ ----- /
const EXERCISE6_FINAL_USER_QUERY = gql`
  query Exercise6User {
    user {
      id
      firstName
      hobbies
      lastName
    }
  }
`;

const EXERCISE6_FINAL_USER_MUTATION = gql`
  mutation Exercise6FinalUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      firstName
      lastName
      id
      hobbies
    }
  }
`;

function UserProfileStuff() {
  const { data, loading: queryLoading, error: queryError } = useQuery<{
    user: User;
  }>(EXERCISE6_FINAL_USER_QUERY);

  const [
    mutate,
    { loading: onEditLoading, error: updatingError }
  ] = useMutation(EXERCISE6_FINAL_USER_MUTATION);

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
  return <App />;
}

export default Usage;

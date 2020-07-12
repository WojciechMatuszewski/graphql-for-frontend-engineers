import React from "react";
// 💯Tests for the afterware link
import { getBackendGraphQLURI, getBackendTokenURI } from "../apollo/Provider";
import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  gql,
  useQuery,
  useMutation,
  ApolloLink,
  ServerError,
  fromPromise,
  ApolloProvider
} from "@apollo/client";
import { UserProfile, User } from "../ui/User";
import { onError, ErrorResponse } from "@apollo/link-error";

function getToken() {
  return localStorage.getItem("token");
}

function setToken(token: string) {
  localStorage.setItem("token", token);
}

const httpLink = new HttpLink({
  uri: getBackendGraphQLURI()
});

const authMiddlewareLink = new ApolloLink((operation, forward) => {
  const prevHeaders = operation.getContext().headers || {};
  operation.setContext({
    headers: {
      ...prevHeaders,
      Authorization: getToken()
    }
  });

  return forward(operation);
});

function isServerError(e: ErrorResponse["networkError"]): e is ServerError {
  return (e as any).statusCode != null;
}

async function fetchToken() {
  const resp = await fetch(getBackendTokenURI());
  if (!resp.ok) throw new Error("response not ok");

  const result = await resp.json();
  return result;
}

// Notice the dependency injection
type TokenFetcher = () => Promise<{ token: string }>;
function createAuthAfterwareLink(tokenFetcher: TokenFetcher) {
  return onError(({ networkError, operation, forward, graphQLErrors }) => {
    if (!networkError) return forward(operation);

    if (!isServerError(networkError)) return forward(operation);
    if (networkError.statusCode != 403) return forward(operation);

    return fromPromise(Promise.resolve(tokenFetcher())).flatMap(({ token }) => {
      setToken(token);

      const prevHeaders = operation.getContext().headers || {};
      operation.setContext({
        headers: {
          ...prevHeaders,
          Authorization: token
        }
      });

      return forward(operation);
    });
  });
}

const cache = new InMemoryCache();
const combinedLinks = ApolloLink.from([
  authMiddlewareLink,
  createAuthAfterwareLink(fetchToken),
  httpLink
]);
const client = new ApolloClient({ cache, link: combinedLinks });

function App() {
  return (
    <ApolloProvider client={client}>
      <UserProfileStuff />
    </ApolloProvider>
  );
}

// ------ implementation details \/ ----- /
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

function UserProfileStuff() {
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
  return <App />;
}

export { createAuthAfterwareLink };
export default Usage;

import React from "react";
// 💯 Afterware which fetches the link
import { getBackendGraphQLURI, getBackendTokenURI } from "../apollo/Provider";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  gql,
  HttpLink,
  InMemoryCache,
  ServerError,
  useMutation,
  useQuery
} from "@apollo/client";
import { User, UserProfile } from "../ui/User";
import { ErrorResponse, onError } from "@apollo/link-error";

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

  return await resp.json();
}

const authAfterwareLink = onError(({ networkError, operation, forward }) => {
  if (!networkError) return forward(operation);

  if (!isServerError(networkError)) return forward(operation);
  if (networkError.statusCode != 401) return forward(operation);

  return fromPromise(fetchToken()).flatMap(({ token }) => {
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

const cache = new InMemoryCache();
const combinedLinks = ApolloLink.from([
  authMiddlewareLink,
  authAfterwareLink,
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  InMemoryCache,
  gql,
  useMutation,
  ApolloLink,
  useQuery,
  ApolloProvider,
  HttpLink,
  ApolloClient
} from "@apollo/client";
import { User, UserProfile } from "../ui/User";
/*
 * You will need these, specific to the backend I've prepared.
 * import { getBackendGraphQLURI, getMockAuthorizationToken } from "../apollo/Provider"
 *
 * */

/*
 * Create the links here.
 * const httpLink = new HttpLink()
 * const authorizationLink = new ApolloLink()
 *
 * */

/*
 * Merge the links together and pass then to `ApolloClient` constructor.
 * const combinedLinks = ApolloLink.from([])
 * const client = new ApolloClient({link: combinedLinks})
 *
 * */

function App() {
  // Use `ApolloProvider` to wrap the UserProfileStuff component to render the UI.
  return null;
}

// ------ implementation details \/ ----- /
const EXERCISE6_USER_QUERY = gql`
  query Exercise6User {
    user {
      id
      firstName
      hobbies
      lastName
    }
  }
`;

const EXERCISE6_USER_MUTATION = gql`
  mutation Exercise6User($input: UpdateUserInput!) {
    updateUser(input: $input) {
      firstName
      lastName
      id
      hobbies
    }
  }
`;
// eslint-disable-next-line
function UserProfileStuff() {
  const { data, loading: queryLoading, error: queryError } = useQuery<{
    user: User;
  }>(EXERCISE6_USER_QUERY);

  const [
    mutate,
    { loading: onEditLoading, error: updatingError }
  ] = useMutation(EXERCISE6_USER_MUTATION);

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

// Do not change the `Usage` component.
function Usage() {
  return <App />;
}

export default Usage;

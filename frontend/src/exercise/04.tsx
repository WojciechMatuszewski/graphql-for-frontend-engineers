import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { User, UserProfile } from "../ui/User";

// you will need to get the static token from this method
// import { getMockAuthorizationToken } from "../apollo/Provider";

// create `httpLink` here.

// You can create custom middleware links using the `ApolloLink` class.
// import { ApolloLink } from "@apollo/client"
// const myMiddlewareLink = new ApolloLink()

function App() {
  // use `ApolloProvider` and pass the client
  // wrap the `UserProfileStuff` with the `ApolloProvider`
  return null;
}

// ------ implementation details \/ ----- /
const EXERCISE4_USER_QUERY = gql`
  query Exercise4User {
    user {
      id
      firstName
      hobbies
      lastName
    }
  }
`;

const EXERCISE4_USER_MUTATION = gql`
  mutation Exercise3FinalUser($input: UpdateUserInput!) {
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
  }>(EXERCISE4_USER_QUERY);

  const [
    mutate,
    { loading: onEditLoading, error: updatingError }
  ] = useMutation(EXERCISE4_USER_MUTATION);

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

import React from "react";
// 💯 Tests.
// Look into __tests__/03.extra-1

import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { gql, useMutation, useQuery } from "@apollo/client";
import { User, UserProfile } from "../ui/User";

export const EXERCISE3_EXTRA1_USER_QUERY = gql`
  query Exercise3Extra1User {
    user {
      firstName
      lastName
      id
      hobbies
    }
  }
`;

export const EXERCISE3_EXTRA1_USER_MUTATION = gql`
  mutation Exercise3Extra1User($input: UpdateUserInput!) {
    updateUser(input: $input) {
      firstName
      lastName
      id
      hobbies
    }
  }
`;

function App() {
  const { loading, data, error: loadingError } = useQuery<{ user: User }>(
    EXERCISE3_EXTRA1_USER_QUERY
  );
  const [mutate, { loading: onEditLoading }] = useMutation<{ input: User }>(
    EXERCISE3_EXTRA1_USER_MUTATION
  );

  async function handleOnEdit(user: User) {
    await mutate({ variables: { input: user } });
  }

  if (loadingError) return <p>Error</p>;
  if (loading || !data) return null;

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

export { App };
export default Usage;

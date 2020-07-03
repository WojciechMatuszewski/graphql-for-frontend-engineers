import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { gql, useMutation, useQuery } from "@apollo/client";
import { UserProfile } from "../ui/User";

export const EXERCISE3_EXTRA1_USER_QUERY = gql`
  query Exercise3FinalUser {
    user {
      firstName
      lastName
      id
      hobbies
    }
  }
`;

export const EXERCISE3_EXTRA1_USER_MUTATION = gql`
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
  const { loading, data, error } = useQuery(EXERCISE3_EXTRA1_USER_QUERY);
  const [mutate, { loading: onEditLoading }] = useMutation(
    EXERCISE3_EXTRA1_USER_MUTATION
  );

  async function handleOnEdit(user: any) {
    await mutate({ variables: { input: user } });
  }

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

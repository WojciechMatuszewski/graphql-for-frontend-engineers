import React from "react";
// 💯 Using a fragment.

import { ApolloClientSimpleProvider } from "../apollo/Provider";
import { gql, useMutation, useQuery } from "@apollo/client";
import { UserProfile } from "../ui/User";

const EXERCISE3_EXTRA2_USER_FRAGMENT = gql`
  fragment Exercise3Extra2Fragment on User {
    firstName
    lastName
    id
    hobbies
  }
`;

const EXERCISE3_EXTRA2_USER_QUERY = gql`
  query Exercise3FinalUser {
    user {
      ...Exercise3Extra2Fragment
    }
  }
  ${EXERCISE3_EXTRA2_USER_FRAGMENT}
`;

export const EXERCISE3_EXTRA2_USER_MUTATION = gql`
  mutation Exercise3FinalUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ...Exercise3Extra2Fragment
    }
  }
  ${EXERCISE3_EXTRA2_USER_FRAGMENT}
`;

function App() {
  const { loading, data } = useQuery(EXERCISE3_EXTRA2_USER_QUERY);
  const [mutate, { loading: onEditLoading }] = useMutation(
    EXERCISE3_EXTRA2_USER_MUTATION
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

export default Usage;

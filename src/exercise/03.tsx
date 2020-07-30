import React from "react";
import { ApolloClientSimpleProvider } from "../apollo/Provider";

// you will need these dependencies \/
/*
  import { gql, useMutation, useQuery } from "@apollo/client";
  import { UserProfile } from "../ui/User";
*/

// Construct a `query` to get the user. Remember to get the `id`. It's important and we will talk about it later.

// Construct a `mutation` for updating the user profile.

function App() {
  // use both `useQuery` and `useMutation` here.

  // const {} = useQuery(YOUR_QUERY)
  // const [] = useMutation(YOUR_MUTATION)

  /*
    Render the `UserProfile` component while passing all the necessary props.
    Look at the implementation (mainly the types) if you are unsure what to pass.
  */
  return null;
}

function Usage() {
  return (
    <ApolloClientSimpleProvider>
      <App />
    </ApolloClientSimpleProvider>
  );
}

export default Usage;

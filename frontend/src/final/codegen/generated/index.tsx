import { gql } from "@apollo/client";
import * as ApolloReactCommon from "@apollo/client";
import * as ApolloReactHooks from "@apollo/client";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  hobbies?: Maybe<Array<Scalars["String"]>>;
};

export type Mutation = {
  __typename?: "Mutation";
  message: Message;
  updateUser: User;
};

export type MutationMessageArgs = {
  input: MessageInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type MessageInput = {
  content: Scalars["String"];
};

export type UpdateUserInput = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  hobbies?: Maybe<Array<Scalars["String"]>>;
};

export type Query = {
  __typename?: "Query";
  messages: Array<Message>;
  user: User;
};

export type QueryMessagesArgs = {
  limit?: Maybe<Scalars["Int"]>;
};

export type Message = {
  __typename?: "Message";
  id: Scalars["ID"];
  content: Scalars["String"];
  createdAt: Scalars["String"];
};

export type Exercise5FinalMessagesQueryVariables = {};

export type Exercise5FinalMessagesQuery = { __typename?: "Query" } & {
  messages: Array<
    { __typename?: "Message" } & Pick<Message, "id" | "content" | "createdAt">
  >;
};

export type Exercise6Extra1MessagesQueryVariables = {};

export type Exercise6Extra1MessagesQuery = { __typename?: "Query" } & {
  messages: Array<{ __typename?: "Message" } & Pick<Message, "content" | "id">>;
};

export type Exercise6Extra1MessageMutationVariables = {
  input: MessageInput;
};

export type Exercise6Extra1MessageMutation = { __typename?: "Mutation" } & {
  message: { __typename?: "Message" } & Pick<Message, "content" | "id">;
};

export type Exercise6FinalMessagesQueryVariables = {};

export type Exercise6FinalMessagesQuery = { __typename?: "Query" } & {
  messages: Array<{ __typename?: "Message" } & Pick<Message, "content" | "id">>;
};

export type Exercise6FinalMessageMutationVariables = {
  input: MessageInput;
};

export type Exercise6FinalMessageMutation = { __typename?: "Mutation" } & {
  message: { __typename?: "Message" } & Pick<Message, "content" | "id">;
};

export const Exercise5FinalMessagesDocument = gql`
  query Exercise5FinalMessages {
    messages {
      id
      content
      createdAt
    }
  }
`;

/**
 * __useExercise5FinalMessagesQuery__
 *
 * To run a query within a React component, call `useExercise5FinalMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExercise5FinalMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExercise5FinalMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useExercise5FinalMessagesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    Exercise5FinalMessagesQuery,
    Exercise5FinalMessagesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    Exercise5FinalMessagesQuery,
    Exercise5FinalMessagesQueryVariables
  >(Exercise5FinalMessagesDocument, baseOptions);
}
export function useExercise5FinalMessagesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    Exercise5FinalMessagesQuery,
    Exercise5FinalMessagesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    Exercise5FinalMessagesQuery,
    Exercise5FinalMessagesQueryVariables
  >(Exercise5FinalMessagesDocument, baseOptions);
}
export type Exercise5FinalMessagesQueryHookResult = ReturnType<
  typeof useExercise5FinalMessagesQuery
>;
export type Exercise5FinalMessagesLazyQueryHookResult = ReturnType<
  typeof useExercise5FinalMessagesLazyQuery
>;
export type Exercise5FinalMessagesQueryResult = ApolloReactCommon.QueryResult<
  Exercise5FinalMessagesQuery,
  Exercise5FinalMessagesQueryVariables
>;
export const Exercise6Extra1MessagesDocument = gql`
  query Exercise6Extra1Messages {
    messages(limit: 10) {
      content
      id
    }
  }
`;

/**
 * __useExercise6Extra1MessagesQuery__
 *
 * To run a query within a React component, call `useExercise6Extra1MessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExercise6Extra1MessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExercise6Extra1MessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useExercise6Extra1MessagesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    Exercise6Extra1MessagesQuery,
    Exercise6Extra1MessagesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    Exercise6Extra1MessagesQuery,
    Exercise6Extra1MessagesQueryVariables
  >(Exercise6Extra1MessagesDocument, baseOptions);
}
export function useExercise6Extra1MessagesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    Exercise6Extra1MessagesQuery,
    Exercise6Extra1MessagesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    Exercise6Extra1MessagesQuery,
    Exercise6Extra1MessagesQueryVariables
  >(Exercise6Extra1MessagesDocument, baseOptions);
}
export type Exercise6Extra1MessagesQueryHookResult = ReturnType<
  typeof useExercise6Extra1MessagesQuery
>;
export type Exercise6Extra1MessagesLazyQueryHookResult = ReturnType<
  typeof useExercise6Extra1MessagesLazyQuery
>;
export type Exercise6Extra1MessagesQueryResult = ApolloReactCommon.QueryResult<
  Exercise6Extra1MessagesQuery,
  Exercise6Extra1MessagesQueryVariables
>;
export const Exercise6Extra1MessageDocument = gql`
  mutation Exercise6Extra1Message($input: MessageInput!) {
    message(input: $input) {
      content
      id
    }
  }
`;
export type Exercise6Extra1MessageMutationFn = ApolloReactCommon.MutationFunction<
  Exercise6Extra1MessageMutation,
  Exercise6Extra1MessageMutationVariables
>;

/**
 * __useExercise6Extra1MessageMutation__
 *
 * To run a mutation, you first call `useExercise6Extra1MessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExercise6Extra1MessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exercise6Extra1MessageMutation, { data, loading, error }] = useExercise6Extra1MessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExercise6Extra1MessageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    Exercise6Extra1MessageMutation,
    Exercise6Extra1MessageMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    Exercise6Extra1MessageMutation,
    Exercise6Extra1MessageMutationVariables
  >(Exercise6Extra1MessageDocument, baseOptions);
}
export type Exercise6Extra1MessageMutationHookResult = ReturnType<
  typeof useExercise6Extra1MessageMutation
>;
export type Exercise6Extra1MessageMutationResult = ApolloReactCommon.MutationResult<
  Exercise6Extra1MessageMutation
>;
export type Exercise6Extra1MessageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  Exercise6Extra1MessageMutation,
  Exercise6Extra1MessageMutationVariables
>;
export const Exercise6FinalMessagesDocument = gql`
  query Exercise6FinalMessages {
    messages(limit: 10) {
      content
      id
    }
  }
`;

/**
 * __useExercise6FinalMessagesQuery__
 *
 * To run a query within a React component, call `useExercise6FinalMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExercise6FinalMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExercise6FinalMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useExercise6FinalMessagesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    Exercise6FinalMessagesQuery,
    Exercise6FinalMessagesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    Exercise6FinalMessagesQuery,
    Exercise6FinalMessagesQueryVariables
  >(Exercise6FinalMessagesDocument, baseOptions);
}
export function useExercise6FinalMessagesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    Exercise6FinalMessagesQuery,
    Exercise6FinalMessagesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    Exercise6FinalMessagesQuery,
    Exercise6FinalMessagesQueryVariables
  >(Exercise6FinalMessagesDocument, baseOptions);
}
export type Exercise6FinalMessagesQueryHookResult = ReturnType<
  typeof useExercise6FinalMessagesQuery
>;
export type Exercise6FinalMessagesLazyQueryHookResult = ReturnType<
  typeof useExercise6FinalMessagesLazyQuery
>;
export type Exercise6FinalMessagesQueryResult = ApolloReactCommon.QueryResult<
  Exercise6FinalMessagesQuery,
  Exercise6FinalMessagesQueryVariables
>;
export const Exercise6FinalMessageDocument = gql`
  mutation Exercise6FinalMessage($input: MessageInput!) {
    message(input: $input) {
      content
      id
    }
  }
`;
export type Exercise6FinalMessageMutationFn = ApolloReactCommon.MutationFunction<
  Exercise6FinalMessageMutation,
  Exercise6FinalMessageMutationVariables
>;

/**
 * __useExercise6FinalMessageMutation__
 *
 * To run a mutation, you first call `useExercise6FinalMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExercise6FinalMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exercise6FinalMessageMutation, { data, loading, error }] = useExercise6FinalMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExercise6FinalMessageMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    Exercise6FinalMessageMutation,
    Exercise6FinalMessageMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    Exercise6FinalMessageMutation,
    Exercise6FinalMessageMutationVariables
  >(Exercise6FinalMessageDocument, baseOptions);
}
export type Exercise6FinalMessageMutationHookResult = ReturnType<
  typeof useExercise6FinalMessageMutation
>;
export type Exercise6FinalMessageMutationResult = ApolloReactCommon.MutationResult<
  Exercise6FinalMessageMutation
>;
export type Exercise6FinalMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<
  Exercise6FinalMessageMutation,
  Exercise6FinalMessageMutationVariables
>;

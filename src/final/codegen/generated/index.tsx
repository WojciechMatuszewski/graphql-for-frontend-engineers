import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Message = {
   __typename?: 'Message';
  id: Scalars['ID'];
  content: Scalars['String'];
  createdAt: Scalars['String'];
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  hobbies?: Maybe<Array<Scalars['String']>>;
};

export type Query = {
   __typename?: 'Query';
  messages: Array<Message>;
  user: User;
};


export type QueryMessagesArgs = {
  limit?: Maybe<Scalars['Int']>;
  delay?: Maybe<Scalars['Int']>;
};

export type MessageInput = {
  content: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  message: Message;
  updateUser: User;
};


export type MutationMessageArgs = {
  input: MessageInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  hobbies?: Maybe<Array<Scalars['String']>>;
};

export type Exercise4FinalMessagesQueryVariables = {};


export type Exercise4FinalMessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'content' | 'createdAt'>
  )> }
);

export type Exercise5Extra1MessagesQueryVariables = {};


export type Exercise5Extra1MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'content' | 'id'>
  )> }
);

export type Exercise5Extra1MessageMutationVariables = {
  input: MessageInput;
};


export type Exercise5Extra1MessageMutation = (
  { __typename?: 'Mutation' }
  & { message: (
    { __typename?: 'Message' }
    & Pick<Message, 'content' | 'id'>
  ) }
);

export type Exercise5Extra2MessagesQueryVariables = {};


export type Exercise5Extra2MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'content' | 'id'>
  )> }
);

export type Exercise5Extra2MessageMutationVariables = {
  input: MessageInput;
};


export type Exercise5Extra2MessageMutation = (
  { __typename?: 'Mutation' }
  & { message: (
    { __typename?: 'Message' }
    & Pick<Message, 'content' | 'id'>
  ) }
);

export type Exercise5FinalMessagesQueryVariables = {};


export type Exercise5FinalMessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'content' | 'id'>
  )> }
);

export type Exercise5FinalMessageMutationVariables = {
  input: MessageInput;
};


export type Exercise5FinalMessageMutation = (
  { __typename?: 'Mutation' }
  & { message: (
    { __typename?: 'Message' }
    & Pick<Message, 'content' | 'id'>
  ) }
);


export const Exercise4FinalMessagesDocument = gql`
    query Exercise4FinalMessages {
  messages {
    id
    content
    createdAt
  }
}
    `;

/**
 * __useExercise4FinalMessagesQuery__
 *
 * To run a query within a React component, call `useExercise4FinalMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExercise4FinalMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExercise4FinalMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useExercise4FinalMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Exercise4FinalMessagesQuery, Exercise4FinalMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<Exercise4FinalMessagesQuery, Exercise4FinalMessagesQueryVariables>(Exercise4FinalMessagesDocument, baseOptions);
      }
export function useExercise4FinalMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Exercise4FinalMessagesQuery, Exercise4FinalMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Exercise4FinalMessagesQuery, Exercise4FinalMessagesQueryVariables>(Exercise4FinalMessagesDocument, baseOptions);
        }
export type Exercise4FinalMessagesQueryHookResult = ReturnType<typeof useExercise4FinalMessagesQuery>;
export type Exercise4FinalMessagesLazyQueryHookResult = ReturnType<typeof useExercise4FinalMessagesLazyQuery>;
export type Exercise4FinalMessagesQueryResult = ApolloReactCommon.QueryResult<Exercise4FinalMessagesQuery, Exercise4FinalMessagesQueryVariables>;
export const Exercise5Extra1MessagesDocument = gql`
    query Exercise5Extra1Messages {
  messages(limit: 10) {
    content
    id
  }
}
    `;

/**
 * __useExercise5Extra1MessagesQuery__
 *
 * To run a query within a React component, call `useExercise5Extra1MessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExercise5Extra1MessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExercise5Extra1MessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useExercise5Extra1MessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Exercise5Extra1MessagesQuery, Exercise5Extra1MessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<Exercise5Extra1MessagesQuery, Exercise5Extra1MessagesQueryVariables>(Exercise5Extra1MessagesDocument, baseOptions);
      }
export function useExercise5Extra1MessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Exercise5Extra1MessagesQuery, Exercise5Extra1MessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Exercise5Extra1MessagesQuery, Exercise5Extra1MessagesQueryVariables>(Exercise5Extra1MessagesDocument, baseOptions);
        }
export type Exercise5Extra1MessagesQueryHookResult = ReturnType<typeof useExercise5Extra1MessagesQuery>;
export type Exercise5Extra1MessagesLazyQueryHookResult = ReturnType<typeof useExercise5Extra1MessagesLazyQuery>;
export type Exercise5Extra1MessagesQueryResult = ApolloReactCommon.QueryResult<Exercise5Extra1MessagesQuery, Exercise5Extra1MessagesQueryVariables>;
export const Exercise5Extra1MessageDocument = gql`
    mutation Exercise5Extra1Message($input: MessageInput!) {
  message(input: $input) {
    content
    id
  }
}
    `;
export type Exercise5Extra1MessageMutationFn = ApolloReactCommon.MutationFunction<Exercise5Extra1MessageMutation, Exercise5Extra1MessageMutationVariables>;

/**
 * __useExercise5Extra1MessageMutation__
 *
 * To run a mutation, you first call `useExercise5Extra1MessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExercise5Extra1MessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exercise5Extra1MessageMutation, { data, loading, error }] = useExercise5Extra1MessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExercise5Extra1MessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Exercise5Extra1MessageMutation, Exercise5Extra1MessageMutationVariables>) {
        return ApolloReactHooks.useMutation<Exercise5Extra1MessageMutation, Exercise5Extra1MessageMutationVariables>(Exercise5Extra1MessageDocument, baseOptions);
      }
export type Exercise5Extra1MessageMutationHookResult = ReturnType<typeof useExercise5Extra1MessageMutation>;
export type Exercise5Extra1MessageMutationResult = ApolloReactCommon.MutationResult<Exercise5Extra1MessageMutation>;
export type Exercise5Extra1MessageMutationOptions = ApolloReactCommon.BaseMutationOptions<Exercise5Extra1MessageMutation, Exercise5Extra1MessageMutationVariables>;
export const Exercise5Extra2MessagesDocument = gql`
    query Exercise5Extra2Messages {
  messages(limit: 10) {
    content
    id
  }
}
    `;

/**
 * __useExercise5Extra2MessagesQuery__
 *
 * To run a query within a React component, call `useExercise5Extra2MessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExercise5Extra2MessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExercise5Extra2MessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useExercise5Extra2MessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Exercise5Extra2MessagesQuery, Exercise5Extra2MessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<Exercise5Extra2MessagesQuery, Exercise5Extra2MessagesQueryVariables>(Exercise5Extra2MessagesDocument, baseOptions);
      }
export function useExercise5Extra2MessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Exercise5Extra2MessagesQuery, Exercise5Extra2MessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Exercise5Extra2MessagesQuery, Exercise5Extra2MessagesQueryVariables>(Exercise5Extra2MessagesDocument, baseOptions);
        }
export type Exercise5Extra2MessagesQueryHookResult = ReturnType<typeof useExercise5Extra2MessagesQuery>;
export type Exercise5Extra2MessagesLazyQueryHookResult = ReturnType<typeof useExercise5Extra2MessagesLazyQuery>;
export type Exercise5Extra2MessagesQueryResult = ApolloReactCommon.QueryResult<Exercise5Extra2MessagesQuery, Exercise5Extra2MessagesQueryVariables>;
export const Exercise5Extra2MessageDocument = gql`
    mutation Exercise5Extra2Message($input: MessageInput!) {
  message(input: $input) {
    content
    id
  }
}
    `;
export type Exercise5Extra2MessageMutationFn = ApolloReactCommon.MutationFunction<Exercise5Extra2MessageMutation, Exercise5Extra2MessageMutationVariables>;

/**
 * __useExercise5Extra2MessageMutation__
 *
 * To run a mutation, you first call `useExercise5Extra2MessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExercise5Extra2MessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exercise5Extra2MessageMutation, { data, loading, error }] = useExercise5Extra2MessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExercise5Extra2MessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Exercise5Extra2MessageMutation, Exercise5Extra2MessageMutationVariables>) {
        return ApolloReactHooks.useMutation<Exercise5Extra2MessageMutation, Exercise5Extra2MessageMutationVariables>(Exercise5Extra2MessageDocument, baseOptions);
      }
export type Exercise5Extra2MessageMutationHookResult = ReturnType<typeof useExercise5Extra2MessageMutation>;
export type Exercise5Extra2MessageMutationResult = ApolloReactCommon.MutationResult<Exercise5Extra2MessageMutation>;
export type Exercise5Extra2MessageMutationOptions = ApolloReactCommon.BaseMutationOptions<Exercise5Extra2MessageMutation, Exercise5Extra2MessageMutationVariables>;
export const Exercise5FinalMessagesDocument = gql`
    query Exercise5FinalMessages {
  messages(limit: 10) {
    content
    id
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
export function useExercise5FinalMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Exercise5FinalMessagesQuery, Exercise5FinalMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<Exercise5FinalMessagesQuery, Exercise5FinalMessagesQueryVariables>(Exercise5FinalMessagesDocument, baseOptions);
      }
export function useExercise5FinalMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Exercise5FinalMessagesQuery, Exercise5FinalMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Exercise5FinalMessagesQuery, Exercise5FinalMessagesQueryVariables>(Exercise5FinalMessagesDocument, baseOptions);
        }
export type Exercise5FinalMessagesQueryHookResult = ReturnType<typeof useExercise5FinalMessagesQuery>;
export type Exercise5FinalMessagesLazyQueryHookResult = ReturnType<typeof useExercise5FinalMessagesLazyQuery>;
export type Exercise5FinalMessagesQueryResult = ApolloReactCommon.QueryResult<Exercise5FinalMessagesQuery, Exercise5FinalMessagesQueryVariables>;
export const Exercise5FinalMessageDocument = gql`
    mutation Exercise5FinalMessage($input: MessageInput!) {
  message(input: $input) {
    content
    id
  }
}
    `;
export type Exercise5FinalMessageMutationFn = ApolloReactCommon.MutationFunction<Exercise5FinalMessageMutation, Exercise5FinalMessageMutationVariables>;

/**
 * __useExercise5FinalMessageMutation__
 *
 * To run a mutation, you first call `useExercise5FinalMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExercise5FinalMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exercise5FinalMessageMutation, { data, loading, error }] = useExercise5FinalMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExercise5FinalMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Exercise5FinalMessageMutation, Exercise5FinalMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<Exercise5FinalMessageMutation, Exercise5FinalMessageMutationVariables>(Exercise5FinalMessageDocument, baseOptions);
      }
export type Exercise5FinalMessageMutationHookResult = ReturnType<typeof useExercise5FinalMessageMutation>;
export type Exercise5FinalMessageMutationResult = ApolloReactCommon.MutationResult<Exercise5FinalMessageMutation>;
export type Exercise5FinalMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<Exercise5FinalMessageMutation, Exercise5FinalMessageMutationVariables>;
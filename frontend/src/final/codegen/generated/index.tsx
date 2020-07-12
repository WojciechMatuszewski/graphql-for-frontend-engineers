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

export type Query = {
   __typename?: 'Query';
  messages: Array<Message>;
  user: User;
};


export type QueryMessagesArgs = {
  limit?: Maybe<Scalars['Int']>;
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

export type MessageInput = {
  content: Scalars['String'];
};

export type User = {
   __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  hobbies?: Maybe<Array<Scalars['String']>>;
};

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  hobbies?: Maybe<Array<Scalars['String']>>;
};

export type Exercise5FinalMessagesQueryVariables = {};


export type Exercise5FinalMessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'content' | 'createdAt'>
  )> }
);


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
export function useExercise5FinalMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Exercise5FinalMessagesQuery, Exercise5FinalMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<Exercise5FinalMessagesQuery, Exercise5FinalMessagesQueryVariables>(Exercise5FinalMessagesDocument, baseOptions);
      }
export function useExercise5FinalMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Exercise5FinalMessagesQuery, Exercise5FinalMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Exercise5FinalMessagesQuery, Exercise5FinalMessagesQueryVariables>(Exercise5FinalMessagesDocument, baseOptions);
        }
export type Exercise5FinalMessagesQueryHookResult = ReturnType<typeof useExercise5FinalMessagesQuery>;
export type Exercise5FinalMessagesLazyQueryHookResult = ReturnType<typeof useExercise5FinalMessagesLazyQuery>;
export type Exercise5FinalMessagesQueryResult = ApolloReactCommon.QueryResult<Exercise5FinalMessagesQuery, Exercise5FinalMessagesQueryVariables>;
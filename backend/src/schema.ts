import { gql } from "apollo-server";
import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = gql`
  type Query {
    todo(id: ID!): Todo
  }

  type Mutation {
    todo(input: TodoInput!): Todo!
  }

  type Todo {
    id: ID!
    content: String!
    done: Boolean!
  }

  input TodoInput {
    content: String!
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };

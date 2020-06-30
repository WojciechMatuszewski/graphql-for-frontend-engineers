import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    secondExercise: String
  }
`;

export { typeDefs };

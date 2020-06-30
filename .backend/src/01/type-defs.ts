import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    firstExercise: String
  }
`;

export { typeDefs };

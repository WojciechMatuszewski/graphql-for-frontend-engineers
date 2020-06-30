import { GraphQLSchema } from "graphql";
import { ApolloServer } from "apollo-server-express";

async function changeServerSchema(schema: GraphQLSchema, server: ApolloServer) {
  // @ts-ignore
  const schemaDerivedData = await server.generateSchemaDerivedData(schema);
  server.schema = schema;
  server.schemaDerivedData = schemaDerivedData;
}

export { changeServerSchema };

import { ApolloServer } from "apollo-server";
import { schema } from "./schema";

const server = new ApolloServer({ schema });

server.listen({ port: 4000 }, () => console.log("server is listening..."));

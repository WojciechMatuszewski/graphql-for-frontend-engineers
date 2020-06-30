import { resolvers } from "./resolvers";
import { typeDefs } from "./type-defs";
import { makeExecutableSchema } from "apollo-server";

const schema = makeExecutableSchema({ resolvers, typeDefs });
export { schema };

import { makeExecutableSchema } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./type-defs";

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };

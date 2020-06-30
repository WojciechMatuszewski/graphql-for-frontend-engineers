import { ApolloServer } from "apollo-server-express";
import express from "express";
import bodyParser from "body-parser";
import { changeServerSchema } from "./hacks/change-schema";
process.env.NODE_ENV = "development";

const schema = require(`./01/schema`).schema;
const apolloServer = new ApolloServer({
  schema,
  playground: true,
  introspection: true
});

const app = express();
app.use(bodyParser.json());

apolloServer.applyMiddleware({ app });

app.post("/changeServer", async function (req, res) {
  const schema = require(`./${req.body.exercise}/schema`).schema;
  await changeServerSchema(schema, apolloServer);

  res.status(200);
  res.send("changed");
});

app.listen({ port: 3000 }, () => console.log("app listening"));

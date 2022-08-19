import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import mongoose from "mongoose";
import { schema } from "./schemas";
import { resolvers } from "./resolvers";
import * as models from "./models";
const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();
const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
  },
});
const start = apolloServer.start();

const startServer = cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await start;
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.ev1twvs.mongodb.net/?retryWrites=true&w=majority`
  );
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});

export { config, startServer };

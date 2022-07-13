import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();
const apolloServer = new ApolloServer({ typeDefs, resolvers });
const start = apolloServer.start();

const startServer = cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await start;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});

export { config, startServer };

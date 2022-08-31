import { ApolloServer } from "apollo-server-micro";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import Cors from "micro-cors";
import mongoose from "mongoose";
import { schema } from "./schemas";
import { resolvers } from "./resolvers";
import * as models from "./models";
import admin from "firebase-admin";

function getFirebassApp() {
  if (admin.apps.length === 0) {
    initializeApp({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      serviceAccountId: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    });
  }
  return admin.apps[0];
}

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    firebaseApp: getFirebassApp(),
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
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/?retryWrites=true&w=majority`,
    {
      dbName: process.env.MONGO_DB_DATABASE_NAME,
    }
  );
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});

const config = {
  api: {
    bodyParser: false,
  },
};

export { config, startServer };

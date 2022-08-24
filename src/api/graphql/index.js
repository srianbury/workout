import { ApolloServer } from "apollo-server-micro";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import Cors from "micro-cors";
import mongoose from "mongoose";
import { schema } from "./schemas";
import { resolvers } from "./resolvers";
import * as models from "./models";
import admin from "firebase-admin";

const config = {
  api: {
    bodyParser: false,
  },
};

let firebaseApp;
if (admin.apps.length === 0) {
  console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  // firebaseApp = initializeApp({
  //   credential: applicationDefault(),
  // });
  firebaseApp = initializeApp({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    serviceAccountId: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    // type: process.env.FIREBASE_ADMIN_TYPE,
    // private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
    // private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    // client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    // client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
    // auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
    // token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
    // auth_provider_x509_cert_url:
    //   process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
    // client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
  });
}

const cors = Cors();
const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    firebaseApp,
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

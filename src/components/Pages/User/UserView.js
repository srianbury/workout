import Head from "next/head";
import { Box } from "@mui/material";

function UserView({ user }) {
  return (
    <div>
      <Head>
        <title>{user.username} | Workout</title>
      </Head>
      <main>
        <h2>{user.username}</h2>
        <UsersPosts />
      </main>
    </div>
  );
}

function UsersPosts() {
  return (
    <Box>
      TODO: need a component to show the posts from a user and were going to
      re-use the listsposts view from the homepage. Also need a resolver for
      this
    </Box>
  );
}

export { UserView };

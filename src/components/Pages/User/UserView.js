import Head from "next/head";
import { Box } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { ListPosts, ListPostsSkeleton } from "../Home/ListPosts";
import { DeletePostDialogContextProvider } from "../../DeletePostDialog";

function UserView({ user }) {
  return (
    <div>
      <Head>
        <title>{user.username} | Workout</title>
      </Head>
      <main>
        <h2>{user.username}</h2>
        {user && user.username ? <UsersPosts username={user.username} /> : null}
      </main>
    </div>
  );
}

function UsersPosts({ username }) {
  const { loading, error, data, refetch } = useQuery(
    gql`
      query ($username: String!) {
        getPostsByUsername(username: $username) {
          postId
          title
          createdAt
          shortDescription
          media {
            photo
            video {
              source
              id
            }
          }
          user {
            username
            initials
            userId
            picture
          }
        }
      }
    `,
    { variables: { username } }
  );

  if (error) {
    return <Box>An unexpected error occurred.</Box>;
  }

  if (loading) {
    return <ListPostsSkeleton />;
  }

  if (!data.getPostsByUsername || data.getPostsByUsername.length === 0) {
    return <Box>No posts found.</Box>;
  }

  return (
    <DeletePostDialogContextProvider afterDeleteCb={refetch}>
      <ListPosts posts={data.getPostsByUsername} variant="User" />
    </DeletePostDialogContextProvider>
  );
}

export { UserView };

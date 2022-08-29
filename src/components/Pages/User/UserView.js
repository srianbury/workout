import Head from "next/head";
import { Box } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { ListPosts } from "../Home/ListPosts";

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
  const { loading, error, data } = useQuery(
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
    return <Box>Loading...</Box>;
  }

  if (!data.getPostsByUsername || data.getPostsByUsername.length === 0) {
    return <Box>No posts found.</Box>;
  }

  return <ListPosts posts={data.getPostsByUsername} variant="User" />;
}

export { UserView };

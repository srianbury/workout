import { Box } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { ListPosts } from "./ListPosts";

function Home() {
  const { loading, error, data } = useQuery(gql`
    query {
      getPosts {
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
  `);

  console.log({ data, error });

  return (
    <div>
      <main>
        <h1>Explore</h1>
        {error ? (
          <Box>An unexpected error occurred.</Box>
        ) : loading ? (
          <Box>Loading...</Box>
        ) : (
          <ListPosts posts={data.getPosts} />
        )}
      </main>
    </div>
  );
}

export { Home };

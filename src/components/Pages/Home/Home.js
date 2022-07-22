import { useQuery, gql } from "@apollo/client";
import { ListPosts } from "./ListPosts";

function Home() {
  const { loading, error, data } = useQuery(gql`
    query {
      getPosts {
        postId
        title
        createdTs
        shortDescription
        videoUrlId
        user {
          username
          initials
        }
      }
    }
  `);

  return (
    <div>
      <main>
        <h1>Explore</h1>
        <ListPosts {...{ loading, error, data }} />
      </main>
    </div>
  );
}

export { Home };

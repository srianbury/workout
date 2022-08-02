import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { PostView } from "./PostView";

function Post() {
  const { postId } = useRouter().query;

  if (!postId) {
    return (
      <div>
        <main>
          <div>Loading...</div>
        </main>
      </div>
    );
  }

  const { loading, error, data } = useQuery(
    gql`
      query Post($postId: ID!) {
        getPost(postId: $postId) {
          postId
          title
          shortDescription
          longDescription
          createdTs
          videoUrlId
          user {
            userId
            username
            initials
          }
        }
      }
    `,
    { variables: { postId } }
  );

  if (error) {
    return (
      <div>
        <main>
          <div>An unexpected error occurred.</div>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <main>
          <div>Loading...</div>
        </main>
      </div>
    );
  }

  return <PostView post={data.getPost} />;
}

export { Post };

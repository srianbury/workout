import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { PostView } from "./PostView";

function Post() {
  const { postId } = useRouter().query;

  if (!postId) {
    return (
      <div>
        <main>
          <div>No post found.</div>
        </main>
      </div>
    );
  }

  return <PostContainter postId={postId} />;
}

function PostContainter({ postId }) {
  const { loading, error, data } = useQuery(
    gql`
      query Post($postId: ID!) {
        getPostByPostId(postId: $postId) {
          postId
          title
          shortDescription
          longDescription
          createdAt
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

  if (!data.getPostByPostId) {
    return (
      <div>
        <main>
          <div>No post found.</div>
        </main>
      </div>
    );
  }

  return <PostView post={data.getPostByPostId} />;
}

export { Post };

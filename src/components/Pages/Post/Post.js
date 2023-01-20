import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { PostView, PostViewSkeleton } from "./PostView";
import { useContext } from "react";
import { AuthenticatorContext } from "../../Authenticator";

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
  const { user } = useContext(AuthenticatorContext);
  const { loading, error, data, refetch } = useQuery(
    gql`
      query Post($postId: ID!) {
        getPostByPostId(postId: $postId) {
          postId
          title
          shortDescription
          longDescription
          createdAt
          media {
            photo
            video {
              source
              id
            }
          }
          user {
            userId
            username
            initials
          }
          favorited
          favorites
        }
      }
    `,
    {
      variables: { postId },
      context: {
        headers: {
          authorization: user?.token,
        },
      },
    }
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
    return <PostViewSkeleton />;
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

  return <PostView post={data.getPostByPostId} refetch={refetch} />;
}

export { Post };

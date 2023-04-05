import { useContext } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PostViewSkeleton } from "../Post/PostView";
import { AuthenticatorContext } from "../../Authenticator";
import {
  CreateOrUpdateView,
  CreateOrUpdatePostView,
} from "../../CreateOrUpdatePost";

function UpdatePost() {
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

  return <UpdatePostContainter postId={postId} />;
}

function UpdatePostContainter({ postId }) {
  const { loading, error, data } = useQuery(
    gql`
      query Post($postId: ID!) {
        getPostByPostId(postId: $postId) {
          postId
          title
          shortDescription
          longDescription
          videoSource
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
            picture
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

  return <UpdatePage post={data.getPostByPostId} />;
}

function UpdatePage({ post }) {
  const { user } = useContext(AuthenticatorContext);

  if (!user) {
    return (
      <div>
        <main>
          <div>Please login to edit this post.</div>
        </main>
      </div>
    );
  }

  if (
    !user?.userId ||
    !post?.user?.userId ||
    user.userId !== post.user.userId
  ) {
    return (
      <div>
        <main>
          <div>Not authorized.</div>
        </main>
      </div>
    );
  }

  return (
    <CreateOrUpdateView user={user} variant="Edit">
      <Update user={user} post={post} />
    </CreateOrUpdateView>
  );
}

function Update({ user, post }) {
  const router = useRouter();
  const [updatePost, { loading, error }] = useMutation(gql`
    mutation (
      $token: String!
      $postId: ID!
      $title: String
      $shortDescription: String
      $longDescription: String
      $videoSource: String
    ) {
      updatePost(
        token: $token
        postId: $postId
        title: $title
        shortDescription: $shortDescription
        longDescription: $longDescription
        videoSource: $videoSource
      ) {
        postId
        title
        shortDescription
        longDescription
        media {
          video {
            source
            id
          }
        }
        user {
          userId
          username
        }
      }
    }
  `);

  const formik = useFormik({
    initialValues: {
      title: post.title,
      shortDescription: post.shortDescription,
      longDescription: post.longDescription,
      videoSource: post.videoSource,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, "Title must be 100 characters or less.")
        .min(1, "Title cannot be blank")
        .trim("Username cannot have leading nor trailing spaces")
        .strict(),
      shortDescription: Yup.string().max(
        500,
        "Short description must be 500 characters or less."
      ),
      longDescription: Yup.string().max(
        5000,
        "Long description must be 5000 characters or less."
      ),
      videoSource: Yup.string().max(
        50,
        "Video source must be 50 characters or less."
      ),
    }),
    onSubmit: handleSubmit,
  });

  async function handleSubmit(
    { title, shortDescription, longDescription, videoSource },
    { setSubmitting }
  ) {
    try {
      let variables = {
        token: user.token,
        postId: post.postId,
      };
      if (title) {
        variables.title = title;
      }
      if (shortDescription) {
        variables.shortDescription = shortDescription;
      }
      if (longDescription) {
        variables.longDescription = longDescription;
      }
      if (videoSource) {
        variables.videoSource = videoSource;
      }
      const response = await updatePost({
        variables,
      });
      if (response?.data?.updatePost?.postId) {
        router.push(`/p/${response.data.updatePost.postId}`);
      } else {
        setSubmitting(false);
      }
    } catch (e) {
      setSubmitting(false);
    }
  }

  function onCancel() {
    router.push(`/p/${post.postId}`);
  }

  return (
    <CreateOrUpdatePostView
      {...{ formik, loading, error, onCancel, variant: "Update" }}
    />
  );
}

export { UpdatePost };

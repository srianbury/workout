import { useContext } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import { AuthenticatorContext } from "../../Authenticator";
import {
  CreateOrUpdateView,
  CreateOrUpdatePostView,
} from "../../CreateOrUpdatePost";
import { postValidationSchema } from "../../../utils";

function Create() {
  const { user } = useContext(AuthenticatorContext);

  return (
    <CreateOrUpdateView user={user} variant="Create">
      <CreatePost user={user} />
    </CreateOrUpdateView>
  );
}

function CreatePost({ user }) {
  const router = useRouter();
  const [createPost, { loading, error }] = useMutation(
    gql`
      mutation (
        $token: String!
        $title: String!
        $shortDescription: String!
        $longDescription: String!
        $videoSource: String
      ) {
        createPost(
          token: $token
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
    `,
    {
      options: {
        context: {
          headers: {
            authorization: user?.token ? user.token : null,
          },
        },
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      shortDescription: "",
      longDescription: "",
      videoSource: "",
    },
    validationSchema: postValidationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values, { setSubmitting }) {
    try {
      const response = await createPost({
        variables: {
          token: user.token,
          title: values.title,
          shortDescription: values.shortDescription,
          longDescription: values.longDescription,
          videoSource: values.videoSource,
        },
      });
      if (response?.data?.createPost?.postId) {
        router.push(`/p/${response.data.createPost.postId}`);
      } else {
        setSubmitting(false);
      }
    } catch (e) {
      setSubmitting(false);
    }
  }

  function onCancel() {
    router.push("/");
  }

  return (
    <CreateOrUpdatePostView
      {...{ formik, loading, error, onCancel, variant: "Create" }}
    />
  );
}

export { Create };

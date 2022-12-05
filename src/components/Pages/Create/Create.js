import { useContext } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { AuthenticatorContext } from "../../Authenticator";
import {
  CreateOrUpdateView,
  CreateOrUpdatePostView,
} from "../../CreateOrUpdatePost";

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
  const [createPost, { loading, error }] = useMutation(gql`
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
  `);

  const formik = useFormik({
    initialValues: {
      title: "",
      shortDescription: "",
      longDescription: "",
      videoSource: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, "Title must be 100 characters or less.")
        .min(1, "Title cannot be blank")
        .trim("Username cannot have leading nor trailing spaces")
        .strict()
        .required("Title is required."),
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

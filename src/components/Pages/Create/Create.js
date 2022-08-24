import { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Box, Stack, TextField, Alert, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { AuthenticatorContext } from "../../Authenticator";

function Create() {
  const { user } = useContext(AuthenticatorContext);

  return (
    <div>
      <Head>
        <title>Workout | Create</title>
      </Head>
      <main>
        <Box sx={{ mb: 1 }}>
          <h1>Create</h1>
        </Box>
        {user ? (
          <CreatePost user={user} />
        ) : (
          <Box>
            <Box>Please login to create a Post.</Box>
            <Link href="/signin">
              <Box
                sx={{
                  display: "inline",
                  "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                  },
                }}
              >
                Sign In.
              </Box>
            </Link>
          </Box>
        )}
      </main>
    </div>
  );
}

function CreatePost({ user }) {
  const [createPost, { data, loading, error, reset }] = useMutation(gql`
    mutation (
      $token: String!
      $title: String!
      $shortDescription: String!
      $longDescription: String!
    ) {
      createPost(
        token: $token
        title: $title
        shortDescription: $shortDescription
        longDescription: $longDescription
      ) {
        postId
        title
        shortDescription
        longDescription
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
        .required(),
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
      console.log("submitting");
      const response = await createPost({
        variables: {
          token: user.token,
          title: values.title,
          shortDescription: values.shortDescription,
          longDescription: values.longDescription,
          videoSource: values.videoSource,
        },
      });
      console.log({ response });
      console.log("done");
      setSubmitting(false);
    } catch (e) {
      setSubmitting(false);
    }
  }

  return (
    <Box>
      <Stack spacing={2}>
        <TextField
          id="title"
          name="title"
          type="text"
          label="Title"
          variant="outlined"
          {...formik.getFieldProps("title")}
          fullWidth
          sx={{
            display: "block",
          }}
        />
        {formik.touched.title && formik.errors.title ? (
          <Alert severity="error">{formik.errors.title}</Alert>
        ) : null}
        <TextField
          id="shortDescription"
          name="shortDescription"
          type="text"
          label="Brief Description"
          variant="outlined"
          {...formik.getFieldProps("shortDescription")}
          fullWidth
          sx={{
            display: "block",
          }}
        />
        {formik.touched.shortDescription && formik.errors.shortDescription ? (
          <Alert severity="error">{formik.errors.shortDescription}</Alert>
        ) : null}
        <TextField
          id="longDescription"
          name="longDescription"
          type="text"
          label="Describe the Workout"
          variant="outlined"
          {...formik.getFieldProps("longDescription")}
          fullWidth
          multiline
          minRows={4}
          sx={{
            display: "block",
          }}
        />
        {formik.touched.longDescription && formik.errors.longDescription ? (
          <Alert severity="error">{formik.errors.longDescription}</Alert>
        ) : null}
        <TextField
          id="videoSource"
          name="videoSource"
          type="text"
          label="Video Source"
          placeholder="i.e. https://www.youtube.com/watch?v=Kuv0xThzxrU"
          variant="outlined"
          {...formik.getFieldProps("videoSource")}
          fullWidth
          sx={{
            display: "block",
          }}
        />
        {formik.touched.videoSource && formik.errors.videoSource ? (
          <Alert severity="error">{formik.errors.videoSource}</Alert>
        ) : null}
        <Box>
          <Button onClick={formik.handleSubmit} variant="outlined">
            Post
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export { Create };

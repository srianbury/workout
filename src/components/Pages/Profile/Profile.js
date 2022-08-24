import { useState, useContext } from "react";
import Head from "next/head";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { AuthenticatorContext } from "../../Authenticator";

function Profile() {
  return (
    <div>
      <Head>
        <title>Workout | Profile</title>
      </Head>
      <main>
        <ProfileMain />
      </main>
    </div>
  );
}

function ProfileMain() {
  const { user, logout } = useContext(AuthenticatorContext);

  if (!user) {
    return (
      <Box>
        <Box>You are not logged in.</Box>
      </Box>
    );
  }

  return <UserProfile {...{ user, logout }} />;
}

function UserProfile({ user, logout }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <Box>Hello, {user.username}</Box>
          <UpdateUserName user={user} />
          <Divider />
          <Box>
            <Button variant="outlined" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

function UpdateUserName({ user }) {
  const [updateUserInfo, { data, loading, error, reset }] = useMutation(gql`
    mutation ($token: String!, $userInfo: UserInfo!) {
      updateUserInfo(token: $token, userInfo: $userInfo) {
        success
        message
        user {
          username
        }
      }
    }
  `);
  const [update, setUpdate] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: user.username,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(35, "Username must be 35 characters or less.")
        .min(1, "Username cannot be blank")
        .trim("Username cannot have leading nor trailing spaces")
        .strict()
        .required(),
    }),
    // onSubmit: handleSubmit,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values, { setSubmitting }) {
    try {
      // TODO: add a method to update the username/info in AuthenticatorContext after a successful update
      const response = await updateUserInfo({
        variables: {
          token: user.token,
          userInfo: { username: values.username },
        },
      });
      console.log({ response });
      setSubmitting(false);
      setUpdate(false);
    } catch (e) {
      console.log(e);
      setSubmitting(false);
    }
  }

  function handleUpdateClick() {
    setUpdate((cur) => !cur);
  }

  if (!update) {
    return (
      <Box>
        <Button variant="outlined" onClick={handleUpdateClick}>
          Edit Username
        </Button>
      </Box>
    );
  }

  return (
    <>
      <TextField
        id="username"
        name="username"
        type="text"
        label="Username"
        variant="outlined"
        value={formik.values.username}
        onChange={formik.handleChange}
        fullWidth
        sx={{
          display: "block",
        }}
      />
      {formik.touched.username && formik.errors.username ? (
        <Alert severity="error">{formik.errors.username}</Alert>
      ) : null}
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting || !formik.dirty}
        >
          {formik.isSubmitting ? (
            <CircularProgress sx={{ mr: 1 }} size={20} />
          ) : null}
          Update
        </Button>
        <Button variant="outlined" onClick={handleUpdateClick} color="error">
          Cancel
        </Button>
      </Stack>
    </>
  );
}

export { Profile };

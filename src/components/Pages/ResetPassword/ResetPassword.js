import { useState, useContext } from "react";
import Head from "next/head";
import { useFormik } from "formik";
import {
  Grid,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import * as Yup from "yup";
import { AuthenticatorContext } from "../../Authenticator";

function ResetPassword() {
  return (
    <div>
      <Head>
        <title>Workout | Reset Password</title>
      </Head>
      <main>
        <h1>Reset Password</h1>
        <ResetPasswordForm />
      </main>
    </div>
  );
}

function ResetPasswordForm() {
  const [notification, setNotification] = useState(null);
  const { handleSendPasswordResetEmail } = useContext(AuthenticatorContext);
  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please provide a valid email.")
        .required("Email is required."),
    }),
    onSubmit: handleResetClick,
  });

  async function handleResetClick(values, { setSubmitting }) {
    try {
      setNotification(null);
      setError(false);
      console.log(values.email);
      await handleSendPasswordResetEmail(values.email);
      setSubmitting(false);
      setNotification(
        "Password reset sent.  Please check your spam folder if you do not see it withing a few minutes."
      );
    } catch (e) {
      console.log({ e });
      setNotification(null);
      setError(true);
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            {...formik.getFieldProps("email")}
            sx={{
              display: "block",
              mb: 2,
            }}
          />
          <Button
            variant="outlined"
            disabled={formik.isSubmitting || !formik.dirty}
            onClick={formik.handleSubmit}
            sx={{ width: "100%", py: 1 }}
          >
            {formik.isSubmitting ? (
              <CircularProgress sx={{ mr: 1 }} size={20} />
            ) : null}
            Reset
          </Button>
          {notification ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              {notification}
            </Alert>
          ) : null}
          {error ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              An unexpected error occurred.
            </Alert>
          ) : null}
        </Box>
      </Grid>
    </Grid>
  );
}

export { ResetPassword };

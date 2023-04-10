import { useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Divider,
  Grid,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthenticatorContext } from "../../Authenticator";

function SignIn() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const {
    user,
    handleSignInWithGoogle,
    handleSignInWithFacebook,
    handleSignInWithEmailPassword,
  } = useContext(AuthenticatorContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please provide a valid email.")
        .required("Email is required."),
      password: Yup.string()
        .max(100, "Password must be 100 characters or less.")
        .min(8, "Password must be at least 8 characters.")
        .required("Password is required."),
    }),
    onSubmit: handleEmailPasswordSignUp,
  });

  function getSignInMethod(method) {
    switch (method) {
      case "EMAIL_PASSWORD":
        return handleSignInWithEmailPassword; // TODO
      case "GOOGLE":
        return handleSignInWithGoogle;
      case "FACEBOOK":
        return handleSignInWithFacebook;
      default:
        return null;
    }
  }

  async function handleSignIn(method, credentials = {}) {
    try {
      setError(null);
      const signInMethod = getSignInMethod(method);
      let response;
      if (method === "EMAIL_PASSWORD") {
        response = await signInMethod(credentials.email, credentials.password);
      } else {
        response = await signInMethod();
      }

      if (response && response.user) {
        router.push("/profile");
        return;
      }

      if (response && response.authenticationError) {
        setError(response.authenticationError);
      }

      setError("An unexpected error occurred.");
    } catch (e) {
      setError("An unexpected error occurred.");
    }
  }

  async function handleEmailPasswordSignUp(values, { setSubmitting }) {
    try {
      await handleSignIn("EMAIL_PASSWORD", {
        email: values.email,
        password: values.password,
      });
    } catch (e) {
      setSubmitting(false);
    }
  }

  const signInWithGoogle = async () => handleSignIn("GOOGLE");
  const signInWithFacebook = async () => handleSignIn("FACEBOOK");

  return (
    <div>
      <Head>
        <title>Workout | Sign In</title>
      </Head>
      <main>
        <h1>Sign In</h1>
        {user ? (
          <Box>{`Hi ${user.username}, you are logged in.`}</Box>
        ) : (
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
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  {...formik.getFieldProps("password")}
                  sx={{
                    display: "block",
                    mb: 2,
                  }}
                />
                <Button
                  id="loginWithEmailAndPasswordButton"
                  variant="outlined"
                  disabled={formik.isSubmitting || !formik.dirty}
                  onClick={formik.handleSubmit}
                  sx={{ width: "100%", py: 1 }}
                >
                  {formik.isSubmitting ? (
                    <CircularProgress sx={{ mr: 1 }} size={20} />
                  ) : null}
                  Sign In
                </Button>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Divider>Or</Divider>
              </Box>
              <Box sx={{ mb: 2, width: "100%" }}>
                <Button
                  variant="outlined"
                  onClick={signInWithGoogle}
                  sx={{
                    width: "100%",
                    py: 1,
                    borderColor: "#DB4437",
                    color: "#DB4437",
                  }}
                >
                  <GoogleIcon sx={{ mr: 1 }} />
                  Sign In with Google
                </Button>
              </Box>
              <Box sx={{ mb: 2, width: "100%" }}>
                <Button
                  variant="outlined"
                  onClick={signInWithFacebook}
                  sx={{
                    width: "100%",
                    py: 1,
                    borderColor: "#0165E1",
                    color: "#0165E1",
                  }}
                >
                  <FacebookIcon sx={{ mr: 1 }} />
                  Sign In with Facebook
                </Button>
              </Box>
              <Box sx={{ display: "inline" }}>{`Don't have an account?  `}</Box>
              <Link href="/signup">
                <Box
                  sx={{
                    display: "inline",
                    "&:hover": {
                      textDecoration: "underline",
                      cursor: "pointer",
                    },
                  }}
                >
                  Sign Up.
                </Box>
              </Link>
              <Link href="/reset-password">
                <Box
                  sx={{
                    mt: 1,
                    "&:hover": {
                      textDecoration: "underline",
                      cursor: "pointer",
                    },
                  }}
                >
                  Forgot password?
                </Box>
              </Link>
              <AuthenticationError authenticationError={error} />
            </Grid>
          </Grid>
        )}
      </main>
    </div>
  );
}

function AuthenticationError({ authenticationError }) {
  if (!authenticationError) {
    return null;
  }

  if (authenticationError.type === "ACCOUNT_NOT_FOUND") {
    return (
      <Alert severity="error" sx={{ mt: 1 }}>
        <Box
          sx={{ display: "inline" }}
        >{`No account found.  Please try another account or  `}</Box>
        <Link href="/signup">
          <Box
            sx={{
              display: "inline",
              "&:hover": {
                textDecoration: "underline",
                cursor: "pointer",
              },
            }}
          >
            Sign Up.
          </Box>
        </Link>
      </Alert>
    );
  }

  return (
    <Alert severity="error" sx={{ mt: 1 }}>
      An unexpected error occurred.
    </Alert>
  );
}

export { SignIn };

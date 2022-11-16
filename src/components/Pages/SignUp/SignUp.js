import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
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

function SignUp() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const {
    user,
    handleSignUpWithGoogle,
    handleSignUpWithFacebook,
    handleSignUpWithEmailPassword,
  } = useContext(AuthenticatorContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please provide a valid email.")
        .required("Email is required."),
      password: Yup.string()
        .max(100, "Password must be 100 characters or less.")
        .min(8, "Password must be at least 8 characters.")
        .required("Password is required."),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match."
      ),
    }),
    onSubmit: handleEmailPasswordSignUp,
  });

  function getSignUpHandler(provider) {
    switch (provider) {
      case "EMAIL_PASSWORD":
        return handleSignUpWithEmailPassword;
      case "GOOGLE":
        return handleSignUpWithGoogle;
      case "FACEBOOK":
        return handleSignUpWithFacebook;
      default:
        return null;
    }
  }

  async function handleEmailPasswordSignUp(values, { setSubmitting }) {
    try {
      await handleSignUp("EMAIL_PASSWORD", {
        email: values.email,
        password: values.password,
      });
    } catch (e) {
      console.log({ e });
      setSubmitting(false);
    }
  }

  async function handleSignUp(provider, credentials = {}) {
    setError(false);
    const signUpHandler = getSignUpHandler(provider);
    let response;
    if (provider === "EMAIL_PASSWORD") {
      response = await signUpHandler(credentials.email, credentials.password);
    } else {
      response = await signUpHandler();
    }

    if (response && response.user) {
      router.push("/profile");
    }

    if (response && response.authenticationError) {
      setError(response.authenticationError);
    }
  }

  return (
    <div>
      <Head>
        <title>Workout | Sign Up</title>
      </Head>
      <main>
        <Box sx={{ mb: 1 }}>
          <h1>Sign Up</h1>
        </Box>
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
                {formik.touched.email && formik.errors.email ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {formik.errors.email}
                  </Alert>
                ) : null}
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
                {formik.touched.password && formik.errors.password ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {formik.errors.password}
                  </Alert>
                ) : null}
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  {...formik.getFieldProps("confirmPassword")}
                  sx={{
                    display: "block",
                    mb: 2,
                  }}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {formik.errors.confirmPassword}
                  </Alert>
                ) : null}
                <Button
                  variant="outlined"
                  onClick={formik.handleSubmit}
                  sx={{ width: "100%", py: 1 }}
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <CircularProgress sx={{ mr: 1 }} size={20} />
                  ) : null}
                  Sign Up
                </Button>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Divider>Or</Divider>
              </Box>
              <Box sx={{ mb: 2, width: "100%" }}>
                <Button
                  variant="outlined"
                  onClick={() => handleSignUp("GOOGLE")}
                  sx={{
                    width: "100%",
                    py: 1,
                    borderColor: "#DB4437",
                    color: "#DB4437",
                  }}
                >
                  <GoogleIcon sx={{ mr: 1 }} />
                  Sign Up with Google
                </Button>
              </Box>
              <Box sx={{ mb: 2, width: "100%" }}>
                <Button
                  variant="outlined"
                  onClick={() => handleSignUp("FACEBOOK")}
                  sx={{
                    width: "100%",
                    py: 1,
                    borderColor: "#0165E1",
                    color: "#0165E1",
                  }}
                >
                  <FacebookIcon sx={{ mr: 1 }} />
                  Sign Up with Facebook
                </Button>
              </Box>
              <AuthenticationError authenticationError={error} />
              <Box
                sx={{ display: "inline" }}
              >{`Already have an account?  `}</Box>
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

  if (authenticationError.type === "ACCOUNT_ALREADY_EXISTS_PLEASE_SIGN_IN") {
    return (
      <Alert severity="error" sx={{ mb: 1 }}>
        <Box
          sx={{ display: "inline" }}
        >{`An account was already found.  `}</Box>
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
            Please sign in
          </Box>
        </Link>
        <Box sx={{ display: "inline" }}>{` instead.`}</Box>
      </Alert>
    );
  }

  return (
    <Alert severity="error" sx={{ mb: 1 }}>
      An unexpected error occurred.
    </Alert>
  );
}

export { SignUp };

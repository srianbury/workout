import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Alert, Box, Button, TextField, Divider, Grid } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { AuthenticatorContext } from "../../Authenticator";

function SignUp() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const {
    user,
    authenticationError,
    handleSignUpWithGoogle,
    handleSignUpWithFacebook,
  } = useContext(AuthenticatorContext);

  async function signUpWithGoogle() {
    setError(false);
    const response = await handleSignUpWithGoogle();

    if (response && response.user) {
      router.push("/profile");
    }

    if (response && response.authenticationError) {
      setError(response.authenticationError);
    }
  }

  async function signUpWithFacebook() {
    setError(false);
    const response = await handleSignUpWithFacebook();

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
        <h1>Sign Up</h1>
        {user ? (
          <Box>{`Hi ${user.username}, you are logged in.`}</Box>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  value=""
                  fullWidth
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
                  value="sadf"
                  fullWidth
                  sx={{
                    display: "block",
                    mb: 2,
                  }}
                />
                <TextField
                  id="verify-password"
                  label="Verify Password"
                  variant="outlined"
                  type="password"
                  value="sadf"
                  fullWidth
                  sx={{
                    display: "block",
                    mb: 2,
                  }}
                />
                <Button
                  variant="outlined"
                  onClick={() => {}}
                  sx={{ width: "100%", py: 1 }}
                >
                  Sign Up
                </Button>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Divider>Or</Divider>
              </Box>
              <Box sx={{ mb: 2, width: "100%" }}>
                <Button
                  variant="outlined"
                  onClick={signUpWithGoogle}
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
                  onClick={signUpWithFacebook}
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

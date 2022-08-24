import { useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Alert, Box, Button, TextField, Divider, Grid } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { AuthenticatorContext } from "../../Authenticator";

function SignIn() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const {
    user,
    authenticationError,
    handleSignInWithGoogle,
    handleSignInWithFacebook,
  } = useContext(AuthenticatorContext);

  async function signInWithGoogle() {
    setError(false);
    const response = await handleSignInWithGoogle();

    if (response && response.user) {
      router.push("/profile");
    }

    if (response && response.authenticationError) {
      setError(response.authenticationError);
    }
  }

  async function signInWithFacebook() {
    setError(false);
    const response = await handleSignInWithFacebook();

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
                <Button
                  variant="outlined"
                  onClick={() => {}}
                  sx={{ width: "100%", py: 1 }}
                >
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

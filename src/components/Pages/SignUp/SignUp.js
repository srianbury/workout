import Head from "next/head";
import Link from "next/link";
import { Box, Button, TextField, Divider, Grid } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { signInWithGoogle } from "../../Firebase";

function SignUp() {
  return (
    <div>
      <Head>
        <title>Workout | Sign Up</title>
      </Head>
      <main>
        <h1>Sign Up</h1>
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
                onClick={signInWithGoogle}
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
                onClick={signInWithGoogle}
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
            <Box sx={{ display: "inline" }}>{`Already have an account?  `}</Box>
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
      </main>
    </div>
  );
}

export { SignUp };

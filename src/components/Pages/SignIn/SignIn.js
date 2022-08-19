import Head from "next/head";
import Link from "next/link";
import { Box, Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { signInWithGoogle, signInWithFacebook } from "../../Firebase";

function SignIn() {
  return (
    <div>
      <Head>
        <title>Workout | Sign In</title>
      </Head>
      <main>
        <h1>Sign In</h1>
        <Box sx={{ mb: 1 }}>
          <Button variant="outlined" onClick={signInWithGoogle}>
            <GoogleIcon sx={{ mr: 1 }} />
            Sign In with Google
          </Button>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Button variant="outlined" onClick={signInWithFacebook}>
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
      </main>
    </div>
  );
}

export { SignIn };

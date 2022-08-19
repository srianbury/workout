import Head from "next/head";
import Link from "next/link";
import { Box, Button } from "@mui/material";
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
        <Box sx={{ mb: 1 }}>
          <Button variant="outlined" onClick={signInWithGoogle}>
            <GoogleIcon sx={{ mr: 1 }} />
            Sign Up with Google
          </Button>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Button variant="outlined" onClick={signInWithGoogle}>
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
      </main>
    </div>
  );
}

export { SignUp };

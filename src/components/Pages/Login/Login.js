import { useContext } from "react";
import Head from "next/head";
import { Box } from "@mui/material";
import { AuthenticatorContext } from "../../Authenticator";
import { GoogleLoginButton } from "../../GoogleLoginButton";

function Login() {
  return (
    <div>
      <Head>
        <title>Workout | Login</title>
      </Head>
      <main>
        <LoginMain />
      </main>
    </div>
  );
}

function LoginMain() {
  const { user } = useContext(AuthenticatorContext);

  if (user) {
    return <Box>You are logged in.</Box>;
  }

  return (
    <Box>
      <GoogleLoginButton />
    </Box>
  );
}

export { Login };

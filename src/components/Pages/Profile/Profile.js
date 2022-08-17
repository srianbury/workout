import { useContext } from "react";
import Head from "next/head";
import { Box, Button } from "@mui/material";
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
  const { user, logout, login } = useContext(AuthenticatorContext);

  if (!user) {
    return (
      <Box>
        <Box>You are not logged in.</Box>
        <Button variant="outlined" onClick={login}>
          Login
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 1 }}>Hello, {user.username}</Box>
      <Button variant="outlined" onClick={logout}>
        Logout
      </Button>
    </Box>
  );
}

export { Profile };

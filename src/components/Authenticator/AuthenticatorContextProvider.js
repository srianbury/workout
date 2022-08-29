import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { AuthenticatorContext } from "./AuthenticatorContext";
import {
  signInSignUpWithSocial,
  signInSignUpWithEmailPassword,
} from "../Firebase";

function AuthenticatorContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authenticateToken, { data, loading, error, reset }] = useMutation(gql`
    mutation ($token: String!, $method: String!) {
      authenticate(token: $token, method: $method) {
        authenticationError {
          type
          message
        }
        user {
          userId
          username
          email
          initials
          picture
          token
        }
      }
    }
  `);

  function updateUser(user) {
    setUser(user);
  }

  function logout() {
    setUser(null);
    reset();
  }

  async function handleSignInSignUp(method, provider, meta = {}) {
    // TODO add email/password option
    let userInfo;
    switch (provider) {
      case "EMAIL_PASSWORD":
        userInfo = await signInSignUpWithEmailPassword(
          method,
          meta.email,
          meta.password
        );
        break;
      case "GOOGLE":
      case "FACEBOOK":
        userInfo = await signInSignUpWithSocial(provider);
        break;
    }

    if (!userInfo) {
      return;
    }

    console.log({ userInfo });
    const response = await authenticateToken({
      variables: { token: userInfo.accessToken, method }, // method: SIGN_UP, SIGN_IN
    });
    console.log({ response });

    if (
      response &&
      response.data &&
      response.data.authenticate &&
      response.data.authenticate.user
    ) {
      updateUser(response.data.authenticate.user);
    }

    if (response && response.data && response.data.authenticate) {
      return response.data.authenticate; // return response so it can be used to handle errors where it's used
    }

    return null;
  }

  const handleSignUpWithGoogle = async () =>
    handleSignInSignUp("SIGN_UP", "GOOGLE");

  const handleSignInWithGoogle = async () =>
    handleSignInSignUp("SIGN_IN", "GOOGLE");

  const handleSignUpWithFacebook = async () =>
    handleSignInSignUp("SIGN_UP", "FACEBOOK");

  const handleSignInWithFacebook = async () =>
    handleSignInSignUp("SIGN_IN", "FACEBOOK");

  const handleSignUpWithEmailPassword = async (email, password) =>
    handleSignInSignUp("SIGN_UP", "EMAIL_PASSWORD", {
      email,
      password,
    });

  const handleSignInWithEmailPassword = async (email, password) =>
    handleSignInSignUp("SIGN_IN", "EMAIL_PASSWORD", {
      email,
      password,
    });

  return (
    <AuthenticatorContext.Provider
      value={{
        user,
        authenticationError: null, // TODO replace this with local state where used
        logout,
        handleSignUpWithGoogle,
        handleSignUpWithFacebook,
        handleSignInWithGoogle,
        handleSignInWithFacebook,
        handleSignUpWithEmailPassword,
        handleSignInWithEmailPassword,
        updateUser,
      }}
    >
      {children}
    </AuthenticatorContext.Provider>
  );
}

export { AuthenticatorContextProvider };

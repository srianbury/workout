import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { AuthenticatorContext } from "./AuthenticatorContext";
import {
  signInSignUpWithSocial,
  signInSignUpWithEmailPassword,
  handleSendPasswordResetEmail,
  useAuthState,
  handleFirebaseSignOut,
} from "../Firebase";

function AuthenticatorContextProvider({ children }) {
  const [firebaseUser, firebaseUserLoading, firebaseUserError] = useAuthState();
  const [authenticateToken, { data, /*loading, error,*/ reset }] =
    useMutation(gql`
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

  function logout() {
    handleFirebaseSignOut();
    reset();
  }

  async function handleSignInSignUp(method, provider, meta = {}) {
    // TODO add email/password option
    let user;
    switch (provider) {
      case "EMAIL_PASSWORD":
        user = await signInSignUpWithEmailPassword(
          method,
          meta.email,
          meta.password
        );
        break;
      case "GOOGLE":
      case "FACEBOOK":
        user = await signInSignUpWithSocial(provider);
        break;
    }

    if (!user) {
      return null;
    }

    return await handleAuthenticationResponse(user, method);
  }

  async function handleAuthenticationResponse(user, method) {
    try {
      if (!user) {
        return null;
      }

      console.log("handleAuthenticationResponse", { user });
      const response = await authenticateToken({
        variables: { token: user.accessToken, method }, // method: SIGN_UP, SIGN_IN
      });

      console.log("handleAuthenticationResponse", { response });

      if (response?.data?.authenticate?.authenticationError) {
        return response.data.authenticate.authenticationError; // return response so it can be used to handle errors where it's used
      }

      return null;
    } catch (e) {
      console.log("handleAuthenticationResponse", { e });
      return null;
    }
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

  async function handleAuthStateChange(user) {
    try {
      await handleAuthenticationResponse(user, "SIGN_IN");
    } catch (e) {
      console.log("handleAuthStateChange", { e });
    }
  }

  useEffect(() => {
    if (firebaseUser) {
      handleAuthStateChange(firebaseUser);
    } else {
      logout();
    }
  }, [firebaseUser]);

  console.log({
    firebaseUser,
    firebaseUserLoading,
    firebaseUserError,
  });

  return (
    <AuthenticatorContext.Provider
      value={{
        user: data?.authenticate?.user || null,
        authenticationError: null, // TODO replace this with local state where used
        logout,
        handleSignUpWithGoogle,
        handleSignUpWithFacebook,
        handleSignInWithGoogle,
        handleSignInWithFacebook,
        handleSignUpWithEmailPassword,
        handleSignInWithEmailPassword,
        handleSendPasswordResetEmail,
        handleAuthenticationResponse,
      }}
    >
      {children}
    </AuthenticatorContext.Provider>
  );
}

export { AuthenticatorContextProvider };

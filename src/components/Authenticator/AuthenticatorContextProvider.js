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
  const [firebaseAuthUser, firebaseLoading] = useAuthState({});
  const [authenticateToken, { data, loading, reset /* error */ }] = useMutation(
    gql`
      mutation ($method: String!) {
        authenticate(method: $method) {
          id
          username
          email
          initials
          picture
          token
        }
      }
    `,
  );

  async function logout() {
    return handleFirebaseSignOut();
  }

  async function handleSignInSignUp(method, provider, meta = {}) {
    let user;
    switch (provider) {
      case "EMAIL_PASSWORD":
        user = await signInSignUpWithEmailPassword(
          method,
          meta.email,
          meta.password,
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

      const response = await authenticateToken({
        variables: { method }, // method: SIGN_UP, SIGN_IN
        context: {
          headers: {
            authorization: user?.accessToken,
          },
        },
      });

      if (response?.errors) {
        return response.errors;
      }

      return null;
    } catch (e) {
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

  useEffect(() => {
    console.log("effect", { loading, firebaseAuthUser, data });
    let cancelled = false;
    const token = firebaseAuthUser?.accessToken;
    if (!token) {
      if (data) reset();
      return;
    }
    if (data) return; // already authenticated on app side
    (async () => {
      try {
        if (loading) {
          return;
        }
        await authenticateToken({
          variables: { method: "SIGN_IN" },
          context: { headers: { authorization: token } },
        });
      } catch (err) {
        console.log(err);
        if (!cancelled) {
          // handle/log error (optional retry)
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [
    firebaseAuthUser?.accessToken,
    firebaseAuthUser?.uid,
    data?.authenticate,
    loading,
    authenticateToken,
    reset,
  ]);

  // wait for firebase to load (and user, if they're logged in)
  function show() {
    function loggedInAndWaitingForProfiledata() {
      return !firebaseLoading && firebaseAuthUser && !data;
    }

    if (firebaseLoading || loggedInAndWaitingForProfiledata()) {
      return false;
    }

    return true;
  }

  return (
    <AuthenticatorContext.Provider
      value={{
        user: data?.authenticate,
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
      {show() && children}
    </AuthenticatorContext.Provider>
  );
}

export { AuthenticatorContextProvider };

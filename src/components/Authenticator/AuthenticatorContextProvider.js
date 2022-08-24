import { useMutation, gql } from "@apollo/client";
import { AuthenticatorContext } from "./AuthenticatorContext";
import {
  signUpWithGoogle,
  signUpWithFacebook,
  signInWithGoogle,
  signInWithFacebook,
} from "../Firebase";

function AuthenticatorContextProvider({ children }) {
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

  async function login(response) {
    const token = response.credential;
    authenticateToken({ variables: { token } });
  }

  function logout() {
    reset();
  }

  async function handleSignUpWithGoogle() {
    const user = await signUpWithGoogle();
    const response = await authenticateToken({
      variables: { token: user.accessToken, method: "SIGN_UP" },
    });
    return response.data.authenticate;
  }

  async function handleSignUpWithFacebook() {
    const user = await signUpWithFacebook();
    const response = await authenticateToken({
      variables: { token: user.accessToken, method: "SIGN_UP" },
    });
    return response.data.authenticate;
  }

  async function handleSignInWithGoogle() {
    const user = await signInWithGoogle();
    const response = await authenticateToken({
      variables: { token: user.accessToken, method: "SIGN_IN" },
    });
    console.log({ response });
    return response.data.authenticate;
  }

  async function handleSignInWithFacebook() {
    const user = await signInWithFacebook();
    const response = await authenticateToken({
      variables: { token: user.accessToken, method: "SIGN_IN" },
    });
    return response.data.authenticate;
  }

  return (
    <AuthenticatorContext.Provider
      value={{
        user:
          data && data.authenticate && data.authenticate.user
            ? data.authenticate.user
            : null,
        authenticationError: null, // TODO replace this with local state where used
        login,
        logout,
        handleSignUpWithGoogle,
        handleSignUpWithFacebook,
        handleSignInWithGoogle,
        handleSignInWithFacebook,
      }}
    >
      {children}
    </AuthenticatorContext.Provider>
  );
}

export { AuthenticatorContextProvider };

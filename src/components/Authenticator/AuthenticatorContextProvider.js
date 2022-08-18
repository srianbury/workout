import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { AuthenticatorContext } from "./AuthenticatorContext";

function AuthenticatorContextProvider({ children }) {
  const [authenticateToken, { data, loading, error, reset }] = useMutation(gql`
    mutation ($token: String!) {
      login(token: $token) {
        userId
        username
        email
        initials
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

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
      callback: login,
    });
  }, []);

  return (
    <AuthenticatorContext.Provider
      value={{
        user: data && data.login ? data.login : null,
        login,
        logout,
      }}
    >
      {children}
    </AuthenticatorContext.Provider>
  );
}

export { AuthenticatorContextProvider };

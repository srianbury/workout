import { useState } from "react";
import { AuthenticatorContext } from "./AuthenticatorContext";

function AuthenticatorContextProvider({ children }) {
  const [user, setUser] = useState(null);

  function login() {
    setUser({
      username: "brian",
    });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthenticatorContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthenticatorContext.Provider>
  );
}

export { AuthenticatorContextProvider };

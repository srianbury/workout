import { useContext } from "react";
import { AuthenticatorContext } from "./AuthenticatorContext";
import { LoginButton } from "./LoginButton";
import { ProfileButton } from "./ProfileButton";

function AuthButton() {
  const { user } = useContext(AuthenticatorContext);
  return user ? <ProfileButton /> : <LoginButton />;
}

export { AuthButton };

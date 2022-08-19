import { useEffect } from "react";
import { signInWithGoogle } from "../Firebase";

function GoogleLoginButton() {
  useEffect(() => {
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
      <button type="button" onClick={signInWithGoogle}>
        Sign Up With Google
      </button>
    </div>
  );
}

export { GoogleLoginButton };

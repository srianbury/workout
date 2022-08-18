import { useEffect } from "react";

function GoogleLoginButton() {
  useEffect(() => {
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return <div id="signInDiv"></div>;
}

export { GoogleLoginButton };

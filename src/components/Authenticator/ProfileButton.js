import { useContext } from "react";
import Link from "next/link";
import { Avatar, Box } from "@mui/material";
import { AuthenticatorContext } from "../Authenticator";

function ProfileButton() {
  const { user } = useContext(AuthenticatorContext);
  return (
    <Link href="/profile">
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Avatar
          alt="b" // user's initials
          src={`https://avatars.dicebear.com/api/initials/${user.initials}.svg`}
        />
      </Box>
    </Link>
  );
}

export { ProfileButton };

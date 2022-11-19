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
          alt={user.initials}
          src={
            user.picture ||
            `https://avatars.dicebear.com/api/initials/${user.initials}.svg`
          }
        >
          <img
            alt={user.initials}
            src={
              user.picture ||
              `https://avatars.dicebear.com/api/initials/${user.initials}.svg`
            }
            referrerPolicy="no-referrer"
          />
        </Avatar>
      </Box>
    </Link>
  );
}

export { ProfileButton };

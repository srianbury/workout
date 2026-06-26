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
            `https://api.dicebear.com/10.x/initials/svg?seed=${user.initials}`
          }
        >
          <img
            alt={user.initials}
            src={
              user.picture ||
              `https://api.dicebear.com/10.x/initials/svg?seed=${user.initials}`
            }
            referrerPolicy="no-referrer"
          />
        </Avatar>
      </Box>
    </Link>
  );
}

export { ProfileButton };

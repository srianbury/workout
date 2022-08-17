import Link from "next/link";
import { Box } from "@mui/material";

function ProfileButton() {
  return (
    <Link href="/profile">
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <img
          src={`https://avatars.dicebear.com/api/initials/b.svg`}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "50%",
            maxWidth: "40px",
          }}
        />
      </Box>
    </Link>
  );
}

export { ProfileButton };

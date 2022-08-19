import Link from "next/link";
import { Button } from "@mui/material";

function LoginButton() {
  return (
    <Link href="/signin" passHref>
      <Button
        variant="outlined"
        sx={{
          borderColor: "black",
          color: "black",
          fontWeight: "bold",
          borderWidth: 1,
        }}
      >
        Sign In
      </Button>
    </Link>
  );
}

export { LoginButton };

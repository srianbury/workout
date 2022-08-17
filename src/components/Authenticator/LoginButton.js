import Link from "next/link";
import { Button } from "@mui/material";

function LoginButton() {
  return (
    <Link href="/login" passHref>
      <Button
        variant="outlined"
        sx={{
          borderColor: "black",
          color: "black",
          fontWeight: "bold",
          borderWidth: 1,
        }}
      >
        Login
      </Button>
    </Link>
  );
}

export { LoginButton };

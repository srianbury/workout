import { Box } from "@mui/material";
import NextLink from "next/link";

function DrawerLink({ href, text }) {
  return (
    <NextLink href={href} passHref>
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
            textDecoration: "underline",
          },
        }}
      >
        <h2>{text}</h2>
      </Box>
    </NextLink>
  );
}

export { DrawerLink };

import { useContext } from "react";
import { Box, Drawer } from "@mui/material";
import NextLink from "next/link";
import { NavDrawerContext } from ".";
import { DrawerLink } from "./DrawerLink";

function NavDrawer() {
  const { isOpen, closeDrawer } = useContext(NavDrawerContext);

  return (
    <Drawer anchor="left" open={isOpen} onClose={closeDrawer}>
      <Box
        sx={{ width: 250, m: 2 }}
        role="presentation"
        onClick={closeDrawer}
        onKeyDown={closeDrawer}
      >
        <DrawerLink href="/" text="Home" />
        <DrawerLink href="/about" text="About" />
      </Box>
    </Drawer>
  );
}

export { NavDrawer };

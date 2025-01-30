import { useContext } from "react";
import { Box, Drawer } from "@mui/material";
import { NavDrawerContext } from ".";
import { DrawerLink } from "./DrawerLink";
import * as CONSTANTS from "../../constants";

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
        <DrawerLink href={`/${CONSTANTS.PATH_CREATE}`} text="Create Post" />
        <DrawerLink href={`/favorites`} text="My Favorites" />
      </Box>
    </Drawer>
  );
}

export { NavDrawer };

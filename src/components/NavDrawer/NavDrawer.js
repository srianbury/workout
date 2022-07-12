import { useContext } from "react";
import { Box, Drawer } from "@mui/material";
import { NavDrawerContext } from ".";

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
        Navigation Drawer
      </Box>
    </Drawer>
  );
}

export { NavDrawer };

import { useContext } from "react";
import { Box, Container, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavDrawerContext } from "../NavDrawer";

function Header() {
  const { isOpen, openDrawer } = useContext(NavDrawerContext);
  return (
    <Box
      sx={{
        backgroundColor: "#42a5f5",
        py: 2,
        mb: 2,
      }}
    >
      <Container fixed>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={openDrawer}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon fontSize="large" sx={{ mr: 2 }} />
          <h2>Site Name</h2>
        </IconButton>
      </Container>
    </Box>
  );
}

export { Header };

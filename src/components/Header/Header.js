import { useContext } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  IconButton,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavDrawerContext } from "../NavDrawer";
import { AuthButton } from "../Authenticator";

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
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={openDrawer}
              edge="start"
              disableFocusRipple={true}
              disableRipple={true}
              sx={{ mr: 2, pr: 0, display: "inline" }}
            >
              <MenuIcon
                fontSize="large"
                sx={{ display: "table-cell", verticalAlign: "middle" }}
              />
            </IconButton>
            <Box sx={{ display: "inline", verticalAlign: "middle" }}>
              <Link href="/">
                <Typography
                  sx={{
                    display: "inline",
                    fontWeight: "bold",
                    "&:hover": {
                      cursor: "pointer",
                      textDecoration: "underline",
                    },
                  }}
                  variant="h5"
                >
                  Platform
                </Typography>
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: "inline", verticalAlign: "middle" }}>
            <AuthButton />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export { Header };

import { Box, Container } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#42a5f5",
        py: 2,
        mt: 2,
      }}
    >
      <Container fixed>
        <h2>Footer Contents</h2>
        {process.env.NODE_ENV === "production" ? null : (
          <div>ENV: {process.env.NODE_ENV}</div>
        )}
      </Container>
    </Box>
  );
}

export { Footer };

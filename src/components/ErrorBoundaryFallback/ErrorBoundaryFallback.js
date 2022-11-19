import { Box, Button, CssBaseline, Grid } from "@mui/material";

const ErrorBoundaryFallback = ({ resetError }) => {
  return (
    <>
      <CssBaseline />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Box>An un expected error occurred.</Box>
        <Button variant="outlined" onClick={() => resetError()}>
          Click here to reset
        </Button>
        <Box>or try refreshing the page.</Box>
      </Grid>
    </>
  );
};

export { ErrorBoundaryFallback };

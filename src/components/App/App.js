// https://nextjs.org/docs/advanced-features/custom-app
import NextHead from "next/head";
import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { Apollo } from "../Apollo";
import { AuthenticatorContextProvider } from "../Authenticator/AuthenticatorContextProvider";
import { NavDrawerContextProvider } from "../NavDrawer/NavDrawerContextProvider";
import { NavDrawer } from "../NavDrawer";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { ErrorBoundary } from "../ErrorBoundary";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const theme = createTheme({
  palette: {
    neutral: {
      main: "#757575",
      contrastText: "#fff",
    },
  },
});

function App({ Component, pageProps }) {
  return (
    <ErrorBoundary tags={[["location", "global"]]}>
      <Apollo>
        <NextHead>
          <title>Workout</title>
          <meta
            name="description"
            content="A community for finding and sharing exercises and workout plans."
          />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link rel="icon" href="/favicon.ico" />
          <script
            src="https://accounts.google.com/gsi/client"
            async
            defer
          ></script>
        </NextHead>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <AuthenticatorContextProvider>
            <NavDrawerContextProvider>
              <Header />
              <NavDrawer />
              <ErrorBoundary tags={[["location", "page"]]}>
                <div className="content">
                  <Container fixed>
                    <Component {...pageProps} />
                  </Container>
                </div>
              </ErrorBoundary>
              <Footer />
            </NavDrawerContextProvider>
          </AuthenticatorContextProvider>
        </ThemeProvider>
      </Apollo>
    </ErrorBoundary>
  );
}

export { App };

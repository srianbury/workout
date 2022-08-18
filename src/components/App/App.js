// https://nextjs.org/docs/advanced-features/custom-app
import NextHead from "next/head";
import Script from "next/script";
import { Container, CssBaseline } from "@mui/material";
import { Apollo } from "../Apollo";
import { AuthenticatorContextProvider } from "../Authenticator/AuthenticatorContextProvider";
import { NavDrawerContextProvider } from "../NavDrawer/NavDrawerContextProvider";
import { NavDrawer } from "../NavDrawer";
import { Header } from "../Header";
import { Footer } from "../Footer";

function App({ Component, pageProps }) {
  return (
    <>
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
        <AuthenticatorContextProvider>
          <NavDrawerContextProvider>
            <Header />
            <NavDrawer />
            <div className="content">
              <Container fixed>
                <Component {...pageProps} />
              </Container>
            </div>
            <Footer />
          </NavDrawerContextProvider>
        </AuthenticatorContextProvider>
      </Apollo>
    </>
  );
}

export { App };

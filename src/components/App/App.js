// https://nextjs.org/docs/advanced-features/custom-app
import NextHead from "next/head";
import { CssBaseline } from "@mui/material";

function App({ Component, pageProps }) {
  return (
    <>
      <NextHead>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </NextHead>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}

export { App };

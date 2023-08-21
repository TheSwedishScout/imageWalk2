import "@/styles/globals.css";
import { CacheProvider } from "@emotion/react";
import { EmotionCache } from "@emotion/utils";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import createEmotionCache from "./lib/createEmotionCache";
import theme from "./lib/theme";
import { Header } from "@/app/layout/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ActiveRouteProvider } from "@/app/stores/TrackStore";
import { SessionProvider } from "next-auth/react";
import "./Rutt/track.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ActiveRouteProvider>
        <ThemeProvider theme={theme}>
          <SessionProvider session={session}>
            <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
              theme="colored"
            />
            <CssBaseline />
            <Header />
            <Container
              sx={{
                ml: {
                  xs: "-0.5rem",
                },
                mt: {
                  xs: "0.5rem",
                  sm: "1rem",
                },
              }}
            >
              <Component {...pageProps} />
            </Container>
          </SessionProvider>
        </ThemeProvider>
      </ActiveRouteProvider>
    </CacheProvider>
  );
}

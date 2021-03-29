import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/layout";
import customTheme from "../styles/customTheme";
import "../styles/globals.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import Reaptcha from "reaptcha";
const client = new ApolloClient({
  uri: "https://gateway.itpsru.in.th/graphql",
});
Sentry.init({
  dsn:
    "https://39b9424745644e8ea9ccb639686000d3@o449610.ingest.sentry.io/5696322",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={customTheme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;700&family=Sarabun:wght@400;700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;

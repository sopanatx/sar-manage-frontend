import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";

import customTheme from "../styles/customTheme";
import "../styles/globals.css";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

import { ApolloProvider } from "@apollo/client";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { setContext } from "@apollo/client/link/context";
import getConfig from "next/config";
import { createUploadLink } from "apollo-upload-client";

const { GRAPHQL_API_ENDPOINT, SENTRY_API_ENDPOINT } =
  getConfig().publicRuntimeConfig;
const authLink = setContext((_, { headers }) => {
  let token;
  if (typeof window != "undefined") {
    token = localStorage.getItem("accessToken");
  }

  return {
    headers: {
      ...headers,
      "Access-Control-Allow-Origin": "*",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const httpLink = createUploadLink({ uri: GRAPHQL_API_ENDPOINT });

const client = new ApolloClient({
  ssrMode: true,
  uri: GRAPHQL_API_ENDPOINT,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
if (process.env.ENV == "production") {
  Sentry.init({
    dsn: SENTRY_API_ENDPOINT,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client as any}>
      <ChakraProvider theme={customTheme}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;700&family=Sarabun:wght@400;700&display=optional"
            rel="stylesheet"
          ></link>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
function localStorate(localStorate: any) {
  throw new Error("Function not implemented.");
}

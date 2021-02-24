import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

let apolloClient;

const link = createHttpLink({
  uri: `${process.env.STRAPI_BACKEND}/graphql`,
  credentials: "include",
});

function createApolloClient() {
  // typeof window !== "undefined" ? initializeCookie() : null;
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

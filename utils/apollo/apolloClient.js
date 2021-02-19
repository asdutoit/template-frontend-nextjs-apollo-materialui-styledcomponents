import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let apolloClient;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: new HttpLink({
      uri: "http://localhost:1337/graphql",
      headers: {
        // Add a function to load token from localStorage.  The line below is merely for testing
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMmY2NGZkNzYzZWJlMzY4MGU3OTUyNSIsImlhdCI6MTYxMzcyODM0NCwiZXhwIjoxNjE2MzIwMzQ0fQ.eQtdQUslgMDIJlZzTUs-4oU-bfjjxZ0p1rWXNWAE6E0`,
      },
      //credentials: "include", //  include to request a cookie from the server
      // IF ENABLED 'credentials', you probably wont need to enable 'headers'
      //// ====== SET THE FOLLOWING ON BACKEND SERVER =======
      // var corsOptions = {
      //   origin: '<insert uri of front-end domain>',
      //   credentials: true // <-- REQUIRED backend setting
      // };
      // app.use(cors(corsOptions));
    }),
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
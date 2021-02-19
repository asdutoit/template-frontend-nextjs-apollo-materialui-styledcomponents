import {useEffect} from 'react'
import { Provider } from 'next-auth/client'
import '../styles/globals.css'
import {ApolloProvider} from "@apollo/client";
import {useApollo} from '../utils/apollo/apolloClient'
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/core/styles";
import { materialTheme } from "../styles/material-ui-theme";
import { styledTheme } from "../styles/styled-components-theme";

// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App ({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <Provider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      options={{
        // Client Max Age controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
        clientMaxAge: 0,
        // Keep Alive tells windows / tabs that are signed in to keep sending
        // a keep alive request (which extends the current session expiry) to
        // prevent sessions in open windows from expiring. Value in seconds.
        //
        // Note: If a session has expired when keep alive is triggered, all open
        // windows / tabs will be updated to reflect the user is signed out.
        keepAlive: 0
      }}
      session={pageProps.session} >
        <ApolloProvider client={apolloClient}>
        <StyledThemeProvider theme={styledTheme}>
          <MaterialThemeProvider theme={materialTheme}>
          <Component {...pageProps} />
          </MaterialThemeProvider>
          </StyledThemeProvider>
        </ApolloProvider>
    </Provider>
  )
}
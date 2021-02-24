import { useEffect, useState } from "react";
import Link from "next/link";
import { providers, signIn, signOut, useSession } from "next-auth/client";
import styles from "./header.module.css";
import { useCookies } from "react-cookie";
import axios from "axios";

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const [session, loading] = useSession();
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    session ? initializeCookie() : null;
  }, [session]);

  function initializeCookie() {
    function handleCookie() {
      setCookie("token", `${session.user.strapiToken}`, {
        path: "/",
      });
    }
    handleCookie();
  }

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.STRAPI_BACKEND}/logout`,
        withCredentials: true,
      });
      signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header
      style={{
        padding: "0 1rem 1rem 1rem",
        maxWidth: "680px",
        textAlign: "center",
        margin: "auto",
      }}
    >
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={async (e) => {}}
              >
                Sign in
              </a>
            </>
          )}
          {session && (
            <>
              {console.log(session.user)}
              {session.user.picture && (
                <span
                  style={{ backgroundImage: `url(${session.user.picture})` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>{" "}
                through <strong>{session.user.provider}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={handleLogOut}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/client">
              <a>Client</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/server">
              <a>Server</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/protected">
              <a>Protected</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/api-example">
              <a>API</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

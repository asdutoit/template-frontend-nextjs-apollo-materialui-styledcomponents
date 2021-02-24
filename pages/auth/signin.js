import { providers, signIn } from "next-auth/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./auth.module.css";
import MaterialSignIn from "./MaterialSignIn";
import Logout from "./Logout";

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          {provider.name === "Google" ? (
            <GoogleButton id={provider.id} />
          ) : (
            <FacebookButton id={provider.id} />
          )}
        </div>
      ))}
      <MaterialSignIn />
      <Logout />
    </>
  );
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
  };
};

function FacebookButton({ children, id }) {
  return (
    <a
      onClick={() => signIn(id)}
      className={`${styles.fb} ${styles.btn} ${styles.a_text}`}
    >
      <FontAwesomeIcon icon={["fab", "facebook"]} /> Login with Facebook
    </a>
  );
}

function GoogleButton({ children, id }) {
  return (
    <a
      onClick={() => signIn(id)}
      className={`${styles.google} ${styles.btn} ${styles.a_text}`}
    >
      <FontAwesomeIcon icon={["fab", "google"]} /> Login with Google
    </a>
  );
}

import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import styled from "styled-components";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Layout from "../components/layout";

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  a {
    text-decoration: none;
    transition: color 0.15s ease;
    color: ${({ cl1, theme }) => (cl1 === "primary" ? "#6638f0" : "#ffde5c")};
    &:hover,
    a:focus,
    a:active {
      text-decoration: underline;
    }
  }
  span {
    background: linear-gradient(270deg, #53a0ec, #57c84f);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    /* transform: ; */
  }
`;

const CustomTextField = styled(TextField)`
  & label.Mui-focused {
    /* color: ${({ cl1, theme }) =>
      cl1 === "primary" ? "#6638f0" : "#ffde5c"}; */
    color: ${({ theme }) => theme.colors.primary};
  }
  & .MuiOutlinedInput-root {
    background-color: white;
    fieldset {
      transition: all 0.1s;
    }
    /* &:hover fieldset {
      border-color: yellow;
    } */
    &.Mui-focused fieldset {
      /* box-shadow: ${({ cl1 }) =>
        cl1 === "primary"
          ? "rgba(102, 56, 240, 0.2) 0px 8px 24px;"
          : "rgba(255, 222, 92, 0.2) 0px 8px 24px;"}; */
      border-color: ${({ cl1 }) =>
        cl1 === "primary" ? "rgba(102, 56, 240, 1)" : "rgba(255, 222, 92, 1)"};
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(7),
  },
}));

export default function Page() {
  const classes = useStyles();
  const [color, setColor] = useState("primary");
  const [query, setQuery] = useState("");

  const handleColorChange = () => {
    if (color === "primary") setColor("secondary");
    if (color === "secondary") setColor("primary");
  };

  return (
    <Layout>
      <div className={styles.container}>
        <Title cl1={color}>
          <span>Welcome</span> to <a href="https://nextjs.org">Next.js!</a>
        </Title>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <Button onClick={handleColorChange} color={color} variant="outlined">
          Change Primary Color
        </Button>
        <CustomTextField
          className={classes.margin}
          variant="outlined"
          label="Enter a location"
          size="small"
          value={query}
          // cl1={color}
          color="primary"
          // fullWidth
          // inputRef={autoCompleteRef}
          onChange={(event) => setQuery(event.target.value)}
        />

        <TextField
          color="secondary"
          variant="outlined"
          label="Enter anything"
          size="small"
        />
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </div>
    </Layout>
  );
}

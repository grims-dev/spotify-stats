import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Spotify Stats</title>
        <meta name="description" content="View your Spotify listening habits in charts and graphs"></meta>
      </Head>
      <h1>Spotify Stats</h1>
    </div>
  );
}

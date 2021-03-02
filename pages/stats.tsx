import Head from "next/head";
import styles from "../styles/Home.module.css";
import { createGetRequestOptions } from '../lib/fetch-helpers';

export default function Stats({ test }) {
  console.log("hi!", test);
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Stats | Spotify Stats</title>
        <meta name="description" content="View your Spotify listening habits in charts and graphs"></meta>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico"/>
        <link rel="preload" href="/fonts/Oxygen/Oxygen-Light.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/Oxygen/Oxygen-Bold.ttf" as="font" crossOrigin="" />
      </Head>
      <div>
        <p>Stats page!</p>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const getRequestOptions = createGetRequestOptions(process.env.SPOTIFY_CLIENT_SECRET);

  return {
    props: { test: getRequestOptions },
  }
}
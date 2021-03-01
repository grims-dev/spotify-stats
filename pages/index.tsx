import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router'
import { redirectToUserAuth } from '../lib/api-auth';
import styles from "../styles/Home.module.css";

export default function Home() {
  const router = useRouter();
  const spotifyToken = router.query?.code;

  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Home | Spotify Stats</title>
        <meta name="description" content="View your Spotify listening habits in charts and graphs"></meta>
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico"/>
        <link rel="preload" href="/fonts/Oxygen/Oxygen-Light.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/Oxygen/Oxygen-Bold.ttf" as="font" crossOrigin="" />
      </Head>
      <div className="md:flex">
        <div className="p-4 md:w-3/5 mt-8 md:mt-52">
          <h1 className="text-7xl md:text-9xl text-green-600 text-center md:text-left">Spotify Stats</h1>
        </div>
        <div className="p-4 md:w-2/5 md:mt-60 text-xl md:text-2xl leading-normal text-center md:text-left">
          {spotifyToken ? (
            <p className="mb-6">You are logged in with Spotify! View the <Link href="/stats">stats page</Link> &raquo;</p>
          ) : (
            <p className="mb-6">Log in with Spotify to view your listening habits in charts and graphs.</p>
          )}
          <button className="px-4 py-2 bg-green-600 rounded shadow-md text-xl" onClick={redirectToUserAuth}>{spotifyToken ? "Log out" : "Log in"}</button>
        </div>
      </div>
    </div>
  );
}

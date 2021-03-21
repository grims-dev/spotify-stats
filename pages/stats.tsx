import Head from 'next/head';
import Cookies from 'cookies';
import styles from '../styles/Home.module.css';
import { getUserOwnedFollowedPlaylists } from '../lib/api-methods';

export default function Stats({ isAuthed = false, data }) {
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
        <p>Stats page! You are {isAuthed ? 'authed' : 'not authed'}.</p>
        <code>
          {data}
        </code>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const cookies = new Cookies(req, res);
  const existingAccessResponse = cookies.get('accessResponse') ? JSON.parse(cookies.get('accessResponse')) : false;
  if (!existingAccessResponse) {
    return { props: { isAuthed: false } }
  }

  // redirect to auth page with refresh token if access has expired
  if (new Date().getTime() >= existingAccessResponse.expires_in_unix_timestamp) {
    return {
      redirect: {
        permanent: false,
        destination: `/auth?code=${existingAccessResponse.refresh_token}`
      }
    }
  }

  const playlistData = await getUserOwnedFollowedPlaylists(existingAccessResponse.access_token);
  return { props: { isAuthed: true, data: JSON.stringify(playlistData) } }
}
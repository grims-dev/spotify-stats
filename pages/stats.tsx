import { useState } from 'react';
import Cookies from 'cookies';
import HeadTags from '../components/HeadTags';
import TopTracksTable from '../components/TopTracksTable';
import styles from '../styles/Home.module.css';
import { signCookieKeys, getOptions } from '../lib/cookies';
import { redirectToUserAuth } from '../lib/api-auth';


export default function Stats({ accessResponse = '' }) {
  if (!accessResponse) { 
    return (
      <div className={styles.container}>
        <HeadTags title="Stats" />
        <div className="p-4 md:mt-48 text-xl md:text-2xl leading-normal text-center">
          <p className="mb-6">Sorry, your stats are only available if you log in with Spotify.</p>
          <button className="px-4 py-2 bg-green-600 rounded shadow-md text-xl" onClick={redirectToUserAuth}>Log in</button>
        </div>
      </div>
    );
  }

  const access = JSON.parse(accessResponse);

  return (
    <div className={styles.container}>
      <HeadTags title="Stats" />
      <div className="p-4 md:mt-12 text-xl md:text-2xl leading-normal">
        <p>Your top tracks from the last 4 weeks:</p>
        <TopTracksTable accessToken={access.access_token} />
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const cookies = new Cookies(req, res, signCookieKeys);
  const existingAccessResponse = JSON.parse(cookies.get('accessResponse', getOptions) || false);
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

  return { props: { accessResponse: JSON.stringify(existingAccessResponse) } }
}
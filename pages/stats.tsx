import { useState } from 'react';
import Cookies from 'cookies';
import HeadTags from '../components/HeadTags';
import TopArtistsOrTracksTable from '../components/TopArtistsOrTracksTable';
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

  const [topType, setTopType] = useState('tracks');
  const [timeRange, setTimeRange] = useState('short_term');
  const access = JSON.parse(accessResponse);

  return (
    <div className={styles.container}>
      <HeadTags title="Stats" />
      <div className="p-4 md:mt-6 text-xl md:text-2xl leading-normal">
        <p className="mb-4">
          Your top Spotify
          <select name="top-type" className="mx-2 bg-transparent border border-gray-500 rounded cursor-pointer" onChange={e => setTopType(e.target.value)}>
            <option value="tracks">tracks</option>
            <option value="artists">artists</option>
          </select>
          from
          <select name="time-range" className="mx-2 bg-transparent border border-gray-500 rounded cursor-pointer" onChange={e => setTimeRange(e.target.value)}>
            <option value="short_term">the last 4 weeks</option>
            <option value="medium_term">the last 6 months</option>
            <option value="long_term">all time</option>
          </select>:
        </p>
        <TopArtistsOrTracksTable accessToken={access.access_token} endpointOptions={{topType, timeRange}} />
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
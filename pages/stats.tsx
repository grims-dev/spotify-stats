import Cookies from 'cookies';
import HeadTags from '../components/HeadTags';
import styles from '../styles/Home.module.css';
import { signCookieKeys, getOptions } from '../lib/cookies';
import { redirectToUserAuth } from '../lib/api-auth';
import { getUserOwnedFollowedPlaylists, getUsersTopArtistsOrTracks } from '../lib/api-methods';

export default function Stats({ isAuthed = false, data }) {
  function generateTopTable() {
    const parsedItems = JSON.parse(data).items;
    console.log(parsedItems);
    return (
      <table>
        <tbody>
          <tr>
            <th>No.</th>
            <th>Song</th>
            <th>Artist(s)</th>
          </tr>
          {parsedItems.map((item, i) => {
            return (
              <tr key={`row-${i}`}>
                <td>{i + 1}.</td>
                <td>{item.name}</td>
                <td>{item.artists.map(artist => artist.name).join(', ')}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  }
  if (!isAuthed) { 
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

  
  return (
    <div className={styles.container}>
      <HeadTags title="Stats" />
      <div className="p-4 md:mt-12 text-xl md:text-2xl leading-normal">
        <p>Stats page! You are {isAuthed ? 'authed' : 'not authed'}.</p>
        <p>Your top artists:</p>
        {generateTopTable()}
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

  const playlistData = await getUsersTopArtistsOrTracks(existingAccessResponse.access_token, 'tracks', 'long_term');
  return { props: { isAuthed: true, data: JSON.stringify(playlistData) } }
}
import Cookies from 'cookies';
import { signCookieKeys, getOptions } from '../lib/cookies';

export function redirectToUserAuth() {
  const scopes: string = 'user-read-recently-played user-top-read playlist-read-private playlist-read-collaborative';
  let authUrl: string = `https://accounts.spotify.com/authorize`
    + `?response_type=code`
    + `&show_dialog=true`
    + `&client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`
    + `&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI)}`
    + `&scope=${encodeURIComponent(scopes)}`;
  window.location.assign(authUrl);
}

// call this with the auth code on first go around, otherwise call with refresh token
export async function requestAccessToken(authCodeOrRefreshToken: string) {
  const base64ClientIdAndSecret = Buffer.from(`${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const postRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${base64ClientIdAndSecret}`,
    },
    body: `grant_type=authorization_code&code=${authCodeOrRefreshToken}&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI}`,
  }
  return fetch('https://accounts.spotify.com/api/token', postRequestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .then((json) => { return json });
}

export function serverSideAuthCheck({ req, res }) {
  const cookies = new Cookies(req, res, signCookieKeys);
  const existingAccessJSON = cookies.get('accessResponse', getOptions);

  if (!existingAccessJSON) {
    return { props: { accessResponse: '' } }
  }

  // redirect to auth page with refresh token if access has expired
  const existingAccess = existingAccessJSON ? JSON.parse(existingAccessJSON) : null;
  if (new Date().getTime() >= existingAccess.expires_in_unix_timestamp) {
    return {
      redirect: {
        permanent: false,
        destination: `/auth?code=${existingAccess.refresh_token}`
      }
    }
  }

  return { props: { accessResponse: existingAccessJSON } }
}

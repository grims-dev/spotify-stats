export function redirectToUserAuth() {
  const scopes: string = 'user-read-recently-played user-top-read playlist-read-private playlist-read-collaborative';
  let authUrl: string = 'https://accounts.spotify.com/authorize';
  authUrl += '?response_type=code';
  authUrl += '&client_id=' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  authUrl += '&redirect_uri=' + encodeURIComponent(process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI);
  authUrl += '&scope=' + encodeURIComponent(scopes);
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
    body: 'grant_type=authorization_code&code=' + authCodeOrRefreshToken + '&redirect_uri=' + process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI
  }
  return fetch('https://accounts.spotify.com/api/token', postRequestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .then((json) => { return json });
}
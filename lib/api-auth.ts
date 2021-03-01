export function redirectToUserAuth() {
  const scopes = 'user-read-recently-played user-top-read playlist-read-private playlist-read-collaborative';
  let authUrl = 'https://accounts.spotify.com/authorize';
  authUrl += '?response_type=code';
  authUrl += '&client_id=' + process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  authUrl += '&redirect_uri=' + encodeURIComponent(process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI);
  authUrl += '&scope=' + encodeURIComponent(scopes);
  window.location.assign(authUrl);
}

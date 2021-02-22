export function redirectToAuth() {
  const scopes = 'user-read-recently-played user-top-read playlist-read-private playlist-read-collaborative user-library-read';
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}`
  window.location.assign(authUrl);
}

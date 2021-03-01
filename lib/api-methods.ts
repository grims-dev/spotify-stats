export function createGetRequestOptions(accessToken: string) {
  const headers = new Headers();
  headers.append('Authorization', 'Bearer ' + accessToken);
  return {
    method: "GET",
    headers: {
      'Authorization': 'Bearer ' + accessToken
    },
  }
}

// Get a list of the playlists owned or followed by the current Spotify user.
// HEADER	- Authorization Token
export async function getUserOwnedFollowedPlaylists(getRequestOptions: object) {
  fetch("https://api.spotify.com/v1/me/playlists", getRequestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .then((json) => console.log(json));
}

export async function getUsersTopArtists(getRequestOptions: object) {
  fetch("https://api.spotify.com/v1/me/top/" + "?type=" /*`artists` or `tracks` here*/ + "&time_range=" /* short_term/medium_term/long_term */, getRequestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .then((json) => console.log(json));
}

// Get audio features for multiple tracks based on their Spotify IDs.
// HEADER	- Authorization Token
// QUERY PARAMETER	- ids - A comma-separated list of the Spotify IDs for the tracks. Maximum: 100 IDs - String, Required
export async function getTracksAudioFeatures(getRequestOptions: object) {
  fetch("https://api.spotify.com/v1/audio-features", getRequestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .then((json) => console.log(json));
}

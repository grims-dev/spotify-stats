import { getRequest } from './fetch-helpers';

// Get a list of the playlists owned or followed by the current Spotify user.
export async function getUserOwnedFollowedPlaylists(accessToken: string) {
  return await getRequest('https://api.spotify.com/v1/me/playlists', accessToken);
}

// Get user's top artists or tracks.
type TopType = 'artists' | 'tracks';
type TimeRange = 'short_term' | 'medium_term' | 'long_term';
export async function getUsersTopArtistsOrTracks(accessToken: string, topType: TopType, timeRange: TimeRange) {
  let endpoint = 'https://api.spotify.com/v1/me/top/' + topType;
  endpoint += '?time_range=' + timeRange;

  return await getRequest(endpoint, accessToken);
}

// Get audio features for multiple tracks based on their Spotify IDs.
// QUERY PARAMETER	- ids - A comma-separated list of the Spotify IDs for the tracks. Maximum: 100 IDs - String, Required
export async function getTracksAudioFeatures(accessToken: string, trackIDs: Array<string>) {
  let endpoint = 'https://api.spotify.com/v1/audio-features';
  endpoint += '?ids=' + trackIDs.slice(0, 100).join();
  
  return await getRequest(endpoint, accessToken);
}

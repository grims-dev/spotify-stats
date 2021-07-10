import useSWR from 'swr';
import { getRequest } from '../lib/fetch-helpers';

type EndpointOptions = {
  trackIDs: Array<string>;
}
export default function useTopArtistsOrTracks(accessToken: string, options: EndpointOptions) {
  const endpoint = `https://api.spotify.com/v1/audio-features`
    + `?ids=${options.trackIDs.slice(0, 100).join()}`;
  const { data, error } = useSWR([endpoint, accessToken], getRequest);

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}
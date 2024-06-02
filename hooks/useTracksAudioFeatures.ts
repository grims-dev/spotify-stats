import useSWR from 'swr';
import { fetcher } from '../lib/fetch-helpers';

type EndpointOptions = {
  trackIDs: Array<string>;
}
export default function useTopArtistsOrTracks(accessToken: string, options: EndpointOptions) {
  const endpoint = `https://api.spotify.com/v1/audio-features`
    + `?ids=${options.trackIDs.slice(0, 100).join()}`;
    const { data, error } = useSWR([endpoint, accessToken], fetcher, {
      revalidateOnFocus: true,
    });

  return {
    data,
    isLoading: !error && !data,
    isError: error || data?.error
  }
}
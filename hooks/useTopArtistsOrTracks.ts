import useSWR from 'swr';
import { getRequest } from '../lib/fetch-helpers';

type TopType = 'artists' | 'tracks';
type TimeRange = 'short_term' | 'medium_term' | 'long_term';
type EndpointOptions = {
  topType: TopType,
  timeRange: TimeRange,
}
export default function useTopArtistsOrTracks(accessToken: string, options: EndpointOptions) {
  const endpoint = `https://api.spotify.com/v1/me/top/${options.topType}`
    + `?time_range=${options.timeRange}`
    + `&limit=50`;
  const { data, error } = useSWR([endpoint, accessToken], getRequest);

  return {
    data,
    isLoading: !error && !data,
    isError: error || data?.error
  }
}
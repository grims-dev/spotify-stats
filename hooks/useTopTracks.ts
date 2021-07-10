import useSWR from 'swr';
import { getRequest } from '../lib/fetch-helpers';

export default function useTopTracks(accessToken) {
  const { data, error } = useSWR([`https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20`, accessToken], getRequest)

  return {
    tracks: data,
    isLoading: !error && !data,
    isError: error
  }
}
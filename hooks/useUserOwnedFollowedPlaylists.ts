import useSWR from 'swr';
import { getRequest } from '../lib/fetch-helpers';

export default function useUserOwnedFollowedPlaylists(accessToken: string) {
  const endpoint = `https://api.spotify.com/v1/me/playlists`;
  const { data, error } = useSWR([endpoint, accessToken], getRequest);

  return {
    data,
    isLoading: !error && !data,
    isError: error || data?.error
  }
}
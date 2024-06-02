import useSWR from 'swr';
import { fetcher } from '../lib/fetch-helpers';

export default function useUserOwnedFollowedPlaylists(accessToken: string) {
  const endpoint = `https://api.spotify.com/v1/me/playlists`;
  const { data, error } = useSWR([endpoint, accessToken], fetcher, {
    revalidateOnFocus: true,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error || data?.error
  }
}
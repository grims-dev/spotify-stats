import useSWR from 'swr';
import { fetcher } from '../lib/fetch-helpers';

type EndpointOptions = {
  playlistID: string;
}
export default function useGetPlaylistItems(accessToken: string, options: EndpointOptions) {
  const endpoint = `https://api.spotify.com/v1/playlists/${options.playlistID}/tracks`;
  const { data, error } = useSWR([endpoint, accessToken], fetcher, {
    revalidateOnFocus: true,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error || data?.error
  }
}

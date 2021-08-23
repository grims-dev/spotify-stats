import useSWR from 'swr';
import { getRequest } from '../lib/fetch-helpers';

type EndpointOptions = {
  playlistID: string;
}
export default function useGetPlaylist(accessToken: string, options: EndpointOptions) {
  const endpoint = `https://api.spotify.com/v1/playlists/${options.playlistID}/`;
  const { data, error } = useSWR([endpoint, accessToken], getRequest);

  return {
    data,
    isLoading: !error && !data,
    isError: error || data?.error
  }
}

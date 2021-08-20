import useSWR from 'swr';
import { getRequest } from '../lib/fetch-helpers';

type EndpointOptions = {
  playlistID: string;
}
export default function useGetPlaylistItems(accessToken: string, options: EndpointOptions) {
  const endpoint = `https://api.spotify.com/v1/playlists/${options.playlistID}/tracks`;
  const { data, error } = useSWR([endpoint, accessToken], getRequest);

  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

import useGetPlaylistItems from '../hooks/useGetPlaylistItems';
import Loader from './Loader';
import TracksAnalysis from './TracksAnalysis';

export default function MultipleTracksInfo({ accessToken, endpointOptions }) {
  const { data, isLoading, isError } = useGetPlaylistItems(accessToken, endpointOptions);
  if (isLoading) return <Loader />;
  if (isError) return <>An error occurred when connecting to Spotify. Please try reloading the page.</>;

  if (data) {
    const trackIDs = data.items.map(item => item.track.id);
    console.log(trackIDs);
    if (trackIDs.length) {
      return <TracksAnalysis accessToken={accessToken} endpointOptions={{ trackIDs }} />;
    } else {
      return <>This playlist has no tracks!</>;
    }
  }

  return <>Your authentication has expired. Please try reloading the page.</>;
}

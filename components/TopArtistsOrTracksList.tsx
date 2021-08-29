import useTopArtistsOrTracks from '../hooks/useTopArtistsOrTracks';
import Card from './Card';

export default function TopArtistsOrTracksList({ accessToken, endpointOptions }) {
  const { data, isLoading, isError } = useTopArtistsOrTracks(accessToken, endpointOptions);
  if (isLoading) {
    return (
      <ol className="list-none grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5 justify-center text-base">
        {(new Array(16).fill(undefined)).map((item, i) => {
          return (
            <li key={`loading-${i}`}>
              <Card index={i} />
            </li>
          )
        })}
      </ol>
    );
  }
  if (isError) return <>An error occurred when connecting to Spotify. Please try reloading the page.</>;

  if (data?.items && data?.items?.length > 0) {
    return (
      <ol className="list-none grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5 justify-center text-base">
        {data.items.map((item, i) => {
          return (
            <li key={item.id}>
              <Card
                index={i}
                imageURL={item?.images?.[0]?.url || item?.album?.images?.[0]?.url}
                text={item.name}
              />
            </li>
          )
        })}
      </ol>
    )
  }

  if (data !== undefined) return <>No data found. Try listening to more music!</>;

  return <>Your authentication has expired. Please try reloading the page.</>;
}

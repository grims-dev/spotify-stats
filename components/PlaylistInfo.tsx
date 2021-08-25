import useGetPlaylist from '../hooks/useGetPlaylist';

export default function PlaylistInfo({ accessToken, endpointOptions }) {
  const { data, isLoading, isError } = useGetPlaylist(accessToken, endpointOptions);
  if (isLoading) return <>Loading...</>;
  if (isError) return <>An error occurred when connecting to Spotify. Please try reloading the page.</>;

  if (Object.keys(data).length > 0) {
    return (
      <div className="text-base sm:flex sm:items-center">
        <img src={data?.images?.[0]?.url} alt={`${data.name} playlist icon`} className="inline-block sm:mr-4 sm:w-1/3 md:w-1/4" />
        <div className="inline-block">
          <h1 className="text-4xl">{data.name}</h1>
          {data.description && <p className="italic">{data.description}</p>}
          <p className="mt-4">{data.public ? 'Public' : 'Private'} playlist by {data.owner.display_name}&nbsp;&nbsp;•&nbsp;&nbsp;{data.tracks.total} songs</p>
        </div>
      </div>
    )
  }

  return <>Your authentication has expired. Please try reloading the page.</>;
}

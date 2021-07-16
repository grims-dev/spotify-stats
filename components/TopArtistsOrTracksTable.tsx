import React from "react";
import useTopArtistsOrTracks from "../hooks/useTopArtistsOrTracks";

export default function TopArtistsOrTracksTable({ accessToken , endpointOptions }) {
  const { data, isLoading, isError } = useTopArtistsOrTracks(accessToken, endpointOptions);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred.</div>;
 
  return (
    <table className='w-full text-base'>
      <tbody>
        <tr className='border-b border-gray-500 text-left'>
          <th className="p-1.5"></th>
          <th className='p-1.5'>No.</th>
          <th className='p-1.5'>Title</th>
          <th className='p-1.5'>Artist(s)</th>
        </tr>
        {data && console.log(data)}
        {data?.items && endpointOptions.topType === 'tracks' && data.items?.map((track, i) => {
          const alternateBackground = i % 2 === 0 ? 'bg-white bg-opacity-5' : '';
          return (
            <tr key={track.id} className={alternateBackground}>
              <td className="p-1.5 w-12"><img src={track.album.images[track.album.images.length - 1].url} alt={`${track.album.name} art`}/></td>
              <td className='p-1.5'>{i + 1}.</td>
              <td className='p-1.5'>{track.name}</td>
              <td className='p-1.5'>{track.artists.map(artist => artist.name).join(', ')}</td>
            </tr>
          )
        })}
        {data?.items && endpointOptions.topType === 'artists' && data.items?.map((artist, i) => {
          const alternateBackground = i % 2 === 0 ? 'bg-white bg-opacity-5' : '';
          return (
            <tr key={artist.id} className={alternateBackground}>
              <td className='p-1.5'>{i + 1}.</td>
              <td className='p-1.5'>{artist.name}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
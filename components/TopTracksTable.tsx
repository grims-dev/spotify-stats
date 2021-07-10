import React from "react";
import useTopTracks from "../hooks/useTopTracks";

export default function TopTracksTable({ accessToken = '' }) {
  const { tracks, isLoading, isError } = useTopTracks(accessToken);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occurred.</div>;
 
  return (
    <table className='w-full'>
      <tbody>
        <tr className='border-b border-gray-500 text-left'>
          <th className='p-1.5'>No.</th>
          <th className='p-1.5'>Song</th>
          <th className='p-1.5'>Artist(s)</th>
        </tr>
        {tracks?.items && tracks?.items?.map((track, i) => {
          return (
            <tr key={track.id}>
              <td className='p-1.5'>{i + 1}.</td>
              <td className='p-1.5'>{track.name}</td>
              <td className='p-1.5'>{track.artists.map(artist => artist.name).join(', ')}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
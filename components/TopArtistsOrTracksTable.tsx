import React from "react";
import useTopArtistsOrTracks from "../hooks/useTopArtistsOrTracks";

export default function TopArtistsOrTracksTable({ accessToken , endpointOptions }) {
  const { data, isLoading, isError } = useTopArtistsOrTracks(accessToken, endpointOptions);
  if (isLoading) return <>Loading...</>;
  if (isError) return <>An error occurred when connecting to Spotify. Please try reloading the page.</>;
  if (data?.items) return (
    <table className="w-full text-base">
      <tbody>
        {// top tracks
        endpointOptions.topType === 'tracks' && (
          <>
            <tr className="border-b border-gray-500 text-left sticky top-0">
              <th className="p-1.5">No.</th>
              <th className="p-1.5">Icon</th>
              <th className="p-1.5">Title</th>
              <th className="p-1.5">Artist(s)</th>
            </tr>
            {data.items?.map((track, i) => {
              const alternateBackground = i % 2 === 0 ? 'bg-white bg-opacity-5' : '';
              return (
                <tr key={track.id} className={alternateBackground}>
                  <td className="p-1.5 text-center">{i + 1}.</td>
                  <td className="p-1.5">
                    <div className="w-12 h-12">
                      <img className="w-full max-h-full object-cover" src={track.album.images[track.album.images.length - 1].url} alt={`${track.album.name} art`}/>
                    </div>
                  </td>
                  <td className="p-1.5">{track.name}</td>
                  <td className="p-1.5">{track.artists.map(artist => artist.name).join(', ')}</td>
                </tr>
              )
            })}
          </>
        )}

        {// top artists
        endpointOptions.topType === 'artists' && (
          <>
            <tr className="border-b border-gray-500 text-left sticky top-0">
              <th className="p-1.5">No.</th>
              <th className="p-1.5">Icon</th>
              <th className="p-1.5">Artist</th>
              <th className="p-1.5">Genre(s)</th>
            </tr>
            {data.items?.map((artist, i) => {
              const alternateBackground = i % 2 === 0 ? 'bg-white bg-opacity-5' : '';
              return (
                <tr key={artist.id} className={alternateBackground}>
                  <td className="p-1.5 text-center">{i + 1}.</td>
                  <td className="p-1.5">
                    <div className="w-16 h-16">
                      <img className="w-full max-h-full object-cover" src={artist.images[artist.images.length - 1].url} alt={`${artist.name} icon`}/>
                    </div>
                    </td>
                  <td className="p-1.5">{artist.name}</td>
                  <td className="p-1.5">{artist.genres.join(', ') || '(no recorded genres)'}</td>
                </tr>
              )
            })}
          </>
        )}
      </tbody>
    </table>
  )

  return <>Your authentication has expired. Please try reloading the page.</>;
}
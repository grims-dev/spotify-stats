import Link from 'next/link';
import { forwardRef } from 'react';
import useUserOwnedFollowedPlaylists from '../hooks/useUserOwnedFollowedPlaylists';
import Card from './Card';

export default function PlaylistsList({ accessToken }) {
  const { data, isLoading, isError } = useUserOwnedFollowedPlaylists(accessToken);
  if (isLoading) return <>Loading...</>;
  if (isError) return <>An error occurred when connecting to Spotify. Please try reloading the page.</>;

  if (data?.items && data?.items?.length > 0) {
    return (
      <ul className="list-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-5 justify-center text-base">
        {data.items.map((item) => {
          return (
            <li key={item.id}>
              <Link href={`/playlist-stats?id=${item.id}`} passHref>
                <a className="flex items-center h-full w-full break-words overflow-hidden rounded-lg bg-gray-300 bg-opacity-10 border border-gray-700 transform transition duration-200 hover:bg-opacity-5 hover:shadow-lg hover:-translate-y-0.5">
                  <img src={item?.images?.[item.images.length - 1]?.url} className="w-16" />
                  <span className="px-4 leading-tight">{item.name}</span>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  return <>Your authentication has expired. Please try reloading the page.</>;
}

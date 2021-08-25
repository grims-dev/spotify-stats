import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import HeadTags from '../components/HeadTags';
import NotAuthedMessage from '../components/NotAuthedMessage';
import PlaylistInfo from '../components/PlaylistInfo';
import PlaylistTracks from '../components/PlaylistTracks';
import { serverSideAuthCheck } from '../lib/api-auth';

export default function PlaylistStats({ accessResponse = '' }) {
  if (!accessResponse) {
    return <NotAuthedMessage pageTitle="Playlist Stats" message="Sorry, your playlist analysis is only available if you log in with Spotify." />;
  }

  const router = useRouter();
  const playlistID = router.query?.id?.toString();
  if (!playlistID) {
    return <NotAuthedMessage pageTitle="Playlist Stats" message="Sorry, you have not selected a playlist." />
  }

  const access = JSON.parse(accessResponse);
  return (
    <>
      <HeadTags title="Playlist Stats" />
      <div className="p-4 md:mt-6 text-xl md:text-2xl leading-normal">
        <p className="mb-6">Here's information about the playlist</p>
        <PlaylistInfo accessToken={access.access_token} endpointOptions={{ playlistID }} />
        <hr className="opacity-30 my-8" />
        <PlaylistTracks accessToken={access.access_token} endpointOptions={{ playlistID }} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return serverSideAuthCheck(context);
}

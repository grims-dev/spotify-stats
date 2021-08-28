import { GetServerSideProps } from 'next';
import HeadTags from '../components/HeadTags';
import PlaylistsList from '../components/PlaylistsList';
import NotAuthedMessage from '../components/NotAuthedMessage';
import { serverSideAuthCheck } from '../lib/api-auth';

export default function Playlists({ accessResponse = '' }) {
  if (!accessResponse) {
    return <NotAuthedMessage pageTitle="Your Playlists" message="Sorry, your list of playlists are only available if you log in with Spotify." />;
  }

  const access = JSON.parse(accessResponse);

  return (
    <>
      <HeadTags title="Your Playlists" />
      <div className="md:mt-6 text-xl md:text-2xl leading-normal">
        <p className="mb-6">Select from one of your playlists below to view stats about it:</p>
        <PlaylistsList accessToken={access.access_token} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return serverSideAuthCheck(context);
}

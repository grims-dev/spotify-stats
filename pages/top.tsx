import { GetServerSideProps } from 'next';
import { useState } from 'react';
import HeadTags from '../components/HeadTags';
import NotAuthedMessage from '../components/NotAuthedMessage';
import TopArtistsOrTracksList from '../components/TopArtistsOrTracksList';
import { serverSideAuthCheck } from '../lib/api-auth';

export default function Top({ accessResponse = '' }) {
  if (!accessResponse) {
    return <NotAuthedMessage pageTitle="Top Artists and Tracks" message="Sorry, your top artists and tracks are only available if you log in with Spotify." />;
  }

  const [topType, setTopType] = useState<string>('tracks');
  const [timeRange, setTimeRange] = useState<string>('short_term');
  const access = JSON.parse(accessResponse);

  return (
    <>
      <HeadTags title={`Top ${topType[0].toUpperCase() + topType.substring(1)}`} />
      <div className="md:mt-6 text-xl md:text-2xl leading-normal">
        <p className="mb-6">
          Your top Spotify
          <select name="top-type" className="mx-2 pr-1 bg-transparent border-2 border-green-600 rounded cursor-pointer" onChange={e => setTopType(e.target.value)}>
            <option value="tracks">tracks</option>
            <option value="artists">artists</option>
          </select>
          of
          <select name="time-range" className="mx-2 pr-1 bg-transparent border-2 border-green-600 rounded cursor-pointer" onChange={e => setTimeRange(e.target.value)}>
            <option value="short_term">the last 4 weeks</option>
            <option value="medium_term">the last 6 months</option>
            <option value="long_term">all time</option>
          </select>:
        </p>
        <TopArtistsOrTracksList accessToken={access.access_token} endpointOptions={{topType, timeRange}} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return serverSideAuthCheck(context);
}

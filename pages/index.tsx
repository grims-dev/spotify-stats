import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import HeadTags from '../components/HeadTags';
import { redirectToUserAuth, serverSideAuthCheck } from '../lib/api-auth';

export default function Home({ accessResponse = '' }) {
  const router = useRouter();
  const isAuthed = Boolean(accessResponse || router.query?.authed);

  return (
    <>
      <HeadTags title="Home" customStyle="html { background: linear-gradient(170deg, #1f2937 calc(70% - 1px), #374151 30%)!important; }" />
      <div className="mt-8 md:mt-20vh md:flex md:items-center">
        <div className="p-4 md:w-3/5">
          <h1 className="text-7xl md:text-9xl text-emerald-600 text-center md:text-left">Spotify Stats</h1>
        </div>
        <div className="p-4 md:w-2/5 text-xl md:text-2xl leading-normal text-center md:text-left">
          {isAuthed ? (
            <>
              <p className="mb-6">
                You are logged in with Spotify!<br/><br/>
                View your <Link href="/top">top tracks & artists &raquo;</Link><br/>
                Or view <Link href="/playlists">your playlist stats &raquo;</Link>
              </p>
              <Link href="/logout">&laquo; Log out</Link>
            </>
          ) : (
            <>
              <p className="mb-6">Log in with Spotify to view your favourite tracks and artists, recent listening habits, and playlist data.</p>
              <button className="px-4 py-2 bg-emerald-600 rounded shadow-md text-xl" onClick={redirectToUserAuth}>Log in</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return serverSideAuthCheck(context);
}

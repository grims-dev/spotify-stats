import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { redirectToUserAuth, serverSideAuthCheck } from '../lib/api-auth';
import HeadTags from '../components/HeadTags';
import styles from '../styles/Home.module.css';

export default function Home({ accessResponse = '' }) {
  const router = useRouter();
  const isAuthed = Boolean(accessResponse || router.query?.authed);
  
  return (
    <div className={styles.container}>
      <HeadTags title="Home" customStyle="html { background: linear-gradient(170deg, #222 calc(70% - 1px), #444 30%)!important; }" />
      <div className="md:flex">
        <div className="p-4 md:w-3/5 mt-8 md:mt-52">
          <h1 className="text-7xl md:text-9xl text-green-600 text-center md:text-left">Spotify Stats</h1>
        </div>
        <div className="p-4 md:w-2/5 md:mt-60 text-xl md:text-2xl leading-normal text-center md:text-left">
          {isAuthed ? (
            <p className="mb-6">You are logged in with Spotify!<br/>View your <Link href="/top">top tracks & artists &raquo;</Link></p>
          ) : (
            <>
              <p className="mb-6">Log in with Spotify to view your listening habits in charts and graphs.</p>
              <button className="px-4 py-2 bg-green-600 rounded shadow-md text-xl" onClick={redirectToUserAuth}>Log in</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return serverSideAuthCheck(context);
}

import { redirectToUserAuth } from '../lib/api-auth';
import HeadTags from './HeadTags';

export default function NotAuthedMessage({
  pageTitle = 'Authorisation Required',
  message = 'Sorry, this page is only available if you log in with Spotify.',
}) {
  return (
    <>
      <HeadTags title={pageTitle} />
      <div className="md:mt-48 text-xl md:text-2xl leading-normal text-center">
        <p className="mb-6">{message}</p>
        <button className="px-4 py-2 bg-emerald-600 rounded shadow-md text-xl" onClick={redirectToUserAuth}>Log in</button>
      </div>
    </>
  )
}

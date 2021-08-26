import Cookies from 'cookies';
import { signCookieKeys, getOptions, setOptions } from '../lib/cookies';
import { requestAccessToken } from '../lib/api-auth';

export default function Auth() {
  return null;
}

export async function getServerSideProps({ req, res, query }) {
  const homeRedirect = {
    redirect: {
      permanent: false,
      destination: "/"
    }
  }
  const homeRedirectAuthed = {
    redirect: {
      permanent: false,
      destination: "/?authed=true"
    }
  }
  const cookies = new Cookies(req, res, signCookieKeys);
  const existingAccessJSON = cookies.get('accessResponse', getOptions);
  const existingAccess = existingAccessJSON ? JSON.parse(existingAccessJSON) : null;
  if (existingAccess && new Date().getTime() < existingAccess.expires_in_unix_timestamp) {
    return homeRedirectAuthed;
  }

  let code = query.code || req.cookies.code;
  if (!code) return homeRedirect;
  cookies.set('code', code, setOptions);

  const accessResponse = await requestAccessToken(code);
  if (accessResponse.error) {
    cookies.set('code');
    cookies.set('accessResponse');
    return homeRedirect;
  }
  // append absolute timestamp to object
  accessResponse.expires_in_unix_timestamp = new Date().getTime() + (accessResponse.expires_in * 1000);
  cookies.set('accessResponse', JSON.stringify(accessResponse), setOptions);

  return homeRedirectAuthed;
}

import Cookies from 'cookies';
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
  const cookies = new Cookies(req, res);
  const existingAccessResponse = cookies.get('accessResponse') ? JSON.parse(cookies.get('accessResponse')) : false;
  if (existingAccessResponse && new Date().getTime() < existingAccessResponse.expires_in_unix_timestamp) return homeRedirect;

  let code = query.code || req.cookies.code;
  if (!code) return homeRedirect;
  cookies.set('code', code);

  const accessResponse = await requestAccessToken(code);
  if (accessResponse.error) {
    cookies.set('code');
    cookies.set('accessResponse');
    return homeRedirect;
  }
  // append absolute timestamp to object
  accessResponse.expires_in_unix_timestamp = new Date().getTime() + (accessResponse.expires_in * 1000);
  cookies.set('accessResponse', JSON.stringify(accessResponse));

  return homeRedirect;
}

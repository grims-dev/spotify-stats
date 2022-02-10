import Cookies from 'cookies';
import { signCookieKeys } from '../lib/cookies';

export default function Logout() {
  return null;
}

export async function getServerSideProps({ req, res }) {
  const cookies = new Cookies(req, res, signCookieKeys);
  cookies.set('code');
  cookies.set('accessResponse');
  return {
    redirect: {
      permanent: false,
      destination: "/"
    }
  };
}

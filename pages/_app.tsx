import 'tailwindcss/tailwind.css';
import { AppProps } from 'next/app';
import Container from '../components/Container';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;

import 'tailwindcss/tailwind.css';
import { AppProps } from 'next/app';
import Container from '../components/Container';
import Footer from '../components/Footer';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Component {...pageProps} />
      <Footer />
    </Container>
  );
}

export default MyApp;

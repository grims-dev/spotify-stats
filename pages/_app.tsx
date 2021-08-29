import 'tailwindcss/tailwind.css';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Container from '../components/Container';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PageLayout from '../components/PageLayout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHomepage = Component.name === 'Home' || router.pathname === '/';
  return (
    <PageLayout isHomepage={isHomepage}>
      {!isHomepage && <Header />}
      <main className="p-4">
        <Container>
            <Component {...pageProps} />
        </Container>
      </main>
      <Footer />
    </PageLayout>
  );
}

export default MyApp;

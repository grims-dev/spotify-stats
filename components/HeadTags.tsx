import Head from 'next/head';

export default function HeadTags({ title = '', customStyle = '' }) {
  const titleText = title ? `${title} | Spotify Stats` : 'Spotify Stats';
  return (
    <Head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>{titleText}</title>
      <meta name="description" content="Log in with Spotify to view your favourite tracks and artists, recent listening habits, and playlist data."></meta>
      <link rel="shortcut icon" type="image/x-icon" href="favicon.ico"/>
      <link rel="preload" href="/fonts/Oxygen/Oxygen-Light.ttf" as="font" crossOrigin="" />
      <link rel="preload" href="/fonts/Oxygen/Oxygen-Bold.ttf" as="font" crossOrigin="" />
      <style>{customStyle}</style>
    </Head>
  )
}
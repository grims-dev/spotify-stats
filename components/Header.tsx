import Link from 'next/link';
import Container from './Container';

export default function Header() {
  return (
    <div className="sticky top-0 z-50 bg-gray-800 bg-opacity-95 border-b border-gray-900 border-opacity-50 shadow-md">
      <Container>
        <div className="h-14 px-4 flex items-center gap-3 text-center">
          <span className="text-left flex-grow"><Link href="/">Home</Link></span>
          <Link href="/top">Top Tracks</Link>
          <span className="hidden sm:inline-block">•</span>
          <Link href="/playlists">Playlist Stats</Link>
        </div>
      </Container>
    </div>
  )
}

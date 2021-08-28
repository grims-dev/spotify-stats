export default function Footer() {
  return (
    <div className="pt-20 pb-2 text-gray-300 text-sm text-center row-start-3 row-end-4">
      &copy; {(new Date()).getFullYear()} <a href="https://grims.dev/" target="_blank">Ciaran Grimshaw</a> | All data provided by the <a href="https://developer.spotify.com/" target="_blank">Spotify API</a>
    </div>
  )
}

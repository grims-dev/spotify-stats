export default function Footer() {
  return (
    <div className="pt-24 pb-4 text-gray-300 text-center row-start-2 row-end-3">
      &copy; {(new Date()).getFullYear()} <a href="https://grims.dev/" target="_blank">Ciaran Grimshaw</a>
    </div>
  )
}

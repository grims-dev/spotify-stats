export default function Container({ children }) {
  return (
    <div className="max-w-full lg:max-w-screen-lg m-auto">
      {children}
    </div>
  )
}

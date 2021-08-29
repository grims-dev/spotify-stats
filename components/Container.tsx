export default function Container({ children }) {
  return (
    <div className="max-w-full lg:max-w-screen-lg mx-auto my-0">
      {children}
    </div>
  )
}

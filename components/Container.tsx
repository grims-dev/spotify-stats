export default function Container({ children }) {
  return (
    <div className="max-w-screen-lg min-h-full grid m-auto my-0 p-4"
    style={{gridTemplateRows: '1fr auto'}}>
      {children}
    </div>
  )
}

export default function PageLayout({ children, isHomepage = false }) {
  const rowLayout = isHomepage ? '1fr auto' : 'auto 1fr auto';
  return (
    <div
      className="min-h-full grid"
      style={{gridTemplateRows: rowLayout}}
    >
      {children}
    </div>
  )
}

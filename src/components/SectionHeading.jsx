export default function SectionHeading({ tag, title }) {
  return (
    <div className="na-section-header">
      <p className="na-section-tag">{tag}</p>
      <h2 className="na-h2">{title}</h2>
    </div>
  )
}

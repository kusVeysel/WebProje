export default function PageHeading({ eyebrow, title, description, action }) {
  return (
    <section className="welcome-row">
      <div>
        <div className="eyebrow"><span className="live-dot"/>{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </section>
  )
}

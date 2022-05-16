export const AboutHeader = ({title, subtitle, text, span}) => {
  return (
    <div className="about-title">
        <h1 className="about-h1 text-blue">{title}</h1>
        <h2 className="about-h2 text-dark">{subtitle}</h2>
        <p className="about-text">{text}</p>
        <p className="about-text-strong">{span}</p>
    </div>
  )
}

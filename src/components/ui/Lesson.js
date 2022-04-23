import { Link } from "react-router-dom"

export const Lesson = ({index, title, description, linkDoc, linkVideo }) => {
    return (
        <div className="div-lesson">
            <div className="lesson-text">
                <h2 className="lesson-title">Lesson: {index} <span className="text-primary">{title}</span></h2>
                <p className="lesson-description">
                    {description}:
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi .
                </p>
            </div>
            <div className="lesson-links">
                <Link className="btn btn-link mb" to={linkDoc}>Apuntes</Link>
                <Link className="btn btn-link" to={linkVideo}>Grabaciones</Link>
            </div>
        </div>
    )
}

export const Lesson = ({index, title, description, linkDoc, linkVideo }) => {
    return (
        <div className="div-lesson">
            <div className="lesson-text">
                <h2 className="lesson-title">Lección {index}: <span className="text-primary">{title}</span></h2>
                <p className="lesson-description">{description}</p>
            </div>
            <div className="lesson-links">
                <a className="btn btn-link mb" href={linkDoc} target="_blank" rel="noreferrer"><i className="fa-solid fa-book"></i> Apuntes</a>
                <a className="btn btn-link" href={linkVideo} target="_blank" rel="noreferrer"><i className="fa-solid fa-video"></i> Video</a>
            </div>
        </div>
    )
}

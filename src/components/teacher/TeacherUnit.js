import { TeacherLesson } from "./TeacherLesson"

export const TeacherUnit = ({ unit, show }) => {
    return (
        <div className="form-unit">
            <div className="unit-header">
                <div className="unit-info">
                    <h3>{unit.title}</h3>
                    <p>{unit.description}</p>
                </div>
                <button className="btn btn-blue" onClick={(e) => show(e, unit)}>Agregar lección</button>
            </div>

            <div className="unit-lessons">
                {
                    unit.lessons && unit.lessons.length > 0 && unit.lessons.map((lesson, i) => (
                        <TeacherLesson lesson={lesson} key={i} />
                    ))
                }
            </div>
        </div>
    )
}

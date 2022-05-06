export const TeacherLesson = ({ lesson }) => {
  return (
    <div className="course-lesson">
      <div className="lesson-info">
        <h3 className="course-lesson-title">{lesson.title}</h3>
        <p className="course-lesson-title">{lesson.description}</p>
        <p className="course-lesson-title">{lesson.linkDoc}</p>
        <p className="course-lesson-title">{lesson.linkVideo}</p>
      </div>
      <div className="lesson-btns">

      </div>
    </div>
  )
}

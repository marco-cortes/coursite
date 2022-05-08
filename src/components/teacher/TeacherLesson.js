import { useDispatch } from "react-redux";
import { cleanLesson, cleanUnit, setLessonActive, setUnitActive, startDeleteLesson } from "../../redux/actions/courses";

export const TeacherLesson = ({ course, setValues, unit, lesson, show }) => {

  const dispatch = useDispatch();

  const showLesson = (e) => {
    e.preventDefault();
    dispatch(setUnitActive(unit));
    dispatch(setLessonActive(lesson));
    show(e);
  }

  const deleteLesson = (e) => {
    e.preventDefault();
    dispatch(setUnitActive(unit));
    dispatch(setLessonActive(lesson));

    if(unit.id && unit.id !== null) {
      if(lesson.id && lesson.id !== null) {
        dispatch(startDeleteLesson(lesson.id));
        setValues({ 
          ...course, 
          units: course.units.map(u => 
            u.id === unit.id ? { ...u, lessons: u.lessons.filter(l => l.id !== lesson.id) } : u
          )
        });
      } else {
        setValues({
          ...course, 
          units: course.units.map(u =>
            u.id === unit.id ? { ...u, lessons: u.lessons.filter(l => l.uuid !== lesson.uuid) } : u
          )
        });
      }
    } else {
      setValues({
        ...course, 
        units: course.units.map(u =>
          u.uuid === unit.uuid ? { ...u, lessons: u.lessons.filter(l => l.uuid !== lesson.uuid) } : u)
      });
    }
    dispatch(cleanLesson());
    dispatch(cleanUnit());
  }

  return (
    <div className="course-lesson-div">
      <div className="lesson-info">
        <h3 className="course-lesson-title">{lesson.title}</h3>
        <p className="course-lesson-desc">{lesson.description}</p>
        <a href={lesson.linkDoc} target="_blank" rel="noreferrer" className="course-lesson-link"><span className="text-dark">Documento:</span> {lesson.linkDoc}</a> <br />
        <a href={lesson.linkVideo} target="_blank" rel="noreferrer" className="course-lesson-link"><span className="text-dark">Video:</span> {lesson.linkVideo}</a>
      </div>
      <div className="lesson-btns">
        <button className="btn btn-warning" onClick={showLesson}><i className="fa-solid fa-pen"></i></button>
        <button className="btn btn-danger" onClick={deleteLesson}><i className="fa-solid fa-x"></i></button>
      </div>
    </div>
  )
}
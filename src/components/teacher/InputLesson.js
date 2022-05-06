import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

export const InputLesson = ({ course, setValues }) => {

    const { active:unit } = useSelector(state => state.courses);

    const [lesson, setLesson] = useForm({
        title: '',
        description: '',
        linkDoc: '',
        linkVideo: '',
    });

    const addLesson = (e) => {
        e.preventDefault();
        setValues(
            {
                ...course,
                units: course.units.map(u => unit.index === u.index ? { ...u, lessons: [...u.lessons, { ...lesson, index: u.lessons.length }] } : u)
            }
        )
        console.log(lesson);
    }

    return (
        <form className="course-lesson" onSubmit={addLesson}>
            <div className="course-form-group dark">
                <label htmlFor="lesson">Lección</label>
                <input type="text" className="form-control" id="lesson" placeholder="Lección" name="title" value={lesson.title} onChange={setLesson} />
            </div>
            <div className="course-form-group dark">
                <label htmlFor="lesson-description">Descripción</label>
                <textarea className="form-control" id="lesson-description" rows="3" placeholder="Descripción" name="description" value={lesson.description} onChange={setLesson} />
            </div>
            <div className="course-form-group dark">
                <label htmlFor="lesson-link-doc">Link documento</label>
                <input type="text" className="form-control" id="lesson-link-doc" placeholder="Link documento" name="linkDoc" value={lesson.linkDoc} onChange={setLesson} />
            </div>
            <div className="course-form-group dark">
                <label htmlFor="lesson-link-video">Link video</label>
                <input type="text" className="form-control" id="lesson-link-video" placeholder="Link video" name="linkVideo" value={lesson.linkVideo} onChange={setLesson} />
            </div>
            <button className="btn btn-primary" type="submit">Agregar lección</button>
        </form>
    )
}

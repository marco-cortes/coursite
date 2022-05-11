import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { v4 as uuidv4 } from 'uuid';

export const InputLesson = ({ course, setValues }) => {

    const { unitActive: unit, lessonActive } = useSelector(state => state.courses);

    const [lesson, setLesson, reset] = useForm({
        title: lessonActive ? lessonActive.title : '',
        description: lessonActive ? lessonActive.description : '',
        linkDoc: lessonActive ? lessonActive.linkDoc : '',
        linkVideo: lessonActive ? lessonActive.linkVideo : '',
        unit: unit.id ? unit.id : null,
        uuid: lessonActive ? lessonActive.uuid : null,
        id: lessonActive && lessonActive.id
    });

    const addLesson = (e) => {
        e.preventDefault();
        if(!unit.uuid && unit.id !== null) {
            //la unidad ya está en BD
            
            if(!lesson.uuid && lesson.id !== null) {
                //la lección ya está en BD y se está editando
                setValues({
                    ...course,
                    units: course.units.map(u => u.id === unit.id ? {
                        ...u,
                        lessons: u.lessons.map(l => l.id === lesson.id ? lesson : l)
                    } : u)
                })
            } else if(lesson.uuid === null && lesson.id === null) {
                //la lección no está en BD y se está creando
                
                setValues({
                    ...course,
                    units: course.units.map(u => u.id === unit.id ? {
                        ...u,
                        lessons: [...u.lessons, { ...lesson, uuid: uuidv4() }]
                    } : u)
                });
                lesson.uuid = uuidv4();
                reset();
            } else if (lesson.uuid !== null && lesson.id === null) {
                //la lección no está en BD y se está editando
                
                setValues({
                    ...course,
                    units: course.units.map(u => u.id === unit.id ? {
                        ...u,
                        lessons: u.lessons.map(l => l.uuid === lesson.uuid ? lesson : l)
                    } : u)
                });
            }

        } else if (unit.uuid !== null && unit.id === null) {
            //la unidad está en local
            
            if(lesson.uuid === null && lesson.id === null) {
                //la lección es nueva y su unidad no está en BD
                
                setValues({
                    ...course,
                    units: course.units.map(u => u.uuid === unit.uuid ? {
                        ...u,
                        lessons: [...u.lessons, { ...lesson, uuid: uuidv4() }]
                    } : u)
                });
                lesson.uuid = uuidv4();
                reset();
            } else if(lesson.uuid !== null && lesson.id === null) {
                //la lección se está editando en local y su unidad no está en BD
                
                setValues({
                    ...course,
                    units: course.units.map(u => u.uuid === unit.uuid ? {
                        ...u,
                        lessons: u.lessons.map(l => lesson.uuid === l.uuid ? lesson : l)
                    } : u)
                });
            }   
        }
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
            <button className="btn btn-primary" type="submit">{lesson.id ? "Guardar" : lesson.uuid ? "Guardar" : "Agregar lección"}</button>
        </form>
    )
}

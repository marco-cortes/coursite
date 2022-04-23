import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { startLoadCourse } from "../../redux/actions/courses";
import { Lesson } from "../ui/Lesson";

export const StudentCourseView = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(startLoadCourse(id));
    }, [dispatch, id]);

    const { active } = useSelector(state => state.courses);

    if (!active) {
        return <div>Loading...</div>
    }

    const back = () => {
        window.history.back();
    }

    console.log(active);

    return (
        <div className="course-view">
            <div className={"course-image a" + id}>
                <div className="student-course-info">
                    <div className="student-course-names">
                        <h2 className="student-course-title">{active.title}</h2>
                        <h4 className="student-course-teacher">{active.teacher}</h4>
                        <h6 className="student-course-category">{active.category}</h6>
                    </div>
                    <div className="student-course-buttons">
                        <button className="btn btn-large btn-primary mb">Contacto</button>
                        <button className="btn btn-large btn-light" onClick={back}>Regresar</button>
                    </div>
                </div>
            </div>
            <div className="course-container">
                {
                    active.units.map((unit, index) => (
                        <div className="student-course-units" key={index}>
                            <h2 className="student-course-unit">Unidad {index + 1}: {unit.title}</h2>
                            <div className="student-course-lessons">
                                {
                                    unit.lessons.map((lesson, index) => (
                                        <Lesson key={index} {...lesson} />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

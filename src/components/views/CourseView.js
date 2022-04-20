import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { startLoadCourse } from "../../redux/actions/courses";
import { Accordion } from "../ui/Accordion";

export const CourseView = () => {

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

    return (
        <div className="course-view">
            <div className={"course-image a" + id}>
                <img src={active.image} className="img" alt="" />
            </div>
            <div className="course-container">
                <div className="course-titles">
                    <h1 className="course-title">{active.title}</h1>
                    <h2 className="course-category">{active.category}</h2>
                </div>
                <div className="course-details">
                    <p className="course-score">Calificación: {active.score}</p>
                    <p className="course-teacher">{active.teacher}</p>
                </div>
                <div className="course-desc">
                    <h3 className="text-title">Descripción</h3>
                    <p className="text-body">Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. {active.description}</p>
                </div>
                <div>
                    <h3 className="text-title">Temario</h3>
                    <div className="course-units">
                        <div>

                            {
                                active.units &&
                                active.units.map((unit, index) => (
                                    <Accordion title={"Unidad " + (index + 1) + ": " + unit.title} lessons={unit.lessons} key={unit.id} />
                                ))
                            }
                        </div>
                        <div className="course-btns">
                            <Link className="btn btn-large btn-primary" to={"/student/courses/buy/" + id}>Inscribirme por $ {active.price}</Link>
                            <button className="btn btn-large btn-light" onClick={back}>Regresar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

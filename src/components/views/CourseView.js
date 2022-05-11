import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { startLoadCourse } from "../../redux/actions/courses";
import { Accordion } from "../ui/Accordion";

export const CourseView = ({ role }) => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { myCourses, active } = useSelector(state => state.courses);
    const [isBought, setIsBought] = useState(false);

    useEffect(() => {
        dispatch(startLoadCourse(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (active) {
            setIsBought(myCourses.find(course => course.id === active.id));
        }
    }, [active, myCourses]);


    if (!active) {
        return <div>Loading...</div>
    }

    const back = () => {
        window.history.back();
    }

    return (
        <div className="course-view animate__animated animate__fadeIn">
            <div className={"course-image a" + id}>
                <img src={active.image} className="img" alt="" />
            </div>
            <div className="course-container">
                <div className="course-titles">
                    <h1 className="course-title">{active.title}</h1>
                    <h2 className="course-category">{active.category}</h2>
                </div>
                <div className="course-details">
                    <p className="course-score">Calificación:  {active.score/20} <i className="fa-solid fa-star"></i></p>
                    <p className="course-teacher">{active.teacher}</p>
                </div>
                <div className="course-desc">
                    <h3 className="text-title">Descripción</h3>
                    <p className="text-body">{active.description}</p>
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
                            {
                                isBought && role === 1 ?
                                    <Link className="btn btn-large btn-primary" to={"/student/learning/" + id}>Ir al curso</Link>
                                : role === 1 ?
                                    <Link className="btn btn-large btn-primary" to={"/student/courses/buy/" + id}>Inscribirme por $ {active.price}</Link>
                                : role === 2 &&
                                    <Link className="btn btn-large btn-primary" to={"/teacher/courses/" + id + "/edit"}>Editar <i className="fa-solid fa-pen"></i></Link>
                            }
                            <button className="btn btn-large btn-light" onClick={back}><i className="fa-solid fa-rotate-left"></i> Regresar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

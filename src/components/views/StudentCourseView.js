import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { startLoadCourse } from "../../redux/actions/courses";
import { showModal } from "../../redux/actions/ui";
import { Lesson } from "../ui/Lesson";
import { Modal } from "../ui/Modal";
import { RatingCourse } from "../ui/RatingCourse";

export const StudentCourseView = () => {
    
    const dispatch = useDispatch();
    const { id } = useParams();
    const { active } = useSelector(state => state.courses);

    const [select, setSelect] = useState(0);

    useEffect(() => {
        dispatch(startLoadCourse(id));
    }, [dispatch, id]);

    if (!active) {
        return <div>Loading...</div>
    }

    const back = () => {
        window.history.back();
    }

    const openModal = () => {
        setSelect(0);
        dispatch(showModal());
    }

    const showScore = () => {
        setSelect(1);
        dispatch(showModal());
    }

    return (
        <div className="course-view animate__animated animate__fadeIn">
            <div className={"course-image a" + id}>
                <div className="student-course-info">
                    <div className="student-course-names">
                        <h2 className="student-course-title">{active.title}</h2>
                        <h4 className="student-course-teacher">{active.teacher}</h4>
                        <div className="flex space-between align-items-center">
                            <h6 className="student-course-category">{active.category}</h6>
                            <button className="btn btn-success no-margin" onClick={showScore}>Calificar</button>
                        </div>
                    </div>
                    <div className="student-course-buttons">
                        <button className="btn btn-large btn-primary mb" onClick={openModal}><i className="fa-solid fa-address-book"></i> Contacto</button>
                        <button className="btn btn-large btn-light" onClick={back}><i className="fa-solid fa-rotate-left"></i> Regresar</button>
                    </div>
                </div>
            </div>
            <div className="course-container">
                {
                    active.units && active.units.map((unit, index) => (
                        <div className="student-course-units" key={index}>
                            <h2 className="student-course-unit">Unidad {index + 1}: {unit.title}</h2>
                            <div className="student-course-lessons">
                                {
                                    unit && unit.lessons.map((lesson, index) => (
                                        <Lesson key={index} {...lesson} index={index+1} />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <Modal title={select === 0 ? "INFORMACIÓN DE CONTÁCTO" : "CALIFICAR CURSO"}>
                {
                    select === 0 ?
                    <>
                        <h3 className="text-contact"><span className="text-contact-title">Correo:</span> <br/> {active.teacherEmail}</h3>
                        <h3 className="text-contact"><span className="text-contact-title">Teléfono:</span> <br/> {active.teacherPhone}</h3>
                    </> :
                    <RatingCourse />
                }
            </Modal>
        </div>
    )
}

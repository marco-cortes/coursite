import { useDispatch } from "react-redux";
import { cleanLesson, cleanUnit, setUnitActive, startDeleteUnit } from "../../redux/actions/courses";
import { TeacherLesson } from "./TeacherLesson"

export const TeacherUnit = ({ course, setValues, unit, show, edit }) => {

    const dispatch = useDispatch();

    const newLesson = (e) => {
        e.preventDefault();
        dispatch(setUnitActive(unit));
        dispatch(cleanLesson());
        show(e, unit);
    }

    const editUnit = (e) => {
        e.preventDefault();
        dispatch(setUnitActive(unit));
        edit(e);
    }

    const deleteUnit = (e) => {
        e.preventDefault();
        dispatch(setUnitActive(unit));
        if(unit.id && unit.id !== null) {
            dispatch(startDeleteUnit(unit.id));
            setValues({ ...course, units: course.units.filter(u => u.id !== unit.id) });
        } else {
            setValues({ ...course, units: course.units.filter(u => u.uuid !== unit.uuid) });
        }
        dispatch(cleanUnit());
    }

    return (
        <div className="form-unit">
            <div className="unit-header">
                <div className="unit-info">
                    <h3 className="unit-title">{unit.title}</h3>
                    <p className="unit-desc">{unit.description}</p>
                </div>
                <div className="unit-btns">
                    <button className="btn btn-success" onClick={newLesson}><i className="fa-solid fa-plus"></i></button>
                    <button className="btn btn-warning" onClick={editUnit}><i className="fa-solid fa-pen"></i></button>
                    <button className="btn btn-danger" onClick={deleteUnit}><i className="fa-solid fa-x"></i></button>
                </div>
            </div>

            <div className="unit-lessons">
                {
                    unit.lessons && unit.lessons.length > 0 && unit.lessons.map((lesson, i) => (
                        <TeacherLesson course={course} setValues={setValues} unit={unit} lesson={lesson} key={i} show={show} />
                    ))
                }
            </div>
        </div>
    )
}

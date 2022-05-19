import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { v4 as uuidv4 } from 'uuid';
import { closeModal } from "../../redux/actions/ui";

export const InputUnit = ({ course, setValues }) => {

    const { unitActive } = useSelector(state => state.courses);
    const dispatch = useDispatch();

    const [unit, setUnit, reset] = useForm({
        title: unitActive ? unitActive.title : '',
        description: unitActive ? unitActive.description : '',
        lessons: unitActive ? unitActive.lessons : [],
        id: unitActive && unitActive.id,
        course: course.id ? course.id : null,
        uuid: unitActive ? unitActive.uuid : null
    });

    const addUnit = (e) => {
        e.preventDefault();

        if (unit.id === null) {

            if (unit.uuid === null) {

                unit.uuid = uuidv4();

                setValues({ ...course, units: [...course.units, { ...unit }] });

                reset();
                unit.uuid = uuidv4();
            } else {

                setValues({
                    ...course,
                    units: course.units.map(u => unit.uuid === u.uuid ? unit : u)
                });
                //reset();
                dispatch(closeModal());
            }
        } else {

            setValues({
                ...course,
                units: course.units.map(u => unit.id === u.id ? unit : u)
            })
            //reset();
            dispatch(closeModal());
        }
    }

    return (
        <form className="course-form" onSubmit={addUnit}>
            <div className="course-form-group dark">
                <label htmlFor={"unit"}>{unitActive ? "Editar unidad" : "Agregar unidad"}</label>
                <input type="text" className="form-control" id={"unit"} placeholder="Unidad" name={"title"} value={unit.title} onChange={setUnit} required />
            </div>
            <div className="course-form-group dark">
                <label htmlFor={"unit-description"}>Descripción</label>
                <textarea className="form-control" id={"unit-description"} rows="3" placeholder="Descripción" name={"description"} value={unit.description} onChange={setUnit} required />
            </div>
            <button className="btn btn-primary" type="submit">{unit.id ? "Guardar" : unit.uuid ? "Guardar" : "Agregar unidad"}</button>
        </form>
    )
}

//import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";

export const InputUnit = ({ course, setValues }) => {

    const [unit, setUnit] = useForm({
        title: '',
        description: '',
        lessons: []
    });

    const addLesson = (e) => {
        e.preventDefault();
        setValues({ ...course, units: [...course.units, {...unit, index:course.units.length}] });
    }

    return (
        <form className="course-form" onSubmit={addLesson}>
            <div className="course-form-group dark">
                <label htmlFor={"unit"}>Unidad</label>
                <input type="text" className="form-control" id={"unit"} placeholder="Unidad" name={"title"} value={unit.title} onChange={setUnit} />
            </div>
            <div className="course-form-group dark">
                <label htmlFor={"unit-description"}>Descripción</label>
                <textarea className="form-control" id={"unit-description"} rows="3" placeholder="Descripción" name={"description"} value={unit.description} onChange={setUnit} />
            </div>
            <button className="btn btn-primary" type="submit">Agregar unidad</button>
        </form>
    )
}

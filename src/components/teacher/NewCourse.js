import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setCourse, startLoadCategories } from "../../redux/actions/courses";
import { showModal } from "../../redux/actions/ui";
import { Modal } from "../ui/Modal";
import { InputUnit } from "./InputUnit";
import { InputLesson } from "./InputLesson";
import { TeacherUnit } from "./TeacherUnit";

export const NewCourse = () => {

  const { categories } = useSelector(state => state.courses);
  const dispatch = useDispatch();
  const [bool, setBool] = useState(false);

  const [course, setCourseData, , setValues] = useForm({
    title: '',
    description: '',
    image: '',
    price: 0,
    category: '',
    units: []
  });

  useEffect(() => {
    dispatch(startLoadCategories());
  }, [dispatch]);

  const showUnitForm = (e) => {
    e.preventDefault();
    setBool(false);
    dispatch(showModal());
  }

  const showLessonForm = (e, unit) => {
    e.preventDefault();
    setBool(true);
    dispatch(setCourse(unit));
    dispatch(showModal());
  }

  const submitCourse = (e) => {
    e.preventDefault();
    console.log(course);
  }


  if (!categories)
    return <h2>Cargando</h2>;

  return (
    <div className="admin-view">
      <form className="new-course-form" onSubmit={submitCourse}>
        <h2 className="form-title">Solicitud para nuevo curso</h2>
        <div className="course-form-group">
          <label htmlFor="title">Título</label>
          <input type="text" className="form-control" id="title" placeholder="Título" name="title" value={course.title} onChange={setCourseData} />
        </div>
        <div className="course-form-group">
          <label htmlFor="description">Descripción</label>
          <textarea className="form-control" id="description" rows="5" placeholder="Descripción" name="description" value={course.description} onChange={setCourseData} />
        </div>
        <div className="course-form-group">
          <label htmlFor="image">Imagen</label>
          <input type="text" className="form-control" id="image" placeholder="Imagen" name="image" value={course.image} onChange={setCourseData} />
        </div>
        <div className="group-flex">
          <div className="course-form-group">
            <label htmlFor="price">Precio</label>
            <input type="number" className="form-control" id="price" placeholder="Precio" name="price" value={course.price} onChange={setCourseData} />
          </div>
          <div className="course-form-group">
            <label htmlFor="category">Categoría</label>
            <select className="form-control" id="category" value={course.category} name="category" onChange={setCourseData}>
              <option>Seleccione una categoría</option>
              {
                categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))
              }
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
      <div className="form-units">
        <div className="units-head">
          <h2 className="unit-title">Unidades</h2>
          <button onClick={showUnitForm} className="btn btn-info">Agregar unidad</button>
        </div>
        <div className="units-body">
          {
            course.units.length > 0 && course.units.map((unit, i) => (
              <TeacherUnit unit={unit} key={i} show={showLessonForm} />
            ))
          }
        </div>
      </div>
      <Modal title={!bool ? "Unidad" : "Lección"}>
        {
          !bool ? <InputUnit course={course} setValues={setValues} /> : <InputLesson course={course} setValues={setValues} />
        }
      </Modal>
    </div>
  )
}

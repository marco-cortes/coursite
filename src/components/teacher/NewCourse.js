import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { cleanUnit, startAddCourse, startLoadCategories } from "../../redux/actions/courses";
import { showModal } from "../../redux/actions/ui";
import { Modal } from "../ui/Modal";
import { InputUnit } from "./InputUnit";
import { InputLesson } from "./InputLesson";
import { TeacherUnit } from "./TeacherUnit";

export const NewCourse = ({active}) => {

  const { categories } = useSelector(state => state.courses);
  const { id } = useSelector(state => state.auth.user);

  const dispatch = useDispatch();
  const [bool, setBool] = useState(false);

  const [course, setCourseData, , setValues] = useForm({
    title: active ? active.title : '',
    description: active ? active.description : '',
    image: active ? active.image : '',
    price: active ? active.price : 0,
    idCategory: active ? active.idCategory : 0,
    status: active ? active.status : 0,
    score: active ? active.score : 0,
    idTeacher: id,
    units: active ? active.units ? active.units : [] : [],
    id: active && active.id
  });

  useEffect(() => {
    dispatch(startLoadCategories());
  }, [dispatch]);

  const showUnitForm = (e) => {
    e.preventDefault();
    setBool(false);
    dispatch(showModal());
  }

  const showLessonForm = (e) => {
    e.preventDefault();
    setBool(true);
    dispatch(showModal());
  }

  const newUnit = (e) => {
    e.preventDefault();
    dispatch(cleanUnit());
    showUnitForm(e);
  }

  const submitCourse = (e) => {
    e.preventDefault();
    dispatch(startAddCourse(course, id));
  }

  const back = (e) => {
    e.preventDefault();
    window.history.back();
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
            <select className="form-control" id="category" value={course.idCategory} name="idCategory" onChange={setCourseData}>
              <option>Seleccione una categoría</option>
              {
                categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="new-course-btns">
          <button type="submit" className="btn btn-primary">Guardar</button>
          <button onClick={newUnit} className="btn btn-info">Agregar unidad</button>
          <button onClick={back} className="btn btn-blue">Volver</button>
        </div>
      </form>
      <div className="form-units">
        <h2 className="units">Unidades</h2>
        <div className="units-body">
          {
            course.units && course.units.length > 0 && course.units.map((unit, i) => (
              <TeacherUnit course={course} setValues={setValues} unit={unit} key={i} show={showLessonForm} edit={showUnitForm} />
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

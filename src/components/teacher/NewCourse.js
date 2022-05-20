import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { showModal } from "../../redux/actions/ui";
import { Modal } from "../ui/Modal";
import { InputUnit } from "./InputUnit";
import { InputLesson } from "./InputLesson";
import { TeacherUnit } from "./TeacherUnit";
import { startLoadCategories } from "../../redux/actions/admin";
import { cleanUnit, startAddCourse } from "../../redux/actions/teachers";
import Swal from "sweetalert2";

export const NewCourse = ({ active }) => {

  const { categories, unitActive, lessonActive } = useSelector(state => state.courses);
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

    if (validateCourse()) {
      return;
    }
    console.log(course);
    dispatch(startAddCourse(course));
  }

  const validateCourse = () => {
    let error = false;

    course.units.length <= 0 && (error = true);

    if (error) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, agregue unidades al curso',
        icon: 'error',
      });
      return true;
    }

    course.units.map(u => u.lessons.length === 0 ? error = true : null);

    if (error) {
      Swal.fire({
        title: 'Error',
        text: 'Las unidades deben tener al menos una lección',
        icon: 'error',
      });
      return true;
    }

    if(course.idCategory === "Seleccione una categoría") {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, seleccione una categoría',
        icon: 'error',
      });
      return true;
    }

    return error;

  }


  const back = (e) => {
    e.preventDefault();
    window.history.back();
  }

  useEffect(() => {

    if (lessonActive) {
      lessonActive.uuid ?
        document.getElementById(lessonActive.uuid).scrollIntoView({ behavior: 'smooth' }) :
        document.getElementById(lessonActive.id).scrollIntoView({ behavior: 'smooth' })
    }
    else if (unitActive) {
      unitActive.uuid ?
        document.getElementById(unitActive.uuid) ?
          document.getElementById(unitActive.uuid).scrollIntoView({ behavior: 'smooth' }) :
          document.getElementById(unitActive.id) ?
            document.getElementById(unitActive.id).scrollIntoView({ behavior: 'smooth' }) :
            <></> :
        <></>
    }
    else if (document.getElementById("units-end"))
      document.getElementById("units-end").scrollIntoView({ behavior: 'smooth' });
  }, [course.units, unitActive, lessonActive]);


  if (!categories)
    return <h2>Cargando</h2>;

  return (
    <div className="admin-view">
      <form className="new-course-form" onSubmit={submitCourse}>
        <h2 className="form-title">{active ? "Editar curso" : "Solicitud para nuevo curso"}</h2>
        <div className="course-form-group">
          <label htmlFor="title">Título</label>
          <input type="text" className="form-control" id="title" placeholder="Título" name="title" value={course.title} onChange={setCourseData} required />
        </div>
        <div className="course-form-group">
          <label htmlFor="description">Descripción</label>
          <textarea className="form-control" id="description" rows="5" placeholder="Descripción" name="description" value={course.description} onChange={setCourseData} required />
        </div>
        <div className="course-form-group">
          <label htmlFor="image">Imagen</label>
          <input type="text" className="form-control" id="image" placeholder="Imagen" name="image" value={course.image} onChange={setCourseData} required />
        </div>
        <div className="group-flex">
          <div className="course-form-group">
            <label htmlFor="price">Precio</label>
            <input type="number" className="form-control" id="price" placeholder="Precio" name="price" value={course.price} onChange={setCourseData} required />
          </div>
          <div className="course-form-group">
            <label htmlFor="category">Categoría</label>
            <select className="form-control" id="category" value={course.idCategory} name="idCategory" onChange={setCourseData} required>
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
        <div className="units-body" id="units-body">
          {
            course.units && course.units.length > 0 && course.units.map((unit, i) => (
              <TeacherUnit course={course} setValues={setValues} unit={unit} key={i} show={showLessonForm} edit={showUnitForm} i={i} />
            ))
          }
        </div>
      </div>
      <div id="units-end"></div>
      <Modal title={!bool ? "Unidad" : "Lección"}>
        {
          !bool ? <InputUnit course={course} setValues={setValues} /> : <InputLesson course={course} setValues={setValues} />
        }
      </Modal>
    </div>
  )
}

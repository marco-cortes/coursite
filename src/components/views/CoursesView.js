import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadCourses } from "../../redux/actions/courses";
import { CoursesList } from "../ui/CoursesList";
import { FormSearch } from "../ui/FormSearch";
import { Modal } from "../ui/Modal";
import { NavBarApp } from "../ui/NavBarApp";
import { NewCourse } from "../teacher/NewCourse";
import { startLoadCategories } from "../../redux/actions/admin";
import { Loading } from "../ui/Loading";

export const CoursesView = ({ role }) => {

  const dispatch = useDispatch();
  const { courses: list, categories } = useSelector(state => state.courses);
  const [courses, setCourses] = useState(list);

  useEffect(() => {
    if (list.length === 0 && role === 0) {
      dispatch(startLoadCourses());
    }
    dispatch(startLoadCategories());
  }, [dispatch, list, role]);

  useEffect(() => {
    setCourses(list);
  }, [list]);

  const filter = (e, type) => {
    switch (type) {
      case "all":
        setCourses(list);
        active(e);
        break;
      case "new":
        setCourses(list.filter((course, i) => i <= 10));
        active(e);
        break;
      case "featured":
        setCourses(list.filter(course => course.score >= 1));
        active(e);
        break;
      case "category":
        e.target.parentNode.parentNode.childNodes.forEach(node => {
          if (node !== e.target) {
            node.classList.remove("app-active");
          }
        });
        e.target.classList.toggle("app-active");
        document.getElementById("div-categories").classList.toggle("div-categories-active");
        break;
      case "pending":
        setCourses(list.filter(course => course.status === 0));
        active(e);
        break;
      case "approved":
        setCourses(list.filter(course => course.status === 1));
        active(e);
        break;
      default:
        return courses;
    }
  }

  const filterCategory = (e, category) => {
    active(e);
    setCourses(list.filter(course => course.category.id === category));
  }

  const active = (e) => {
    e.target.classList.add("app-active");
    e.target.parentNode.childNodes.forEach(node => {
      if (node !== e.target) {
        node.classList.remove("app-active");
      }
    });
  }

  if(!list)
    return <Loading />

  return (
    <div className="courses-view animate__animated animate__fadeIn">
      <NavBarApp>
        <button className="app-link app-active" onClick={e => filter(e, "all")}>
          Todos los cursos
        </button>
        {
          role === 2 ?
            <>
              <button className="app-link" onClick={e => filter(e, "pending")}>
                Pendientes
              </button>
              <button className="app-link" onClick={e => filter(e, "approved")}>
                Publicados
              </button>
            </>
            :
            <>
              <button className="app-link" onClick={e => filter(e, "new")}>
                Nuevos
              </button>
              <button className="app-link" onClick={e => filter(e, "featured")}>
                Destacados
              </button>
            </>
        }
        <div className="app-link-group">
          <button className="app-link btn-categories" onClick={e => filter(e, "category")}>
            Categorias <i className="icon-link btn-categories fa-solid fa-angle-down"></i>
          </button>
          <div className="div-categories" id="div-categories">
            {
              categories && categories.map((category, i) => (
                <button className="app-link" key={i} onClick={e => filterCategory(e, category.id)}>{category.name}</button>
              ))
            }
          </div>
        </div>
      </NavBarApp>
      <FormSearch role={role} setCourses={setCourses} />
      <CoursesList courses={courses} />
      <Modal title="NUEVO CURSO">
        <NewCourse />
      </Modal>
    </div>
  )
}

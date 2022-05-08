import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadCourses } from "../../redux/actions/courses";
import { CoursesList } from "../ui/CoursesList";
import { FormSearch } from "../ui/FormSearch";
import { Modal } from "../ui/Modal";
import { NavBarApp } from "../ui/NavBarApp";
import { NewCourse } from "../teacher/NewCourse";

export const CoursesView = ({ role }) => {

  const dispatch = useDispatch();
  const { courses:list } = useSelector(state => state.courses);
  const [courses, setCourses] = useState(list);

  useEffect(() => {
    if (courses.length === 0 && role === 0) {
      dispatch(startLoadCourses());
    }
  }, [dispatch, courses, role]);

  useEffect(() => {
    setCourses(list);
  },[list]);

  const filter = (e, type) => {
    active(e);
    switch (type) {
      case "all":
        setCourses(list);
      break;
      case "new":
        setCourses(list);
      break;
      case "featured":
        setCourses(list);
      break;
      case "category":
        setCourses(list);
      break;
      case "pending":
        setCourses(list.filter(course => course.status === 0));
      break;
      case "approved":
        setCourses(list.filter(course => course.status === 1));
      break;
      default:
        return courses;
    }
  }

  const active = (e) => {
    e.target.classList.add("app-active");
    e.target.parentNode.childNodes.forEach(node => {
      if (node !== e.target) {
        node.classList.remove("app-active");
      }
    });
  }

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
        <button className="app-link" onClick={e => filter(e, "category")}>
          Categorias
        </button>
      </NavBarApp>
      <FormSearch role={role} />
      <CoursesList courses={courses} />
      <Modal title="NUEVO CURSO">
        <NewCourse />
      </Modal>
    </div>
  )
}

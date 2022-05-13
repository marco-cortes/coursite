import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavBarApp } from "../ui/NavBarApp";
import { CardCourse } from "./CardCourse";

export const AdminCourses = () => {

  const { courses:list } = useSelector(state => state.courses);
  const [courses, setCourses] = useState(list);

  useEffect(() => {
    if (list && list.length > 0) {
      setCourses(list);
    }
  }, [list])

  const filter = (e, type) => {
    active(e);
    switch (type) {
      case "all":
        setCourses(list);
      break;
      case "active":
        setCourses(list.filter(course => course.status === 1));
        break;
      case "pending":
        setCourses(list.filter(course => course.status === 0));
        break;
      case "rejected":
        setCourses(list.filter(course => course.status === -1));
        break;
      default:
        return;
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

  if (!courses)
    return <h2>Cargando</h2>;

  return (
    <div className="admin-view">
      <NavBarApp >
      <button className="app-link app-active" onClick={e => filter(e, "all")}>
          Todos
        </button>
        <button className="app-link" onClick={e => filter(e, "pending")}>
          Pendientes
        </button>
        <button className="app-link" onClick={e => filter(e, "active")}>
          Activos
        </button>
        <button className="app-link" onClick={e => filter(e, "rejected")}>
          Rechazados
        </button>
      </NavBarApp>
      <br />
      {
        courses &&
        <div className="course-list">
          {
            courses.map(course => (
              <CardCourse course={course} key={course.id} />
            ))
          }
        </div>
      }
    </div>
  )
}

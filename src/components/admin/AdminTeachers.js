import { useSelector } from "react-redux";
import { NavBarApp } from "../ui/NavBarApp";
import { CardTeacher } from "./CardTeacher";

export const AdminTeachers = () => {

  const { teachers } = useSelector(state => state.courses);


  const filter = (e, type) => {
    active(e);
    switch (type) {
      case "all":
        //setCourses(list);
      break;
      case "new":
        //setCourses(list);
      break;
      case "featured":
        //setCourses(list);
      break;
      case "category":
        //setCourses(list);
      break;
      case "pending":
        //setCourses(list.filter(course => course.status === 0));
      break;
      case "approved":
        //setCourses(list.filter(course => course.status === 1));
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


  return (
    <div className="admin-teachers">
      <NavBarApp >
        <button className="app-link app-active" onClick={e => filter(e, "all")}>
          Pendientes
        </button>
        <button className="app-link" onClick={e => filter(e, "all")}>
          Activos
        </button>
        <button className="app-link" onClick={e => filter(e, "all")}>
          Todos
        </button>
      </NavBarApp>

      {
        teachers && teachers.map(teacher => (
          <CardTeacher teacher={teacher} key={teacher.id} />
        ))
      }
    </div>
  )
}

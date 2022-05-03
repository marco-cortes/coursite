import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavBarApp } from "../ui/NavBarApp";
import { CardTeacher } from "./CardTeacher";

export const AdminTeachers = () => {

  const { teachers: list } = useSelector(state => state.courses);

  const [teachers, setTeachers] = useState(list);

  useEffect(() => {
    if (list && list.length > 0) {
      setTeachers(list.filter(teacher => teacher.status === 0));
    }
  }, [list])

  const filter = (e, type) => {
    active(e);
    switch (type) {
      case "active":
        setTeachers(list.filter(teacher => teacher.status === 1));
        break;
      case "pending":
        setTeachers(list.filter(teacher => teacher.status === 0));
        break;
      case "rejected":
        setTeachers(list.filter(teacher => teacher.status === -1));
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
        <button className="app-link app-active" onClick={e => filter(e, "pending")}>
          Pendientes
        </button>
        <button className="app-link" onClick={e => filter(e, "active")}>
          Activos
        </button>
        <button className="app-link" onClick={e => filter(e, "rejected")}>
          Rechazados
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

import { useSelector } from "react-redux";
import { CoursesList } from "../ui/CoursesList";
import { FormSearch } from "../ui/FormSearch";
import { NavBarApp } from "../ui/NavBarApp";

export const StudentCoursesView = () => {

  const { myCourses } = useSelector(state => state.courses);

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
        <button className="app-link app-active" onClick={active}>
          En progreso
        </button>
        <button className="app-link" onClick={active}>
          Terminados
        </button>
        <button className="app-link" onClick={active}>
          Certificados
        </button>
      </NavBarApp>
      <FormSearch />
      <CoursesList courses={myCourses} />
    </div>
  )
}

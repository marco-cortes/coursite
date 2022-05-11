import { useState } from "react";
import { useSelector } from "react-redux";
import { CoursesList } from "../ui/CoursesList";
import { FormSearch } from "../ui/FormSearch";
import { NavBarApp } from "../ui/NavBarApp";

export const StudentCoursesView = () => {

  const { myCourses } = useSelector(state => state.courses);

  const [courses, setCourses] = useState(myCourses.filter(course => course.progress < 1));

  const [showCerts, setShowCerts] = useState(false);

  const active = (e) => {
    e.target.classList.add("app-active");
    e.target.parentNode.childNodes.forEach(node => {
      if (node !== e.target) {
        node.classList.remove("app-active");
      }
    });
  }

  const filter = (e, type) => {
    setShowCerts(false);
    switch (type) {
      case "in-progress":
        setCourses(myCourses.filter(course => course.progress < 1));
        active(e);
      break;
      case "completed":
        setCourses(myCourses.filter(course => course.progress === 1));
        active(e);
      break;
      case "certified":
        setCourses(myCourses.filter(course => course.status === 2));
        setShowCerts(true);
        active(e);
      break;
      default:
        return courses;
    }
  }

  return (
    <div className="courses-view animate__animated animate__fadeIn">
      <NavBarApp>
        <button className="app-link app-active" onClick={e=>filter(e,"in-progress")}>
          En progreso
        </button>
        <button className="app-link" onClick={e=>filter(e,"completed")}>
          Terminados
        </button>
        <button className="app-link" onClick={e=>filter(e,"certified")}>
          Certificados
        </button>
      </NavBarApp>
      
      {
        showCerts ? <></> :
        <>
          <FormSearch />
          <CoursesList courses={courses} />
        </>
      }
    </div>
  )
}

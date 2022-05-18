import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadCoursesStudent } from "../../redux/actions/student";
import { CertList } from "../ui/CertList";
import { CoursesList } from "../ui/CoursesList";
import { FormSearch } from "../ui/FormSearch";
import { Loading } from "../ui/Loading";
import { NavBarApp } from "../ui/NavBarApp";

export const StudentCoursesView = () => {

  const { myCourses } = useSelector(state => state.courses);

  const [courses, setCourses] = useState(myCourses);

  const [showCerts, setShowCerts] = useState(false);

  const dispatch = useDispatch();

  const active = (e) => {
    e.target.classList.add("app-active");
    e.target.parentNode.childNodes.forEach(node => {
      if (node !== e.target) {
        node.classList.remove("app-active");
      }
    });
  }

  useEffect(() => {
    dispatch(startLoadCoursesStudent())
  },[dispatch]);

  useEffect(() => {
    setCourses(myCourses);
  }, [myCourses])

  const filter = (e, type) => {
    setShowCerts(false);
    active(e);
    switch (type) {
      case "all":
        setCourses(myCourses);
        break;
      case "in-progress":
        setCourses(myCourses.filter(course => course.progress < 100));
        break;
      case "completed":
        setCourses(myCourses.filter(course => course.progress === 100));
        break;
      case "certified":
        setCourses(myCourses.filter(course => course.status === 2));
        setShowCerts(true);
        break;
      default:
        return courses;
    }
  }

  if(!myCourses)
    return <Loading />;

  return (
    <div className="courses-view animate__animated animate__fadeIn">
      <NavBarApp>
        <button className="app-link app-active" onClick={e => filter(e, "all")}>
          Todos
        </button>
        <button className="app-link" onClick={e => filter(e, "in-progress")}>
          En progreso
        </button>
        <button className="app-link" onClick={e => filter(e, "completed")}>
          Terminados
        </button>
        <button className="app-link" onClick={e => filter(e, "certified")}>
          Certificados
        </button>
      </NavBarApp>

      {
        showCerts ? <CertList certs={myCourses.filter(course => course.progress === 100)} /> :
          <>
            <FormSearch />
            <CoursesList courses={courses} />
          </>
      }
    </div>
  )
}

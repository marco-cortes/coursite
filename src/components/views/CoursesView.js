import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadCourses } from "../../redux/actions/courses";
import { CoursesList } from "../ui/CoursesList";
import { FormSearch } from "../ui/FormSearch";
import { NavBarApp } from "../ui/NavBarApp";
export const CoursesView = () => {

  const dispatch = useDispatch();

  const { courses } = useSelector(state => state.courses);

  useEffect(() => {
    dispatch(startLoadCourses());
  }, [dispatch]);

return (
  <div className="courses-view">
    <NavBarApp>
      <button className="app-link app-active">
        Todos los cursos
      </button>
      <button className="app-link">
        Nuevos
      </button>
      <button className="app-link">
        Destacados
      </button>
      <button className="app-link">
        Categorias
      </button>
    </NavBarApp>
    <FormSearch />
    <CoursesList courses={courses} />
  </div>
)
}

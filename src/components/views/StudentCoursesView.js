import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadCourses } from "../../redux/actions/courses";
import { Card } from "../ui/Card";
import { FormSearch } from "../ui/FormSearch";
import { NavBarApp } from "../ui/NavBarApp";

export const StudentCoursesView = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(startLoadCourses());
    }, [dispatch]);
  
    const { courses } = useSelector(state => state.courses);
  
    return (
      <div className="courses-view">
        <NavBarApp>
          <button className="app-link app-active">
            En progreso
          </button>
          <button className="app-link">
            Terminados
          </button>
          <button className="app-link">
            Certificados
          </button>
        </NavBarApp>
        <FormSearch />
        {
          courses &&
          <div className="course-list">
            {
              courses.map(course => (
                <Card {...course} key={course.id} />
              ))
            }
          </div>
        }
      </div>
    )
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadCoursesStudent } from "../../redux/actions/courses";
import { Card } from "../ui/Card";
import { FormSearch } from "../ui/FormSearch";
import { NavBarApp } from "../ui/NavBarApp";

export const StudentCoursesView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoadCoursesStudent());
  }, [dispatch]);

  const { myCourses } = useSelector(state => state.courses);

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
        myCourses &&
        <div className="course-list">
          {
            myCourses.map(course => (
              <Card {...course} key={course.id} isBought />
            ))
          }
        </div>
      }
    </div>
  )
}

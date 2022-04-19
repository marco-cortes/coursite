import { Card } from "../ui/Card";
import { FormSearch } from "../ui/FormSearch";
import { NavBarApp } from "../ui/NavBarApp";
export const CourseView = () => {

  const courses = [
    {
      id: 1,
      course: "Curso de React",
      category: "Desarrollo",
      teacher: "Juan Perez",
      price: "$ 300",
      score: "4.5",
      image: "https://picsum.photos/200/300"
    },
    {
      id: 2,
      course: "Curso de Angular",
      category: "Desarrollo",
      teacher: "Juan Perez",
      price: "$ 300",
      score: "4.5",
      image: "https://picsum.photos/200/300"
    },
    {
      id: 3,
      course: "Curso de Vue",
      category: "Desarrollo",
      teacher: "Juan Perez",
      price: "$ 300",
      score: "4.5",
      image: "https://picsum.photos/200/300"
    },
    {
      id: 4,
      course: "Curso de Node",
      category: "Desarrollo",
      teacher: "Juan Perez",
      price: "$ 300",
      score: "4.5",
      image: "https://picsum.photos/200/300"
    }
  ]

  return (
    <div className="course-view">
      <NavBarApp />
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

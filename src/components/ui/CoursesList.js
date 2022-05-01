import { useSelector } from "react-redux";
import { Card } from "./Card"

export const CoursesList = ({ courses }) => {

    const { user } = useSelector(state => state.auth);
    let dir = "";
    if(!user) {
        dir = "";
    } else {
        if (user.role === 1) {
            dir = "/student";
        } else if (user.role === 2) {
            dir = "/teacher";
        } else {
            dir = "/admin";
        }
    }

    return (
        <>
            {
                courses &&
                <div className="course-list">
                    {
                        courses.map(course => (
                            <Card {...course} key={course.id} dir={dir} />
                        ))
                    }
                </div>
            }
        </>
    )
}
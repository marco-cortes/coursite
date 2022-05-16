import { useSelector } from "react-redux";
import { EmptyList } from "../views/EmptyList";
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
                courses.length > 0 ?
                <div className="course-list">
                    {
                        courses.map((course, i) => (
                            <Card course={course} key={i} dir={dir} />
                        ))
                    }
                </div> :
                <EmptyList />
            }
        </>
    )
}

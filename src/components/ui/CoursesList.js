import { useSelector } from "react-redux";
import { EmptyList } from "../views/EmptyList";
import { Card } from "./Card"
import { Loading } from "./Loading";

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

    if(!courses)
        return <Loading />

    return (
        <>
            {
                courses ?
                <div className="course-list animate__animated animate__fadeIn">
                    {
                        courses.map((course, i) => (
                            <Card course={course} key={i} dir={dir} />
                        ))
                    }
                </div> : courses.length === 0 ? <EmptyList /> : <Loading />
            }
        </>
    )
}

import { Card } from "./Card"

export const CoursesList = ({ courses }) => {
    return (
        <>
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
        </>
    )
}

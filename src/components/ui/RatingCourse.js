import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating'
import { saveUserCourse, startLoadUserCourse } from "../../redux/actions/student";

export const RatingCourse = () => {


    const { active: course } = useSelector(state => state.courses);
    const { id: userId } = useSelector(state => state.auth.user);

    const [rating, setRating] = useState(course.score);

    const dispatch = useDispatch();

    const handleRating = (rate) => {
        setRating(rate);
        dispatch(saveUserCourse({
            userId,
            courseId: course.id,
            score: rate,
            progress: course.progress
        }));
        dispatch(startLoadUserCourse(course.id, userId));
    }

    useEffect(() => {
        setRating(course.score);
    }, [course.score])

    useEffect(() => {
        dispatch(startLoadUserCourse(course.id, userId));
    }, [dispatch, course.id, userId]);

    return (
        <div className="user-course-score">
            <h2 className="text-info">Califica el curso:</h2>
            <br />
            <Rating onClick={handleRating} ratingValue={rating} />
        </div>
    )
}

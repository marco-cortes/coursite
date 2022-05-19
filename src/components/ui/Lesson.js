import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { startSaveLesson } from "../../redux/actions/student";

export const Lesson = ({ lesson, active, role }) => {


    const { index, title, description, linkDoc, linkVideo } = lesson;
    const [completed, setCompleted] = useState(false);
    const [counter, setCounter] = useState(0);

    const dispatch = useDispatch();

    const handleClick = (string, e) => {

        if(role) return;

        e.target.classList.add("btn-link-active");
        if (string === "doc" && !completed) {
            if (counter === 0)
                setCounter(1);
            else
                setCounter(2);
        } else if (string === "video" && !completed) {
            if (counter === 0)
                setCounter(1);
            else
                setCounter(2);
        }
        if (counter === 2 && !completed) {
            dispatch(startSaveLesson(lesson.id, true));
        }
    }

    useEffect(() => {
        if(role) return;
        if (active.lessons)
            active.lessons.map(l => l.lesson.id === lesson.id ? setCompleted(l.status) : null);
    }, [completed, active, lesson, role]);

    useEffect(() => {
        if(role) return;
        if (counter === 2 && !completed) {
            dispatch(startSaveLesson(lesson.id, true));
        }
    }, [counter, completed, dispatch, lesson, role]);

    return (
        <div className="div-lesson">
            <div className="lesson-text">
                <h2 className="lesson-title">Lección {index}: <span className="text-primary">{title}</span></h2>
                <p className="lesson-description">{description}</p>
            </div>
            <div className="lesson-links">
                <a className={completed ? "btn btn-link mb btn-link-active" : "btn btn-link mb"} onClick={(e) => handleClick("doc", e)} href={linkDoc} target="_blank" rel="noreferrer"><i className="fa-solid fa-book"></i> Apuntes</a>
                <a className={completed ? "btn btn-link btn-link-active" : "btn btn-link"} onClick={(e) => handleClick("video", e)} href={linkVideo} target="_blank" rel="noreferrer"><i className="fa-solid fa-video"></i> Video</a>
            </div>
        </div>
    )
}

import { useRef } from "react";

export const Accordion = ({ title, lessons }) => {

    const button = useRef(null);

    const open = () => {
        button.current.classList.toggle("accordion-active");
    }

    return (
        <div className="accordion" ref={button} onClick={open}>
            <div className="accordion-head">
                <span className="accordion-title">{title}</span>
                <div className="accordion-btn">
                    <i className="uil uil-angle-down accordion-icon"></i>
                </div>
            </div>
            {

                lessons &&
                <ul className="accordion-body">
                    {
                        lessons.map((lesson, index) => (
                            <li className="lesson" key={lesson.id}>{"Leccion " + (index+1) + ": " + lesson.title}</li>
                        ))
                    }
                </ul>
            }
        </div>
    )
}

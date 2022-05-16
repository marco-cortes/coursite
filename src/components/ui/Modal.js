import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/actions/ui";

export const Modal = ({ children, title, landing }) => {

    const { modalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const close = () => {
        const modal = document.getElementById("modal");
        modal.classList.remove("animate__animated", "animate__fadeIn");
        modal.classList.add("animate__animated", "animate__fadeOut");
        setTimeout(() => {
            dispatch(closeModal());
        }, 300);
    }

    if (!modalOpen)
        return null;

    return (
        <div className="modal-container animate__animated animate__fadeIn" id="modal">
            <div className={landing ? "modal modal-light" : "modal"} >
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button className="btn btn-modal" onClick={close}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

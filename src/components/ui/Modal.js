import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/actions/ui";

export const Modal = ({ children, title }) => {

    const { modalOpen } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const close = () => {
        dispatch(closeModal())
    }

    if (!modalOpen)
        return null;

    return (
        <div className="modal-container">
            <div className="modal">
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

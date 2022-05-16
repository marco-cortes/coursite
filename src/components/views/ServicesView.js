import { useState } from "react"
import { useDispatch } from "react-redux"
import { showModal } from "../../redux/actions/ui"
import { Footer } from "../ui/Footer"
import { Header } from "../ui/Header"
import { Modal } from "../ui/Modal"
import { ServicesCard } from "./ServicesCard"

export const ServicesView = () => {
    const dispatch = useDispatch();

    const [selection, setSelection] = useState(0);

    const open = (value) => {
        setSelection(value);
        dispatch(showModal())
    }

    return (
        <div className="section">
            <Header />
            <div className="services-view animate__animated animate__fadeIn">
                <div className="services-view-content">
                    <h2 className="services-h2">Nuestros servicios</h2>
                    <p className="services-text">
                        <span className="text-primary">Lorem ipsum dolor sit amet</span>, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et <span className="text-primary">dolore magna aliqua</span>. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div className="services-list">
                        <div className="services-item"><i className="fa-solid fa-circle-check icon-item"></i> Positive confirmation</div>
                        <div className="services-item"><i className="fa-solid fa-circle-check icon-item"></i> Positive confirmation</div>
                        <div className="services-item"><i className="fa-solid fa-circle-check icon-item"></i> Positive confirmation</div>
                    </div>
                </div>
                <div className="services-cards">
                    <ServicesCard icon={"fa-solid fa-layer-group"} text={"Lorem ipsum dolor sit amet, adipiscing elit"} s={0} title={"Item 1"} color={"icon-blue"} modal={open} />
                    <ServicesCard icon={"fa-solid fa-graduation-cap"} text={"Lorem ipsum dolor sit amet, adipiscing elit"} s={1} title={"Item 2"} color={"icon-green"} modal={open} />
                    <ServicesCard icon={"fa-solid fa-book-open"} text={"Lorem ipsum dolor sit amet, adipiscing elit"} s={2} title={"Item 3"} color={"icon-red"} modal={open} />
                    <ServicesCard icon={"fa-solid fa-bookmark"} text={"Lorem ipsum dolor sit amet, adipiscing elit"} s={3} title={"Item 4"} color={"icon-orange"} modal={open} />
                </div>
            </div>

            <Modal title={selection === 0 ? "Item 1" : selection === 1 ? "Item 2" : selection === 2 ? "Item 3" : "Item 4"} landing>
                <div className="d-flex">
                    <div>
                        <div className="services-item"><i className="fa-solid fa-circle-check icon-item"></i> Positive confirmation</div>
                        <div className="services-item"><i className="fa-solid fa-circle-check icon-item"></i> Positive confirmation</div>
                        <div className="services-item"><i className="fa-solid fa-circle-check icon-item"></i> Positive confirmation</div>
                    </div>
                    <div>
                        <div className="services-item"><i className="fa-solid fa-circle-check icon-item"></i> Positive confirmation</div>
                        <div className="services-item"><i className="fa-solid fa-circle-check icon-item"></i> Positive confirmation</div>
                        <div className="services-item"><i className="fa-solid fa-circle-check icon-item"></i> Positive confirmation</div>
                    </div>
                </div>
            </Modal>
            <Footer />
        </div>
    )
}

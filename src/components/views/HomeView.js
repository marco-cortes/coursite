import { Link } from "react-router-dom"
import { Header } from "../ui/Header"
import home from "../../image/home.svg";
import { Footer } from "../ui/Footer";

export const HomeView = () => {
    return (
        <div className="section">
            <Header />
            <div className="home-view animate__animated animate__fadeIn">
                <div className="home-view-content">
                    <h1 className="title-h1 text-blue-dark home-title">Invierte en tu conocimiento y</h1>
                    <h1 className="title-h1 text-primary home-title">en tu futuro</h1>
                    <p className="text-gray home-text">
                        Con la ayuda del E-Learning, crea tu propio
                        camino desarrollando nuevas habilidades por
                        tu cuenta para lograr lo que buscas.
                    </p>
                    <Link to="/courses" className="btn btn-home">
                        ¡Comienza!
                    </Link>
                </div>
                <img src={home} alt="coursite" className="img-home" />
            </div>
            <Footer />
        </div>
    )
}

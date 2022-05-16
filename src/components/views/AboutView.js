import { Footer } from "../ui/Footer"
import { Header } from "../ui/Header"
import img1 from "../../image/about1.svg";
import img2 from "../../image/about2.svg";
import img3 from "../../image/about3.svg";
import { AboutHeader } from "./AboutHeader";

export const AboutView = () => {
    return (
        <div className="section">
            <Header />
            <div className="about-view animate__animated animate__fadeIn">
                <AboutHeader title={"CONOCE MÁS DE NOSOTROS"} subtitle={"Acerca de Coursite"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."} span={"Ut labore et dolore magna aliqua. "} />
                <div className="about-section">
                    <div className="about-section-content">
                        <h3 className="about-h3">El equipo Coursite</h3>
                        <p className="about-p">
                            <span className="text-primary">Lorem ipsum dolor sit amet</span>, consectetur adipiscing elit, sed do eiusmod 
                            tempor incididunt ut labore et <span className="text-primary">dolore magna aliqua</span>. Ut enim ad minim 
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                            commodo consequat. 
                            <br /><br />
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                            fugiat nulla pariatur. <span className="text-primary">Excepteur sint occaecat cupidatat</span> non proident, sunt in 
                            culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <img src={img1} alt="about" className="about-img" />
                </div>
                <AboutHeader title={"NUESTRA MISIÓN"} subtitle={"Misión De Coursite"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."} span={"Ut labore et dolore magna aliqua. "} />
                <div className="about-section">
                    <img src={img2} alt="about" className="about-img" />
                    <div className="about-section-content">
                        <h3 className="about-h3">Misión</h3>
                        <ul>
                            <li className="about-p mb-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </li>
                            <li className="about-p mb-1">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </li>
                            <li className="about-p mb-1">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </li>
                            <li className="about-p mb-1">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                        </ul>
                    </div>
                </div>
                <AboutHeader title={"NUESTRA VISIÓN"} subtitle={"Visión de Coursite"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."} span={"Ut labore et dolore magna aliqua. "} />
                <div className="about-section">
                    <div className="about-section-content">
                        <h3 className="about-h3">Visión</h3>
                        <p className="about-p">
                            <span className="text-primary">Lorem ipsum dolor sit amet</span>, consectetur adipiscing elit, sed do eiusmod 
                            tempor incididunt ut labore et <span className="text-primary">dolore magna aliqua</span>. Ut enim ad minim 
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                            commodo consequat. 
                            <br /><br />
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                            fugiat nulla pariatur. <span className="text-primary">Excepteur sint occaecat cupidatat</span> non proident, sunt in 
                            culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                    <img src={img3} alt="about" className="about-img" />
                </div>
            </div>
            <Footer />
        </div>
    )
}

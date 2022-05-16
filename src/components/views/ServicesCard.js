export const ServicesCard = ({ icon, title, text, color, modal, s }) => {

    return (
        <>
            <div className="serivces-card">
                <i className={icon + " service-card-icon " + color}></i>
                <h2 className="service-card-title">{title}</h2>
                <p className="service-card-text">{text}</p>
                <button className="service-card-button" onClick={()=>modal(s)}>LEER MÁS...</button>
            </div>
        </>
    )
}

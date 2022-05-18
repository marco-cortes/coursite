import { Link } from "react-router-dom"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useSelector } from "react-redux";
import { Cert } from "./Cert";

export const CertCard = ({ cert }) => {

    const { title, teacher, category, id } = cert;
    const { user } = useSelector(state => state.auth);

    return (
        <div className="card-cert">
            <h2 className="card-cert-title">
                CERTIFICADO DE FINALIZACIÓN
            </h2>
            <h3 className="card-cert-name">
                {title} <br />
                <span className="card-cert-teacher">
                    {teacher}
                </span>
            </h3>
            <h4 className="card-cert-category">
                {category}
            </h4>

            <div className="card-cert-btns">
                <Link className="btn btn-info" to={"/student/cert/" + id} target="_blank" rel={"noreferrer"} >Certificado</Link>
                <PDFDownloadLink document={<Cert name={user.name + " " + user.lastName} title={title} />} fileName={"Certificado.pdf"}>
                    <button className="btn btn-primary" style={{width: "100%"}}>Descargar</button>
                </PDFDownloadLink>
            </div>
        </div>
    )
}

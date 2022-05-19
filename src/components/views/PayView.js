import { FormPay } from "../ui/FormPay";
import img from "../../image/pay-image.svg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { startLoadCourse } from "../../redux/actions/courses";
import { Loading } from "../ui/Loading";

export const PayView = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(startLoadCourse(id));
  }, [dispatch, id]);

  const { active } = useSelector(state => state.courses);

  if (!active) {
    return <Loading />;
  }

  const back = () => {
    window.history.back();
  }

  return (
    <div className="pay-view animate__animated animate__fadeIn">
      <div className="pay-container">
        <div className="div-pay">
          <h2 className="pay-view-title">Datos de pago</h2>
          <FormPay id={id} />
          <button className="btn btn-info" onClick={back}><i className="fa-solid fa-rotate-left"></i> Regresar</button>
        </div>
        <div className="div-pay">
          <div className="pay-resume">
            <h2 className="title-pay">Resumen</h2>
            <table>
              <tbody className="table">
                <tr className="d-flex">
                  <td>Precio original</td>
                  <td>$ {active.price}</td>
                </tr>
                <tr className="d-flex">
                  <td>Descuento</td>
                  <td>$ 0.0</td>
                </tr>
                <tr className="d-flex">
                  <td>Total</td>
                  <td>$ {active.price}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <img src={img} alt="pay" className="pay-image" />
        </div>
      </div>
    </div>
  )
}

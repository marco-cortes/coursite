import { FormPay } from "../ui/FormPay";
import img from "../../image/pay-image.svg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { startLoadCourse } from "../../redux/actions/courses";

export const PayView = () => {

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(startLoadCourse(id));
  }, [dispatch, id]);

  const { active } = useSelector(state => state.courses);

  if (!active) {
    return <div>Loading...</div>
  }

  const back = () => {
    window.history.back();
  }

  return (
    <div className="pay-view">
      <h2 className="pay-view-title">Datos de pago</h2>
      <div className="d-flex">
        <FormPay id={id} />
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
      </div>
      <div className="back-div">
        <button className="btn btn-info" onClick={back}>Regresar</button>
        <img src={img} alt="pay" />
      </div>
    </div>
  )
}

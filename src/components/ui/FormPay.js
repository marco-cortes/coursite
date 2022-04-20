export const FormPay = () => {
    return (
        <form className="form-pay">
            <input type="text" placeholder="Nombre de la tarjeta" className="input-pay" />
            <input type="text" placeholder="Número de la tarjeta" className="input-pay" />
            <div className="form-group">
                <input type="text" placeholder="MM/AA" className="input-pay" />
                <input type="text" placeholder="CVV/CVC" className="input-pay" />
            </div>
            <div className="form-group">
                <div className="check-div">
                    <input type="checkbox" id="check" className="check-pay" />
                    <label htmlFor="check"> Guardar tarjeta</label>
                </div>
                <button type="submit" className="btn btn-primary" >Realizar pago</button>
            </div>
        </form>
    )
}

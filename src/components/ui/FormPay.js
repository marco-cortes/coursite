import { useState } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { startBuyCourse } from "../../redux/actions/student";


export const FormPay = ({ id }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [card, setCard,] = useForm({
        number: localStorage.getItem('number') ? localStorage.getItem('number') : '',
        name: localStorage.getItem('name') ? localStorage.getItem('name') : '',
        expiry: '',
        cvc: ''
    })

    const [checked, setChecked] = useState(localStorage.getItem('number') ? true : false);

    const buyCourse = (e) => {
        e.preventDefault();
        if(checked) {
            localStorage.setItem('number', card.number);
            localStorage.setItem('name', card.name);
        }
        dispatch(startBuyCourse(id));
        navigate("/student/learning");
    }

    const handleChecked = (e) => {
        setChecked(e.target.checked);
        localStorage.setItem('checked', e.target.checked);
    }

    const validateDate = (e) => {
        if (e.target.value.length <= 5) {
            if (e.target.value.length === 2) {
                e.target.value += '/';
            }
            setCard(e);
        }
    }

    const deleteSlide = (e) => {
        if (e.key === "Backspace") {
            if (e.target.value.length === 3 && e.target.value[2] === '/') {
                e.target.value = e.target.value.replace("/", "");
            }
        }
    }

    const addSeparation = (e) => {
        if(e.target.value.length <= 19) {
            if (e.target.value.length === 4 || e.target.value.length === 9 || e.target.value.length === 14) {
                e.target.value += '-';
            }
            setCard(e);
        }
    }

    const deleteSeparation = (e) => {
        if (e.key === "Backspace") {
            if ((e.target.value.length === 5 && e.target.value[4] === '-')
                || (e.target.value.length === 10 && e.target.value[9] === '-')
                || (e.target.value.length === 15 && e.target.value[14] === '-')) {
                e.target.value = e.target.value.slice(0, -1);
            }
        }
    }

    const validateCvc = (e) => {
        if (e.target.value.length <= 3) {
            setCard(e);
        }
    }

    return (
        <form className="form-pay" onSubmit={buyCourse}>
            <input type="text" placeholder="Nombre de la tarjeta" className="input-pay" required name="name" onChange={setCard} value={card.name} />
            <input type="text" placeholder="Número de la tarjeta" className="input-pay" required name="number" onChange={addSeparation} value={card.number} onKeyDown={deleteSeparation} />
            <div className="form-group">
                <input type="text" placeholder="MM/AA" className="input-pay" required name="expiry" onChange={validateDate} value={card.expiry} onKeyDown={deleteSlide} />
                <input type="text" placeholder="CVV/CVC" className="input-pay" required name="cvc" onChange={validateCvc} value={card.cvc} />
            </div>
            <div className="form-group g-f">
                <div className="check-div">
                    <input type="checkbox" id="check" className="check-pay" checked={checked} onChange={handleChecked} />
                    <label htmlFor="check"> Guardar tarjeta</label>
                </div>
                <button type="submit" className="btn btn-primary"><i className="fa-solid fa-bag-shopping"></i> Realizar pago</button>
            </div>
        </form>
    )
}

import { useDispatch } from "react-redux";
import imgUser from "../../image/user-image.svg";
import { showModal } from "../../redux/actions/ui";

export const UserImage = ({ name, lastname, image, setSelect }) => {


  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    setSelect(2);
    dispatch(showModal());
  }

  return (
    <div className="user-top">
      <div className="user-top-container">
        {

          <div className="user-image-container">
            {
              image ? <img src={image} alt="user" className="user-image" />
                : <img src={imgUser} alt="user" className="user-image" />
            }
            <button type="button" className="user-edit-image" onClick={handleClick} ><i className="fa-solid fa-pen"></i></button>
          </div>

        }
        <h2 className="user-names">
          {name} {lastname}
        </h2>
      </div>
    </div>
  )
}

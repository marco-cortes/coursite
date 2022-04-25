import imgUser from "../../image/user-image.svg";

export const UserImage = ({ name, lastname, image }) => {
  return (
    <div className="user-top">
      <div className="user-top-container">
        {

          <div className="user-image-container">
            {
              image ? <img src={image} alt="user" className="user-image" />
                : <img src={imgUser} alt="user" className="user-image" />
            }
            <button className="user-edit-image"><i className="fa-solid fa-pen"></i></button>
          </div>

        }
        <h2 className="user-names">
          {name} {lastname}
        </h2>
      </div>
    </div>
  )
}

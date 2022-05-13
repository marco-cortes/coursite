import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startUploadImage } from "../../redux/actions/auth";

export const UploadPhoto = () => {

    const user = useSelector(state => state.auth.user);
    const [image, SetImage] = useState(null);
    const dispatch = useDispatch();

    const inputChange = (e) => {
        e.preventDefault();
        SetImage(e.target.files[0]);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user);
        dispatch(startUploadImage(user, image));
    }

    return (
        <form className="files-upload" onSubmit={onSubmit}>
            <div className="flex space-between align-items-center">
                <h2 className="light">Subir imágen</h2>
                <button className="btn btn-upload" type="submit">Subir <i className="fa-solid fa-upload"></i></button>
            </div>
            <input className="input-file" id="input-file" type="file" name="image" onChange={inputChange} accept="image/png,image/jpeg" />
            <label className="input-file-label" htmlFor="input-file">
                {
                    image ? <p className="file-upload-name">{image.name}</p>
                    : 
                    <>
                        <div className="file-upload-icon-div">
                            <i className="fa-solid fa-file-arrow-up file-upload-icon"></i>
                        </div>
                        <span className="file-upload-text">Seleccione su foto</span>
                    </>
                }
            </label>

        </form>
    )
}

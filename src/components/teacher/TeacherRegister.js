import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getUser } from "../../redux/actions/auth";
import { startUploadFile } from "../../redux/actions/teachers";

export const TeacherRegister = () => {

    const user = useSelector(state => state.auth.user);
    const { active } = useSelector(state => state.courses);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);

    const addDoc = (e) => {
        e.preventDefault();

        if (!files) return;

        dispatch(startUploadFile(user, files));
    }


    const inputChange = (e) => {
        e.preventDefault();

        const f = e.target.files;

        if(files.length > 0) {
            setFiles([...files, ...Array.from(f)]);

            document.getElementById("files-container").scrollIntoView({
                behavior: "smooth",
            })

            return;
        }

        setFiles(Array.from(f));
    }


    const deleteFile = (e, file) => {
        e.preventDefault();
        setFiles(files.filter(f => f !== file));
    }


    useEffect(()=> {
        if(active !== null && active.true) {
            Swal.fire("Success", "¡Documentos guardados exitosamente!", "success");
            dispatch(getUser(user.email));
            navigate("/teacher/courses");
        } else if(active !== null && active.false) {
            Swal.fire("Error", "Error :CCC", "error");
        }
    }, [active, navigate, dispatch, user.email])


    return (
        <div className="finish-register">
            <h2 className="auth-title">Documentos</h2>
            <form onSubmit={addDoc} className="">

                <div className="files-upload">
                    <div className="flex space-between align-items-center">
                        <h2>Subir archivos</h2>
                        <button className="btn btn-upload" type="submit">Subir <i className="fa-solid fa-upload"></i></button>
                    </div>
                    <input className="input-file" id="input-file" type="file" name="file" multiple onChange={inputChange} accept="application/pdf" />
                    <label className="input-file-label" htmlFor="input-file">
                        <div className="file-upload-icon-div">
                            <i className="fa-solid fa-file-arrow-up file-upload-icon"></i>
                        </div>
                        <span className="file-upload-text">Seleccione sus archivos</span>
                        <span className="file-upload-info">(solo PDF)</span>
                    </label>

                </div>

                <div className="files-container" id="files-container">
                    {
                        files.map((file, i) => (
                            <div key={i} className="file-container flex align-items-center space-between">
                                <div className="file-info">
                                    <div className="file-name">{file.name}</div>
                                    <div className="file-size">{(file.size / 1024).toFixed(2) + " KB"}</div>
                                </div>
                                <div className="file-pdf">
                                    <i className="fa-solid fa-xmark file-X" onClick={e => deleteFile(e, file)}></i>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </form>
        </div>
    )
}

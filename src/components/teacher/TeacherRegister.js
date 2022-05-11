import { useDispatch, useSelector } from "react-redux";
import { startUploadFile } from "../../redux/actions/teachers";

export const TeacherRegister = () => {

    const { id } = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const addDoc = (e) => {
        e.preventDefault();
        
        const file = e.target[0]?.files[0];

        if(!file) return;

        dispatch(startUploadFile(id, file));
    }

    return (
        <div>
            <h2>Documentos</h2>
            <form onSubmit={addDoc}>
                <input type="file" name="file" />
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

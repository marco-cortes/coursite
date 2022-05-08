import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { clearCourse, startLoadCourse } from "../../redux/actions/courses";
import { NewCourse } from "./NewCourse";

export const EditCourse = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCourse());
  } , [dispatch]);

  useEffect(()=> {
    dispatch(startLoadCourse(id));
  }, [dispatch, id]);

  const { active } = useSelector(state => state.courses);

  if(active)
    return <NewCourse active={active} />

  return (
    <div>Cargando</div>
  )
}

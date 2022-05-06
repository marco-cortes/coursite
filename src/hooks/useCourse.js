import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCourse } from "../redux/actions/courses";


export const useCourse = (initialState = {}) => {
    const dispatch = useDispatch();

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });

        dispatch(setCourse(values));
    }

    const setNewValues = (newValues) => {
        setValues(newValues);
        dispatch(setCourse(values));
    }

    return [values, handleInputChange, reset, setNewValues];

}
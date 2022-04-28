import { types } from "../types/types";

const initialState = {
    courses: [],
    active: null,
    myCourses: []
}

export const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.courseSetActive:
            return {
                ...state,
                active: action.payload
            }
        case types.courseCleanActive:
            return {
                ...state,
                active: null
            }
        case types.coursesLoaded:
            return {
                ...state,
                courses: action.payload
            }
        case types.clearAll:
            return {
                ...state,
                myCourses: [],
                active: null
            }
        case types.myCoursesLoaded:
            return {
                ...state,
                myCourses: action.payload
            }
        default:
            return state
    }
}
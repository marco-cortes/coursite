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
            return initialState;
        case types.myCoursesLoaded:
            return {
                ...state,
                myCourses: action.payload
            }
        case types.categoriesLoaded:
            return {
                ...state,
                categories: action.payload
            }
        case types.teachersLoaded:
            return {
                ...state,
                teachers: action.payload
            }
        case types.courseAddNew:
            return {
                ...state,
                courses: [...state.courses, action.payload]
            }
        case types.courseUpdated:
            return {
                ...state,
                courses: state.courses.map(course => course.id === action.payload.id ? action.payload : course)
            }
        case types.courseDeleted:
            return {
                ...state,
                courses: state.courses.filter(course => course.id !== action.payload)
            }
        case types.teachersAddNew:
            return {
                ...state,
                teachers: [...state.teachers, action.payload]
            }
        case types.teachersUpdated:
            return {
                ...state,
                teachers: state.teachers.map(teacher => teacher.id === action.payload.id ? action.payload : teacher)
            }
        case types.setUnitActive:
            return {
                ...state,
                unitActive: action.payload
            }
        case types.setLessonActive:
            return {
                ...state,
                lessonActive: action.payload
            }
        case types.unitCleanActive:
            return {
                ...state,
                unitActive: null
            }
        case types.lessonCleanActive:
            return {
                ...state,
                lessonActive: null
            }
        case types.teachersDeleted:
            return {
                ...state,
                teachers: state.teachers.filter(teacher => teacher.id !== action.payload)
            }
        case types.teacherSetActive:
            return {
                ...state,
                active: action.payload
            }
        case types.categoriesAddNew:
            return {
                ...state,
                categories: [ ...state.categories, action.payload]
            }
        case types.categoriesUpdated:
            return {
                ...state,
                categories: state.categories.map(category => category.id === action.payload.id ? action.payload : category)
            }
        case types.categoriesDeleted:
            return {
                ...state,
                categories: state.categories.filter(category => category.id !== action.payload)
            }
        
        default:
            return state
    }
}
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { courseReducer } from "./courseReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    courses: courseReducer
})
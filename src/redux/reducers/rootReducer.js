import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
    ui: uiReducer,
    auth: authReducer
    //TODO: AuthReducer, CalendarReducer, etc.
})
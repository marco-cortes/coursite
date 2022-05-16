import { types } from "../types/types";

const initialState = {
    checking: true,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                user: action.payload,
                checking: false
            }
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }
        case types.authLogout:
            return {
                checking: false,
                user: null
            };
        case types.setDocs:
            return {
                ...state,
                docs: action.payload
            }
        
        case types.loadNotifications: 
            return {
                ...state,
                notifications: action.payload
            }
        case types.loadStats:
           return {
                ...state,
                stats: action.payload
            }
        default:
            return state
    }
}
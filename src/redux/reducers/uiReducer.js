import { types } from "../types/types";

const initialState = {
    modalOpen: false,
}

export const uiReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true,
            }
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false,
            }
        case types.uiShowNotifications:
            return {
                ...state,
                notifications: true,
            }
        case types.uiHiddenNotifications:
            return {
                ...state,
                notifications: false,
            }
        default:
            return state;
    }
}
import { types } from "../types/types"

export const showModal =  () => {
    return {
        type: types.uiOpenModal
    }
}

export const closeModal = () => {
    return {
        type: types.uiCloseModal
    }
}

export const showNotifications = () => {
    return {
        type: types.uiShowNotifications
    }
}

export const hiddenNotifications = () => {
    return {
        type: types.uiHiddenNotifications
    }
}
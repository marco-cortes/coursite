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
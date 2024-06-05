import { TYPE_SET, TYPE_UNSET } from './action-types'

const initialState = {
    counter: 0,
}

export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE_SET:
            return {
                ...state,
                counter: state.counter + 1,
            }
        case TYPE_UNSET:
            return {
                ...state,
                counter: state.counter - 1,
            }
        default:
            return state
    }
}
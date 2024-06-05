import { TYPE_SET, TYPE_UNSET } from './action-types'

export const increment = () => ({
    type: TYPE_SET,
})

export const decrement = () => ({
    type: TYPE_UNSET,
})
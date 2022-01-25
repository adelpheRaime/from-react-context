import React from "react"
import { useStates } from "./useStates"
export function useReducers(reducer, keyWord, initializer) {
    const [state, setState] = useStates(keyWord)
    React.useEffect(() => {
        if (initializer) {
            setState(initializer(state))
        }
    }, [])
    const dispatch = function (action) {
        if (action) {
            const reducerState = reducer(state, action)
            setState(reducerState)
            return
        }
        setState(state)
    }


    return [state, dispatch]
}
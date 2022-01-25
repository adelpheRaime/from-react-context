import React from 'react'
import { contextStore } from "../consumer"
import { isString, error } from '../../utils'
export function useStates(keyWord) {

    const ctxStore = contextStore();
    if (!isString(keyWord)) {
        error("Accepts only a string as parameter")
    }
     else if (!ctxStore[keyWord]) {
        error(`${keyWord} is not found in context,ensure that you write it correctly`)
    }
    const cKey = ctxStore[keyWord]
    const context = React.useContext(cKey)
    let setState = context[1]
    let state = context[0]

    return [state, setState]

}
import React from 'react'
import ParentContext, { ChildContext } from "./context"
let ctxStore // create store for contexts object

export const contextStore = () => {
    return ctxStore
}

export function ContextConsumer({ context, children }) {
    let ProviderStore = {}
    let ContextStore = {}
    const contextApi = React.useContext(ChildContext)
    const ctxKey = Object.keys(context)
    //split up the context
    for (let i = 0; i < ctxKey.length; i++) {
        Object.defineProperty(ContextStore, ctxKey[i], {
            value: React.createContext(null)
        })

    }
    ctxStore = ContextStore
    for (let i = 0; i < ctxKey.length; i++) {
        //create and store Provider function component
        ProviderStore[ctxKey[i]] = ({ children }) => {
            var Provider = ContextStore[ctxKey[i]].Provider
            var state = contextApi[ctxKey[i]]
            const stateArray = (0, React.useState)(() => state)
            const context = (0, React.useMemo)(() => (stateArray), [stateArray])
            return (React.createElement(Provider, { value: context }, children))

        }
    }

    //Hoc function
    function Components({ children, type }) {
        const ItemComponent = ProviderStore[type]
        return (React.createElement(ItemComponent, null, children))
    }
    //render the context by reducer function
    return (
        <ParentContext.Provider value={context}>

            {ctxKey.reduce(function (d, item) {
                return (
                    <Components key={item} type={item}>
                        {d}
                    </Components>
                )
            }, children)}
        </ParentContext.Provider>

    )
}
import React from "react"
import { ChildContext } from "./context"
import { ContextConsumer } from "./consumer"
import {error,isPlainObject} from "../utils"
export function Providers({ children, context }) {
  if (!isPlainObject(context)) {
    error("The context is not found; please ensure the component is wrapped in the Provider or it is an object")
  }
  return (
    <ChildContext.Provider value={context}>
      <ContextConsumer context={context}>
        {children}
      </ContextConsumer>
    </ChildContext.Provider>
  )
}


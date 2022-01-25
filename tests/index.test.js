/**
 * @jest-environment jsdom
 */
import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import { renderHook, act } from "@testing-library/react-hooks"
import "@testing-library/jest-dom"
import { Providers, useStates, useReducers } from '../dist/cjs'
import { store } from "./store"
import { reducer } from "./reducer"

let getByTestId
beforeEach(() => {

    const component = render(
        <Providers context={store}>
            <div></div>
        </Providers>
    )
    getByTestId = component.getByTestId
})
const Provider = ({ children, store }) => (
    <Providers context={store}>
        {children}
    </Providers>
)
const wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
)
//Test the useSates hook
//------------------------
test('when the component renders,we can get the context value from useStates hook', () => {

    const { result } = renderHook(() => useStates("Theme"), {
        wrapper
    })

    const [theme, setTheme] = result.current
    expect(theme).toBe(store.Theme)
})
it('should return dark when the dispatch("dark") is triggered', () => {
    //using renderHook cannot destructure the values
    //use instead result.current 
    const { result } = renderHook(() => useStates("Theme"), { wrapper })
    act(() => {
        result.current[1]("dark")
    })
    expect(result.current[0]).toBe('dark')
})


it('should return the previous state when the counter updated', () => {
    //when using renderHook you cannot destructure the values as its locks in their current value
    const { result,rerender } = renderHook(() => useStates("Counter"), { wrapper })
    act(() => {
        result.current[1](prev => prev + 1)
    })
    act(() => {
        result.current[1](prev => prev + 1)
    })
    act(() => {
        result.current[1](prev => prev + 1)
    })
    expect(result.current[0]).toBe(3)
})
//Test the useReducers hook
//------------------------
it('should return the value increments when dispatch({type:"increment"}) is triggered', () => {
    //using renderHook cannot destructure the values
    //use instead result.current 
    const { result } = renderHook(() => useReducers(reducer, "Counter"), { wrapper })
    act(() => {
        result.current[1]({ type: "increment" })
    })
    expect(result.current[0]).toBe(1)
})


## from-react-context

from-react-context is an alternative of context api for those who want to take advantages of react useState and useReducer as global state management hooks, and  improve React performance by preventing unnecessary re-renders from context api.

## Features
- based on built-in react hooks and no need to learn
- Prevents the unnecessary re-renders
- one context for multiple contexts

## Installation
Using npm:

```bash
npm install from-react-context
```
Using yarn:

```bash
yarn add from-react-context
```
## Usage
### Create a store
From the store.js file create an object that initialize all of your context value
```js
 
const context={
    Theme: "light",
    Count:0
}

export default context;
```
Import the context object from store.js file and pass it to the providers

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Providers } from 'from-react-context';
import context from "./store"
ReactDOM.render((
    <Providers context={context}>
        <App/>
    </Providers>
), document.getElementById('root'));
```
### The useReducers hook
```js
import {useReducers} from "from-react-context"
    const reducer = (state, action) => {
        switch(action.type){
            case  "increment":
                state++
                return state
            case "decrement":
                state--
                return state
            default:
                return state
        }
    }
function Counter(){
        const [count,setCount]=useReducers(reducer,"Count")

        function increment(){
            setCount({type:"increment"})
        }

    return (
        <div>{count}</div>
        <button onClick={increment} > + </button>
    )
} 
    
```
The second parameter in `useReducers` is the name of context that would be to update.This take the state value from the context before calling the reducer.
`useReducers` can also accept a third parameter as state initializer like react useReducer hook

```js
useReducers(reducer,"Count",state=>state*0)
```

>Because of the context splitted up and return value wrapped in useMemo, the unnecessary re-renders is fixed. 

### The useStates hook
```js
import {useStates} from "from-react-context"
function Navbar(){
    //Pass The name of context as a parameter
        const [theme,setTheme]=useStates("Theme")

        function changeTheme(){
            setTheme(theme==="light"?"dark":"light")
        }
        
    return (
        <div>{theme}</div>
        <button onClick={changeTheme} > change Theme </button>
    )
   } 
```
## Support

All react version that support hooks function are supported(>=16.8)

## License
MIT © [Adelphe Aime](https://github.com/adelpheRaime) 







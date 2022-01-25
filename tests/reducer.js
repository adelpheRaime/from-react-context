export const reducer = (state, action) => {
    switch(action.type){
        case  "increment":
            state++
            return state
        case "decrement":
            state--
            return state
        case "minus":
            state=state-action.payload
            return state
        default:
            return state
    }
}


const toString = Object.prototype.toString
function isPlainObject() {
    return toString.call(arguments[0]) === "[object Object]"
}
function isString() {
    return typeof arguments[0] === "string"
}
function error(){
    if( process.env.NODE_ENV !== 'production'){
        throw new Error(arguments[0])
    }
}
export {
    isPlainObject,
    isString,
    error
}
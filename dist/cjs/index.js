'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ParentContext = /*#__PURE__*/React__default["default"].createContext(null);
var ChildContext = /*#__PURE__*/React__default["default"].createContext(null);

var ctxStore; // create store for contexts object

var contextStore = function contextStore() {
  return ctxStore;
};
function ContextConsumer(_ref) {
  var context = _ref.context,
      children = _ref.children;
  var ProviderStore = {};
  var ContextStore = {};
  var contextApi = React__default["default"].useContext(ChildContext);
  var ctxKey = Object.keys(context); //split up the context

  for (var i = 0; i < ctxKey.length; i++) {
    Object.defineProperty(ContextStore, ctxKey[i], {
      value: /*#__PURE__*/React__default["default"].createContext(null)
    });
  }

  ctxStore = ContextStore;

  var _loop = function _loop(_i) {
    //create and store Provider function component
    ProviderStore[ctxKey[_i]] = function (_ref3) {
      var children = _ref3.children;
      var Provider = ContextStore[ctxKey[_i]].Provider;
      var state = contextApi[ctxKey[_i]];
      var stateArray = (0, React__default["default"].useState)(function () {
        return state;
      });
      var context = (0, React__default["default"].useMemo)(function () {
        return stateArray;
      }, [stateArray]);
      return /*#__PURE__*/React__default["default"].createElement(Provider, {
        value: context
      }, children);
    };
  };

  for (var _i = 0; _i < ctxKey.length; _i++) {
    _loop(_i);
  } //Hoc function


  function Components(_ref2) {
    var children = _ref2.children,
        type = _ref2.type;
    var ItemComponent = ProviderStore[type];
    return /*#__PURE__*/React__default["default"].createElement(ItemComponent, null, children);
  } //render the context by reducer function


  return /*#__PURE__*/React__default["default"].createElement(ParentContext.Provider, {
    value: context
  }, ctxKey.reduce(function (d, item) {
    return /*#__PURE__*/React__default["default"].createElement(Components, {
      key: item,
      type: item
    }, d);
  }, children));
}

var toString = Object.prototype.toString;

function isPlainObject() {
  return toString.call(arguments[0]) === "[object Object]";
}

function isString() {
  return typeof arguments[0] === "string";
}

function error() {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error(arguments[0]);
  }
}

function Providers(_ref) {
  var children = _ref.children,
      context = _ref.context;

  if (!isPlainObject(context)) {
    error("The context is not found; please ensure the component is wrapped in the Provider or it is an object");
  }

  return /*#__PURE__*/React__default["default"].createElement(ChildContext.Provider, {
    value: context
  }, /*#__PURE__*/React__default["default"].createElement(ContextConsumer, {
    context: context
  }, children));
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function useStates(keyWord) {
  var ctxStore = contextStore();

  if (!isString(keyWord)) {
    error("Accepts only a string as parameter");
  } else if (!ctxStore[keyWord]) {
    error("".concat(keyWord, " is not found in context,ensure that you write it correctly"));
  }

  var cKey = ctxStore[keyWord];
  var context = React__default["default"].useContext(cKey);
  var setState = context[1];
  var state = context[0];
  return [state, setState];
}

function useReducers(reducer, keyWord, initializer) {
  var _useStates = useStates(keyWord),
      _useStates2 = _slicedToArray(_useStates, 2),
      state = _useStates2[0],
      setState = _useStates2[1];

  React__default["default"].useEffect(function () {
    if (initializer) {
      setState(initializer(state));
    }
  }, []);

  var dispatch = function dispatch(action) {
    if (action) {
      var reducerState = reducer(state, action);
      setState(reducerState);
      return;
    }

    setState(state);
  };

  return [state, dispatch];
}

exports.Providers = Providers;
exports.useReducers = useReducers;
exports.useStates = useStates;

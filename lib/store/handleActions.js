"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function handleActions(initialState, handlers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var handler = handlers[action.type];
    return handler ? handler(state, action) : state;
  };
}

var _default = handleActions;
exports["default"] = _default;
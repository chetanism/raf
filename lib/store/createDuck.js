"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

function createDuck(prefix, desc) {
  var _initialState = desc._initialState,
      actions = (0, _objectWithoutProperties2["default"])(desc, ["_initialState"]);
  var handlers = {};
  var actionCreators = {};
  Reflect.ownKeys(actions).forEach(function (actionName) {
    var action = "".concat(prefix, "/").concat(actionName);
    var actionReducer = actions[actionName];

    var actionCreator = function actionCreator() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return {
        type: action,
        payload: args
      };
    };

    actionCreator.toString = function () {
      return action;
    };

    actionCreators[actionName] = actionCreator;

    if (actionReducer) {
      handlers[action] = function (state, action) {
        return actionReducer.apply(void 0, (0, _toConsumableArray2["default"])(action.payload))(state);
      };
    }
  });

  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var handler = handlers[action.type];
    return handler ? handler(state, action) : state;
  };

  return [actionCreators, reducer];
}

var _default = createDuck;
exports["default"] = _default;
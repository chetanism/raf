"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _handleActions2 = _interopRequireDefault(require("./handleActions"));

function createFetchDuck(prefix, fetcher, item) {
  var _handleActions;

  var REQUEST = "".concat(prefix, "/").concat(item, "_REQUEST");
  var SUCCESS = "".concat(prefix, "/").concat(item, "_SUCCESS");
  var FAILURE = "".concat(prefix, "/").concat(item, "_FAILURE");

  var fetchAction = function fetchAction(payload) {
    return {
      types: [REQUEST, SUCCESS, FAILURE],
      promise: function promise() {
        return fetcher(payload);
      }
    };
  };

  var initialState = {
    isFetching: false,
    response: null
  };
  var reducer = (0, _handleActions2["default"])(initialState, (_handleActions = {}, (0, _defineProperty2["default"])(_handleActions, REQUEST, function (state) {
    return (0, _objectSpread2["default"])({}, state, {
      isFetching: true
    });
  }), (0, _defineProperty2["default"])(_handleActions, FAILURE, function () {
    return initialState;
  }), (0, _defineProperty2["default"])(_handleActions, SUCCESS, function (state, action) {
    return (0, _objectSpread2["default"])({}, state, {
      response: action.payload,
      isFetching: false
    });
  }), _handleActions));
  return {
    fetchAction: fetchAction,
    reducer: reducer
  };
}

var _default = createFetchDuck;
exports["default"] = _default;
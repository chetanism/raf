"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var asyncMiddleware = function asyncMiddleware() {
  return function (next) {
    return function (action) {
      var types = action.types,
          actions = action.actions,
          promise = action.promise,
          rest = (0, _objectWithoutProperties2["default"])(action, ["types", "actions", "promise"]);

      if (!promise) {
        return next(action);
      }

      if (types) {
        var _types = (0, _slicedToArray2["default"])(types, 3),
            REQUEST = _types[0],
            SUCCESS = _types[1],
            FAILURE = _types[2];

        next((0, _objectSpread2["default"])({}, rest, {
          type: REQUEST
        }));
        promise().then(function (result) {
          return next({
            type: SUCCESS,
            payload: result,
            meta: rest
          });
        }, function (error) {
          return next({
            type: FAILURE,
            error: error,
            meta: rest
          });
        });
      } else if (actions) {
        var _actions = (0, _slicedToArray2["default"])(actions, 3),
            request = _actions[0],
            success = _actions[1],
            failure = _actions[2];

        next(request.apply(void 0, (0, _toConsumableArray2["default"])(rest)));
        promise().then(function (result) {
          return next(success.apply(void 0, [result].concat((0, _toConsumableArray2["default"])(rest))));
        }, function (error) {
          return next(failure.apply(void 0, [error].concat((0, _toConsumableArray2["default"])(rest))));
        });
      }
    };
  };
};

var _default = asyncMiddleware;
exports["default"] = _default;